import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'uploads')
    try {
      await mkdir(uploadsDir, { recursive: true })
    } catch (err) {
      console.log('Directory exists or cannot be created')
    }

    // Save file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filepath = path.join(uploadsDir, file.name)
    await writeFile(filepath, buffer)

    // Mock analysis result
    const analysisResult = {
      metrics: {
        cholesterol: "195 mg/dL",
        bloodPressure: "128/82 mmHg",
        bloodGlucose: "102 mg/dL",
        bmi: "26.4"
      },
      recommendations: [
        "Consider lifestyle changes to address slightly elevated blood pressure",
        "Monitor blood glucose levels; consider follow-up with endocrinologist",
        "Recommended tests: HbA1c to assess long-term glucose control"
      ]
    }

    return NextResponse.json(analysisResult)
  } catch (error) {
    console.error('Error handling upload:', error)
    return NextResponse.json(
      { error: 'Failed to process upload', details: error.message },
      { status: 500 }
    )
  }
}