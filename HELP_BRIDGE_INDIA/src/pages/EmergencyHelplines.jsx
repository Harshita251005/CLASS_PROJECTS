import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Shield, Heart, AlertTriangle, Baby, UserPlus } from 'lucide-react';
import Card, { CardBody } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const EmergencyHelplines = () => {
  const helplines = [
    {
      category: "National Emergency",
      icon: AlertTriangle,
      color: "text-red-600",
      bg: "bg-red-100",
      numbers: [
        { name: "National Emergency Number", number: "112" },
        { name: "Police", number: "100" },
        { name: "Fire", number: "101" },
        { name: "Ambulance", number: "102" },
      ]
    },
    {
      category: "Women & Safety",
      icon: Shield,
      color: "text-purple-600",
      bg: "bg-purple-100",
      numbers: [
        { name: "Women Helpline", number: "1091" },
        { name: "Women Helpline (Domestic Abuse)", number: "181" },
        { name: "National Commission for Women", number: "011-26942369" },
      ]
    },
    {
      category: "Children",
      icon: Baby,
      color: "text-blue-600",
      bg: "bg-blue-100",
      numbers: [
        { name: "Child Helpline", number: "1098" },
        { name: "Missing Child & Women", number: "1094" },
      ]
    },
    {
      category: "Senior Citizens",
      icon: UserPlus,
      color: "text-orange-600",
      bg: "bg-orange-100",
      numbers: [
        { name: "Senior Citizen Helpline", number: "1091" }, // Often same as women or specific state ones, but 14567 is the Elder Line in India
        { name: "Elder Line (National Helpline)", number: "14567" },
      ]
    },
    {
      category: "Medical & Health",
      icon: Heart,
      color: "text-green-600",
      bg: "bg-green-100",
      numbers: [
        { name: "Ayushman Bharat Helpline", number: "14555" },
        { name: "Mental Health Helpline (Kiran)", number: "1800-599-0019" },
        { name: "Covid-19 Helpline", number: "1075" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="error" className="mb-4">Emergency Support</Badge>
          <h1 className="text-4xl font-bold mb-6">Emergency Helplines</h1>
          <p className="text-gray-600 text-lg">
            Immediate assistance is just a call away. Please use these numbers for urgent situations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {helplines.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow border-t-4" style={{ borderTopColor: section.color.replace('text-', '').replace('-600', '') }}>
                <CardBody className="p-6">
                  <div className={`w-12 h-12 ${section.bg} rounded-lg flex items-center justify-center mb-6`}>
                    <section.icon className={`w-6 h-6 ${section.color}`} />
                  </div>
                  <h2 className="text-xl font-bold mb-6">{section.category}</h2>
                  <div className="space-y-4">
                    {section.numbers.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors">
                        <span className="text-gray-700 font-medium">{item.name}</span>
                        <a 
                          href={`tel:${item.number}`} 
                          className={`font-bold ${section.color} text-lg hover:underline`}
                        >
                          {item.number}
                        </a>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-xl text-center">
          <p className="text-yellow-800">
            <strong>Note:</strong> While we strive to keep these numbers updated, please verify with local authorities if you are unable to connect. In case of extreme emergency, always dial <strong>112</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyHelplines;
