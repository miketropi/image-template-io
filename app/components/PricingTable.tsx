interface PricingPlan {
  name: string;
  description: string;
  price: number;
  features: string[];
  isPopular?: boolean;
}

interface PricingTableProps {
  title?: string;
  plans?: PricingPlan[];
}

export default function PricingTable({
  title = "Simple, Transparent Pricing",
  plans = [
    {
      name: "Basic",
      description: "Perfect for getting started",
      price: 9,
      features: [
        "100 templates/month",
        "Basic customization"
      ]
    },
    {
      name: "Pro", 
      description: "Most popular choice",
      price: 29,
      features: [
        "Unlimited templates",
        "Advanced customization"
      ],
      isPopular: true
    },
    {
      name: "Enterprise",
      description: "For large teams", 
      price: 59,
      features: [
        "Everything in Pro",
        "Priority support"
      ]
    }
  ]
}: PricingTableProps) {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">{title}</h2>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-white p-8 rounded-lg shadow-lg ${
                plan.isPopular ? 'border-2 border-blue-500' : ''
              }`}
            >
              <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
              <p className="mt-4 text-gray-600">{plan.description}</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
                <span className="text-gray-600">/month</span>
              </p>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <span className="text-green-700">✓</span>
                    <span className="ml-3 text-gray-800">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}