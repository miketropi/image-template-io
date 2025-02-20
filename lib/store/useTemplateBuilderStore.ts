import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuidv4 } from 'uuid';

type TemplateBuilderState = {
  mode: "builder" | "preview";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  templateData: {
    id: string;
    name: string;
    description: string;
    status: string;
    elements: any[];
    [key: string]: any;
  };
  elements: any[];
  setTemplateData: (templateData: any) => void;
  addElement: (parentID: string, element: any) => void;
  setElements: (elements: any[]) => void; 
}; 

const sampleElement = [
  {
    __id: uuidv4(),
    element: "Container",
    isContainer: true,
    props: {
      spacingY: 50,
      spacingX: 50,
      backgroundGradient: {
        from: "#4F46E5", // Indigo
        to: "#10B981", // Emerald
        direction: "bottom right"
      },
      childrenData: [
        {
          __id: uuidv4(),
          element: "MessageSimulate",
          props: {
            initialMessages: [
              {
                id: 1,
                text: "Hi there! I'm your AI assistant. How can I help you today? 👋",
                sender: "other",
                timestamp: new Date('2024-01-10T10:00:00')
              },
              {
                id: 2,
                text: "I need help setting up authentication in my app",
                sender: "user", 
                timestamp: new Date('2024-01-10T10:01:00')
              },
              {
                id: 3,
                text: "I can definitely help with that! Supabase provides an easy-to-use auth system. Would you like to see some example code?",
                sender: "other",
                timestamp: new Date('2024-01-10T10:02:00')
              }
            ],
            otherName: "AI Assistant",
            otherStatus: "Online",
            userMessageColor: "bg-blue-600",
            otherMessageColor: "bg-gray-100",
            messageContainerHeight: "h-80",
            containerClassName: "w-full max-w-2xl mx-auto",
            userAvatar: "https://i.pinimg.com/736x/0b/97/6f/0b976f0a7aa1aa43870e1812eee5a55d.jpg",
            otherAvatar: "https://i.pinimg.com/736x/0b/97/6f/0b976f0a7aa1aa43870e1812eee5a55d.jpg",
          }
        },
      ]
    }
  },
  {
    __id: uuidv4(),
    element: "Container",
    isContainer: true,
    props: {
      spacingY: 50,
      spacingX: 50,
      backgroundGradient: {
        from: "#8B5CF6",
        to: "#EC4899",
        direction: "top right"
      },
      childrenData: [
        { __id: uuidv4(), 
          element: "VSCodeContainer", 
          isContainer: true,
          props: {  
          fileName: "index.tsx" ,
          backgroundColor: "bg-white",
          childrenData: [
            { __id: uuidv4(), element: "Code", props: { 
              code: `import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  'your-project-url',
  'your-anon-key'
)

// Sign up new user
const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })
  if (error) console.error('Error signing up:', error.message)
  return data
}

// Sign in existing user
const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  if (error) console.error('Error signing in:', error.message)
  return data
}

// Sign out user
const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) console.error('Error signing out:', error.message)
}`, 
              language: "javascript"
            } }
          ]
        } },
        { __id: uuidv4(), element: "Space", props: { height: 20 } },
        { __id: uuidv4(), element: "Avatar", props: { 
          image: "https://i.pinimg.com/736x/0b/97/6f/0b976f0a7aa1aa43870e1812eee5a55d.jpg",
          name: "John Doe",
          position: "Software Engineer",
          align: "center",
          nameColor: "text-white",
          positionColor: "text-white"
        } },
      ]
    }
  }
]

export const useTemplateBuilderStore = create<TemplateBuilderState>()(
  immer((set) => ({
    mode: "builder",
    templateData: {
      id: '',
      name: 'New Template',
      status: 'public',
      description: '',
      elements: [],
    },
    elements: [],
    setMode: (mode: "builder" | "preview") => set({ mode }),
    setTemplateData: (templateData: any) => set({ templateData }),
    setElements: (elements: any[]) => set({ elements }),
    addElement: (parentID: string, element: any) => set((state) => {
      const findParentAndAddElement = (elements: any[], parentID: string, element: any): boolean => {
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
    
  }))
);
