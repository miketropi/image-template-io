import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import sharp from 'sharp';
import path from 'path';

/**
 * @swagger
 * /api/export-image:
 *   get:
 *     summary: Captures screenshot of a webpage and adds watermark
 *     description: Takes a URL parameter, captures the webpage screenshot using Puppeteer, adds a watermark and returns the image
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         schema:
 *           type: string
 *         description: The URL of the webpage to capture
 *     responses:
 *       200:
 *         description: Successfully captured and processed image
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Missing URL parameter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing URL parameter"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to capture URL"
 */
export async function GET(req: Request) {
  try {
    // get URL from query params
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json({ error: "Missing URL parameter" }, { status: 400 });
    }

    // Open browser with Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Open web
    await page.goto(url, { waitUntil: "networkidle2" });

    // Screenshot
    const imageBuffer = await page.screenshot({ type: "png", fullPage: true });

    // Close browser
    await browser.close();

    // Resize watermark
    const watermarkBuffer = await sharp(path.join(process.cwd(), 'public', 'image-template-io-watermark.png'))
      .resize(120)
      .toBuffer();

    // Composite watermark
    const finalImage = await sharp(imageBuffer) 
      .composite([{
        input: watermarkBuffer,
        gravity: 'southeast'
      }])
      .toBuffer();

    return new Response(finalImage, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": "inline; filename=preview.png",
      },
    });
  } catch (error) {
    console.error("Error capturing URL:", error);
    return NextResponse.json({ error: "Failed to capture URL" }, { status: 500 });
  }
}
