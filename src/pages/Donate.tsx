import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Phone, Heart, Search, Navigation, Users, Package } from 'lucide-react';

const Donate = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const donationTypes = [
    { id: 'all', label: 'All Centers', count: 42 },
    { id: 'food-bank', label: 'Food Banks', count: 18 },
    { id: 'shelter', label: 'Shelters', count: 12 },
    { id: 'community', label: 'Community Centers', count: 8 },
    { id: 'senior', label: 'Senior Centers', count: 4 }
  ];

  const donationCenters = [
    {
      id: 1,
      name: "Central Community Food Bank",
      type: "food-bank",
      address: "123 Hope Street, Downtown",
      distance: "0.8 miles",
      hours: "Mon-Fri: 9AM-5PM, Sat: 9AM-2PM",
      phone: "(555) 123-4567",
      acceptedItems: ["Canned goods", "Fresh produce", "Packaged foods", "Dairy products"],
      urgentNeeds: ["Rice", "Pasta", "Baby formula"],
      volunteers: 45,
      mealsServed: "2,500/month",
      rating: 4.9,
      image: "/lovable-uploads/421c2385-f30d-4ad4-a315-7a720b83acf3.png"
    },
    {
      id: 2,
      name: "Sunrise Family Shelter",
      type: "shelter",
      address: "456 Caring Avenue, Northside",
      distance: "1.2 miles",
      hours: "Daily: 7AM-9PM",
      phone: "(555) 987-6543",
      acceptedItems: ["Ready-to-eat meals", "Snacks", "Beverages", "Personal care items"],
      urgentNeeds: ["Fresh fruit", "Protein bars", "Juice boxes"],
      volunteers: 32,
      mealsServed: "1,800/month",
      rating: 4.8,
      image: "/lovable-uploads/421c2385-f30d-4ad4-a315-7a720b83acf3.png"
    },
    {
      id: 3,
      name: "Neighborhood Community Hub",
      type: "community",
      address: "789 Unity Boulevard, Eastside",
      distance: "2.1 miles",
      hours: "Mon-Sat: 8AM-6PM",
      phone: "(555) 456-7890",
      acceptedItems: ["Baked goods", "Fresh vegetables", "Cooked meals", "Pantry staples"],
      urgentNeeds: ["Bread", "Milk", "Eggs"],
      volunteers: 28,
      mealsServed: "1,200/month",
      rating: 4.7,
      image: "/lovable-uploads/421c2385-f30d-4ad4-a315-7a720b83acf3.png"
    }
  ];

  const impactStats = [
    {
      icon: <Package className="w-8 h-8" />,
      number: "15,000+",
      label: "Pounds of food rescued this month",
      color: "text-green-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      number: "3,200",
      label: "Families served weekly",
      color: "text-blue-600"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      number: "850",
      label: "Active volunteers",
      color: "text-red-600"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      number: "42",
      label: "Donation centers in your area",
      color: "text-purple-600"
    }
  ];

  const filterCenters = () => {
    return donationCenters.filter(center => {
      const matchesLocation = searchLocation === '' || 
                             center.address.toLowerCase().includes(searchLocation.toLowerCase()) ||
                             center.name.toLowerCase().includes(searchLocation.toLowerCase());
      const matchesType = selectedType === 'all' || center.type === selectedType;
      return matchesLocation && matchesType;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="/lovable-uploads/421c2385-f30d-4ad4-a315-7a720b83acf3.png"
            alt="Community food sharing"
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
              Share & 
              <span className="bg-gradient-to-r from-rusted-saffron to-lichen-green bg-clip-text text-transparent"> Donate</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              Connect with local food banks, shelters, and community centers to share your excess food 
              and make a meaningful impact in your neighborhood.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-dm-serif text-3xl text-foreground mb-4">
              Community Impact This Month
            </h2>
            <p className="text-lg text-muted-foreground">
              Together, we're making a real difference in fighting food waste and hunger
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
                  <div className={`${stat.color} mb-4 flex justify-center`}>
                    {stat.icon}
                  </div>
                  <div className={`font-dm-serif text-3xl font-bold mb-2 ${stat.color}`}>
                    {stat.number}
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h2 className="font-dm-serif text-4xl text-foreground mb-4">
                Find Donation Centers Near You
              </h2>
              <p className="text-lg text-muted-foreground">
                Discover local organizations that can put your excess food to good use
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Enter your location or search by name..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="flex items-center">
                <Navigation className="w-4 h-4 mr-2" />
                Use My Location
              </Button>
            </div>

            <div className="flex flex-wrap gap-3">
              {donationTypes.map((type) => (
                <Button
                  key={type.id}
                  variant={selectedType === type.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type.id)}
                  className="flex items-center"
                >
                  {type.label}
                  <Badge variant="secondary" className="ml-2">
                    {type.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Donation Centers */}
      <section className="pb-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Map Placeholder */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 sticky top-24">
                <h3 className="font-dm-serif text-xl text-foreground mb-4">
                  Interactive Map
                </h3>
                <div className="bg-muted rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Interactive map with donation center locations coming soon
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span>Food Banks</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span>Shelters</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                    <span>Community Centers</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Centers List */}
            <div className="lg:col-span-2 space-y-6">
              {filterCenters().map((center, index) => (
                <motion.div
                  key={center.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="md:flex">
                      <div className="md:w-48 h-48 md:h-auto">
                        <img 
                          src={center.image}
                          alt={center.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center mb-2">
                              <h3 className="font-dm-serif text-xl text-foreground mr-3">
                                {center.name}
                              </h3>
                              <Badge variant="outline" className="text-xs">
                                {center.type.replace('-', ' ')}
                              </Badge>
                            </div>
                            <div className="flex items-center text-muted-foreground mb-1">
                              <MapPin className="w-4 h-4 mr-2" />
                              <span className="text-sm">{center.address}</span>
                            </div>
                            <div className="text-sm text-green-600 font-medium">
                              {center.distance} away
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center mb-1">
                              <span className="text-sm font-medium">★ {center.rating}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {center.volunteers} volunteers
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="flex items-center text-muted-foreground mb-2">
                              <Clock className="w-4 h-4 mr-2" />
                              <span className="text-sm">{center.hours}</span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Phone className="w-4 h-4 mr-2" />
                              <span className="text-sm">{center.phone}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">
                              Monthly Impact:
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {center.mealsServed} meals served
                            </p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm font-medium text-foreground mb-2">
                            Accepted Items:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {center.acceptedItems.map((item, idx) => (
                              <span key={idx} className="text-xs bg-muted px-2 py-1 rounded">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        {center.urgentNeeds.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-medium text-destructive mb-2">
                              Urgent Needs:
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {center.urgentNeeds.map((need, idx) => (
                                <span key={idx} className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded">
                                  {need}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-3">
                          <Button className="btn-nature flex-1">
                            <Heart className="w-4 h-4 mr-2" />
                            Donate Here
                          </Button>
                          <Button variant="outline">
                            <MapPin className="w-4 h-4 mr-2" />
                            Directions
                          </Button>
                          <Button variant="outline">
                            <Phone className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-nature">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-dm-serif text-4xl text-accent-foreground mb-6">
                Ready to Make a Difference?
              </h2>
              <p className="text-xl text-accent-foreground/80 mb-8 leading-relaxed">
                Every donation, no matter how small, helps feed families and reduce food waste. 
                Join our community of food heroes today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-hero">
                  <Package className="w-5 h-5 mr-2" />
                  Schedule a Pickup
                </Button>
                <Button variant="outline" className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent">
                  <Users className="w-5 h-5 mr-2" />
                  Volunteer Today
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donate;