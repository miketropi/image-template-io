import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { supabase } from '../supabase';

type TemplateBuilderState = {
  mode: "builder" | "preview";
  
  templateData: {
    id: string;
    name: string;
    description: string;
    status: string;
    elements: unknown[];
    [key: string]: unknown;
  };
  elements: unknown[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setTemplateData: (templateData: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addElement: (parentID: string, element: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setElements: (elements: any[]) => void; 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSaveTemplate: () => Promise<{ data?: object | undefined, error?: object | undefined }>;
}; 

export const useTemplateBuilderStore = create<TemplateBuilderState>()(
  immer((set, get) => ({
    mode: "builder",
    templateData: {
      id: '',
      name: 'New Template',
      status: 'public',
      description: '',
      elements: [],
    },
    elements: [],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setMode: (mode: "builder" | "preview") => set({ mode }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setTemplateData: (templateData: any) => set({ templateData }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setElements: (elements: any[]) => set({ elements }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addElement: (parentID: string, element: unknown) => set((state) => {
      const findParentAndAddElement = (elements: unknown[], parentID: string, element: unknown): boolean => {
        for (const el of elements) {
          if (el.__id === parentID) {
            if (!el.props.childrenData) {
              el.props.childrenData = [];
            }
            el.props.childrenData.push(element);
            return true;
          }
          if (el.props.childrenData) {
            if (findParentAndAddElement(el.props.childrenData, parentID, element)) {
              return true;
            }
          }
        }
        return false;
      };
      findParentAndAddElement(state.elements, parentID, element);
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSaveTemplate: async () => { 
      const { data: { user } } = await supabase.auth.getUser();
      const Data = {
        user_id: user?.id,
        name: get().templateData.name,
        description: get().templateData.description,
        status: get().templateData.status,
        template_data: get().elements
      };

      const { data, error } = await supabase
        .from('templates')
        .insert([Data])
        .select();

      return { 
        data: data?.[0] as object | undefined, 
        error: error as object | undefined 
      };
    },
  }))
);
