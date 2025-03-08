export const uploadMedicalReport = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await fetch('/api/upload-medical-report', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Upload failed')
    }

    return await response.json()
  } catch (error) {
    console.error('Error uploading report:', error)
    throw error
  }
}

export const generateUnifiedReport = async (analysisData: any) => {
  try {
    const response = await fetch('/api/generate-unified-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(analysisData),
    })

    if (!response.ok) {
      throw new Error('Failed to generate report')
    }

    return await response.blob()
  } catch (error) {
    console.error('Error generating report:', error)
    throw error
  }
}