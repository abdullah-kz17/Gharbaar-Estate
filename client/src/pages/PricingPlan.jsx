import React, { useState } from 'react';
import {
    Check, Star, Zap, Home, Bot, Users,
    MapPin, Camera, Search, Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';

const PricingPlans = () => {
    const [billingCycle, setBillingCycle] = useState('monthly');
    const [hoveredPlan, setHoveredPlan] = useState(null);

    const plans = [
        {
            id: 'basic',
            name: 'Basic Explorer',
            description: 'Perfect for first-time buyers and casual browsers',
            icon: <Search className="w-6 h-6" />,
            monthly: 0,
            yearly: 0,
            popular: false,
            features: [
                'Browse unlimited property listings',
                'Basic search filters',
                'Contact property owners',
                'Save up to 10 favorite properties',
                'Mobile app access',
                'Email support'
            ],
            limitations: [
                'No AI-powered search',
                'No renovation analysis',
                'Limited property details'
            ]
        },
        {
            id: 'smart',
            name: 'Smart Buyer',
            description: 'AI-powered features for serious property hunters',
            icon: <Bot className="w-6 h-6" />,
            monthly: 29,
            yearly: 299,
            popular: true,
            features: [
                'AI-powered natural language search',
                'Intelligent property recommendations',
                'Detailed property analysis reports',
                'Renovation cost estimates',
                'Neighborhood insights & trends',
                'Save unlimited properties',
                'Priority email & chat support',
                'Price drop alerts',
                'Virtual tour scheduling'
            ],
            limitations: []
        },
        {
            id: 'premium',
            name: 'Premium Seller',
            description: 'Complete solution for property sellers and agents',
            icon: <Home className="w-6 h-6" />,
            monthly: 79,
            yearly: 799,
            popular: false,
            features: [
                'Everything in Smart Buyer',
                'List unlimited properties',
                'AI renovation analysis for listings',
                'Professional photography tips',
                'Contractor network access',
                'Lead management dashboard',
                'Market analysis reports',
                'Featured listing placement',
                'Dedicated account manager',
                'Phone support',
                'Custom branding options'
            ],
            limitations: []
        },
        {
            id: 'enterprise',
            name: 'Enterprise Pro',
            description: 'Advanced tools for real estate professionals',
            icon: <Award className="w-6 h-6" />,
            monthly: 199,
            yearly: 1999,
            popular: false,
            features: [
                'Everything in Premium Seller',
                'White-label solution',
                'Advanced analytics dashboard',
                'API access for integrations',
                'Bulk property management',
                'Team collaboration tools',
                'Custom AI model training',
                'Priority contractor matching',
                'Multi-location support',
                '24/7 phone support',
                'Custom reporting',
                'Dedicated success manager'
            ],
            limitations: []
        }
    ];

    const getPlanPrice = (plan) =>
        billingCycle === 'monthly' ? plan.monthly : plan.yearly;

    const getSavings = (plan) => {
        if (plan.monthly === 0) return 0;
        const yearlyMonthly = plan.yearly / 12;
        return Math.round(((plan.monthly - yearlyMonthly) / plan.monthly) * 100);
    };

    return (
        <>
            <PageHeader
                title="Our Pricing Plans"
                subtitle="Choose the plan that fits your needs. Transparent, affordable, and flexible options for everyone."
                backgroundImage="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1500&q=80"
            />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-700 via-indigo-800 to-purple-700 dark:from-indigo-400 dark:via-indigo-500 dark:to-purple-500 bg-clip-text text-transparent mb-4">
                            Choose Your Perfect Plan
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                            From AI-powered property search to renovation analysis, find the right plan for your real estate journey
                        </p>

                        <div className="inline-flex items-center bg-white/80 dark:bg-gray-700/60 backdrop-blur-sm p-1 rounded-xl border border-blue-200 dark:border-gray-600">
                            {['monthly', 'yearly'].map((cycle) => (
                                <button
                                    key={cycle}
                                    onClick={() => setBillingCycle(cycle)}
                                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 relative ${
                                        billingCycle === cycle
                                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                            : 'text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                                >
                                    {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
                                    {cycle === 'yearly' && (
                                        <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Save 20%
                      </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {plans.map((plan) => (
                            <div
                                key={plan.id}
                                onMouseEnter={() => setHoveredPlan(plan.id)}
                                onMouseLeave={() => setHoveredPlan(null)}
                                className={`relative bg-white/70 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border transition-all duration-300 ${
                                    plan.popular
                                        ? 'border-blue-300 dark:border-indigo-400 shadow-xl scale-105 lg:scale-110'
                                        : 'border-gray-200 dark:border-gray-600 hover:border-blue-200 hover:shadow-lg'
                                } ${hoveredPlan === plan.id ? 'transform -translate-y-2' : ''}`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1 shadow-md">
                                            <Star className="w-4 h-4" />
                                            Most Popular
                                        </div>
                                    </div>
                                )}

                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`p-2 rounded-lg ${
                                            plan.popular ? 'bg-blue-100 text-blue-600 dark:bg-blue-700/30 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                                        }`}>
                                            {plan.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">{plan.description}</p>

                                    <div className="mb-6">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                                ${getPlanPrice(plan)}
                                            </span>
                                            {plan.monthly > 0 && (
                                                <span className="text-gray-600 dark:text-gray-300">
                                                    /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                                                </span>
                                            )}
                                        </div>
                                        {billingCycle === 'yearly' && plan.monthly > 0 && (
                                            <div className="text-sm text-green-600 font-medium">
                                                Save {getSavings(plan)}% annually
                                            </div>
                                        )}
                                    </div>

                                    <button className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 mb-6 ${
                                        plan.popular
                                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md'
                                            : 'bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600'
                                    }`}>
                                        {plan.monthly === 0 ? 'Get Started Free' : 'Start Free Trial'}
                                    </button>

                                    <div className="space-y-3">
                                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">What's included:</h4>
                                        {plan.features.map((feature, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                                                    plan.popular ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'
                                                }`} />
                                                <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Platform Features */}
                    <div className="bg-white/60 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border border-gray-200 dark:border-gray-600 p-8 mb-12">
                        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
                            Platform Features & AI Capabilities
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { icon: <Bot className="w-8 h-8 text-blue-600 dark:text-blue-400" />, title: 'AI Property Search', desc: 'Natural language search - just describe your dream home and let AI find it' },
                                { icon: <Camera className="w-8 h-8 text-purple-600 dark:text-purple-400" />, title: 'Renovation Analysis', desc: 'AI analyzes property images to determine renovation needs and estimates' },
                                { icon: <Users className="w-8 h-8 text-green-600 dark:text-green-400" />, title: 'Contractor Network', desc: 'Connect with verified contractors based on location, reviews, and ratings' },
                                { icon: <MapPin className="w-8 h-8 text-orange-600 dark:text-orange-400" />, title: 'Location Intelligence', desc: 'Neighborhood insights, market trends, and location-based recommendations' }
                            ].map(({ icon, title, desc }, i) => (
                                <div key={i} className="text-center">
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-opacity-20 dark:bg-opacity-20" style={{ backgroundColor: icon.props.className.includes('blue') ? '#bfdbfe' : '' }}>
                                        {icon}
                                    </div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Final CTA */}
                    <div className="text-center bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            Need a Custom Solution?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                            Our Enterprise plan can be customized for large real estate agencies, property management companies,
                            and organizations with specific requirements.
                        </p>
                        <Link
                            to="/contact"
                            className="bg-gray-900 dark:bg-gray-700 text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-300"
                        >
                            Contact Sales Team
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PricingPlans;
