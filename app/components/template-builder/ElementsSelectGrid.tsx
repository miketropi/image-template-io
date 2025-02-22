import mapElements from "../elements";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ElementsSelectGrid({ onSelect }: { onSelect: (element: any) => void }) {
  const [filter, setFilter] = useState("");

  const filteredComponents = Object.values(mapElements).filter(component =>
    component.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search elements..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200" 
        />
      </div>
      <div className="grid grid-cols-5 gap-4">
        {filteredComponents.map((component) => (
          <div
            key={component.name}
            className="aspect-square flex items-center justify-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="w-8 h-8 flex items-center justify-center text-gray-600">
              <div onClick={() => onSelect(component)} className="flex flex-col items-center justify-center" title={component.name}>
                {component.icon}
                <span className="text-xs whitespace-nowrap w-11 overflow-hidden text-ellipsis">{ component.name }</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}