'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Target, 
  Calendar, 
  CheckCircle, 
  Star, 
  Timer, 
  TrendingUp,
  Shield
} from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: Target,
    title: 'Set Clear Promises',
    description: 'Define specific commitments with time, place, and duration to keep yourself accountable.'
  },
  {
    icon: Calendar,
    title: 'Daily Tracking',
    description: 'Auto-generated daily journals help you track progress and add personal notes.'
  },
  {
    icon: TrendingUp,
    title: 'Progress Visualization',
    description: 'Beautiful charts and metrics show your commitment journey and success patterns.'
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your promises and progress are completely private and secure.'
  }
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Entrepreneur',
    content: 'Promisu helped me stick to my daily meditation practice. 47 days and counting!',
    rating: 5
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Writer',
    content: 'Finally wrote my novel thanks to the daily writing promise I made to myself.',
    rating: 5
  },
  {
    name: 'Emily Thompson',
    role: 'Student',
    content: 'The daily tracking feature keeps me motivated. Love seeing my progress!',
    rating: 5
  }
];

export default function LandingPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Promisu
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
              Stories
            </a>
            <Link href="/dashboard">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            ✨ Make promises, keep them, grow stronger
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-primary/70 bg-clip-text text-transparent">
            Make Promises to Yourself,
            <br />
            <span className="text-primary">Keep Them</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your aspirations into commitments with Promisu. Track daily progress, 
            stay accountable, and build the life you've always promised yourself.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:scale-105 transition-transform">
                Start Your Journey
                <Timer className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="hover:scale-105 transition-transform">
              Watch Demo
              <Star className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to
            <span className="text-primary"> Keep Your Promises</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to help you stay committed and track your progress
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer ${
                hoveredFeature === index ? 'ring-2 ring-primary/50 shadow-lg' : ''
              }`}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <CardHeader className="pb-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 transition-colors ${
                  hoveredFeature === index ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                }`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple Steps to
            <span className="text-primary"> Success</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three easy steps to start building better habits and keeping your promises
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Create Your Promise',
              description: 'Set a specific commitment with duration, time, and optional location.',
              icon: Target,
              color: 'text-primary'
            },
            {
              step: '02',
              title: 'Track Daily Progress',
              description: 'Use auto-generated journals to log your daily actions and reflections.',
              icon: Calendar,
              color: 'text-primary'
            },
            {
              step: '03',
              title: 'Celebrate Success',
              description: 'Watch your progress grow and celebrate as you complete your promises.',
              icon: CheckCircle,
              color: 'text-primary'
            }
          ].map((item, index) => (
            <div key={index} className="text-center group">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 bg-primary/10`}>
                <item.icon className={`w-8 h-8 ${item.color}`} />
              </div>
              <div className="text-sm font-mono text-muted-foreground mb-2">{item.step}</div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stories of
            <span className="text-primary"> Success</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real people, real promises, real results
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative overflow-hidden hover:scale-105 transition-transform">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center text-white font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5" />
          <CardContent className="relative p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Keep Your Promises?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of people who are building better habits and achieving their goals with Promisu.
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:scale-105 transition-transform">
                Start Your First Promise
                <Heart className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Promisu</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Making promises to yourself and keeping them, one day at a time.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Updates</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Promisu. All rights reserved. Made with ❤️ for promise keepers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 