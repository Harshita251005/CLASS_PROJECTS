import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Globe, MapPin, ExternalLink, Plus, X } from 'lucide-react';
import Card, { CardBody, CardImage } from '../components/ui/Card';
import Input, { Select } from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import api from '../utils/api';

const NGODirectory = () => {
  const [ngos, setNgos] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    address: '',
    website: '',
    verified: false,
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    imageFile: null
  });

  // Helper function to get full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:5000${imagePath}`;
  };

  const categories = ['All', 'Child Care', 'Environment', 'Women Safety', 'Animal Rescue', 'Education', 'Healthcare'];

  useEffect(() => {
    const fetchNgos = async () => {
      try {
        const { data } = await api.get('/ngos');
        setNgos(data);
      } catch (error) {
        console.error('Error fetching NGOs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNgos();
  }, []);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [id]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('address', formData.address);
    data.append('website', formData.website);
    data.append('verified', formData.verified);
    if (formData.imageFile) {
      data.append('image', formData.imageFile);
    }

    console.log('Submitting NGO registration...');
    console.log('Form Data:', {
      name: formData.name,
      category: formData.category,
      address: formData.address,
      website: formData.website,
      verified: formData.verified,
      hasImage: !!formData.imageFile
    });

    try {
      // Don't set Content-Type header - axios will set it automatically with boundary
      const { data: response } = await api.post('/ngos', data);
      console.log('Registration successful:', response);
      setNgos(prev => [response, ...prev]);
      setIsModalOpen(false);
      setFormData({
        name: '',
        category: '',
        address: '',
        website: '',
        verified: false,
        image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        imageFile: null
      });
      alert('NGO registered successfully!');
    } catch (error) {
      console.error('Error registering NGO:', error);
      console.error('Error response:', error.response);
      console.error('Error data:', error.response?.data);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to register. Please try again.';
      alert(`Registration failed: ${errorMessage}`);
    }
  };

  const filteredNgos = activeCategory === 'All' 
    ? ngos 
    : ngos.filter(ngo => ngo.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4">Partner NGOs</h1>
          <p className="text-gray-600 text-lg mb-8">
            Discover and support verified organizations working tirelessly for social welfare.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" icon={Plus} onClick={() => setIsModalOpen(true)}>
              Register NGO
            </Button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all
                ${activeCategory === category 
                  ? 'bg-primary-600 text-white shadow-lg scale-105' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'}
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* NGO Grid */}
        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode='wait'>
              {filteredNgos.map((ngo) => (
                <motion.div
                  key={ngo._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  layout
                >
                  <Card className="h-full flex flex-col">
                    <CardImage src={getImageUrl(ngo.image)} alt={ngo.name} className="h-48" />
                    <CardBody className="flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="primary">{ngo.category}</Badge>
                        {ngo.verified && (
                          <Badge variant="success" className="flex items-center">
                            Verified
                          </Badge>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2">{ngo.name}</h3>
                      
                      <div className="space-y-2 text-gray-600 mb-6 flex-grow">
                        <div className="flex items-start">
                          <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-sm">{ngo.address}</span>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-auto">
                        <a href={ngo.website} target="_blank" rel="noopener noreferrer" className="flex-1">
                          <Button variant="outline" size="sm" className="w-full" icon={Globe}>
                            Website
                          </Button>
                        </a>
                        <Button size="sm" className="flex-1" icon={ExternalLink}>
                          Donate
                        </Button>
                      </div>
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
                <h2 className="text-xl font-bold">Register NGO</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-full h-40 rounded-lg bg-gray-100 mb-2 overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center relative group">
                    {formData.imageFile ? (
                      <img 
                        src={URL.createObjectURL(formData.imageFile)} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400 text-center p-2">
                        <span className="text-sm">Upload NGO Image</span>
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
                  <span className="text-xs text-gray-500">Click to upload image (recommended: 800x400px)</span>
                </div>

                <Input 
                  id="name"
                  label="Organization Name"
                  placeholder="Enter NGO name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                
                <Select 
                  id="category"
                  label="Category"
                  options={[
                    { value: 'Child Care', label: 'Child Care' },
                    { value: 'Environment', label: 'Environment' },
                    { value: 'Women Safety', label: 'Women Safety' },
                    { value: 'Animal Rescue', label: 'Animal Rescue' },
                    { value: 'Education', label: 'Education' },
                    { value: 'Healthcare', label: 'Healthcare' }
                  ]}
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                />

                <Input 
                  id="address"
                  label="Address"
                  placeholder="Full address with city"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />

                <Input 
                  id="website"
                  label="Website URL"
                  placeholder="https://example.org"
                  type="url"
                  value={formData.website}
                  onChange={handleInputChange}
                  required
                />

                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox"
                    id="verified"
                    checked={formData.verified}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="verified" className="text-sm text-gray-700">
                    Mark as Verified Organization
                  </label>
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

export default NGODirectory;
