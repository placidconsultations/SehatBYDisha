// src/data.js

export const pricingTiers = [
  {
    id: 'basic',
    title: 'Nourish Basic',
    subtitle: 'Ideal for kickstarting healthy habits.',
    monthlyPrice: 17,
    annualPrice: 15, // $180 billed yearly ($15/month)
    features: [
      { text: 'Access to meal planning tools', included: true },
      { text: 'Recipe database access', included: true },
      { text: 'Weekly check-in reminders', included: true },
      { text: 'Manage up to 5 personalized recipes', included: true },
      { text: 'Track daily calorie intake', included: false },
      { text: 'Assign and monitor progress photos', included: false },
      { text: 'Direct chat support with dietitian', included: false },
      { text: 'Customized goal setting sessions', included: false },
    ],
    ctaText: 'Start Simple Plan',
    active: true, 
  },
  {
    id: 'pro',
    title: 'Balance Pro',
    subtitle: 'Comprehensive plan for lasting lifestyle change.',
    monthlyPrice: 26,
    annualPrice: 19, // $228 billed yearly ($19/month)
    savePercentage: 27,
    popular: true, 
    features: [
      { text: 'Access to meal planning tools', included: true },
      { text: 'Recipe database access', included: true },
      { text: 'Weekly check-in reminders', included: true },
      { text: 'Manage up to 20 personalized recipes', included: true },
      { text: 'Track daily calorie intake', included: true },
      { text: 'Assign and monitor progress photos', included: true },
      { text: 'Direct chat support with dietitian', included: false },
      { text: 'Customized goal setting sessions', included: false },
    ],
    ctaText: 'Start 7-days Free Trial',
    highlight: true, // The dark, highlighted card
  },
  {
    id: 'master',
    title: 'Wellness Master',
    subtitle: 'Maximize results with premium, support.',
    monthlyPrice: 34,
    annualPrice: 30, // $360 billed yearly ($30/month)
    popular: true, 
    features: [
      { text: 'Access to meal planning tools', included: true },
      { text: 'Recipe database access', included: true },
      { text: 'Weekly check-in reminders', included: true },
      { text: 'Manage unlimited personalized recipes', included: true },
      { text: 'Track daily calorie intake', included: true },
      { text: 'Assign and monitor progress photos', included: true },
      { text: 'Direct chat support with dietitian', included: true },
      { text: 'Customized goal setting sessions', included: true },
    ],
    ctaText: 'Start 7-days Free Trial',
  },
  {
    id: 'Hmaster',
    title: 'Pro Master',
    subtitle: 'Maximize results with premium, support.',
    monthlyPrice: 34,
    annualPrice: 30, // $360 billed yearly ($30/month)
    popular: true, 
    features: [
      { text: 'Access to meal planning tools', included: true },
      { text: 'Recipe database access', included: true },
      { text: 'Weekly check-in reminders', included: true },
      { text: 'Manage unlimited personalized recipes', included: true },
      { text: 'Track daily calorie intake', included: true },
      { text: 'Assign and monitor progress photos', included: true },
      { text: 'Direct chat support with dietitian', included: true },
      { text: 'Customized goal setting sessions', included: true },
    ],
    ctaText: 'Start 7-days Free Trial',
  },
];