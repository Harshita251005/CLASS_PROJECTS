import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, ArrowRight, Plus } from 'lucide-react';
import Card, { CardBody, CardImage } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import AddDonationDriveModal from '../components/AddDonationDriveModal';
import api from '../utils/api';

const DonationDrives = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchEvents = async () => {
    try {
      const { data } = await api.get('/events');
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSuccess = (newEvent) => {
    // Add the new event to the list
    setEvents([...events, newEvent]);
    // Show success message
    alert('Donation drive created successfully!');
  };

  const handleParticipate = async (id) => {
    try {
      await api.post(`/events/${id}/participate`);
      alert('You have successfully registered for this event!');
    } catch (error) {
      console.error('Error participating:', error);
      alert('Failed to register. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="primary" className="mb-4">Get Involved</Badge>
          <h1 className="text-4xl font-bold mb-4">Upcoming Donation Drives</h1>
          <p className="text-gray-600 text-lg mb-6">
            Join our community events and make a direct impact. From blood donation camps to food drives, every participation counts.
          </p>
          <Button 
            onClick={() => setIsModalOpen(true)}
            icon={Plus}
            className="mt-4"
          >
            Add Donation Drive
          </Button>
        </div>

        {/* Events List */}
        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : (
          <div className="space-y-8 mb-20">
            {events.map((event, index) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-64 md:h-auto relative">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover absolute inset-0"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-center shadow-sm">
                        <div className="text-xs font-bold text-gray-500 uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</div>
                        <div className="text-2xl font-bold text-primary-600">{new Date(event.date).getDate()}</div>
                      </div>
                    </div>
                    
                    <CardBody className="md:w-2/3 p-8 flex flex-col justify-center">
                      <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
                      <p className="text-gray-600 mb-6 text-lg">
                        {event.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-5 h-5 mr-3 text-primary-500" />
                          {event.time}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-5 h-5 mr-3 text-primary-500" />
                          {event.venue}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <Button onClick={() => handleParticipate(event._id)}>
                          Participate Now
                        </Button>
                        <Button variant="outline" icon={ArrowRight}>
                          View Details
                        </Button>
                      </div>
                    </CardBody>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Gallery Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Past Events Gallery</h2>
          <p className="text-gray-600">Glimpses of our community in action</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { id: 1, image: '/gallery-1.png', alt: 'Blood Donation Camp' },
            { id: 2, image: '/gallery-2.png', alt: 'Food Distribution Drive' },
            { id: 3, image: '/gallery-3.png', alt: 'Clothes Donation Event' },
            { id: 4, image: '/gallery-4.png', alt: 'Community Cleanup Drive' },
          ].map((item) => (
            <motion.div 
              key={item.id}
              whileHover={{ scale: 1.02 }}
              className="rounded-xl overflow-hidden h-48 shadow-md"
            >
              <img 
                src={item.image} 
                alt={item.alt} 
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add Donation Drive Modal */}
      <AddDonationDriveModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default DonationDrives;
