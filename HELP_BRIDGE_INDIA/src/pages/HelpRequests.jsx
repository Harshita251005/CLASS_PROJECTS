import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Filter, Plus, X } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardBody } from '../components/ui/Card';
import Input, { TextArea, Select } from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import api from '../utils/api';

const HelpRequests = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    search: ''
  });
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    city: '',
    contact: ''
  });

  const categories = [
    { value: 'Medical', label: 'Medical Help' },
    { value: 'Education', label: 'Education Support' },
    { value: 'Food', label: 'Food Donation' },
    { value: 'Lost & Found', label: 'Lost & Found' },
    { value: 'Old-age', label: 'Old-age Assistance' },
    { value: 'Other', label: 'Other' }
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
    const fetchRequests = async () => {
      try {
        const { data } = await api.get('/help-requests');
        setRequests(data);
        setFilteredRequests(data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  useEffect(() => {
    let result = requests;

    if (filters.category) {
      result = result.filter(req => req.category === filters.category);
    }

    if (filters.location) {
      result = result.filter(req => req.city === filters.location);
    }

    if (filters.search) {
      const query = filters.search.toLowerCase();
      result = result.filter(req => 
        req.description.toLowerCase().includes(query) || 
        req.name.toLowerCase().includes(query)
      );
    }

    setFilteredRequests(result);
  }, [filters, requests]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/help-requests', formData);
      setRequests(prev => [data, ...prev]);
      setIsModalOpen(false);
      setFormData({
        name: '',
        category: '',
        description: '',
        city: '',
        contact: ''
      });
    } catch (error) {
      console.error('Error creating request:', error);
      alert('Failed to create request. Please try again.');
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Medical': return 'danger';
      case 'Education': return 'info';
      case 'Food': return 'warning';
      case 'Old-age': return 'primary';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Help Requests</h1>
            <p className="text-gray-600">Browse active requests or post your own requirement.</p>
          </div>
          <Button icon={Plus} onClick={() => setIsModalOpen(true)}>
            Post Request
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardBody className="py-6">
            <div className="grid md:grid-cols-3 gap-4">
              <Input 
                placeholder="Search requests..." 
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="pl-10"
              />
              <Select 
                placeholder="Filter by Category"
                options={categories}
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              />
              <Select 
                placeholder="Filter by City"
                options={cities}
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
          </CardBody>
        </Card>

        {/* Request Grid */}
        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredRequests.map((req) => (
                <motion.div
                  key={req._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  layout
                >
                  <Card className="h-full flex flex-col">
                    <CardBody>
                      <div className="flex justify-between items-start mb-4">
                        <Badge variant={getCategoryColor(req.category)}>{req.category}</Badge>
                        <Badge variant={req.status === 'Open' ? 'success' : 'secondary'}>{req.status}</Badge>
                      </div>
                      <h3 className="text-lg font-bold mb-2 line-clamp-1">{req.name}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3 text-sm flex-grow">
                        {req.description}
                      </p>
                      
                      <div className="space-y-2 text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                          {req.city}
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">Contact:</span>
                          {req.contact}
                        </div>
                        <div className="text-xs text-gray-400 mt-2">
                          Posted on: {new Date(req.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full mt-4" size="sm">
                        Offer Help
                      </Button>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {!loading && filteredRequests.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No requests found</h3>
            <p className="text-gray-500">Try adjusting your filters or post a new request.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold">Post Help Request</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <Input 
                  id="name"
                  label="Your Name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Select 
                    id="category"
                    label="Category"
                    options={categories}
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  />
                  <Select 
                    id="city"
                    label="City"
                    options={cities}
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Input 
                  id="contact"
                  label="Contact Info"
                  placeholder="Phone number or email"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                />

                <TextArea 
                  id="description"
                  label="Description"
                  placeholder="Describe what help you need in detail..."
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />

                <div className="pt-4 flex gap-3">
                  <Button type="button" variant="ghost" className="flex-1" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    Submit Request
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

export default HelpRequests;
