import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, MapPin, Check, Plus, X } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardBody } from '../components/ui/Card';
import Input, { Select } from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import api from '../utils/api';

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    skills: [],
    availability: '',
    location: '',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    imageFile: null
  });

  // Helper function to get full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:5000${imagePath}`;
  };

  const skillsList = [
    'Teaching', 'Medical', 'Food Donation', 'Emergency Support', 
    'Counseling', 'Event Management', 'Legal Aid', 'Tech Support'
  ];

  const cities = [
    { value: 'New Delhi', label: 'New Delhi' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Bangalore', label: 'Bangalore' },
    { value: 'Chennai', label: 'Chennai' },
    { value: 'Kolkata', label: 'Kolkata' },
    { value: 'Pune', label: 'Pune' },
    { value: 'Hyderabad', label: 'Hyderabad' }
  ];

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const { data } = await api.get('/volunteers');
        setVolunteers(data);
      } catch (error) {
        console.error('Error fetching volunteers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVolunteers();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSkillToggle = (skill) => {
    setFormData(prev => {
      if (prev.skills.includes(skill)) {
        return { ...prev, skills: prev.skills.filter(s => s !== skill) };
      } else {
        return { ...prev, skills: [...prev.skills, skill] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.skills.length === 0) {
      alert('Please select at least one skill');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('location', formData.location);
    data.append('availability', formData.availability);
    data.append('skills', JSON.stringify(formData.skills));
    if (formData.imageFile) {
      data.append('image', formData.imageFile);
    }

    try {
      const { data: response } = await api.post('/volunteers', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setVolunteers(prev => [response, ...prev]);
      setIsModalOpen(false);
      setFormData({
        name: '',
        skills: [],
        availability: '',
        location: '',
        image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        imageFile: null
      });
    } catch (error) {
      console.error('Error registering volunteer:', error);
      const errorMessage = error.response?.data?.message || 'Failed to register. Please try again.';
      alert(errorMessage);
    }
  };

  const filteredVolunteers = volunteers.filter(v => 
    v.location.toLowerCase().includes(filter.toLowerCase()) ||
    v.skills.some(s => s.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Community Heroes</h1>
          <p className="text-gray-600 text-lg mb-8">
            Join thousands of volunteers making a difference every day. Your skills can change lives.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" icon={Plus} onClick={() => setIsModalOpen(true)}>
              Join as Volunteer
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <Input 
            placeholder="Search by location or skill..." 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="shadow-sm"
          />
        </div>

        {/* Volunteer Grid */}
        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredVolunteers.map((volunteer) => (
                <motion.div
                  key={volunteer._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  layout
                >
                  <Card className="h-full text-center">
                    <CardBody className="pt-8">
                      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-primary-100">
                        <img 
                          src={getImageUrl(volunteer.image)} 
                          alt={volunteer.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80';
                          }}
                        />
                      </div>
                      <h3 className="text-xl font-bold mb-1">{volunteer.name}</h3>
                      <div className="flex items-center justify-center text-gray-500 text-sm mb-4">
                        <MapPin className="w-4 h-4 mr-1" />
                        {volunteer.location}
                      </div>
                      
                      <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {volunteer.skills.map((skill, idx) => (
                          <Badge key={idx} variant="info">{skill}</Badge>
                        ))}
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-6">
                        <span className="font-medium">Availability:</span> {volunteer.availability}
                      </div>
                      
                      <Button variant="outline" size="sm" className="w-full">
                        Contact
                      </Button>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Registration Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                <h2 className="text-xl font-bold">Volunteer Registration</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-gray-100 mb-2 overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center relative group">
                    {formData.imageFile ? (
                      <img 
                        src={URL.createObjectURL(formData.imageFile)} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400 text-center p-2">
                        <span className="text-xs">Upload Photo</span>
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files[0]) {
                          setFormData(prev => ({ ...prev, imageFile: e.target.files[0] }));
                        }
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                  <span className="text-xs text-gray-500">Click to upload photo</span>
                </div>

                <Input 
                  id="name"
                  label="Full Name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Select 
                    id="location"
                    label="City"
                    options={cities}
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                  <Select 
                    id="availability"
                    label="Availability"
                    options={[
                      { value: 'Weekdays', label: 'Weekdays' },
                      { value: 'Weekends', label: 'Weekends' },
                      { value: 'Anytime', label: 'Anytime' }
                    ]}
                    value={formData.availability}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skills (Select multiple)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {skillsList.map(skill => (
                      <div 
                        key={skill}
                        onClick={() => handleSkillToggle(skill)}
                        className={`
                          cursor-pointer p-2 rounded-lg border text-sm flex items-center transition-all
                          ${formData.skills.includes(skill) 
                            ? 'border-primary-500 bg-primary-50 text-primary-700' 
                            : 'border-gray-200 hover:border-primary-200'}
                        `}
                      >
                        <div className={`
                          w-4 h-4 rounded border mr-2 flex items-center justify-center
                          ${formData.skills.includes(skill) ? 'bg-primary-500 border-primary-500' : 'border-gray-300'}
                        `}>
                          {formData.skills.includes(skill) && <Check className="w-3 h-3 text-white" />}
                        </div>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <Button type="button" variant="ghost" className="flex-1" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    Register
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Volunteers;
