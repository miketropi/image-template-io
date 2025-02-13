import { Image as ImageIcon } from "lucide-react";

export const explain = {
  name: "Image",
  icon: <ImageIcon />,
  description: "ImageElement is a component that displays an image.",
}

export default function ImageElement(props: { image: string }) {
  return <div>
    Hello ImageElement
    { JSON.stringify(props) }
  </div>;
}