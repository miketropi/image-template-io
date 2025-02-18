import { useEffect } from "react";
import { Text as TextIcon } from "lucide-react";
import WebFont from 'webfontloader';

export const explain = {
  name: "Text",
  icon: <TextIcon />,
  description: "Text is a component that displays a text.",
}

export default function TextElement({
  text,
  align = 'left',
  fontStyle = 'normal',
  fontFamily = 'Inconsolata',
  fontSize = '16px',
  fontWeight = 'normal',
  color = 'black'
}: {
  text: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  fontStyle?: 'normal' | 'italic';
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  color?: string;
}) {

  useEffect(() => {
    WebFont.load({
      google: {
        families: [ fontFamily ]
      }
    });
  }, []);

  return (
    <div
      style={{
        textAlign: align,
        fontStyle,
        fontFamily: `'${fontFamily}', sans-serif`,
        fontSize,
        fontWeight,
        color
      }}
    >
      {text}
    </div>
  );
}