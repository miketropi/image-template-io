import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

/**
 * @swagger
 * /api/templates:
 *   post:
 *     summary: Create a new template
 *     description: Creates a new template for the authenticated user
 *     tags:
 *       - Templates
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               template_data:
 *                 type: object
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Template created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

export async function POST(req: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, description, template_data, status } = body;

    const { data, error } = await supabase
      .from('templates')
      .insert([
        {
          user_id: user.id,
          name,
          description,
          template_data,
          status
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}