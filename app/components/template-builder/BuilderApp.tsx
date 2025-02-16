import DynamicLoader from "./DynamicLoader";
import ListElements from "./ListElements";
export default function BuilderApp() {
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
              image: "https://placehold.co/600x400/000000/FFF",
            }
          },
          {
            element: "BrowserContainer",
            props: {
              url: "https://image-template-io.vercel.app",
              childrenData: [
                {
                  element: "Code",
                  props: {
                    code: `const sum = (a, b) => a + b;
console.log(sum(2, 3)); // 5`,
                    language: "javascript"
                  }
                } 
              ],
            }
          },
          {
            element: "VSCodeContainer",
            props: {
              fileName: "index.tsx",
              childrenData: [
                {
                  element: "Code",
                  props: {
                    code: `const sum = (a, b) => a + b;
console.log(sum(2, 3)); // 5`,
                    language: "javascript"
                  }
                }
              ],
            }
          },
          {
            element: "MessageSimulate",
            props: {
              userAvatar: "https://i.pinimg.com/736x/0b/97/6f/0b976f0a7aa1aa43870e1812eee5a55d.jpg",
              otherAvatar: "https://i.pinimg.com/736x/8c/6d/db/8c6ddb5fe6600fcc4b183cb2ee228eb7.jpg",
              otherName: "John Doe",
              otherStatus: "Active now",
              initialMessages: [
                {
                  text: "Hello, how are you?",
                  sender: "user",
                  timestamp: new Date()
                }, 
                {
                  text: "I'm fine, thank you!",
                  sender: "other",
                  timestamp: new Date()
                },
                {
                  text: "What's your name?",
                  sender: "user",
                  timestamp: new Date()
                },
                {
                  text: "My name is John Doe",
                  sender: "other",
                  timestamp: new Date()
                }
              ]
            }
          },
          {
            element: "CustomerTestimonialSimulate",
            props: {
              initialTestimonials: [
                {
                  customerName: "John Doe",
                  customerRole: "Software Engineer",
                  customerAvatar: "https://i.pinimg.com/736x/0b/97/6f/0b976f0a7aa1aa43870e1812eee5a55d.jpg",
                  rating: 5,
                  comment: "This product has completely transformed how we handle our marketing campaigns. Highly recommended!",
                  date: new Date()
                },
                {
                  customerName: "Jane Doe",
                  customerRole: "Marketing Director",
                  customerAvatar: "https://i.pinimg.com/736x/8c/6d/db/8c6ddb5fe6600fcc4b183cb2ee228eb7.jpg",
                  rating: 4,
                  comment: "Great user experience and excellent customer support. Would definitely use again.",
                  date: new Date()
                }
              ]
            }
          },
          {
            element: "Container",
            props: {
              spacingY: 50,
              spacingX: 50,
              backgroundGradient: {
                from: "#8B5CF6",
                to: "#EC4899",
                direction: "top right"
              },
              childrenData: [
                // { element: "TextElement", props: { text: "Hello Container" } },
                // { element: "ImageElement", props: { image: "https://placehold.co/600x400/000000/FFF" } },
                // { element: "BrowserContainer", props: { url: "https://image-template-io.vercel.app" } },
                { element: "VSCodeContainer", props: { 
                  fileName: "index.tsx" ,
                  backgroundColor: "bg-white",
                  childrenData: [
                    { element: "Code", props: { 
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
                { element: "Space", props: { height: 20 } },
                { element: "Avatar", props: { 
                  image: "https://i.pinimg.com/736x/0b/97/6f/0b976f0a7aa1aa43870e1812eee5a55d.jpg",
                  name: "John Doe",
                  position: "Software Engineer",
                  align: "center",
                  nameColor: "text-white",
                  positionColor: "text-white"
                } },
                // { element: "MessageSimulate", props: { userAvatar: "https://i.pinimg.com/736x/0b/97/6f/0b976f0a7aa1aa43870e1812eee5a55d.jpg", otherAvatar: "https://i.pinimg.com/736x/8c/6d/db/8c6ddb5fe6600fcc4b183cb2ee228eb7.jpg", otherName: "John Doe", otherStatus: "Active now" } },
                // { element: "CustomerTestimonialSimulate", props: { initialTestimonials: [
                //   {
                //     customerName: "John Doe",
                //     customerRole: "Software Engineer",
                //     customerAvatar: "https://i.pinimg.com/736x/0b/97/6f/0b976f0a7aa1aa43870e1812eee5a55d.jpg",
                //     rating: 5,
                //     comment: "This product has completely transformed how we handle our marketing campaigns. Highly recommended!",
                //     date: new Date()
                //   }
                // ] } }
              ]
            }
          }
        ] } />
      </div>
    </div>
  </div>;
}