export default function AboutSection() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h2 className="text-4xl font-bold mb-6 text-cyan-400">About ComplexiPy</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            ComplexiPy is a cutting-edge software platform that transforms complex Python code into actionable insights. Our mission is to empower developers, educators, and researchers with tools to analyze code, visualize control flow, and optimize algorithms for better performance and maintainability.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <svg className="w-full max-w-md" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#3B82F6" d="M47.1,-57.6C59.9,-45.7,68.5,-29.6,71.7,-12.4C74.8,4.8,72.5,23.1,63.2,36.5C53.9,49.9,37.6,58.5,20.5,63.9C3.3,69.3,-14.7,71.5,-31.1,66.3C-47.5,61.1,-62.4,48.5,-70.3,32.3C-78.2,16,-79.1,-3.9,-72.6,-20.5C-66.1,-37,-52.1,-50.1,-37.3,-61C-22.5,-71.9,-6.9,-80.5,6.8,-78.8C20.4,-77.1,34.3,-69.5,47.1,-57.6Z" transform="translate(100 100)" />
            <text x="50%" y="50%" textAnchor="middle" dy="0.35em" fill="white" fontSize="36" fontWeight="bold" fontFamily="Arial">Py</text>
          </svg>
        </div>
      </div>
    </section>
  )
}

