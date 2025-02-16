import componentsMap from "../elements";

type ComponentsConfig = {
  element: "TextElement" | "ImageElement" | "BrowserContainer" | "Code" | "VSCodeContainer" | "MessageSimulate" | "CustomerTestimonialSimulate" | "Container" | "Avatar" | "Space";
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