import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaRedo, FaStar } from 'react-icons/fa';

const skillCategories = [
  {
    name: 'Programming & Development',
    skills: [
      { name: 'Python', level: 0 },
      { name: 'JavaScript', level: 0 },
      { name: 'Data Structures & Algorithms', level: 0 },
      { name: 'Web Development', level: 0 }
    ]
  },
  {
    name: 'Design & Creativity',
    skills: [
      { name: 'Graphic Design', level: 0 },
      { name: 'UI/UX Design', level: 0 },
      { name: 'Video Editing', level: 0 },
      { name: 'Creative Thinking', level: 0 }
    ]
  },
  {
    name: 'Business & Management',
    skills: [
      { name: 'Leadership', level: 0 },
      { name: 'Project Management', level: 0 },
      { name: 'Business Analysis', level: 0 },
      { name: 'Strategic Planning', level: 0 }
    ]
  },
  {
    name: 'Communication & Soft Skills',
    skills: [
      { name: 'Public Speaking', level: 0 },
      { name: 'Written Communication', level: 0 },
      { name: 'Team Collaboration', level: 0 },
      { name: 'Problem Solving', level: 0 }
    ]
  }
];

const SkillAssessment = () => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [skillRatings, setSkillRatings] = useState(
    skillCategories.map(cat => ({
      ...cat,
      skills: cat.skills.map(skill => ({ ...skill }))
    }))
  );
  const [showResults, setShowResults] = useState(false);

  const handleRating = (categoryIndex, skillIndex, rating) => {
    const newRatings = [...skillRatings];
    newRatings[categoryIndex].skills[skillIndex].level = rating;
    setSkillRatings(newRatings);
  };

  const handleNext = () => {
    if (currentCategory < skillCategories.length - 1) {
      setCurrentCategory(currentCategory + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentCategory > 0) {
      setCurrentCategory(currentCategory - 1);
    }
  };

  const restartAssessment = () => {
    setCurrentCategory(0);
    setSkillRatings(
      skillCategories.map(cat => ({
        ...cat,
        skills: cat.skills.map(skill => ({ ...skill, level: 0 }))
      }))
    );
    setShowResults(false);
  };

  const getStrongSkills = () => {
    const allSkills = [];
    skillRatings.forEach(category => {
      category.skills.forEach(skill => {
        if (skill.level >= 4) {
          allSkills.push({ ...skill, category: category.name });
        }
      });
    });
    return allSkills;
  };

  const getWeakSkills = () => {
    const allSkills = [];
    skillRatings.forEach(category => {
      category.skills.forEach(skill => {
        if (skill.level > 0 && skill.level <= 2) {
          allSkills.push({ ...skill, category: category.name });
        }
      });
    });
    return allSkills;
  };

  const getRecommendedCareers = () => {
    const strongSkills = getStrongSkills();
    const recommendations = [];

    const hasSkill = (skillName) => strongSkills.some(s => s.name.toLowerCase().includes(skillName.toLowerCase()));

    if (hasSkill('python') || hasSkill('javascript') || hasSkill('data structures')) {
      recommendations.push('Software Engineer');
    }
    if (hasSkill('design') || hasSkill('creative')) {
      recommendations.push('Graphic Designer');
    }
    if (hasSkill('leadership') || hasSkill('management')) {
      recommendations.push('Business Analyst');
    }
    if (hasSkill('communication') || hasSkill('speaking')) {
      recommendations.push('Content Creator');
    }

    return recommendations.length > 0 ? recommendations : ['Explore Career Categories'];
  };

  if (showResults) {
    const strongSkills = getStrongSkills();
    const weakSkills = getWeakSkills();
    const recommendedCareers = getRecommendedCareers();

    return (
      <div className="min-h-screen bg-light dark:bg-slate-900 py-12 transition-colors duration-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-slate-700"
          >
            <div className="text-center mb-8">
              <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-dark dark:text-white mb-2">Assessment Complete!</h1>
              <p className="text-gray-600 dark:text-gray-300">Here's your skill analysis</p>
            </div>

            {/* Strong Skills */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-dark dark:text-white mb-4">Your Strong Skills 💪</h2>
              {strongSkills.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {strongSkills.map((skill, index) => (
                    <div key={index} className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <h3 className="font-semibold text-dark dark:text-white">{skill.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{skill.category}</p>
                      <div className="flex mt-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < skill.level ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No strong skills identified. Consider rating yourself higher!</p>
              )}
            </div>

            {/* Skills to Improve */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-dark dark:text-white mb-4">Skills to Improve 📈</h2>
              {weakSkills.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {weakSkills.map((skill, index) => (
                    <div key={index} className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                      <h3 className="font-semibold text-dark dark:text-white">{skill.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{skill.category}</p>
                      <div className="flex mt-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < skill.level ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">Great! No weak areas identified.</p>
              )}
            </div>

            {/* Recommended Careers */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-dark dark:text-white mb-4">Recommended Careers 🎯</h2>
              <div className="flex flex-wrap gap-3">
                {recommendedCareers.map((career, index) => (
                  <span key={index} className="bg-indigo-100 dark:bg-indigo-900/30 text-primary dark:text-indigo-300 px-4 py-2 rounded-full font-semibold">
                    {career}
                  </span>
                ))}
              </div>
            </div>

            {/* Recommended Courses */}
            <div className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-dark dark:text-white mb-4">Recommended Learning Path 📚</h2>
              <ul className="space-y-2">
                <li className="flex items-start text-gray-700 dark:text-gray-300">
                  <span className="text-primary mr-2">•</span>
                  <span>Visit our <Link to="/resources" className="text-primary hover:underline">Resources Page</Link> for curated courses</span>
                </li>
                <li className="flex items-start text-gray-700 dark:text-gray-300">
                  <span className="text-primary mr-2">•</span>
                  <span>Practice on platforms like Coursera, Udemy, and YouTube</span>
                </li>
                <li className="flex items-start text-gray-700 dark:text-gray-300">
                  <span className="text-primary mr-2">•</span>
                  <span>Join communities and attend workshops</span>
                </li>
              </ul>
            </div>

            <div className="text-center space-y-4">
              <button
                onClick={restartAssessment}
                className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-colors"
              >
                <FaRedo className="mr-2" /> Retake Assessment
              </button>
              <div>
                <Link to="/quiz" className="text-primary hover:underline mr-4">
                  Take Career Quiz
                </Link>
                <Link to="/careers" className="text-primary hover:underline">
                  Explore Careers
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const category = skillRatings[currentCategory];
  const progress = ((currentCategory + 1) / skillCategories.length) * 100;

  return (
    <div className="min-h-screen bg-light dark:bg-slate-900 py-12 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Category {currentCategory + 1} of {skillCategories.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Category Card */}
        <motion.div
          key={currentCategory}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-slate-700"
        >
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-6">{category.name}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Rate your proficiency in each skill (1 = Beginner, 5 = Expert)</p>

          <div className="space-y-6">
            {category.skills.map((skill, skillIndex) => (
              <div key={skillIndex}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-dark dark:text-white">{skill.name}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {skill.level === 0 ? 'Not rated' : `${skill.level}/5`}
                  </span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleRating(currentCategory, skillIndex, rating)}
                      className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                        skill.level >= rating
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentCategory === 0}
              className={`px-6 py-3 rounded-full font-semibold ${
                currentCategory === 0
                  ? 'bg-gray-200 dark:bg-slate-700 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-slate-600'
              }`}
            >
              ← Previous
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-indigo-700"
            >
              {currentCategory === skillCategories.length - 1 ? 'See Results' : 'Next →'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SkillAssessment;
