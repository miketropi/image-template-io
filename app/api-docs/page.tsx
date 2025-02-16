"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css"; // ✅ Import CSS

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function SwaggerPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [spec, setSpec] = useState<any>(null); 

  useEffect(() => {
    fetch("/api/swagger")
      .then((res) => res.json())
      .then((data) => setSpec(data));
  }, []);

  if (!spec) return <p>Loading Swagger...</p>;

  return <SwaggerUI spec={spec} />;
}
