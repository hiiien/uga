import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";

export default async function Home() {

  const session = await auth0.getSession();

  if (!session) {
    return (
        <div className="min-h-screen bg-white">
          {/* Header */}
          <header className="border-b border-gray-200 shadow-sm">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <div className="flex items-center">
                <Image src="/placeholder.svg?height=40&width=40" alt="Logo" width={40} height={40} className="mr-2" />
                <span className="text-xl font-bold text-gray-800">HealthyHabits</span>
              </div>
              <nav className="hidden md:flex space-x-4">
                <Link href="#features" className="text-gray-600 hover:text-gray-800">
                  Features
                </Link>
                <Link href="#testimonials" className="text-gray-600 hover:text-gray-800">
                  Testimonials
                </Link>
                <Link href="#contact" className="text-gray-600 hover:text-gray-800">
                  Contact
                </Link>
              </nav>
              <div className="flex space-x-2">
                <Button variant="outline" asChild>
                  <Link href="/auth/login">Log In</Link>
                </Button>
                <Button className="bg-[#5eead4] hover:bg-[#99f6e4] text-gray-800" asChild>
                  <Link href="/auth/login?screen_hint=signup">Sign Up</Link>
                </Button>
              </div>
            </div>
          </header>
    
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-b from-[#ccfbf1] to-white">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Empower Your Patients' Health Journey</h1>
              <p className="text-xl text-gray-600 mb-8">
                Comprehensive nutrition and fitness tracking for healthcare professionals
              </p>
              <div className="flex justify-center space-x-4">
                <Button size="lg" className="bg-[#5eead4] hover:bg-[#99f6e4] text-gray-800" asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
          </section>
    
          {/* Features Section */}
          <section id="features" className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Key Features</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Comprehensive Tracking",
                    description: "Monitor nutrition, exercise, and vital signs in one place",
                  },
                  { title: "Personalized Insights", description: "AI-powered recommendations for each patient" },
                  { title: "Secure & Compliant", description: "HIPAA-compliant data storage and sharing" },
                ].map((feature, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-[#ccfbf1]">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
    
          {/* Testimonial Section */}
          <section id="testimonials" className="py-20 bg-[#ccfbf1]">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Doctors Say</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    name: "Dr. Emily Chen",
                    role: "Cardiologist",
                    quote:
                      "MedFitTrack has revolutionized how I monitor my patients' progress. It's an invaluable tool for any healthcare professional.",
                  },
                  {
                    name: "Dr. Michael Patel",
                    role: "Nutritionist",
                    quote:
                      "The insights provided by this platform have significantly improved my ability to create effective, personalized nutrition plans.",
                  },
                ].map((testimonial, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                    <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
    
          {/* Footer */}
          <footer id="contact" className="bg-gray-800 text-white py-12">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">MedFitTrack</h3>
                  <p className="text-sm text-gray-400">
                    Empowering healthcare professionals with advanced nutrition and fitness tracking tools.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="#" className="text-sm text-gray-400 hover:text-white">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-sm text-gray-400 hover:text-white">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-sm text-gray-400 hover:text-white">
                        Terms of Service
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                  <p className="text-sm text-gray-400">Email: info@medfittrack.com</p>
                  <p className="text-sm text-gray-400">Phone: (555) 123-4567</p>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
                © 2025 MedFitTrack. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center flex-grow">
              <Image src="/placeholder.svg?height=40&width=40" alt="Logo" width={40} height={40} className="mr-2" />
              <span className="text-xl font-bold text-gray-800">HealthyHabits</span>
            </div>
            <nav className="hidden md:flex space-x-4 items-center justify-center text-center">
              <Link href="#features" className="text-gray-600 hover:text-gray-800">
          Features
              </Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-gray-800">
          Testimonials
              </Link>
              <Link href="#contact" className="text-gray-600 hover:text-gray-800">
          Contact
              </Link>
            </nav>
            <div className="flex-grow flex justify-center" style={{ width: 170, height: 40 }}>
            </div>
          </div>
        </header>
  
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-[#ccfbf1] to-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Empower Your Patients' Health Journey</h1>
            <p className="text-xl text-gray-600 mb-8">
              Comprehensive nutrition and fitness tracking for healthcare professionals
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="bg-[#5eead4] hover:bg-[#99f6e4] text-gray-800" asChild>
                <Link href="/dashboard">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
  
        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Comprehensive Tracking",
                  description: "Monitor nutrition, exercise, and vital signs in one place",
                },
                { title: "Personalized Insights", description: "AI-powered recommendations for each patient" },
                { title: "Secure & Compliant", description: "HIPAA-compliant data storage and sharing" },
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-[#ccfbf1]">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* Testimonial Section */}
        <section id="testimonials" className="py-20 bg-[#ccfbf1]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Doctors Say</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  name: "Dr. Emily Chen",
                  role: "Cardiologist",
                  quote:
                    "MedFitTrack has revolutionized how I monitor my patients' progress. It's an invaluable tool for any healthcare professional.",
                },
                {
                  name: "Dr. Michael Patel",
                  role: "Nutritionist",
                  quote:
                    "The insights provided by this platform have significantly improved my ability to create effective, personalized nutrition plans.",
                },
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                  <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                  <div className="font-semibold text-gray-800">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* Footer */}
        <footer id="contact" className="bg-gray-800 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">MedMonitor</h3>
                <p className="text-sm text-gray-400">
                  Empowering healthcare professionals with advanced nutrition and fitness tracking tools.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-sm text-gray-400 hover:text-white">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-gray-400 hover:text-white">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-gray-400 hover:text-white">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                <p className="text-sm text-gray-400">Email: info@medmonitor.com</p>
                <p className="text-sm text-gray-400">Phone: (555) 123-4567</p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
              © 2025 MedMonitor. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
  )
}

