from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import app_code  # Import your app_code which now processes the reports
import os
import shutil

app = FastAPI()

# Enable CORS to allow requests from the frontend (Next.js or other)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with your frontend's domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Temporary directory for file storage
TEMP_DIR = "temp_files"
os.makedirs(TEMP_DIR, exist_ok=True)  # Create temp folder if it doesn't exist

@app.post("/api/extract-text")
async def extract_text(files: List[UploadFile] = File(...)) -> List[dict]:
    """
    Endpoint to process multiple PDF files and extract text from each.
    :param files: List of uploaded PDF files.
    :return: List of dictionaries containing file names and their extracted content.
    """
    responses = []
    for file in files:
        file_location = f"{TEMP_DIR}/{file.filename}"
        try:
            # Save the uploaded file to a temporary location
            with open(file_location, "wb") as f:
                shutil.copyfileobj(file.file, f)

            # Call your function from app_code to process the report and extract the text
            extracted_data = app_code.process_report(file_location)  # Ensure this returns structured text data

            # Append the extracted data to the response list
            responses.append({
                "filename": file.filename,
                "extracted_data": extracted_data  # Ensure your app_code returns the text or structured data
            })
        
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to process {file.filename}: {str(e)}")
        
        finally:
            # Cleanup: Ensure the file is removed even if an error occurs
            if os.path.exists(file_location):
                os.remove(file_location)

    return responses  # Return the extracted data for each file
