import { motion } from 'framer-motion';
import { Camera, Upload, Utensils, MapPin, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const quickActions = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Scan Ingredients",
      description: "Take a photo of your ingredients",
      action: () => navigate('/upload'),
      color: "bg-primary"
    },
    {
      icon: <Utensils className="w-8 h-8" />,
      title: "Find Recipes",
      description: "Get AI-powered recipe suggestions",
      action: () => navigate('/recipes'),
      color: "bg-accent"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Donate Food",
      description: "Find nearby donation centers",
      action: () => navigate('/donate'),
      color: "bg-secondary"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "View Impact",
      description: "Track your environmental impact",
      action: () => navigate('/carbon-impact'),
      color: "bg-muted"
    }
  ];

  const recentStats = {
    mealsRescued: 42,
    co2Saved: 18.5,
    waterSaved: 234,
    moneySaved: 67
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Welcome back, {user?.user_metadata?.username || 'Food Hero'}! 👋
          </h1>
          <p className="text-lg text-muted-foreground">
            Ready to rescue more food and make a positive impact today?
          </p>
        </motion.section>

        {/* Quick Actions */}
        <motion.section 
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full" onClick={action.action}>
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-4 text-primary-foreground`}>
                      {action.icon}
                    </div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Recent Impact Stats */}
        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Your Impact This Month</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl font-bold text-primary">{recentStats.mealsRescued}</CardTitle>
                <CardDescription>Meals Rescued</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl font-bold text-accent">{recentStats.co2Saved} kg</CardTitle>
                <CardDescription>CO2 Saved</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl font-bold text-secondary">{recentStats.waterSaved} L</CardTitle>
                <CardDescription>Water Saved</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl font-bold text-primary">${recentStats.moneySaved}</CardTitle>
                <CardDescription>Money Saved</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </motion.section>

        {/* Recent Activity */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-foreground">Recent Activity</h2>
            <Button variant="outline" onClick={() => navigate('/inventory')}>
              View All
            </Button>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Utensils className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Pasta Primavera Recipe</p>
                      <p className="text-sm text-muted-foreground">Used vegetables expiring today</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Food Donation</p>
                      <p className="text-sm text-muted-foreground">Donated bread to Local Food Bank</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">Yesterday</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                      <Upload className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Ingredient Scan</p>
                      <p className="text-sm text-muted-foreground">Added 5 new items to inventory</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">2 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </main>
    </div>
  );
};

export default Home;