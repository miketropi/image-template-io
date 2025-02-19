import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

/**
 * @swagger
 * /api/templates/items:
 *   get:
 *     summary: Get all templates
 *     description: Retrieves all templates for the authenticated user
 *     tags:
 *       - Templates
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of templates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   template_data:
 *                     type: object
 *                   status:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // console.log(cookies ?? null)
    // const authHeader = request.headers.get('Authorization'); 
    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }
    // const token = authHeader.split(' ')[1];
    // const { data: { user }, error } = await supabase.auth.getUser(token);
    // if (error || !user) {
    //   return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    // }

    const { data, error: dataError } = await supabase
      .from('templates')
      .select('*')
      .eq('user_id', user.id);

    if (dataError) throw dataError;

    return NextResponse.json(data);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
