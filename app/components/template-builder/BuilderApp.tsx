import DynamicLoader from "./DynamicLoader";
import { useTemplateBuilderStore } from "@/lib/store/useTemplateBuilderStore";
import SelectDefaultTemplate from "./SelectDefaultTemplate";
import TextField from "../fields/TextField";
import SelectField from "../fields/SelectField";
import TextAreaField from "../fields/TextAreaField";
import Button from "../Button";
import { Save } from "lucide-react";

export default function BuilderApp() {
  const { elements, templateData, setTemplateData, onSaveTemplate } = useTemplateBuilderStore();
  return <div>
    <div className="grid grid-cols-12 gap-8 mt-8">

      {/* Right Column - 70% */}
      <div className="col-span-9 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Canvas</h2>
        {/* Canvas content will go here */}
        {
          (() => {
            if (elements.length === 0) {
              return <SelectDefaultTemplate />;
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return <DynamicLoader components={ elements as any } />;
          })()
        }
      </div>

      {/* Left Column - 30% */}
      <div className="col-span-3 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Add New Template</h2>
        {/* Settings content will go here */}
        {/* { JSON.stringify(templateData) } */}
        <hr className="my-4" />
        <div className="space-y-4">
          <div>
            <TextField 
              label="Template Name" 
              value={templateData.name} 
              onChange={(value) => setTemplateData({ ...templateData, name: value })} />
          </div>

          <div>
            <SelectField 
              label="Status" 
              value={templateData.status} 
              onChange={(value) => setTemplateData({ ...templateData, status: value })} 
              options={[
                { value: 'draft', label: 'Draft' },
                { value: 'published', label: 'Published' },
                { value: 'archived', label: 'Archived' },
              ]}
            />
          </div>

          <div>
            <TextAreaField 
              label="Description" 
              value={templateData.description} 
              onChange={(value) => setTemplateData({ ...templateData, description: value })} 
            />
          </div>
          <hr className="my-4" />
          <Button icon={ Save } onClick={ async () => {
            console.log("Saving template");
            const { data, error } = await onSaveTemplate();
            console.log(data, error); 
          }}>Save Template</Button>
        </div>
      </div>
    </div>
  </div>;
}