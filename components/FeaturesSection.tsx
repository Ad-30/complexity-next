import { Brain, Code, Zap, Network } from 'lucide-react'

const features = [
  {
    icon: <Code className="w-12 h-12 text-cyan-400" />,
    title: "Python Code Analysis",
    description: "Upload Python files or enter code snippets to calculate Cognitive Complexity and generate Control Flow Graphs (CFGs)."
  },
  {
    icon: <Network className="w-12 h-12 text-purple-400" />,
    title: "Interactive CFG Visualization",
    description: "Explore your code’s structure with interactive graphs, showcasing detailed node features and complexity highlights."
  },
  {
    icon: <Zap className="w-12 h-12 text-yellow-400" />,
    title: "Comprehensive Metrics",
    description: "Receive in-depth metrics, including performance data and insights into the most complex sections of your code."
  }
]

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-cyan-400">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-cyan-500/50 transition-shadow duration-300">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

