import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    // Get the actual file path
    const filePath = path.join(process.cwd(), 'public', 'cv', 'cv.pdf');
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error('CV file not found at:', filePath);
      return new NextResponse('Resume file not found', { 
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        }
      });
    }
    
    // Get file stats for headers
    const stats = fs.statSync(filePath);
    
    // Read the file
    const fileBuffer = fs.readFileSync(filePath);
    
    // Create response with appropriate headers
    const response = new NextResponse(fileBuffer);
    
    // Set comprehensive headers
    response.headers.set('Content-Type', 'application/pdf');
    response.headers.set('Content-Disposition', 'attachment; filename="Yousafzai_Resume.pdf"');
    response.headers.set('Content-Length', stats.size.toString());
    response.headers.set('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    response.headers.set('Last-Modified', stats.mtime.toUTCString());
    
    return response;
  } catch (error) {
    console.error('Error serving CV:', error);
    return new NextResponse('Internal server error while serving resume file', { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
}
