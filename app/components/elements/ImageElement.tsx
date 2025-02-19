import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";
export const explain = {
  name: "Image",
  icon: <ImageIcon />,
  description: "ImageElement is a component that displays an image.",
}

export default function ImageElement({
  image,
  alt = "",
  width = "auto",
  height = "auto",
  className = "",
  objectFit = "none",
  priority = true,
  align = "center",
  borderRadius = "none",
}: {
  image: string;
  alt?: string;
  width?: number | "auto";
  height?: number | "auto";
  className?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  priority?: boolean;
  align?: "left" | "center" | "right";
  borderRadius?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={image}
        alt={alt}
        width={width === "auto" ? undefined : width}
        height={height === "auto" ? undefined : height}
        style={{
          maxWidth: "100%",
          margin: align === "center" ? "0 auto" : align === "right" ? "0 0 0 auto" : "0"
        }}
        className={`object-${objectFit} rounded-${borderRadius}`}
        priority={priority}
        onError={(e) => {
          e.currentTarget.src = "/error-image.png";
        }}
      />
    </div>
  );
}