'use client';
import BuilderApp from "@/app/components/template-builder/BuilderApp";

export default function NewPage() {
  return <div className="min-h-screen bg-gray-50 py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900">New Template</h1>
      <BuilderApp />
    </div>
  </div>;
}
