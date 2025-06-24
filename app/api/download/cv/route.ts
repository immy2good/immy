import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  // Get the actual file path
  const filePath = path.join(process.cwd(), 'public', 'cv', 'Yousafzai_PM_SE_CV_21_June_2025-V3.pdf');
  
  try {
    // Check if file exists
    const fileExists = fs.existsSync(filePath);
    
    if (!fileExists) {
      return new NextResponse('File not found', { status: 404 });
    }
    
    // Read the file
    const fileBuffer = fs.readFileSync(filePath);
    
    // Create response with appropriate headers
    const response = new NextResponse(fileBuffer);
    
    // Set headers
    response.headers.set('Content-Type', 'application/pdf');
    response.headers.set('Content-Disposition', 'attachment; filename="Yousafzai_CV.pdf"');
    
    return response;
  } catch (error) {
    console.error('Error serving CV:', error);
    return new NextResponse('Error serving file', { status: 500 });
  }
}
