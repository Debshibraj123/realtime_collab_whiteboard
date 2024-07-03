import Link from "next/link";
import { ArrowRight, Layers, Users, Zap, Check } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Welcome to Your Collaborative Workspace
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Visualize, collaborate, and create like never before.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/signup"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
            >
              Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/demo"
              className="bg-white text-purple-600 font-bold py-3 px-6 rounded-full border-2 border-purple-600 hover:bg-purple-100 transition duration-300 ease-in-out transform hover:scale-105"
            >
              See Demo
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-md transform transition duration-300 hover:scale-105">
            <Layers className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Infinite Canvas</h3>
            <p className="text-gray-600">
              Unleash your creativity with our boundless digital workspace.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md transform transition duration-300 hover:scale-105">
            <Users className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Real-time Collaboration</h3>
            <p className="text-gray-600">
              Work together seamlessly with your team, anywhere, anytime.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md transform transition duration-300 hover:scale-105">
            <Zap className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Powerful Integrations</h3>
            <p className="text-gray-600">
              Connect with your favorite tools to supercharge your workflow.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Why Choose Our Platform?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <Check className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
              <p className="text-gray-600">Intuitive drag-and-drop interface for easy board creation</p>
            </div>
            <div className="flex items-start">
              <Check className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
              <p className="text-gray-600">Advanced sharing and permission settings for secure collaboration</p>
            </div>
            <div className="flex items-start">
              <Check className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
              <p className="text-gray-600">Customizable templates to jumpstart your projects</p>
            </div>
            <div className="flex items-start">
              <Check className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
              <p className="text-gray-600">Robust version history and backup options</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Transform Your Workflow?</h2>
          <Link
            href="/signup"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Start Your Free Trial Today
          </Link>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2024 Your Miro Clone. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-purple-400">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-purple-400">Terms of Service</Link>
              <Link href="/contact" className="hover:text-purple-400">Contact Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;