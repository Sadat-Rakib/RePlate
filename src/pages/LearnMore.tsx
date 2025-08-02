import { motion } from 'framer-motion';
import { Leaf, Users, Target, Heart } from 'lucide-react';

const LearnMore = () => {
  const features = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Reduce Food Waste",
      description: "Turn expiring ingredients into delicious meals with AI-powered recipe suggestions."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Impact",
      description: "Connect with local food banks and donation centers to help families in need."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Smart Planning",
      description: "Track expiry dates and get timely notifications to use ingredients before they spoil."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Environmental Care",
      description: "Measure your environmental impact with CO2 savings and water conservation metrics."
    }
  ];

  const team = [
    {
      name: 'Mir Sadat Bin Rakib',
      role: 'Founder & CTO',
      description: 'Passionate about using technology to solve environmental challenges.'
    },
    {
      name: 'Fahrin Ferdousy',
      role: 'CEO & COO',
      description: 'Dedicated to building sustainable solutions for global food waste reduction.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.section 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
            Learn More About RePlate
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover how our AI-driven platform is revolutionizing food waste prevention 
            and building stronger communities through sustainable food practices.
          </p>
        </motion.section>

        {/* Features Section */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-display font-bold text-center mb-12 text-foreground">
            How RePlate Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-card p-8 rounded-lg shadow-lg border border-border hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section 
          className="bg-muted rounded-lg p-8 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-display font-bold text-center mb-8 text-foreground">
            Our Global Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1.3B</div>
              <div className="text-muted-foreground">Tons of food wasted globally per year</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">828M</div>
              <div className="text-muted-foreground">People facing hunger worldwide</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">8-10%</div>
              <div className="text-muted-foreground">Of global greenhouse gas emissions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">$1T</div>
              <div className="text-muted-foreground">Economic cost of food waste annually</div>
            </div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-display font-bold text-center mb-12 text-foreground">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="bg-card p-8 rounded-lg text-center shadow-lg border border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-20 h-20 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{member.name}</h3>
                <p className="text-accent font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default LearnMore;