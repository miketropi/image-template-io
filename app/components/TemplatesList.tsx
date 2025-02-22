'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Select from './fields/SelectField';

export default function TemplatesList() {
  const [templates, setTemplates] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTemplates() {
      const { data: { user } } = await supabase.auth.getUser(); 
      const { data, error } = await supabase
        .from('templates')
        .select(`*, user:user_id(*)`)
      
      if (error) {
        console.error('Error fetching templates:', error);
        return;
      }

      setTemplates(data || []);
      setIsLoading(false);
    }

    fetchTemplates();
  }, []);

  const filteredTemplates = templates.filter(template => {
    const matchesName = template.name.toLowerCase().includes(nameFilter.toLowerCase());
    const matchesStatus = statusFilter === 'all' || template.status === statusFilter;
    return matchesName && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Templates</h1>
        
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search by name..."
            className="px-4 py-2 border rounded-lg"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
          <Select
            value={statusFilter}
            onChange={(value) => setStatusFilter(value)}
            options={[
              { label: 'All Status', value: 'all' },
              { label: 'Publish', value: 'publish' },
              { label: 'Trash', value: 'trash' },
            ]}
          />
        </div>
      </div>


      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Description</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTemplates.map((template: {
                id: string;
                name: string;
                description: string;
                status: string;
              }) => (
                <tr key={template.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{template.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{template.description}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      template.status === 'publish' 
                        ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20' 
                        : 'bg-gray-50 text-gray-700 ring-1 ring-gray-600/20'
                    }`}>
                      {template.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 border border-gray-200 rounded-md transition-colors">
                        Edit
                      </button>
                      <button className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 border border-red-200 rounded-md transition-colors">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}