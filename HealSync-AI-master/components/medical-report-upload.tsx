"use client"

import { useState } from "react"
import { FileText, Upload, Download, Eye, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function MedicalReportUpload() {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileChange = (e) => {
    const files = e.target.files
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileUpload = (file) => {
    setUploadedFile(file)
    simulateAnalysis()
  }

  const simulateAnalysis = () => {
    setAnalyzing(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 10
        if (newProgress >= 100) {
          clearInterval(interval)
          setAnalyzing(false)
          setAnalysisComplete(true)
          return 100
        }
        return newProgress
      })
    }, 500)
  }

  const resetUpload = () => {
    setUploadedFile(null)
    setAnalyzing(false)
    setAnalysisComplete(false)
    setProgress(0)
  }

  const previousReports = [
    { id: 1, name: "Blood Test Results", date: "2023-12-15", type: "PDF" },
    { id: 2, name: "MRI Scan Report", date: "2023-11-20", type: "PDF" },
    { id: 3, name: "Annual Physical", date: "2023-10-05", type: "PDF" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Medical Report Analysis</h1>
        <p className="text-muted-foreground">Upload and analyze your medical reports with AI</p>
      </div>

      <Tabs defaultValue="upload">
        <TabsList>
          <TabsTrigger value="upload">Upload Report</TabsTrigger>
          <TabsTrigger value="previous">Previous Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          {!uploadedFile ? (
            <Card>
              <CardContent className="pt-6">
                <div
                  className={`border-2 border-dashed rounded-lg p-10 text-center ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                      <Upload className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Drag and drop your medical report</h3>
                      <p className="text-sm text-gray-500 mt-1">Supports PDF, JPG, PNG, and text files</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">or</span>
                    </div>
                    <Button as="label" htmlFor="file-upload">
                      Browse Files
                      <input
                        id="file-upload"
                        type="file"
                        className="sr-only"
                        accept=".pdf,.jpg,.jpeg,.png,.txt"
                        onChange={handleFileChange}
                      />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Analyzing Report</CardTitle>
                <CardDescription>{analyzing ? "Extracting medical data..." : "Analysis complete"}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                  <FileText className="h-8 w-8 text-blue-500" />
                  <div className="flex-1">
                    <div className="font-medium">{uploadedFile.name}</div>
                    <div className="text-xs text-gray-500">{(uploadedFile.size / 1024).toFixed(2)} KB</div>
                  </div>
                </div>

                {analyzing && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Analyzing document</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} />
                  </div>
                )}

                {analysisComplete && (
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-100 rounded-md flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-800">Analysis Complete</h4>
                        <p className="text-sm text-green-700">
                          We've successfully analyzed your medical report and extracted key information.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Health Summary</h4>

                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="p-3 border rounded-md">
                          <div className="text-sm font-medium text-gray-500">Cholesterol</div>
                          <div className="text-lg font-medium">195 mg/dL</div>
                          <div className="text-xs text-green-600">Normal range</div>
                        </div>

                        <div className="p-3 border rounded-md">
                          <div className="text-sm font-medium text-gray-500">Blood Pressure</div>
                          <div className="text-lg font-medium">128/82 mmHg</div>
                          <div className="text-xs text-yellow-600">Slightly elevated</div>
                        </div>

                        <div className="p-3 border rounded-md">
                          <div className="text-sm font-medium text-gray-500">Blood Glucose</div>
                          <div className="text-lg font-medium">102 mg/dL</div>
                          <div className="text-xs text-yellow-600">Pre-diabetic range</div>
                        </div>

                        <div className="p-3 border rounded-md">
                          <div className="text-sm font-medium text-gray-500">BMI</div>
                          <div className="text-lg font-medium">26.4</div>
                          <div className="text-xs text-yellow-600">Overweight</div>
                        </div>
                      </div>

                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium mb-2">AI Recommendations</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-blue-700 text-xs">1</span>
                            </div>
                            <span>Consider lifestyle changes to address slightly elevated blood pressure</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-blue-700 text-xs">2</span>
                            </div>
                            <span>Monitor blood glucose levels; consider follow-up with endocrinologist</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-blue-700 text-xs">3</span>
                            </div>
                            <span>Recommended tests: HbA1c to assess long-term glucose control</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={resetUpload}>
                  Upload Another
                </Button>
                {analysisComplete && (
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Eye className="mr-2 h-4 w-4" />
                      Send to Doctor
                    </Button>
                    <Button>
                      <Download className="mr-2 h-4 w-4" />
                      Download Report
                    </Button>
                  </div>
                )}
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="previous">
          <Card>
            <CardHeader>
              <CardTitle>Previous Reports</CardTitle>
              <CardDescription>Access and review your previously analyzed medical reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {previousReports.map((report) => (
                  <div key={report.id} className="flex items-center gap-3 p-3 border rounded-md hover:bg-gray-50">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <div className="flex-1">
                      <div className="font-medium">{report.name}</div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>Analyzed on {new Date(report.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

