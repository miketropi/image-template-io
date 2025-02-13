import { useTemplateBuilderStore } from "@/lib/store/useTemplateBuilderStore";
import DynamicLoader from "./DynamicLoader";
import ListElements from "./ListElements";
export default function BuilderApp() {
  const { name, setName } = useTemplateBuilderStore();
  return <div>
    <div className="grid grid-cols-12 gap-8 mt-8">
      {/* Left Column - 30% */}
      <div className="col-span-3 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Elements</h2>
        {/* Settings content will go here */}
        <ListElements />
      </div>

      {/* Right Column - 70% */}
      <div className="col-span-9 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Canvas</h2>
        {/* Canvas content will go here */}
        <DynamicLoader components={ [
          {
            element: "TextElement",
            props: {
              text: "Hello TextElement",
            }
          },
          {
            element: "ImageElement",
            props: {
              image: "https://via.placeholder.com/150",
            }
          }
        ] } />
      </div>
    </div>
  </div>;
}