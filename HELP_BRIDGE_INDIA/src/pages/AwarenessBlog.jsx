import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, User, Tag, ArrowRight, Plus, Edit } from 'lucide-react';
import Card, { CardBody, CardImage } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import AddBlogModal from '../components/AddBlogModal';
import api from '../utils/api';

const AwarenessBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBlogs = async () => {
    try {
      const { data } = await api.get('/blogs');
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSuccess = (newBlog) => {
    // Add the new blog to the beginning of the list
    setBlogs([newBlog, ...blogs]);
    alert('Blog article published successfully!');
  };

  const featuredPost = blogs[0];
  const recentPosts = blogs.slice(1);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="info" className="mb-4">Knowledge Hub</Badge>
          <h1 className="text-4xl font-bold mb-4">Awareness Blog</h1>
          <p className="text-gray-600 text-lg mb-6">
            Stay informed about social issues, legal rights, and success stories from our community.
          </p>
          <Button 
            onClick={() => setIsModalOpen(true)}
            icon={Plus}
            className="mt-4"
          >
            Add Blog Article
          </Button>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="h-64 md:h-auto relative">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    className="w-full h-full object-cover absolute inset-0"
                  />
                </div>
                <CardBody className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <Badge variant="primary">{featuredPost.category}</Badge>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-4">{featuredPost.title}</h2>
                  <p className="text-gray-600 mb-6 text-lg">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <User className="w-5 h-5 text-gray-500" />
                      </div>
                      <div>
                        <div className="font-bold text-sm">{featuredPost.author}</div>
                        <div className="text-xs text-gray-500">{new Date(featuredPost.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <Button variant="ghost" icon={ArrowRight}>Read Article</Button>
                  </div>
                </CardBody>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Recent Posts Grid */}
        <h2 className="text-2xl font-bold mb-8">Recent Articles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col hover:shadow-xl transition-shadow">
                <CardImage src={post.image} alt={post.title} className="h-48" />
                <CardBody className="flex-grow flex flex-col p-6">
                  <div className="flex justify-between items-center mb-4">
                    <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="pt-4 border-t border-gray-100 mt-auto flex justify-between items-center">
                    <span className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</span>
                    <Button variant="ghost" size="sm" className="text-primary-600 p-0 hover:bg-transparent">
                      Read More <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add Blog Modal */}
      <AddBlogModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default AwarenessBlog;
