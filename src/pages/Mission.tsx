import { motion } from 'framer-motion';
import { Globe, Utensils, Recycle, Heart } from 'lucide-react';

const Mission = () => {
  const values = [
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Global Impact",
      description: "Creating worldwide change in food waste reduction and sustainable consumption patterns."
    },
    {
      icon: <Utensils className="w-12 h-12" />,
      title: "Food Security",
      description: "Ensuring every meal counts by connecting surplus food with those who need it most."
    },
    {
      icon: <Recycle className="w-12 h-12" />,
      title: "Sustainability",
      description: "Building a circular food economy that minimizes waste and maximizes resource efficiency."
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Community",
      description: "Fostering stronger communities through shared responsibility and collective action."
    }
  ];

  const milestones = [
    { year: "2024", title: "Platform Launch", description: "Initial release of RePlate AI-driven food waste prevention platform" },
    { year: "2025", title: "Global Expansion", description: "Expanding to 50+ countries with localized donation networks" },
    { year: "2026", title: "1M Users", description: "Reaching one million active users preventing food waste daily" },
    { year: "2027", title: "Carbon Neutral", description: "Achieving carbon neutrality across all platform operations" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.section 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
            Our Mission
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
            To eliminate food waste globally by empowering individuals and communities with 
            intelligent technology that transforms the way we think about food consumption, 
            sharing, and sustainability.
          </p>
          <motion.div 
            className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg p-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
              "Every plate counts, every meal matters, every action creates change."
            </h2>
            <p className="text-muted-foreground">
              - RePlate Team
            </p>
          </motion.div>
        </motion.section>

        {/* Vision Section */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold mb-6 text-foreground">
                Our Vision
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                We envision a world where no edible food goes to waste, where technology 
                seamlessly connects abundance with need, and where every household contributes 
                to a sustainable food ecosystem.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Through artificial intelligence, community engagement, and innovative partnerships, 
                we're building the infrastructure for a food-secure future that benefits both 
                people and planet.
              </p>
            </div>
            <div className="bg-muted rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Our Commitment</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Reduce global food waste by 50% by 2030
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Connect 10 million meals to families in need
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Prevent 1 million tons of CO2 emissions
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Build sustainable food communities worldwide
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-display font-bold text-center mb-12 text-foreground">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="text-center p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-primary mb-4 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Roadmap Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-display font-bold text-center mb-12 text-foreground">
            Our Roadmap
          </h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className="relative flex items-start pl-16"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                  <div className="bg-card p-6 rounded-lg border border-border flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-2xl font-bold text-primary">{milestone.year}</span>
                      <h3 className="text-xl font-semibold text-foreground">{milestone.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default Mission;