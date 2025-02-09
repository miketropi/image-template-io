export default function PricingTable() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">Simple, Transparent Pricing</h2>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Basic Plan */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900">Basic</h3>
            <p className="mt-4 text-gray-600">Perfect for getting started</p>
            <p className="mt-8">
              <span className="text-4xl font-extrabold text-gray-900">$9</span>
              <span className="text-gray-600">/month</span>
            </p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-center">
                <span className="text-green-700">✓</span>
                <span className="ml-3 text-gray-800">100 templates/month</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-700">✓</span>
                <span className="ml-3 text-gray-800">Basic customization</span>
              </li>
            </ul>
          </div>
          {/* Pro Plan */}
          <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-blue-500">
            <h3 className="text-2xl font-bold text-gray-900">Pro</h3>
            <p className="mt-4 text-gray-600">Most popular choice</p>
            <p className="mt-8">
              <span className="text-4xl font-extrabold text-gray-900">$29</span>
              <span className="text-gray-600">/month</span>
            </p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-center">
                <span className="text-green-700">✓</span>
                <span className="ml-3 text-gray-800">Unlimited templates</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-700">✓</span>
                <span className="ml-3 text-gray-800">Advanced customization</span>
              </li>
            </ul>
          </div>
          {/* Enterprise Plan */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900">Enterprise</h3>
            <p className="mt-4 text-gray-600">For large teams</p>
            <p className="mt-8">
              <span className="text-4xl font-extrabold text-gray-900">$99</span>
              <span className="text-gray-600">/month</span>
            </p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-center">
                <span className="text-green-700">✓</span>
                <span className="ml-3 text-gray-800">Everything in Pro</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-700">✓</span>
                <span className="ml-3 text-gray-800">Priority support</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
} 