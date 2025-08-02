import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Leaf, 
  Droplets, 
  Users, 
  Globe, 
  Heart,
  Package,
  Award,
  Target,
  BarChart3
} from 'lucide-react';

const Impact = () => {
  const personalStats = [
    {
      icon: <Package className="w-8 h-8" />,
      number: "127",
      label: "Meals Rescued",
      description: "You've helped save 127 meals from waste",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      number: "45.2kg",
      label: "CO₂ Emissions Prevented",
      description: "Equivalent to driving 120 miles less",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      number: "2,340L",
      label: "Water Saved",
      description: "Enough for 23 average showers",
      color: "text-cyan-600",
      bgColor: "bg-cyan-50"
    },
    {
      icon: <Users className="w-8 h-8" />,
      number: "34",
      label: "People Fed",
      description: "Your donations helped feed 34 people",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const globalImpact = [
    {
      metric: "Total Meals Rescued",
      value: "2.4M+",
      growth: "+23%",
      period: "this month"
    },
    {
      metric: "CO₂ Emissions Prevented", 
      value: "840 tons",
      growth: "+18%",
      period: "this quarter"
    },
    {
      metric: "Active Food Heroes",
      value: "45,000+",
      growth: "+31%",
      period: "this year"
    },
    {
      metric: "Partner Organizations",
      value: "1,200+",
      growth: "+12%",
      period: "globally"
    }
  ];

  const achievements = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Food Hero",
      description: "Rescued your first 10 meals",
      earned: true,
      date: "Earned 2 weeks ago"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Century Club",
      description: "Rescued 100+ meals",
      earned: true,
      date: "Earned yesterday"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Builder",
      description: "Referred 5 friends to RePlate",
      earned: false,
      progress: "3/5 friends"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Carbon Saver",
      description: "Prevented 50kg+ CO₂ emissions",
      earned: true,
      date: "Earned 3 days ago"
    }
  ];

  const monthlyData = [
    { month: "Jan", meals: 8, co2: 2.4 },
    { month: "Feb", meals: 12, co2: 3.6 },
    { month: "Mar", meals: 15, co2: 4.5 },
    { month: "Apr", meals: 22, co2: 6.6 },
    { month: "May", meals: 28, co2: 8.4 },
    { month: "Jun", meals: 42, co2: 12.6 }
  ];

  const challenges = [
    {
      title: "Zero Waste Week",
      description: "Rescue 7 meals in 7 days",
      progress: 60,
      timeLeft: "3 days left",
      reward: "Sustainability Champion badge"
    },
    {
      title: "Community Impact",
      description: "Help feed 50 people this month",
      progress: 68,
      timeLeft: "12 days left", 
      reward: "Community Hero badge + $10 donation match"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/lovable-uploads/837f3dfb-5fb0-4ac1-b704-220c20ba2bf7.png"
            alt="Community sharing meal"
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
              Your 
              <span className="bg-gradient-to-r from-rusted-saffron to-lichen-green bg-clip-text text-transparent"> Impact</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              See the real-world difference you're making in the fight against food waste. 
              Every meal rescued creates ripples of positive change.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Personal Impact Stats */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-dm-serif text-4xl text-foreground mb-6">
              Your Personal Impact
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Here's how your actions are making a difference for the planet and your community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {personalStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary">
                  <div className={`${stat.bgColor} rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                    <div className={stat.color}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className={`font-dm-serif text-3xl font-bold mb-2 ${stat.color}`}>
                    {stat.number}
                  </div>
                  <h3 className="font-semibold text-foreground mb-3">{stat.label}</h3>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Chart */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-dm-serif text-4xl text-foreground mb-6">
                Your Journey This Year
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Track your progress month by month and see how your impact grows over time. 
                Every action builds momentum toward a more sustainable future.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-card rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Best Month</p>
                    <p className="text-sm text-muted-foreground">June - 42 meals rescued</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    Personal Record
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-card rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Total Impact</p>
                    <p className="text-sm text-muted-foreground">127 meals • 45.2kg CO₂ saved</p>
                  </div>
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-dm-serif text-xl text-foreground">Monthly Progress</h3>
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                
                <div className="space-y-4">
                  {monthlyData.map((data, index) => (
                    <div key={data.month} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground w-12">
                        {data.month}
                      </span>
                      <div className="flex-1 mx-4">
                        <div className="bg-muted rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${(data.meals / 42) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-foreground">
                          {data.meals} meals
                        </span>
                        <p className="text-xs text-muted-foreground">
                          {data.co2}kg CO₂
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-dm-serif text-4xl text-foreground mb-6">
              Your Achievements
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Celebrate your milestones and see what's coming next
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`p-6 text-center hover:shadow-lg transition-all duration-300 ${
                  achievement.earned ? 'border-green-200 bg-green-50' : 'border-muted bg-muted/30'
                }`}>
                  <div className={`rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center ${
                    achievement.earned 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {achievement.icon}
                  </div>
                  
                  <h3 className="font-dm-serif text-lg text-foreground mb-2">
                    {achievement.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {achievement.description}
                  </p>
                  
                  {achievement.earned ? (
                    <Badge className="bg-green-100 text-green-800">
                      ✓ {achievement.date}
                    </Badge>
                  ) : (
                    <Badge variant="outline">
                      {achievement.progress}
                    </Badge>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Challenges */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-dm-serif text-4xl text-foreground mb-6">
              Current Challenges
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Take on new challenges to amplify your impact and earn exclusive rewards
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {challenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-dm-serif text-xl text-foreground">
                      {challenge.title}
                    </h3>
                    <Badge variant="outline">
                      {challenge.timeLeft}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">
                    {challenge.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">Progress</span>
                      <span className="text-sm font-medium text-primary">{challenge.progress}%</span>
                    </div>
                    <div className="bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${challenge.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="bg-muted rounded-lg p-3 mb-4">
                    <p className="text-sm font-medium text-foreground">Reward:</p>
                    <p className="text-sm text-muted-foreground">{challenge.reward}</p>
                  </div>
                  
                  <Button className="w-full btn-nature">
                    <Target className="w-4 h-4 mr-2" />
                    Continue Challenge
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Impact */}
      <section className="py-20 bg-gradient-nature">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-dm-serif text-4xl text-accent-foreground mb-6">
              Global RePlate Impact
            </h2>
            <p className="text-xl text-accent-foreground/80 max-w-3xl mx-auto">
              You're part of a worldwide movement making a difference every day
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {globalImpact.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center bg-accent-foreground/10 backdrop-blur-sm border-accent-foreground/20">
                  <div className="font-dm-serif text-3xl font-bold text-accent-foreground mb-2">
                    {stat.value}
                  </div>
                  <h3 className="font-semibold text-accent-foreground mb-2">
                    {stat.metric}
                  </h3>
                  <div className="flex items-center justify-center text-sm">
                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-green-400 font-medium">{stat.growth}</span>
                    <span className="text-accent-foreground/80 ml-1">{stat.period}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Button className="btn-hero">
              <Heart className="w-5 h-5 mr-2" />
              Share Your Impact
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Impact;