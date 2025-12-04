import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Shield, Heart, AlertTriangle, Truck, UserPlus, Copy, Check } from 'lucide-react';
import Card, { CardBody } from '../components/ui/Card';

const EmergencyHelpline = () => {
  const [copied, setCopied] = React.useState(null);

  const copyToClipboard = (number) => {
    navigator.clipboard.writeText(number);
    setCopied(number);
    setTimeout(() => setCopied(null), 2000);
  };

  const helplines = [
    {
      title: 'Police',
      number: '100',
      icon: Shield,
      color: 'bg-blue-100 text-blue-600',
      desc: 'For immediate police assistance in case of crime or emergency.'
    },
    {
      title: 'Ambulance',
      number: '102',
      icon: Truck,
      color: 'bg-red-100 text-red-600',
      desc: 'Medical emergency transport service.'
    },
    {
      title: 'Women Helpline',
      number: '1091',
      icon: Heart,
      color: 'bg-pink-100 text-pink-600',
      desc: '24/7 support for women in distress.'
    },
    {
      title: 'Child Helpline',
      number: '1098',
      icon: UserPlus,
      color: 'bg-yellow-100 text-yellow-600',
      desc: 'Emergency assistance for children in need of care and protection.'
    },
    {
      title: 'Disaster Management',
      number: '108',
      icon: AlertTriangle,
      color: 'bg-orange-100 text-orange-600',
      desc: 'For natural disasters, accidents, and trauma care.'
    },
    {
      title: 'Senior Citizen Helpline',
      number: '14567',
      icon: UserPlus,
      color: 'bg-purple-100 text-purple-600',
      desc: 'Support and assistance for elderly citizens.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-red-100 text-red-600 rounded-full mb-6">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Emergency Helplines</h1>
          <p className="text-gray-600 text-lg">
            Quick access to essential emergency numbers. Click to copy or call directly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {helplines.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:border-red-200 hover:shadow-red-50">
                <CardBody className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center`}>
                      <item.icon className="w-7 h-7" />
                    </div>
                    <button 
                      onClick={() => copyToClipboard(item.number)}
                      className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                      title="Copy number"
                    >
                      {copied === item.number ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm mb-6 h-10">{item.desc}</p>
                  
                  <a 
                    href={`tel:${item.number}`}
                    className="flex items-center justify-center w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-xl hover:bg-primary-600 transition-colors"
                  >
                    <Phone className="w-5 h-5 mr-3" />
                    {item.number}
                  </a>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-blue-900 mb-2">Need to report an issue?</h3>
          <p className="text-blue-700 mb-6">
            If you witness any social injustice or need non-emergency assistance, please use our contact form.
          </p>
          <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmergencyHelpline;
