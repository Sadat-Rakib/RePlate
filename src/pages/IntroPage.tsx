import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import HarvestGreeter from '@/components/HarvestGreeter';
import { Leaf, Recycle, Heart, Globe, ArrowRight, Play } from 'lucide-react';

const IntroPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "AI Food Recognition",
      description: "Upload photos of your ingredients and get instant AI-powered identification and freshness analysis."
    },
    {
      icon: <Recycle className="w-8 h-8" />,
      title: "Smart Recipe Suggestions",
      description: "Transform your leftover ingredients into delicious meals with personalized recipe recommendations."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Donation Network",
      description: "Connect with local food banks and donation centers to share excess food with those in need."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Impact Tracking",
      description: "See your real environmental impact with metrics on CO2 saved, water conserved, and meals rescued."
    }
  ];

  const stats = [
    { number: "1.3B", label: "Tons of food wasted globally each year", color: "text-destructive" },
    { number: "30%", label: "Of global food production goes to waste", color: "text-rusted-saffron" },
    { number: "8%", label: "Of greenhouse gases from food waste", color: "text-deep-beet" },
    { number: "828M", label: "People face hunger worldwide", color: "text-soil-brown" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero min-h-screen flex items-center">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <motion.h1
                  className="font-dm-serif text-5xl md:text-7xl text-primary-foreground mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  Transform Food Waste Into{" "}
                  <span className="bg-gradient-to-r from-rusted-saffron to-lichen-green bg-clip-text text-transparent">
                    Hope
                  </span>
                </motion.h1>
                
                <motion.p
                  className="text-xl text-primary-foreground/90 leading-relaxed mb-8 max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Join the AI-powered revolution to rescue food, reduce waste, and feed communities. 
                  Every ingredient saved makes a difference.
                </motion.p>
              </div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <Button
                  onClick={() => navigate('/signup')}
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Start Rescuing Food
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                
                <Button
                  variant="outline"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-4 text-lg rounded-xl"
                  onClick={() => navigate('/learn-more')}
                >
                  <Play className="mr-2 w-5 h-5" />
                  Learn More
                </Button>
              </motion.div>

              <motion.div
                className="flex items-center space-x-8 text-primary-foreground/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <div className="text-center">
                  <div className="font-bold text-2xl">50K+</div>
                  <div className="text-sm">Meals Rescued</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-2xl">2.3M</div>
                  <div className="text-sm">Lbs CO2 Saved</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-2xl">15K+</div>
                  <div className="text-sm">Active Users</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative bg-primary-foreground/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="text-center text-primary-foreground"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    >
                      <div className="bg-primary-foreground/20 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                        {feature.icon}
                      </div>
                      <h3 className="font-semibold text-sm mb-2">{feature.title}</h3>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-dm-serif text-4xl md:text-5xl text-foreground mb-6">
              How RePlate Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI-powered platform makes food rescue simple, smart, and impactful
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="card-elevated text-center hover-scale"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-primary rounded-full p-4 w-16 h-16 mx-auto mb-6 text-primary-foreground">
                  {feature.icon}
                </div>
                <h3 className="font-dm-serif text-xl mb-4 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-nature">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-dm-serif text-4xl md:text-5xl text-accent-foreground mb-6">
              The Food Waste Crisis
            </h2>
            <p className="text-xl text-accent-foreground/80 max-w-3xl mx-auto">
              Understanding the problem is the first step to creating change
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`font-dm-serif text-4xl md:text-5xl font-bold mb-2 ${stat.color}`}>
                  {stat.number}
                </div>
                <p className="text-accent-foreground/80 text-sm leading-tight">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="font-dm-serif text-4xl md:text-5xl text-foreground mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users who are already transforming food waste into positive impact
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/signup')}
                className="btn-hero text-lg px-8 py-4"
              >
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigate('/food-waste-facts')}
                className="text-lg px-8 py-4"
              >
                Learn About Food Waste
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Harvest Greeter (only on intro page) */}
      <HarvestGreeter />
    </div>
  );
};

export default IntroPage;