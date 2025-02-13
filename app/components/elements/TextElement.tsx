import { Text as TextIcon } from "lucide-react";

export const explain = {
  name: "Text",
  icon: <TextIcon />,
  description: "Text is a component that displays a text.",
}

export default function TextElement(props: { text: string }) {
  return <div>
    Hello TextElement
    { JSON.stringify(props) }
  </div>;
}