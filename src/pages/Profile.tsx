import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Calendar, Download, Settings, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ResponsiveImage } from '@/components/ResponsiveImage';

const Profile = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  // Mock user stats - in production, fetch from your backend
  const userStats = {
    totalMealsRescued: 156,
    co2Saved: 78.5,
    waterSaved: 1240,
    moneySaved: 284,
    joinedDate: new Date(2024, 0, 15),
    currentStreak: 12,
    totalDonations: 23,
    favoriteRecipes: 45
  };

  // Mock achievements
  const achievements = [
    { id: 1, title: "First Rescue", description: "Saved your first meal", earned: true, icon: "🎯" },
    { id: 2, title: "Week Warrior", description: "7 days streak", earned: true, icon: "🔥" },
    { id: 3, title: "Eco Champion", description: "Saved 50kg CO2", earned: true, icon: "🌱" },
    { id: 4, title: "Donation Hero", description: "Made 10 donations", earned: true, icon: "❤️" },
    { id: 5, title: "Recipe Master", description: "Tried 25 recipes", earned: false, icon: "👨‍🍳" },
    { id: 6, title: "Impact Maker", description: "Saved 100 meals", earned: true, icon: "⭐" }
  ];

  const handleExportData = async () => {
    setIsExporting(true);
    
    try {
      // Mock export data - in production, fetch from your backend
      const exportData = {
        profile: {
          email: user?.email,
          username: user?.user_metadata?.username,
          country: user?.user_metadata?.country,
          joinedDate: userStats.joinedDate
        },
        stats: userStats,
        achievements: achievements.filter(a => a.earned),
        exportDate: new Date().toISOString()
      };

      // Create CSV format
      const csvData = [
        ['Profile Data Export'],
        [''],
        ['Basic Information'],
        ['Email', user?.email || ''],
        ['Username', user?.user_metadata?.username || ''],
        ['Country', user?.user_metadata?.country || ''],
        ['Joined Date', userStats.joinedDate.toDateString()],
        [''],
        ['Impact Statistics'],
        ['Total Meals Rescued', userStats.totalMealsRescued],
        ['CO2 Saved (kg)', userStats.co2Saved],
        ['Water Saved (L)', userStats.waterSaved],
        ['Money Saved ($)', userStats.moneySaved],
        ['Current Streak (days)', userStats.currentStreak],
        ['Total Donations', userStats.totalDonations],
        ['Favorite Recipes', userStats.favoriteRecipes],
        [''],
        ['Achievements'],
        ...achievements.filter(a => a.earned).map(a => [a.title, a.description])
      ];

      // Convert to CSV string
      const csvContent = csvData.map(row => row.join(',')).join('\n');
      
      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `replate-profile-data-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast({
        title: "Data exported successfully!",
        description: "Your profile data has been downloaded as a CSV file.",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error exporting your data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been safely signed out of your account.",
      });
    } catch (error) {
      toast({
        title: "Sign out failed",
        description: "There was an error signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-dm-serif font-bold text-foreground mb-2">
            Your Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your account, view your impact, and track your achievements
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="card-elevated">
              <CardHeader className="text-center">
                <div className="relative mx-auto">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src="" alt="Profile" />
                    <AvatarFallback className="text-xl font-semibold bg-primary text-primary-foreground">
                      {getInitials(user?.user_metadata?.username || user?.email || 'User')}
                    </AvatarFallback>
                  </Avatar>
                  <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground">
                    Eco Hero
                  </Badge>
                </div>
                <CardTitle className="text-xl">
                  {user?.user_metadata?.username || 'Food Hero'}
                </CardTitle>
                <CardDescription className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  {user?.email}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{user?.user_metadata?.country || 'Not specified'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Joined {userStats.joinedDate.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  <span>{userStats.currentStreak} day streak</span>
                </div>
                
                <div className="pt-4 space-y-2">
                  <Button 
                    onClick={handleExportData}
                    disabled={isExporting}
                    className="w-full"
                    variant="outline"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {isExporting ? 'Exporting...' : 'Export Data'}
                  </Button>
                  <Button 
                    onClick={handleSignOut}
                    variant="destructive"
                    className="w-full"
                  >
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats and Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Impact Statistics */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Your Environmental Impact
                </CardTitle>
                <CardDescription>
                  See the positive change you're making for our planet
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {userStats.totalMealsRescued}
                    </div>
                    <div className="text-sm text-muted-foreground">Meals Rescued</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent mb-1">
                      {userStats.co2Saved} kg
                    </div>
                    <div className="text-sm text-muted-foreground">CO2 Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary mb-1">
                      {userStats.waterSaved} L
                    </div>
                    <div className="text-sm text-muted-foreground">Water Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      ${userStats.moneySaved}
                    </div>
                    <div className="text-sm text-muted-foreground">Money Saved</div>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-lg font-semibold text-foreground mb-1">
                      {userStats.totalDonations}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Donations</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-lg font-semibold text-foreground mb-1">
                      {userStats.favoriteRecipes}
                    </div>
                    <div className="text-sm text-muted-foreground">Favorite Recipes</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-lg font-semibold text-foreground mb-1">
                      {userStats.currentStreak}
                    </div>
                    <div className="text-sm text-muted-foreground">Day Streak</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Achievements
                </CardTitle>
                <CardDescription>
                  Your milestones in reducing food waste
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`p-4 rounded-lg border transition-all duration-200 ${
                        achievement.earned
                          ? 'bg-accent/10 border-accent text-accent-foreground hover:bg-accent/20'
                          : 'bg-muted/30 border-muted text-muted-foreground'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <div className="font-semibold">{achievement.title}</div>
                          <div className="text-sm opacity-80">{achievement.description}</div>
                        </div>
                        {achievement.earned && (
                          <Badge variant="secondary" className="text-xs">
                            Earned
                          </Badge>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;