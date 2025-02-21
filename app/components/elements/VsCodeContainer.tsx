"use client";

import { Code as CodeIcon } from "lucide-react";
import DynamicLoader from "../template-builder/DynamicLoader";
import { v4 as uuidv4 } from 'uuid';
interface VSCodeContainerProps {
  children?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  childrenData?: any;
  fileName?: string;
}

export const explain = {
  name: "VS Code",
  icon: <CodeIcon />,
  description: "A VS Code-like editor container with file tabs and activity bar.",
  isContainer: true,
  propsDefault: {
    fileName: "untitled.tsx",
    childrenData: [
      {
        __id: uuidv4(),
        element: "Code",
        props: {
          code: "console.log('Hello, world!');",
          language: "javascript",
          showLineNumbers: true
        }
      }
    ]
  }
}

export default function VSCodeContainer({ children, childrenData, fileName = "untitled.tsx" }: VSCodeContainerProps) {

  return (
    <div className="w-full rounded-lg shadow-lg bg-[#1e1e1e] overflow-hidden">
      {/* Activity Bar */}
      <div className="flex">
        

        <div className="flex-1">
          {/* Tab Bar */}
          <div className="bg-[#252526] px-2 flex items-center border-b border-[#1e1e1e]">
            <div 
              className="px-3 py-2 text-gray-300 text-sm flex items-center gap-2 bg-[#1e1e1e]"
              role="button"
            >
              <CodeIcon size={16} />
              {fileName}
            </div>
          </div>

          {/* Editor Content */}
          <div className="p-4 text-gray-300 font-mono text-sm">
            <div>
              {children}
              {childrenData && <DynamicLoader components={childrenData} />}
            </div>
          </div>
        </div>

        {/* Minimap (optional) */}
        <div className="w-[60px] bg-[#1e1e1e] border-l border-[#333333]"></div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#007acc] text-white px-4 py-1 text-xs flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span>UTF-8</span>
          <span>{fileName.split('.').pop()?.toUpperCase()}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Ln 1, Col 1</span>
          <span>Spaces: 2</span>
        </div>
      </div>
    </div>
  );
}
