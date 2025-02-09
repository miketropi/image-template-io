export default function ClientReviews() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">What Our Clients Say</h2>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600">"Amazing platform that saved us countless hours of work."</p>
              <div className="mt-4">
                <p className="text-gray-900 font-semibold">John Doe</p>
                <p className="text-gray-500">CEO, Company Inc</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 