import React from 'react';
import { Brain, Activity, MessageSquareText, FlaskRound as Flask, Heart, AlertCircle, Users, Sparkles, ChevronRight, Menu } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-gray-900/90 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold">HealSync AI</span>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
                <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
                <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors">
                  Get Started
                </button>
              </div>
            </div>
            <div className="md:hidden">
              <Menu className="h-6 w-6" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Your AI-Powered Healthcare Companion
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience the future of healthcare with personalized AI insights, real-time monitoring, and instant medical assistance.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg flex items-center transition-all transform hover:scale-105">
                Start Your Journey
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border border-blue-500 hover:bg-blue-500/10 px-6 py-3 rounded-lg transition-all">
                Watch Demo
              </button>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full filter blur-3xl"></div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Powerful AI Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Activity className="h-8 w-8 text-blue-500" />,
              title: "Health Analytics",
              description: "Real-time monitoring and AI-driven health insights"
            },
            {
              icon: <MessageSquareText className="h-8 w-8 text-blue-500" />,
              title: "AI Chat Assistant",
              description: "24/7 medical guidance and symptom analysis"
            },
            {
              icon: <Flask className="h-8 w-8 text-blue-500" />,
              title: "Clinical Trials",
              description: "Smart matching with global research opportunities"
            },
            {
              icon: <Heart className="h-8 w-8 text-blue-500" />,
              title: "Wellness Coach",
              description: "Personalized lifestyle and mental health support"
            },
            {
              icon: <AlertCircle className="h-8 w-8 text-blue-500" />,
              title: "Emergency Monitor",
              description: "Automated alerts and fall detection system"
            },
            {
              icon: <Users className="h-8 w-8 text-blue-500" />,
              title: "Community Support",
              description: "AI-moderated forums and support groups"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl hover:bg-gray-800/70 transition-colors">
              <div className="bg-gray-700/50 p-3 rounded-lg w-fit mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Stats Section */}
      <div className="bg-gray-800/50 backdrop-blur-sm py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-500 mb-2">99.9%</div>
              <div className="text-gray-400">Diagnosis Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-500 mb-2">24/7</div>
              <div className="text-gray-400">AI Assistance</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-500 mb-2">1M+</div>
              <div className="text-gray-400">Users Worldwide</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Healthcare Journey?</h2>
          <p className="text-xl text-gray-200 mb-8">Join thousands of users who trust HealSync AI for their health management</p>
          <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold flex items-center mx-auto transition-all transform hover:scale-105">
            Get Started Now
            <Sparkles className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Brain className="h-6 w-6 text-blue-500" />
              <span className="ml-2 font-bold">HealSync AI</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 HealSync AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;