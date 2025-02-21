import { useTemplateBuilderStore } from "@/lib/store/useTemplateBuilderStore";
import { v4 as uuidv4 } from 'uuid';

export default function SelectDefaultTemplate() {
  const { setElements } = useTemplateBuilderStore();

  const handleSelectTemplate = () => {
    // Set sample elements from the store
    setElements([
      {
        __id: uuidv4(),
        element: "Container",
        isContainer: true,
        props: {
          spacingY: 50,
          spacingX: 50,
          backgroundGradient: {
            from: "#4F46E5",
            to: "#10B981", 
            direction: "bottom right"
          },
          childrenData: [
            {
              __id: uuidv4(),
              element: "TextElement",
              props: {
                text: "Hello, world!",
                fontSize: 24,
                fontWeight: "bold",
                color: "#FFFFFF",
                align: "center",
              }
            }
          ]
        }
      }
    ]);
  };

  const handleStartBlank = () => {
    setElements([
      {
        __id: uuidv4(),
        element: "Container",
        isContainer: true,
        props: {
          spacingY: 50,
          spacingX: 50,
          backgroundGradient: {
            from: "#4F46E5",
            to: "#10B981",  
            direction: "bottom right"
          },
          childrenData: []
        }
      }
    ]);
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[400px]">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">Choose how to start</h2>
      
      <div className="flex gap-4">
        <button
          onClick={handleSelectTemplate}
          className="w-64 p-4 bg-white border-2 border-indigo-500 rounded-lg hover:bg-indigo-50 transition-colors"
        >
          <div className="text-lg font-medium text-indigo-600">Use Template</div>
          <div className="text-sm text-gray-500 mt-1">Start with our pre-built template</div>
        </button>

        <button
          onClick={handleStartBlank}
          className="w-64 p-4 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="text-lg font-medium text-gray-700">Start Blank Container</div>
          <div className="text-sm text-gray-500 mt-1">Begin with an empty canvas</div>
        </button>
      </div>
    </div>
  );
}
