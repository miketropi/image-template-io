import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { GripVertical } from 'lucide-react';
import { CSS } from '@dnd-kit/utilities';

type TreeElementsProps = {
  elements: unknown[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (elements: any[]) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SortableTreeItem({ id, element, depth }: { id: string, element: any, depth: number }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    marginLeft: `${depth * 24}px`,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-2 bg-white rounded-md border border-gray-200 hover:border-gray-300 transition-colors"
    >
      <div className="flex items-center gap-2">
        <button {...attributes} {...listeners} className="cursor-grab hover:text-gray-700">
          <GripVertical className="h-4 w-4 text-gray-400" />
        </button>
        <span className="text-sm font-medium">{element.element}</span>
      </div>
      
      {element.isContainer && element.props.childrenData && (
        <div className="pl-4 mt-2 space-y-2 w-full">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {element.props.childrenData.map((child: any) => (
            <SortableTreeItem
              key={child.__id}
              id={child.__id}
              element={child}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function TreeElements({ elements, onUpdate }: TreeElementsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const flattenTree = (items: any[]): any[] => {
    return items.reduce((flat, item) => {
      const flatChildren = item.props.childrenData 
        ? flattenTree(item.props.childrenData)
        : [];
      return [...flat, item.__id, ...flatChildren];
    }, []);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const findItemById = (items: any[], id: string): any => {
    for (const item of items) {
      if (item.__id === id) return item;
      if (item.props.childrenData) {
        const found = findItemById(item.props.childrenData, id);
        if (found) return found;
      }
    }
    return null;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const removeItem = (items: any[], id: string): any[] => {
    return items.filter(item => {
      if (item.__id === id) return false;
      if (item.props.childrenData) {
        item.props.childrenData = removeItem(item.props.childrenData, id);
      }
      return true;
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addItemToContainer = (items: any[], containerId: string, newItem: any): any[] => {
    return items.map(item => {
      if (item.__id === containerId) {
        if (!item.isContainer) return item;
        return {
          ...item,
          props: {
            ...item.props,
            childrenData: [...(item.props.childrenData || []), newItem]
          }
        };
      }
      if (item.props.childrenData) {
        return {
          ...item,
          props: {
            ...item.props,
            childrenData: addItemToContainer(item.props.childrenData, containerId, newItem)
          }
        };
      }
      return item;
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragStart = (event: any) => {
    const { active } = event;
    setActiveId(active.id);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (!over) return;

    if (active.id !== over.id) {
      const activeItem = findItemById(elements, active.id);
      
      // Don't allow dropping into different levels
      const activeParentId = elements.find(item => 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        item.props.childrenData?.some((child: any) => child.__id === active.id)
      )?.__id;
      
      const overParentId = elements.find(item =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        item.props.childrenData?.some((child: any) => child.__id === over.id) 
      )?.__id;

      if (activeParentId !== overParentId) return;

      let newElements = removeItem(elements, active.id);
      newElements = addItemToContainer(newElements, overParentId || 'root', activeItem);

      onUpdate(newElements);
    }
    
    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={flattenTree(elements)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {elements.map((element) => (
            <SortableTreeItem
              key={element.__id}
              id={element.__id}
              element={element}
              depth={0}
            />
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeId ? (
          <div className="bg-white p-2 rounded-md border border-gray-200 shadow-lg">
            <span className="text-sm font-medium">
              {findItemById(elements, activeId)?.element}
            </span>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}






