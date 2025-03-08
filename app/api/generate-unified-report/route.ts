import { NextResponse } from 'next/server'
import PDFDocument from 'pdfkit'

export async function POST(request: Request) {
  try {
    const analysisData = await request.json()
    
    // Create PDF
    const doc = new PDFDocument()
    let buffers: any[] = []
    doc.on('data', buffers.push.bind(buffers))
    
    // Add content to PDF
    doc.fontSize(20).text('Medical Report Analysis', { align: 'center' })
    doc.moveDown()
    
    // Add metrics
    Object.entries(analysisData.metrics).forEach(([key, value]) => {
      doc.fontSize(12).text(`${key}: ${value}`)
    })
    
    doc.moveDown()
    doc.fontSize(14).text('Recommendations:')
    analysisData.recommendations.forEach((rec: string, index: number) => {
      doc.fontSize(12).text(`${index + 1}. ${rec}`)
    })
    
    doc.end()

    // Convert to blob
    const pdfBuffer = Buffer.concat(buffers)
    
    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=medical-report.pdf'
      }
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json(
      { error: 'Failed to generate report' },
      { status: 500 }
    )
  }
}