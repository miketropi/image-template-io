
import { NextResponse } from "next/server";
import { createSwaggerSpec } from "next-swagger-doc";
import { swaggerConfig } from "@/lib/swagger";

export async function GET() {
  const spec = createSwaggerSpec({
    apiFolder: "app/api", // Scan API routes
    definition: swaggerConfig,
  });

  return NextResponse.json(spec);
}
