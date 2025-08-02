import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  ChefHat, 
  Heart, 
  TrendingUp, 
  Leaf, 
  Droplets, 
  DollarSign,
  Users,
  Calendar,
  MapPin,
  ArrowRight,
  Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock data - in production this would come from Supabase
  const userStats = {
    foodItemsRescued: 47,
    co2Saved: 23.5, // kg
    waterSaved: 1250, // liters
    moneySaved: 156, // local currency
    familiesHelped: 8,
    currentStreak: 12, // days
    totalRecipes: 23,
    donationCenters: 5
  };

  const recentActivities = [
    { id: 1, type: 'recipe', title: 'Mediterranean Veggie Bowl', time: '2 hours ago', ingredients: 3 },
    { id: 2, type: 'donation', title: 'Food Bank Downtown', time: '1 day ago', items: 5 },
    { id: 3, type: 'upload', title: 'Fresh vegetables scan', time: '2 days ago', items: 7 },
  ];

  const quickActions = [
    {
      title: 'Upload Food Items',
      description: 'Scan or add your ingredients',
      icon: <Upload className="w-6 h-6" />,
      action: () => navigate('/upload'),
      color: 'bg-primary'
    },
    {
      title: 'Find Recipes',
      description: 'Get personalized suggestions',
      icon: <ChefHat className="w-6 h-6" />,
      action: () => navigate('/recipes'),
      color: 'bg-secondary'
    },
    {
      title: 'Donate Food',
      description: 'Find nearby centers',
      icon: <Heart className="w-6 h-6" />,
      action: () => navigate('/donate'),
      color: 'bg-accent'
    },
    {
      title: 'View Impact',
      description: 'See your progress',
      icon: <TrendingUp className="w-6 h-6" />,
      action: () => navigate('/carbon-impact'),
      color: 'bg-muted'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center md:text-left"
        >
          <h1 className="font-dm-serif text-4xl md:text-5xl text-foreground mb-4">
            Welcome back, {user?.user_metadata?.username || 'Food Hero'}! 🌱
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            You've rescued <span className="text-primary font-semibold">{userStats.foodItemsRescued} items</span> and 
            helped <span className="text-secondary font-semibold">{userStats.familiesHelped} families</span> this month.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Badge variant="secondary" className="px-4 py-2">
              <Calendar className="w-4 h-4 mr-2" />
              {userStats.currentStreak} day streak
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <MapPin className="w-4 h-4 mr-2" />
              {user?.user_metadata?.country || 'Global'}
            </Badge>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="font-dm-serif text-2xl text-foreground mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50"
                  onClick={action.action}
                >
                  <CardHeader className="text-center pb-2">
                    <div className={`${action.color} text-white rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                      {action.icon}
                    </div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 text-center">
                    <Button variant="ghost" size="sm" className="text-primary">
                      Get Started <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Impact Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="font-dm-serif text-2xl text-foreground mb-6">Your Impact This Month</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="card-elevated">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">CO₂ Saved</CardTitle>
                <Leaf className="h-4 w-4 text-lichen-green" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-lichen-green">{userStats.co2Saved} kg</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Water Saved</CardTitle>
                <Droplets className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-500">{userStats.waterSaved}L</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Money Saved</CardTitle>
                <DollarSign className="h-4 w-4 text-rusted-saffron" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-rusted-saffron">${userStats.moneySaved}</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Families Helped</CardTitle>
                <Users className="h-4 w-4 text-deep-beet" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-deep-beet">{userStats.familiesHelped}</div>
                <p className="text-xs text-muted-foreground">+3 new this week</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Monthly Goal */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                Monthly Goal Progress
              </CardTitle>
              <CardDescription>Rescue 60 food items this month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Food Items Rescued</span>
                  <span>{userStats.foodItemsRescued}/60</span>
                </div>
                <Progress value={(userStats.foodItemsRescued / 60) * 100} className="h-2" />
              </div>
              <p className="text-sm text-muted-foreground">
                Great progress! You're 78% of the way to your monthly goal.
              </p>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest food rescue actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'recipe' ? 'bg-primary/10 text-primary' :
                    activity.type === 'donation' ? 'bg-secondary/10 text-secondary' :
                    'bg-accent/10 text-accent'
                  }`}>
                    {activity.type === 'recipe' && <ChefHat className="w-4 h-4" />}
                    {activity.type === 'donation' && <Heart className="w-4 h-4" />}
                    {activity.type === 'upload' && <Upload className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  {activity.ingredients && (
                    <Badge variant="secondary">{activity.ingredients} ingredients</Badge>
                  )}
                  {activity.items && (
                    <Badge variant="secondary">{activity.items} items</Badge>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full mt-4">
                <Plus className="w-4 h-4 mr-2" />
                View All Activity
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;