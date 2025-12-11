import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaBriefcase, FaGraduationCap, FaMapMarkerAlt, FaEdit, FaSave, FaTimes, FaCamera } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showSkillInput, setShowSkillInput] = useState(false);
  const [showInterestInput, setShowInterestInput] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [originalData, setOriginalData] = useState(null);

  // Load profile data from backend
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get('http://localhost:5000/api/profile', config);
        
        // Merge response with default structure to ensure all fields exist
        const mergedData = {
          name: response.data.name || user.name,
          email: response.data.email || user.email,
          phone: response.data.phone || '',
          location: response.data.location || '',
          occupation: response.data.occupation || '',
          education: response.data.education || '',
          bio: response.data.bio || '',
          skills: response.data.skills || [],
          interests: response.data.interests || [],
          stats: response.data.stats || {
            careersExplored: 0,
            quizzesCompleted: 0,
            skillsAnalyzed: 0
          }
        };

        setProfileData(mergedData);
        setOriginalData(mergedData);
        
        if (response.data.photo) {
          setPhotoPreview(response.data.photo);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        // Fallback to defaults if fetch fails (e.g. first time user)
        const defaultData = {
          name: user?.name || 'User',
          email: user?.email || '',
          phone: '',
          location: '',
          occupation: '',
          education: '',
          bio: '',
          skills: [],
          interests: [],
          stats: {
            careersExplored: 0,
            quizzesCompleted: 0,
            skillsAnalyzed: 0
          }
        };
        setProfileData(defaultData);
        setOriginalData(defaultData);
      }
    };

    fetchProfile();
  }, [user]);

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setProfilePhoto(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      // Prepare data to save
      const dataToSave = {
        ...profileData,
        photo: photoPreview // Save photo as base64 string for now
      };

      const response = await axios.put('http://localhost:5000/api/profile', dataToSave, config);
      
      console.log('Profile saved:', response.data);
      
      setOriginalData({ ...profileData });
      setIsEditing(false);
      setShowSkillInput(false);
      setShowInterestInput(false);
      
      alert('✅ Profile updated and saved successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('❌ Failed to save profile. Please try again.');
    }
  };

  const handleCancel = () => {
    // Reset to original data
    if (originalData) {
      setProfileData({ ...originalData });
    }
    // Revert photo if needed (complex with base64, for now just keep preview or reset if not saved)
    // Ideally we should refetch or keep original photo state
    setProfilePhoto(null);
    setIsEditing(false);
    setShowSkillInput(false);
    setShowInterestInput(false);
    setNewSkill('');
    setNewInterest('');
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
      setShowSkillInput(false);
    }
  };

  const handleRemoveSkill = (indexToRemove) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleAddInterest = () => {
    if (newInterest.trim()) {
      setProfileData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
      setShowInterestInput(false);
    }
  };

  const handleRemoveInterest = (indexToRemove) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.filter((_, index) => index !== indexToRemove)
    }));
  };

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-12 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">My Profile</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage your personal information and preferences</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden transition-colors duration-200"
        >
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative">
            <div className="absolute inset-0 bg-black opacity-10"></div>
          </div>

          {/* Profile Picture Section */}
          <div className="relative px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-20">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-40 h-40 rounded-full border-8 border-white dark:border-slate-700 shadow-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center overflow-hidden transition-colors duration-200">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <FaUser className="text-6xl text-white" />
                  )}
                </div>
                <input
                  type="file"
                  id="photoUpload"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <label
                  htmlFor="photoUpload"
                  className="absolute bottom-2 right-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-3 shadow-lg transition-colors cursor-pointer"
                >
                  <FaCamera />
                </label>
              </div>

              {/* Edit Button */}
              <div className="mt-4 md:mt-0">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                  >
                    <FaEdit />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                    >
                      <FaSave />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                    >
                      <FaTimes />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Information */}
            <div className="mt-8 space-y-6">
              {/* Name & Title */}
              <div className="border-b border-gray-200 dark:border-slate-700 pb-6">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:border-indigo-600 dark:focus:border-indigo-400 focus:outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Occupation</label>
                      <input
                        type="text"
                        value={profileData.occupation}
                        onChange={(e) => handleInputChange('occupation', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:border-indigo-600 dark:focus:border-indigo-400 focus:outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white transition-colors"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{profileData.name}</h2>
                    <p className="text-lg text-indigo-600 dark:text-indigo-400 font-semibold mt-1">{profileData.occupation}</p>
                  </>
                )}
              </div>

              {/* Bio */}
              <div className="border-b border-gray-200 dark:border-slate-700 pb-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">About Me</h3>
                {isEditing ? (
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:border-indigo-600 dark:focus:border-indigo-400 focus:outline-none bg-white dark:bg-slate-700 text-gray-900 dark:text-white transition-colors"
                  />
                ) : (
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{profileData.bio}</p>
                )}
              </div>

              {/* Contact Information */}
              <div className="border-b border-gray-200 dark:border-slate-700 pb-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="flex items-start space-x-3">
                    <FaEnvelope className="text-indigo-600 dark:text-indigo-400 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">Email</p>
                      {isEditing ? (
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-3 py-2 border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:border-indigo-600 dark:focus:border-indigo-400 focus:outline-none mt-1 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                        />
                      ) : (
                        <p className="text-gray-800 dark:text-gray-200 font-medium">{profileData.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-3">
                    <FaPhone className="text-indigo-600 dark:text-indigo-400 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">Phone</p>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-3 py-2 border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:border-indigo-600 dark:focus:border-indigo-400 focus:outline-none mt-1 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                        />
                      ) : (
                        <p className="text-gray-800 dark:text-gray-200 font-medium">{profileData.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start space-x-3">
                    <FaMapMarkerAlt className="text-indigo-600 dark:text-indigo-400 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">Location</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className="w-full px-3 py-2 border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:border-indigo-600 dark:focus:border-indigo-400 focus:outline-none mt-1 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                        />
                      ) : (
                        <p className="text-gray-800 dark:text-gray-200 font-medium">{profileData.location}</p>
                      )}
                    </div>
                  </div>

                  {/* Education */}
                  <div className="flex items-start space-x-3">
                    <FaGraduationCap className="text-indigo-600 dark:text-indigo-400 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">Education</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.education}
                          onChange={(e) => handleInputChange('education', e.target.value)}
                          className="w-full px-3 py-2 border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:border-indigo-600 dark:focus:border-indigo-400 focus:outline-none mt-1 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                        />
                      ) : (
                        <p className="text-gray-800 dark:text-gray-200 font-medium">{profileData.education}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="border-b border-gray-200 dark:border-slate-700 pb-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {profileData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2"
                    >
                      {skill}
                      {isEditing && (
                        <button
                          onClick={() => handleRemoveSkill(index)}
                          className="text-indigo-900 dark:text-indigo-200 hover:text-red-600 dark:hover:text-red-400 font-bold"
                        >
                          ×
                        </button>
                      )}
                    </span>
                  ))}
                  {isEditing && (
                    <div className="flex items-center gap-2">
                      {!showSkillInput ? (
                        <button
                          onClick={() => setShowSkillInput(true)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full font-semibold text-sm transition-colors shadow-sm"
                        >
                          + Add Skill
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 animate-fadeIn">
                          <input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                            placeholder="Enter skill"
                            className="px-3 py-2 border-2 border-indigo-300 dark:border-indigo-500 rounded-lg focus:border-indigo-600 dark:focus:border-indigo-400 focus:outline-none text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                            autoFocus
                          />
                          <button
                            onClick={handleAddSkill}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg font-semibold text-sm transition-colors"
                          >
                            Add
                          </button>
                          <button
                            onClick={() => {
                              setShowSkillInput(false);
                              setNewSkill('');
                            }}
                            className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-2 rounded-lg font-semibold text-sm transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Interests */}
              <div className="border-b border-gray-200 dark:border-slate-700 pb-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Career Interests</h3>
                <div className="flex flex-wrap gap-3">
                  {profileData.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2"
                    >
                      {interest}
                      {isEditing && (
                        <button
                          onClick={() => handleRemoveInterest(index)}
                          className="text-purple-900 dark:text-purple-200 hover:text-red-600 dark:hover:text-red-400 font-bold"
                        >
                          ×
                        </button>
                      )}
                    </span>
                  ))}
                  {isEditing && (
                    <div className="flex items-center gap-2">
                      {!showInterestInput ? (
                        <button
                          onClick={() => setShowInterestInput(true)}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full font-semibold text-sm transition-colors shadow-sm"
                        >
                          + Add Interest
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 animate-fadeIn">
                          <input
                            type="text"
                            value={newInterest}
                            onChange={(e) => setNewInterest(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}
                            placeholder="Enter interest"
                            className="px-3 py-2 border-2 border-purple-300 dark:border-purple-500 rounded-lg focus:border-purple-600 dark:focus:border-purple-400 focus:outline-none text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                            autoFocus
                          />
                          <button
                            onClick={handleAddInterest}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg font-semibold text-sm transition-colors"
                          >
                            Add
                          </button>
                          <button
                            onClick={() => {
                              setShowInterestInput(false);
                              setNewInterest('');
                            }}
                            className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-2 rounded-lg font-semibold text-sm transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Activity Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
        >
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 text-center border-t-4 border-indigo-600 transition-colors duration-200">
            <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">{profileData.stats?.careersExplored || 0}</p>
            <p className="text-gray-600 dark:text-gray-400 font-semibold">Careers Explored</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 text-center border-t-4 border-purple-600 transition-colors duration-200">
            <p className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">{profileData.stats?.quizzesCompleted || 0}</p>
            <p className="text-gray-600 dark:text-gray-400 font-semibold">Quizzes Completed</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 text-center border-t-4 border-pink-600 transition-colors duration-200">
            <p className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-2">{profileData.stats?.skillsAnalyzed || 0}</p>
            <p className="text-gray-600 dark:text-gray-400 font-semibold">Skills Analyzed</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
