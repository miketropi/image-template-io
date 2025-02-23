import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import TemplatesList from '@/app/components/TemplatesList';

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });

  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/auth/login');
  }

  const { data: templates } = await supabase
    .from('templates')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  return (
    <div className=" py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-bold text-gray-800 pt-4">Dashboard</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Total Templates</h3>
            <p className="text-3xl font-bold text-gray-900">{templates?.length || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Published</h3>
            <p className="text-3xl font-bold text-gray-900">
              {templates?.filter(t => t.status === 'published').length || 0}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Drafts</h3>
            <p className="text-3xl font-bold text-gray-900">
              {templates?.filter(t => t.status === 'draft').length || 0}
            </p>
          </div>
        </div>

        {/* Templates List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Templates</h2>
          </div>
          {templates && templates.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {templates.map((template) => (
                <div key={template.id} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
                    <p className="text-sm text-gray-500">
                      Created on {new Date(template.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 text-sm rounded ${
                      template.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {template.status}
                    </span>
                    <Link
                      href={`/templates/${template.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-8 text-gray-500">
              {/* <p>No templates yet. Create your first template to get started!</p> */}
              <TemplatesList />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
