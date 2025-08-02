import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { TrendingUp, Globe, Heart, Recycle, Leaf, Droplets, Users, MapPin } from 'lucide-react';

const Facts = () => {
  const globalFacts = [
    {
      icon: <Globe className="w-8 h-8" />,
      number: "1.3 Billion",
      label: "Tons of food wasted globally each year",
      description: "That's enough to feed 3 billion people annually",
      color: "text-destructive"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      number: "30%",
      label: "Of global food production goes to waste",
      description: "One-third of all food produced never reaches a human stomach",
      color: "text-amber-600"
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      number: "250km³",
      label: "Of water wasted through food waste annually",
      description: "Equivalent to the annual flow of Russia's Volga River",
      color: "text-blue-600"
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      number: "8%",
      label: "Of greenhouse gas emissions from food waste",
      description: "Food waste is the 3rd largest emitter after USA and China",
      color: "text-green-600"
    }
  ];

  const impactFacts = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Human Impact",
      facts: [
        "828 million people face hunger worldwide",
        "2 billion people lack access to safely managed drinking water",
        "Food waste costs the global economy $1 trillion annually",
        "25% of food waste could feed 870 million hungry people"
      ]
    },
    {
      icon: <Recycle className="w-6 h-6" />,
      title: "Environmental Cost",
      facts: [
        "Food waste generates 4.4 gigatons of CO2 equivalent annually",
        "Wasted food uses 21% of freshwater resources",
        "28% of agricultural land produces food that's never eaten",
        "Food waste fills 20% of landfills in developed countries"
      ]
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Regional Breakdown",
      facts: [
        "Europe & North America waste 95-115 kg per person annually",
        "Sub-Saharan Africa loses 150-200 kg per person annually",
        "Asia wastes 6-11 kg per person annually at consumer level",
        "40% of India's fruit & vegetable production is wasted"
      ]
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Solutions Impact",
      facts: [
        "Reducing food waste by 25% could feed 870M+ people",
        "Food rescue apps have saved 200M+ meals globally",
        "Community fridges prevent 50 tons of waste per unit annually",
        "AI-powered solutions reduce retail food waste by 30%"
      ]
    }
  ];

  const solutions = [
    {
      title: "Smart Technology",
      description: "AI-powered apps help predict food spoilage and optimize supply chains",
      impact: "30% reduction in retail waste"
    },
    {
      title: "Community Networks",
      description: "Food sharing platforms connect surplus food with those in need",
      impact: "200M+ meals rescued globally"
    },
    {
      title: "Education Programs",
      description: "Teaching proper storage and portion planning reduces household waste",
      impact: "40% reduction in home waste"
    },
    {
      title: "Policy Changes",
      description: "Legislation promoting food donation and waste reduction initiatives",
      impact: "25% policy-driven waste reduction"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/lovable-uploads/eb3b2717-bc63-49e1-bfc1-58c36f71045e.png"
            alt="Fresh food spread"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-dm-serif text-5xl md:text-7xl text-primary-foreground mb-6">
              Food Waste 
              <span className="bg-gradient-to-r from-rusted-saffron to-lichen-green bg-clip-text text-transparent"> Facts</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              Understanding the global food waste crisis is the first step toward creating meaningful change.
              Here are the facts that drive our mission at RePlate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Global Statistics */}
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
              Global Impact Numbers
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The scale of food waste worldwide is staggering. These numbers tell the story.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {globalFacts.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary">
                  <div className={`${fact.color} mb-4 flex justify-center`}>
                    {fact.icon}
                  </div>
                  <div className={`font-dm-serif text-3xl font-bold mb-2 ${fact.color}`}>
                    {fact.number}
                  </div>
                  <h3 className="font-semibold text-foreground mb-3">{fact.label}</h3>
                  <p className="text-sm text-muted-foreground">{fact.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Facts */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-dm-serif text-4xl md:text-5xl text-foreground mb-6">
              Breaking Down the Crisis
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Food waste affects every aspect of our global ecosystem
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {impactFacts.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary/10 rounded-full p-3 mr-4">
                      <div className="text-primary">
                        {category.icon}
                      </div>
                    </div>
                    <h3 className="font-dm-serif text-2xl text-foreground">{category.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {category.facts.map((fact, factIndex) => (
                      <li key={factIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                        <p className="text-muted-foreground">{fact}</p>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Impact Image */}
      <section className="py-20 bg-gradient-nature">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-dm-serif text-4xl md:text-5xl text-accent-foreground mb-6">
                Communities Making Change
              </h2>
              <p className="text-xl text-accent-foreground/80 mb-8 leading-relaxed">
                Around the world, communities are coming together to tackle food waste through 
                innovative sharing programs, community gardens, and food rescue initiatives.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Users className="w-6 h-6 text-accent-foreground mr-3" />
                  <span className="text-accent-foreground">5000+ community food sharing groups worldwide</span>
                </div>
                <div className="flex items-center">
                  <Heart className="w-6 h-6 text-accent-foreground mr-3" />
                  <span className="text-accent-foreground">200M+ meals rescued through community efforts</span>
                </div>
                <div className="flex items-center">
                  <Recycle className="w-6 h-6 text-accent-foreground mr-3" />
                  <span className="text-accent-foreground">80% reduction in local food waste where active</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="/lovable-uploads/421c2385-f30d-4ad4-a315-7a720b83acf3.png"
                alt="Community food sharing"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions */}
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
              Proven Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Technology and community action are creating real impact in the fight against food waste
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 h-full">
                  <h3 className="font-dm-serif text-xl text-foreground mb-4">{solution.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{solution.description}</p>
                  <div className="mt-auto">
                    <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {solution.impact}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Facts;