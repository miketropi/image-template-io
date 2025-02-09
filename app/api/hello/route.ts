import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: Returns a greeting message
 *     description: Simple API that returns "Hello World!"
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hello World!"
 */
export async function GET() {
  return NextResponse.json({ message: "Hello World!" });
}
