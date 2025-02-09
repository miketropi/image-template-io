interface HeroSectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundColor?: string;
  textAlignment?: 'left' | 'center' | 'right';
}

export default function HeroSection({
  title = "Transform Your Images with AI",
  description = "Create stunning templates and designs in seconds with our AI-powered platform",
  buttonText = "Get Started",
  buttonLink = "#",
  backgroundColor = "bg-gray-50",
  textAlignment = "center"
}: HeroSectionProps) {
  return (
    <section className={`${backgroundColor} py-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-${textAlignment}`}>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl">
            {description}
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <a 
                href={buttonLink}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                {buttonText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}