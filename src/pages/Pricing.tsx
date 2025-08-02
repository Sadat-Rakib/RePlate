import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Pricing = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      description: 'Perfect for getting started with food waste reduction',
      price: 0,
      billing: 'free forever',
      icon: <Star className="w-6 h-6" />,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/20',
      features: [
        'Up to 10 ingredient scans per month',
        'Basic recipe suggestions',
        'Simple impact tracking',
        'Community support',
        'Mobile app access'
      ],
      popular: false,
      cta: 'Get Started',
      priceId: null
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Advanced features for serious food waste warriors',
      price: 9.99,
      billing: 'per month',
      icon: <Zap className="w-6 h-6" />,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary',
      features: [
        'Unlimited ingredient scans',
        'AI-powered recipe recommendations',
        'Advanced nutrition analysis',
        'Expiry date tracking & alerts',
        'Detailed impact analytics',
        'Priority support',
        'Export your data',
        'Advanced meal planning'
      ],
      popular: true,
      cta: 'Start Premium',
      priceId: 'price_premium_monthly'
    },
    {
      id: 'family',
      name: 'Family',
      description: 'Perfect for households serious about reducing waste',
      price: 19.99,
      billing: 'per month',
      icon: <Crown className="w-6 h-6" />,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      borderColor: 'border-secondary/20',
      features: [
        'Everything in Premium',
        'Up to 6 family member accounts',
        'Shared shopping lists',
        'Family impact dashboard',
        'Bulk donation coordination',
        'Custom meal plans',
        'Advanced inventory management',
        'White-glove onboarding'
      ],
      popular: false,
      cta: 'Start Family Plan',
      priceId: 'price_family_monthly'
    }
  ];

  const handleSubscribe = async (plan: typeof plans[0]) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to subscribe to a plan.",
        variant: "destructive",
      });
      return;
    }

    if (plan.price === 0) {
      toast({
        title: "You're all set!",
        description: "You're already on the Basic plan. Start using the app!",
      });
      return;
    }

    setIsLoading(plan.id);

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          priceId: plan.priceId,
          planName: plan.name,
          amount: Math.round(plan.price * 100) // Convert to cents
        },
      });

      if (error) throw error;

      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Subscription failed",
        description: "There was an error processing your subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-dm-serif font-bold text-foreground mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join thousands of users reducing food waste and making a positive environmental impact. 
            Choose the plan that fits your lifestyle.
          </p>
          
          {/* Trust badges */}
          <div className="flex items-center justify-center gap-8 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-accent" />
              <span>30-day money back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-accent" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-accent" />
              <span>Secure payments</span>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <Badge 
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10 bg-primary text-primary-foreground px-4 py-1"
                >
                  Most Popular
                </Badge>
              )}
              
              <Card 
                className={`card-elevated h-full transition-all duration-300 hover:scale-105 ${
                  plan.popular ? `${plan.borderColor} border-2` : ''
                }`}
              >
                <CardHeader className="text-center pb-6">
                  <div className={`w-16 h-16 ${plan.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <div className={plan.color}>
                      {plan.icon}
                    </div>
                  </div>
                  
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-base">
                    {plan.description}
                  </CardDescription>
                  
                  <div className="mt-6">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-foreground">
                        {plan.price === 0 ? 'Free' : `$${plan.price}`}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-muted-foreground">/{plan.billing}</span>
                      )}
                    </div>
                    {plan.price === 0 && (
                      <p className="text-sm text-muted-foreground mt-1">{plan.billing}</p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <Button
                    onClick={() => handleSubscribe(plan)}
                    disabled={isLoading === plan.id}
                    className={`w-full mb-6 ${
                      plan.popular 
                        ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {isLoading === plan.id ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {plan.cta}
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>

                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-dm-serif font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg">Can I change plans anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! You can upgrade, downgrade, or cancel your subscription at any time. 
                  Changes take effect at the next billing cycle.
                </p>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg">Is my payment information secure?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Absolutely. We use Stripe for secure payment processing and never store 
                  your payment information on our servers.
                </p>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg">What happens to my data if I cancel?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your data remains accessible for 30 days after cancellation. You can 
                  export all your data anytime from your profile page.
                </p>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg">Do you offer annual plans?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Annual plans with significant discounts are coming soon! Subscribe to 
                  our newsletter to be notified when they're available.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <Card className="card-elevated bg-gradient-primary text-primary-foreground border-0">
            <CardContent className="p-12">
              <h3 className="text-3xl font-dm-serif font-bold mb-4">
                Ready to Make an Impact?
              </h3>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join thousands of users who have already prevented tons of food waste 
                and saved money while helping the environment.
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                className="px-8 py-3 text-lg"
                onClick={() => handleSubscribe(plans[1])}
              >
                Start Your Journey Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;