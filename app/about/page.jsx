"use client"

import { Card, CardContent } from "../component/ui/card"
import { Heart, Users, Shirt, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Hamari Kahani</h1>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            Style aur comfort ka perfect combination - har T-shirt mein hamara passion aur dedication hai
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Kaise Shuru Hui Hamari Journey</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                2020 mein, hum ne ek simple mission ke saath start kiya - har insaan ko comfortable aur stylish T-shirts
                provide karna. Down shoulder se lekar classic fits tak, har design mein hamara pyaar aur mehnat hai.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Aaj hum thousands of customers ko serve kar rahe hain aur har din naye designs aur better quality ke
                liye kaam kar rahe hain.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <img
                src="/placeholder.svg?height=300&width=400"
                alt="Team working"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600 italic">Hamari creative team action mein</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Hamari Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Passion</h3>
                <p className="text-gray-600">
                  Har design mein hamara dil hai. Hum sirf T-shirts nahi banate, emotions create karte hain.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Award className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Quality</h3>
                <p className="text-gray-600">
                  Premium fabric aur durable prints - har T-shirt long-lasting comfort ke liye banai gayi hai.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Community</h3>
                <p className="text-gray-600">
                  Hamara customer family hai. Har feedback sunते hain aur improve karte rehte hain.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Shirt className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                <p className="text-gray-600">
                  Latest trends aur timeless classics ka perfect blend - har style ke liye kuch na kuch.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Hamari Achievements</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <p className="text-gray-600 text-lg">Happy Customers</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <p className="text-gray-600 text-lg">Unique Designs</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">4.8★</div>
              <p className="text-gray-600 text-lg">Customer Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Hamara Mission</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            Har insaan ko apni personality express karne ka mauka dena - comfortable, stylish aur affordable T-shirts ke
            zariye.
          </p>
          <div className="bg-white/10 rounded-lg p-8">
            <p className="text-lg italic">
              "Fashion sirf kapde nahi hai, yeh apni identity ka expression hai. Hum chahte hain ke har customer
              confident feel kare hamari T-shirts pehen kar."
            </p>
            <p className="mt-4 font-semibold">- Founder Team</p>
          </div>
        </div>
      </section>
    </div>
  )
}
