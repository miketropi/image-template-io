import Button from "../Button";
import { PlusIcon } from "lucide-react";
import Popover from "../Popover";
import { useTemplateBuilderStore } from "@/lib/store/useTemplateBuilderStore";
import { v4 as uuidv4 } from 'uuid';
import ElementsSelectGrid from "./ElementsSelectGrid";

export default function AddElement({ parentID }: { parentID: string }) {
  const { addElement } = useTemplateBuilderStore();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-center p-5 mt-4 rounded-lg bg-[rgba(1,1,1,0.1)]">
        <Popover 
          placement="bottom-center" 
          trigger={<Button icon={PlusIcon} iconPosition="left" variant="primary">Add Element</Button>} 
          content={<div>
            <ElementsSelectGrid onSelect={(element) => {
              addElement(parentID, {
                __id: uuidv4(),
                element: element.component.name,
                props: {
                  ...element.propsDefault,
                }
              });
            }} />
          </div>} />
      </div>
    </div>
  );
}