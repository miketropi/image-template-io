import componentsMap from "../elements";

type ComponentsConfig = {
  element: "TextElement" | "ImageElement" | "BrowserContainer" | "Code" | "VSCodeContainer" | "MessageSimulate" | "CustomerTestimonialSimulate" | "Container" | "Avatar" | "Space" | "LetterSimulation";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any
}

export default function DynamicLoader({ components }: { components: ComponentsConfig[] }) {
  return <>
    { components.map((component, index) => {
      const Component = componentsMap[component.element].component;
      return <Component key={index} {...component.props} />;
    }) }
  </>
}