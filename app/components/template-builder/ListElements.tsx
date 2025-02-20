import { useState } from "react";
import componentsMap from "../elements";  
import Popover from "../Popover";
import { CircleHelp } from "lucide-react";

export default function ListElements() {
  const [filter, setFilter] = useState("");
  
  const filteredComponents = Object.values(componentsMap).filter(component =>
    component.name.toLowerCase().includes(filter.toLowerCase())
  );

  return <div>
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search elements..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
      />
    </div>
    { filteredComponents.map((component) => {
      return <div key={component.name} className="flex items-center gap-3 p-3 mb-2 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
        <div className="w-8 h-8 flex items-center justify-center text-gray-600">
          {component.icon}
        </div>
        <span className="text-sm text-gray-700 font-medium">
          {component.name}
        </span>
        <div className="ml-auto">
          <Popover
            trigger={
              <div className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600">
                <CircleHelp />
              </div>
            }
            content={
              <div className="max-w-xs">
                <p className="text-sm text-gray-600">{component.description}</p>
              </div>
            }
            placement="top-center"
          />
        </div>
      </div>;
    }) }
  </div>;
}