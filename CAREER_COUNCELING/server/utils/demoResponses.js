// Demo responses for when OpenAI is unavailable
const demoResponses = {
  // Chatbot demo responses based on career
  chatbot: {
    'Software Engineer': {
      'how do i start': 'To start your journey as a Software Engineer:\n\n1. **Learn a programming language** - Start with Python or JavaScript\n2. **Build projects** - Create 3-5 personal projects for your portfolio\n3. **Study data structures** - Master arrays, linked lists, trees, graphs\n4. **Practice coding** - Use platforms like LeetCode, HackerRank\n5. **Learn Git** - Version control is essential\n6. **Create a GitHub profile** - Showcase your work\n\nThis foundation will take 3-6 months with consistent effort!',
      
      'salary': 'Software Engineer salaries in India:\n\n**Freshers (0-1 year)**\n- ₹3-6 LPA in service companies\n- ₹8-15 LPA in product companies\n- ₹15-25 LPA in top tech firms (Google, Microsoft)\n\n**Mid-level (2-5 years)**\n- ₹8-18 LPA average\n- ₹20-40 LPA in product companies\n\n**Senior (5+ years)**\n- ₹15-35 LPA average\n- ₹40-80 LPA+ in FAANG\n\nSkills and company matter more than years of experience!',
      
      'certifications': 'Top certifications for Software Engineers:\n\n**Cloud Platforms:**\n- AWS Certified Developer\n- Google Cloud Professional\n- Azure Developer Associate\n\n**Development:**\n- MongoDB Certified Developer\n- Oracle Java SE Programmer\n- Kubernetes (CKA)\n\n**Security:**\n- CompTIA Security+\n- Certified Ethical Hacker (CEH)\n\nFocus on skills first, certifications second!',
      
      'default': 'I\'m here to help you with your Software Engineering career! You can ask me about:\n- How to get started\n- Salary expectations\n- Required skills\n- Certifications\n- Career growth\n- Interview preparation\n\n**Note:** Currently in demo mode. For personalized AI responses, please add OpenAI credits.'
    },
    
    'default': {
      'default': 'I\'m your AI Career Mentor! I can help you with career guidance, skills development, and roadmap planning.\n\n**Demo Mode Active:** This is a sample response. For fully personalized AI guidance, please configure OpenAI API credits.\n\nYou can still explore:\n- Career details\n- Skill requirements\n- Salary information\n- Career roadmaps'
    }
  },
  
  // Quiz analysis demo response
  quizAnalysis: {
    recommendations: [
      {
        career: 'Software Engineer',
        matchPercentage: 92,
        reasoning: 'Your strong analytical thinking and problem-solving skills align perfectly with software engineering. You showed a clear preference for logical challenges and technology-focused work environments, which are core to this career.',
        strengths: [
          'Analytical and logical thinking',
          'Problem-solving aptitude',
          'Interest in technology and innovation',
          'Self-directed learning ability',
          'Detail-oriented approach'
        ],
        weaknesses: [
          'Public speaking and presentation skills',
          'Team collaboration in larger groups',
          'Design and creative visualization',
          'Business and financial acumen'
        ],
        roadmap: [
          {
            phase: 'Foundation',
            duration: '3-6 months',
            steps: [
              'Learn a programming language (Python or JavaScript)',
              'Understand basic data structures and algorithms',
              'Build 3-5 small projects (calculator, to-do list, weather app)',
              'Create a GitHub profile and commit code daily',
              'Learn Git version control basics'
            ]
          },
          {
            phase: 'Intermediate',
            duration: '6-12 months',
            steps: [
              'Master web development (HTML, CSS, JavaScript frameworks)',
              'Learn backend development (Node.js, Express, databases)',
              'Contribute to open-source projects',
              'Practice DSA on LeetCode/HackerRank (solve 100+ problems)',
              'Build 2-3 full-stack projects for portfolio',
              'Start applying for internships or junior positions'
            ]
          },
          {
            phase: 'Advanced',
            duration: '1-2 years',
            steps: [
              'Specialize in a domain (Frontend/Backend/Full-stack)',
              'Learn system design and architecture',
              'Master cloud platforms (AWS/Azure/GCP)',
              'Lead technical projects or mentor juniors',
              'Prepare for senior roles with advanced DSA and system design'
            ]
          }
        ]
      },
      {
        career: 'Data Scientist',
        matchPercentage: 85,
        reasoning: 'Your analytical mindset and interest in solving complex problems make you well-suited for data science. You demonstrated strong logical reasoning and a preference for working with patterns and insights.',
        strengths: [
          'Strong analytical capabilities',
          'Mathematical and statistical thinking',
          'Pattern recognition skills',
          'Research-oriented approach',
          'Curiosity for insights and trends'
        ],
        weaknesses: [
          'Advanced mathematics (requires building up)',
          'Business domain knowledge',
          'Data visualization and storytelling',
          'Communication of technical concepts to non-technical audiences'
        ],
        roadmap: [
          {
            phase: 'Foundation',
            duration: '4-6 months',
            steps: [
              'Learn Python programming fundamentals',
              'Study statistics and probability basics',
              'Master NumPy, Pandas, and Matplotlib libraries',
              'Understand SQL for database querying',
              'Complete beginner ML projects (linear regression, classification)'
            ]
          },
          {
            phase: 'Intermediate',
            duration: '6-12 months',
            steps: [
              'Learn machine learning algorithms (supervised/unsupervised)',
              'Practice on Kaggle competitions',
              'Master data visualization (Tableau, Power BI)',
              'Study deep learning basics (Neural Networks)',
              'Work on 3-4 end-to-end ML projects',
              'Build a portfolio showcasing your analysis work'
            ]
          },
          {
            phase: 'Advanced',
            duration: '1-2 years',
            steps: [
              'Specialize in NLP, Computer Vision, or Time Series',
              'Learn big data tools (Spark, Hadoop)',
              'Master MLOps and model deployment',
              'Contribute to research papers or open-source ML projects',
              'Develop expertise in a specific industry domain'
            ]
          }
        ]
      },
      {
        career: 'UI/UX Designer',
        matchPercentage: 78,
        reasoning: 'While your primary strengths are analytical, you showed creativity and an understanding of user needs. UI/UX combines logical thinking with creative problem-solving, which matches your profile well.',
        strengths: [
          'User empathy and understanding',
          'Problem-solving from user perspective',
          'Attention to detail',
          'Willingness to learn new tools',
          'Logical approach to design challenges'
        ],
        weaknesses: [
          'Traditional artistic skills (can be learned)',
          'Visual design principles',
          'Prototyping and wireframing experience',
          'Understanding of design psychology',
          'Portfolio development'
        ],
        roadmap: [
          {
            phase: 'Foundation',
            duration: '2-4 months',
            steps: [
              'Learn design principles (color theory, typography, layout)',
              'Master Figma or Adobe XD',
              'Study user psychology and behavior',
              'Complete Google UX Design Certificate',
              'Redesign 2-3 existing apps as practice'
            ]
          },
          {
            phase: 'Intermediate',
            duration: '4-8 months',
            steps: [
              'Learn user research methods (surveys, interviews, usability testing)',
              'Create wireframes and prototypes for real projects',
              'Build a portfolio with 3-5 case studies',
              'Study interaction design and micro-animations',
              'Apply for internships or freelance projects',
              'Join design communities (Dribbble, Behance)'
            ]
          },
          {
            phase: 'Advanced',
            duration: '1-2 years',
            steps: [
              'Specialize in UX research or visual design',
              'Learn design systems and component libraries',
              'Master advanced prototyping and motion design',
              'Lead design projects end-to-end',
              'Mentor junior designers and contribute to design communities'
            ]
          }
        ]
      }
    ],
    personalityInsights: 'Based on your responses, you demonstrate strong analytical and logical thinking abilities. You prefer structured environments with clear goals and enjoy solving complex problems. You\'re a self-motivated learner who thrives in technology-focused settings. While you excel at individual work, developing stronger communication and collaboration skills will enhance your career growth. Your detail-oriented nature and systematic approach make you well-suited for technical careers that require precision and deep focus.'
  }
};

// Helper function to get chatbot demo response
const getChatbotDemoResponse = (careerTitle, userMessage) => {
  const message = userMessage.toLowerCase();
  
  // 1. Check for specific career-based responses
  const career = demoResponses.chatbot[careerTitle] || demoResponses.chatbot.default;
  
  if (message.includes('start') || message.includes('begin') || message.includes('roadmap')) {
    return career['how do i start'] || career.default;
  }
  if (message.includes('salary') || message.includes('pay') || message.includes('money') || message.includes('earn')) {
    return career['salary'] || career.default;
  }
  if (message.includes('certification') || message.includes('course') || message.includes('learn') || message.includes('degree')) {
    return career['certifications'] || career.default;
  }

  // 2. Global/General Keywords (apply to any career)
  if (message.includes('resume') || message.includes('cv')) {
    return `**Professional Resume Tips (ATS-Friendly):**

*   **Clean Formatting:** Use a simple, single-column layout with standard fonts (Arial, Calibri) to ensure ATS readability.
*   **Professional Summary:** Write a 2-3 line summary highlighting your key expertise and career goals instead of an outdated objective.
*   **Skills Section:** Categorize skills into "Technical" and "Soft Skills". Match these keywords exactly to the job description.
*   **Achievements over Duties:** Don't just list responsibilities. Use Action Verbs + Metrics (e.g., "Increased sales by 20%").
*   **Project Showcase:** highlighting relevant projects with the tech stack used, especially if you have limited work experience.
*   **Proofreading:** Ensure zero grammatical errors; consistency in tense and punctuation is key.
*   **Tailoring:** Customize your resume for *every* job application by prioritizing the most relevant experiences.

_Ready to check your resume score? Try our AI Resume Matcher!_`;
  }
  if (message.includes('interview') || message.includes('prepare')) {
    return `**Interview Preparation Strategies:**\n\n1. **Research**: Know the company's product and culture.\n2. **STAR Method**: Prepare behavioral answers (Situation, Task, Action, Result).\n3. **Mock Interviews**: Practice with peers or record yourself.\n4. **Technical Prep**: For ${careerTitle}, focus on core concepts and problem-solving.\n\n_Check out the "Interview Prep" tool for specific questions!_`;
  }
  if (message.includes('skill') || message.includes('tool') || message.includes('tech stack')) {
    return `**Essential Skills to Master:**\n\n1. **Core Technical Skills**: specific to your role.\n2. **Soft Skills**: Communication, problem-solving, and adaptability.\n3. **Tools**: Familiarize yourself with industry-standard software.\n\n_Use the "Skill Assessment" page for a detailed gap analysis._`;
  }
  if (message.includes('hello') || message.includes('hi ') || message === 'hi' || message.includes('hey')) {
    return `Hello! 👋 I'm your AI Career Mentor. I can help you with:\n\n- **Career Roadmaps**\n- **Resume Reviews**\n- **Interview Prep**\n- **Skill Analysis**\n\nWhat specific career advice do you need today?`;
  }
  if (message.includes('thank')) {
    return "You're welcome! Let me know if you need help with anything else on your career journey. 🚀";
  }

  // 3. Smart Default Fallback (rotate or be more helpful)
  const defaults = [
    "I can help with that! Could you be a bit more specific? For example, ask about 'salary for software engineers' or 'resume tips'.",
    "That's an interesting topic. To give you the best advice, could you tell me which specific career path you're interested in?",
    "I'm currently in Demo Mode, but I can still help! Try asking about **roadmaps**, **salaries**, or **skills** for your dream job."
  ];
  
  // Return specific default if available, otherwise a random helpful prompt
  if (career.default) return career.default;
  return defaults[Math.floor(Math.random() * defaults.length)];
};

// Demo roadmap generator response
const getDemoRoadmap = (careerTitle) => {
  const normalizeValues = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const title = normalizeValues(careerTitle);

  // 1. Physiotherapist Roadmap (Specific Request)
  if (title.includes('physiother') || title.includes('physicalther')) {
    return {
      careerTitle: 'Physiotherapist',
      overview: 'Physiotherapists help people affected by injury, illness or disability through movement and exercise, manual therapy, education and advice. This roadmap guides you from education to licensing and practice.',
      
      steps: [
        {
          title: 'Bachelor\'s Degree (BPT)',
          duration: '4.5 Years',
          description: 'Obtain a Bachelor of Physiotherapy (BPT) degree from a recognized university.',
          actions: [
            'Clear 10+2 with Physics, Chemistry, and Biology (50% min)',
            'Crack entrance exams like NEET, IPU CET, or state-level tests',
            'Complete 4 years of academic study regarding anatomy, physiology, and therapy',
            'Complete a mandatory 6-month clinical internship',
            'Register with the State Council for Physiotherapy'
          ]
        },
        {
          title: 'Master\'s Specialization (MPT)',
          duration: '2 Years',
          description: 'Specialize in a specific field to enhance career prospects and expertise.',
          actions: [
            'Choose a specialization: Orthopedics, Neurology, Sports, Cardio-pulmonary, or Pediatrics',
            'Clear entrance exams for MPT (Master of Physiotherapy)',
            'Conduct research and submit a dissertation',
            'Gain advanced clinical exposure in hospitals',
            'Publish research papers in medical journals'
          ]
        },
        {
          title: 'Licensing & Registration',
          duration: '1-2 months',
          description: 'Become a certified practitioner to practice legally.',
          actions: [
            'Register with the Indian Association of Physiotherapists (IAP)',
            'Obtain state-specific council registration',
            'Get professional indemnity insurance',
            'Apply for hospital privileges or clinic licenses'
          ]
        },
        {
          title: 'Clinical Experience',
          duration: '1-3 Years',
          description: 'Gain hands-on experience under senior practitioners.',
          actions: [
            'Work as a junior physiotherapist in hospitals or clinics',
            'Handle diverse cases: fractures, stroke rehab, sports injuries',
            'Learn patient management and communication skills',
            'Attend workshops on taping, dry needling, or manual therapy',
            'Network with orthopedic surgeons and neurologists'
          ]
        },
        {
          title: 'Advanced Practice & Entrepreneurship',
          duration: 'Ongoing',
          description: 'Establish your own practice or lead a department.',
          actions: [
            'Start a private physiotherapy clinic',
            'Offer home-visit services for geriatric patients',
            'Pursue PhD for academic and research roles',
            'Become a consultant for sports teams or gyms',
            'Continuously update skills with new rehab technologies'
          ]
        }
      ],
      
      courses: [
        { title: 'Anatomy and Physiology for Health Professionals', platform: 'Coursera', level: 'Beginner', duration: '4 weeks' },
        { title: 'Management of Low Back Pain', platform: 'Physio-pedia (Plus)', level: 'Intermediate', duration: '10 hours' },
        { title: 'Sports Medicine: The Basics', platform: 'Coursera', level: 'Beginner', duration: '5 weeks' },
        { title: 'Stroke Rehabilitation Strategy', platform: 'edX', level: 'Advanced', duration: '6 weeks' },
        { title: 'Manual Therapy Techniques', platform: 'Udemy', level: 'Intermediate', duration: '15 hours' },
        { title: 'Kinesio Taping Practitioner', platform: 'KTAI', level: 'Advanced', duration: '2 days workshop' }
      ],
      
      certifications: [
        { name: 'Certified Mulligan Practitioner (CMP)', provider: 'Mulligan Concept', duration: '8 days', cost: '₹25,000+', priority: 'High' },
        { name: 'Certified Dry Needling Practitioner', provider: 'Dry Needling Institute', duration: '3-5 days', cost: '₹15,000', priority: 'Medium' },
        { name: 'Basic Life Support (BLS)', provider: 'American Heart Association', duration: '1 day', cost: '₹3,000', priority: 'High' },
        { name: 'Neuro-Developmental Treatment (NDT)', provider: 'NDTA', duration: '2 weeks', cost: '₹50,000+', priority: 'Medium' },
        { name: 'Sports Physiotherapy Certification', provider: 'FIST', duration: '1 month', cost: '₹20,000', priority: 'Low' }
      ],
      
      projects: [
        {
          title: 'Case Study Series',
          difficulty: 'Intermediate',
          description: 'Document 5 detailed case studies of patient recovery journeys',
          skills: ['Clinical Reasoning', 'Documentation', 'Assessment']
        },
        {
          title: 'Rehab Protocol Design',
          difficulty: 'Advanced',
          description: 'Design a comprehensive rehab protocol for ACL reconstruction',
          skills: ['Evidence Based Practice', 'Protocol Design', 'Exercise Physiology']
        },
        {
          title: 'Community Health Camp',
          difficulty: 'Intermediate',
          description: 'Organize a free posture analysis and ergonomic advice camp',
          skills: ['Public Health', 'Communication', 'Assessment']
        },
        {
          title: 'Ergonomic Workshop',
          difficulty: 'Beginner',
          description: 'Conduct a workshop on office ergonomics for corporate employees',
          skills: ['Presentation', 'Ergonomics', 'Prevention']
        },
        {
          title: 'Fitness Screening Program',
          difficulty: 'Intermediate',
          description: 'Create a screening tool for injury risk in young athletes',
          skills: ['Sports Physio', 'Assessment Tools', 'Data Analysis']
        }
      ],
      
      tools: [
        { name: 'Goniometer', icon: '📐', category: 'Assessment' },
        { name: 'TheraBands', icon: '🎗️', category: 'Therapy' },
        { name: 'Ultrasound Machine', icon: '📡', category: 'Modality' },
        { name: 'TENS Unit', icon: '⚡', category: 'Pain Relief' },
        { name: 'Physiotec/Physitrack', icon: '📱', category: 'Software' },
        { name: 'Reflex Hammer', icon: '🔨', category: 'Assessment' },
        { name: 'Balance Board', icon: '⚖️', category: 'Rehab' },
        { name: 'Tapping Tools', icon: '🩹', category: 'Support' }
      ],
      
      internshipGuide: [
        {
          title: 'Choose Reputed Hospitals',
          description: 'Aim for multi-specialty hospitals with high patient flow to see diverse cases (Ortho, Neuro, ICU).'
        },
        {
          title: 'Observation is Key',
          description: 'Spend time observing senior therapists. Notice their hand placement, communication, and clinical reasoning.'
        },
        {
          title: 'Master Basic Assessments',
          description: 'Be proficient in checking vitals, goniometry, and basic manual muscle testing (MMT) before starting.'
        },
        {
          title: 'Volunteer for diverse rotations',
          description: 'Don\'t stick to one department. Rotate through ICU, OPD, IPD, and Pediatrics.'
        },
        {
          title: 'Maintain a Logbook',
          description: 'Document every interesting case you see (maintaining patient privacy). This helps in future reference and interviews.'
        },
        {
          title: 'Learn Soft Skills',
          description: 'Patient compliance depends on how well you communicate. Be empathetic and clear in your instructions.'
        },
        {
          title: 'Networking',
          description: 'Build relationships with doctors and other healthcare professionals. Recommendations are crucial in this field.'
        },
        {
          title: 'Stay Updated',
          description: 'Read recent articles in journals like JOSPT or Spine to understand current evidence-based practices.'
        }
      ]
    };
  }

  // 2. Software Engineer / Developer / Coder (Existing)
  if (title.includes('software') || title.includes('developer') || title.includes('programmer') || title.includes('coding') || title.includes('fullstack')) {
    return {
      careerTitle: 'Software Engineer',
      overview: 'This comprehensive roadmap will guide you from a complete beginner to a professional Software Engineer. Follow these structured steps, recommended courses, and projects to build a successful career in software development.',
      
      steps: [
        {
          title: 'Foundation Phase',
          duration: '3-6 months',
          description: 'Build strong programming fundamentals and computer science basics',
          actions: [
            'Learn one programming language thoroughly (Python or JavaScript recommended)',
            'Understand basic data structures (arrays, linked lists, stacks, queues)',
            'Practice 50+ beginner coding problems on platforms like LeetCode Easy',
            'Build 3-5 simple console applications',
            'Learn Git and GitHub for version control'
          ]
        },
        {
          title: 'Web Development Fundamentals',
          duration: '4-6 months',
          description: 'Master frontend and backend web development technologies',
          actions: [
            'Learn HTML5, CSS3, and responsive design principles',
            'Master JavaScript ES6+ features and DOM manipulation',
            'Build 5+ static websites to practice',
            'Learn a modern framework (React recommended)',
            'Understand backend basics with Node.js and Express',
            'Learn database fundamentals (SQL and MongoDB)'
          ]
        },
        {
          title: 'Advanced Development & Projects',
          duration: '6-8 months',
          description: 'Build full-stack applications and contribute to real projects',
          actions: [
            'Build 3-5 full-stack projects with authentication and databases',
            'Learn REST API design and implementation',
            'Contribute to 2-3 open-source projects on GitHub',
            'Learn testing frameworks (Jest, React Testing Library)',
            'Deploy projects to cloud platforms (Vercel, Heroku, AWS)',
            'Create a professional portfolio website'
          ]
        },
        {
          title: 'DSA & Interview Preparation',
          duration: '3-4 months',
          description: 'Master algorithms and prepare for technical interviews',
          actions: [
            'Study all major data structures in depth',
            'Learn algorithm design techniques (DP, Greedy, Backtracking)',
            'Solve 200+ LeetCode problems (Easy:50, Medium:100, Hard:50)',
            'Practice system design basics',
            'Participate in coding contests',
            'Do mock interviews'
          ]
        },
        {
          title: 'Job Search & Career Launch',
          duration: '2-3 months',
          description: 'Apply strategically and land your first software engineering role',
          actions: [
            'Update resume and LinkedIn profile professionally',
            'Apply to 100+ companies systematically',
            'Network with developers on LinkedIn and Twitter',
            'Attend tech meetups and hackathons',
            'Prepare for behavioral interviews',
            'Negotiate offers effectively'
          ]
        }
      ],
      
      courses: [
        { title: 'The Complete Web Developer Bootcamp', platform: 'Udemy', level: 'Beginner', duration: '40 hours' },
        { title: 'JavaScript Algorithms and Data Structures', platform: 'freeCodeCamp', level: 'Intermediate', duration: '300 hours' },
        { title: 'React - The Complete Guide', platform: 'Udemy', level: 'Intermediate', duration: '50 hours' },
        { title: 'Node.js, Express, MongoDB Bootcamp', platform: 'Udemy', level: 'Intermediate', duration: '42 hours' },
        { title: 'CS50: Introduction to Computer Science', platform: 'Harvard (edX)', level: 'Beginner', duration: '12 weeks' },
        { title: 'Full Stack Open', platform: 'University of Helsinki', level: 'Advanced', duration: '200 hours' }
      ],
      
      certifications: [
        { name: 'AWS Certified Developer - Associate', provider: 'Amazon Web Services', duration: '2-3 months', cost: '$150', priority: 'High' },
        { name: 'Meta Front-End Developer', provider: 'Meta (Coursera)', duration: '7 months', cost: '$39/month', priority: 'High' },
        { name: 'Google IT Automation with Python', provider: 'Google (Coursera)', duration: '6 months', cost: '$39/month', priority: 'Medium' },
        { name: 'Microsoft Certified: Azure Developer', provider: 'Microsoft', duration: '3-4 months', cost: '$165', priority: 'Medium' },
        { name: 'MongoDB Certified Developer', provider: 'MongoDB University', duration: '1-2 months', cost: 'Free', priority: 'Low' }
      ],
      
      projects: [
        {
          title: 'Personal Portfolio Website',
          difficulty: 'Beginner',
          description: 'Build a responsive portfolio showcasing your skills, projects, and contact information',
          skills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design']
        },
        {
          title: 'Task Management App (Full Stack)',
          difficulty: 'Intermediate',
          description: 'Create a CRUD application with user authentication, task creation, updating, and deletion',
          skills: ['React', 'Node.js', 'MongoDB', 'JWT Auth']
        },
        {
          title: 'E-commerce Platform',
          difficulty: 'Advanced',
          description: 'Build a complete e-commerce site with product catalog, cart, checkout, and payment integration',
          skills: ['React', 'Redux', 'Node.js', 'PostgreSQL', 'Stripe API']
        },
        {
          title: 'Real-time Chat Application',
          difficulty: 'Intermediate',
          description: 'Develop a chat app with real-time messaging using WebSockets',
          skills: ['React', 'Socket.io', 'Node.js', 'MongoDB']
        },
        {
          title: 'Social Media Dashboard',
          difficulty: 'Advanced',
          description: 'Create a dashboard that aggregates data from multiple social media APIs',
          skills: ['React', 'REST APIs', 'Data Visualization', 'OAuth']
        }
      ],
      
      tools: [
        { name: 'VS Code', icon: '💻', category: 'IDE' },
        { name: 'Git & GitHub', icon: '🐙', category: 'Version Control' },
        { name: 'Chrome DevTools', icon: '🔍', category: 'Debugging' },
        { name: 'Postman', icon: '📮', category: 'API Testing' },
        { name: 'Docker', icon: '🐳', category: 'Containerization' },
        { name: 'AWS/Azure', icon: '☁️', category: 'Cloud Platform' },
        { name: 'Figma', icon: '🎨', category: 'Design' },
        { name: 'Jira', icon: '📋', category: 'Project Management' }
      ],
      
      internshipGuide: [
        {
          title: 'Build a Strong Foundation First',
          description: 'Complete at least 2-3 solid projects before applying. Companies want to see that you can actually code and build things independently.'
        },
        {
          title: 'Start Applying Early',
          description: 'Many companies open internship applications 6-8 months in advance. Start applying in August-September for summer internships.'
        },
        {
          title: 'Leverage Your Network',
          description: 'Reach out to seniors, alumni, and connections on LinkedIn. Referrals increase your chances of getting interviews by 6-10x.'
        },
        {
          title: 'Target Startups & Mid-Size Companies',
          description: 'While FAANG is great, startups and mid-size companies often have easier interview processes and provide more hands-on learning.'
        },
        {
          title: 'Prepare Your Resume Strategically',
          description: 'Use ATS-friendly format, quantify achievements, highlight relevant projects, and keep it to 1 page. Tailor for each application.'
        },
        {
          title: 'Practice Coding Interviews Daily',
          description: 'Solve 2-3 LeetCode problems every day for 3 months before interviews. Focus on patterns, not memorization.'
        },
        {
          title: 'Contribute to Open Source',
          description: 'Make 10-20 meaningful contributions to open-source projects. This demonstrates real-world collaboration skills.'
        },
        {
          title: 'Build Your Online Presence',
          description: 'Maintain an active GitHub profile, write technical blogs, and engage with the developer community on Twitter/LinkedIn.'
        }
      ]
    };
  }

  // 3. Generic/Smart Fallback for any other career
  return {
    careerTitle: careerTitle,
    overview: `This roadmap is designed to guide you on your journey to becoming a successful ${careerTitle}. While this is a general template, it outlines the key phases of education, skill acquisition, and career development standard in most fields.`,
    
    steps: [
      {
        title: 'Foundation & Education',
        duration: '3-12 months',
        description: `Establish a strong base of knowledge for ${careerTitle}.`,
        actions: [
          'Research the fundamental requirements and daily responsibilities',
          'Identify key certifications or degrees required',
          'Read standard industry books and articles',
          'Join online communities or forums related to the field',
          'Set clear, achievable learning goals for the next 6 months'
        ]
      },
      {
        title: 'Skill Acquisition',
        duration: '6-12 months',
        description: 'Master the core skills and tools necessary for the role.',
        actions: [
          'Take 2-3 comprehensive online courses',
          'Practice core skills through small personal projects',
          'Find a mentor or peer group for accountability',
          'Learn to use industry-standard tools (software or hardware)',
          'Assess your progress regularly against industry standards'
        ]
      },
      {
        title: 'Practical Application',
        duration: 'ongoing',
        description: 'Apply what you have learned in real-world scenarios.',
        actions: [
          'Volunteer for small tasks or projects',
          'Build a portfolio of your work (if applicable)',
          'Seek internships or entry-level opportunities',
          'Network with professionals in the field',
          'Attend workshops or webinars to stay current'
        ]
      },
      {
        title: 'Career Launch',
        duration: '3-6 months',
        description: 'Transition from learner to professional.',
        actions: [
          'Optimize your resume and LinkedIn profile for ${careerTitle}',
          'Prepare for interviews by practicing common questions',
          'Apply to relevant job openings suitable for beginners',
          'Leverage your network for referrals',
          'Prepare a "30-second elevator pitch" about your skills'
        ]
      },
      {
        title: 'Continuous Growth',
        duration: 'Lifelong',
        description: 'Advance your career and stay competitive.',
        actions: [
          'Pursue advanced certifications',
          'Seek leadership opportunities',
          'Mentor others entering the field',
          'Keep up with industry trends and technologies',
          'Consider specialization within the field'
        ]
      }
    ],
    
    courses: [
      { title: `${careerTitle} Fundamentals`, platform: 'Udemy/Coursera', level: 'Beginner', duration: 'Self-paced' },
      { title: `Advanced ${careerTitle} Techniques`, platform: 'LinkedIn Learning', level: 'Intermediate', duration: '10-20 hours' },
      { title: 'Professional Certification Prep', platform: 'Official Provider', level: 'Advanced', duration: 'Varies' },
      { title: 'Industry Best Practices', platform: 'edX', level: 'Intermediate', duration: '6 weeks' },
      { title: 'Soft Skills for Professionals', platform: 'Coursera', level: 'Beginner', duration: '4 weeks' }
    ],
    
    certifications: [
      { name: 'Professional Certification Level I', provider: 'Industry Body', duration: '3-6 months', cost: 'Varies', priority: 'High' },
      { name: 'Specialized Skill Certificate', provider: 'Online Platform', duration: '1-2 months', cost: 'Affordable', priority: 'Medium' },
      { name: 'Advanced Professional License', provider: 'State/National Board', duration: '1 year+', cost: 'High', priority: 'High' },
      { name: 'Workshop Completion Certificate', provider: 'Training Institute', duration: '3 days', cost: 'Moderate', priority: 'Low' }
    ],
    
    projects: [
      {
        title: 'Starter Project',
        difficulty: 'Beginner',
        description: `Complete a basic project demonstrating core ${careerTitle} concepts`,
        skills: ['Fundamental Skill 1', 'Fundamental Skill 2']
      },
      {
        title: 'Portfolio Piece',
        difficulty: 'Intermediate',
        description: 'Create a substantial work sample to show potential employers',
        skills: ['Intermediate Skill 1', 'Problem Solving']
      },
      {
        title: 'Real-world Simulation',
        difficulty: 'Advanced',
        description: 'Simulate a real-world task or solve a complex problem',
        skills: ['Advanced Skill 1', 'Critical Thinking']
      },
      {
        title: 'Community Contribution',
        difficulty: 'Intermediate',
        description: 'Contribute to a community project or volunteer your skills',
        skills: ['Collaboration', 'Communication']
      }
    ],
    
    tools: [
      { name: 'Primary Software', icon: '💻', category: 'Software' },
      { name: 'Industry Standard Tool', icon: '🛠️', category: 'Utility' },
      { name: 'Communication Platform', icon: '💬', category: 'Collaboration' },
      { name: 'Project Management App', icon: '📋', category: 'Organization' },
      { name: 'Research Database', icon: '🔍', category: 'Information' }
    ],
    
    internshipGuide: [
      {
        title: 'Research Companies',
        description: 'List top companies in this field and check their career pages regularly.'
      },
      {
        title: 'Network Actively',
        description: 'Connect with professionals on LinkedIn and ask for informational interviews.'
      },
      {
        title: 'Tailor Your Application',
        description: 'Customize your resume and cover letter for each role, highlighting relevant skills.'
      },
      {
        title: 'Prepare Portfolio',
        description: 'Have concrete examples of your work or learning ready to show.'
      },
      {
        title: 'Follow Up',
        description: 'Send polite follow-up emails after submitting applications or interviewing.'
      },
      {
        title: 'Be Open to Learning',
        description: 'Show enthusiasm and a willingness to learn, traits highly valued in interns.'
      }
    ]
  };
};

// Demo skill gap analysis response
const demoSkillGapAnalysis = {
  matchedSkills: [],
  missingSkills: [],
  learningRecommendations: [
    {
      skill: "Data Structures & Algorithms",
      priority: "High",
      reason: "Essential for technical interviews and efficient problem-solving in software development",
      resources: ["LeetCode", "AlgoExpert", "Coursera - Data Structures Specialization"]
    },
    {
      skill: "Version Control (Git)",
      priority: "High",
      reason: "Fundamental tool for collaboration and code management in any software project",
      resources: ["GitHub Learning Lab", "Atlassian Git Tutorial", "Pro Git Book (free)"]
    },
    {
      skill: "Database Management",
      priority: "Medium",
      reason: "Critical for building full-stack applications and managing data effectively",
      resources: ["SQL Basics - Codecademy", "MongoDB University", "PostgreSQL Tutorial"]
    },
    {
      skill: "Web Development",
      priority: "High",
      reason: "Core skill for building modern web applications and user interfaces",
      resources: ["freeCodeCamp", "The Odin Project", "MDN Web Docs"]
    },
    {
      skill: "Software Testing",
      priority: "Medium",
      reason: "Important for ensuring code quality and reliability in production",
      resources: ["Jest Documentation", "Testing JavaScript - Kent C. Dodds", "Udemy Testing Courses"]
    }
  ],
  summary: "Focus on building your foundational skills first. Start with DSA and Git, then move to web development and databases."
};

// Demo interview questions for different careers
const demoInterviewQuestionsBanks = {
  'Software Engineer': [
    { id: 1, question: "Explain the difference between a stack and a queue. Provide real-world use cases for each.", category: "Data Structures", difficulty: "Easy", hint: "Think about LIFO vs FIFO ordering and browser history vs print queue" },
    { id: 2, question: "What is the time complexity of searching in a balanced binary search tree?", category: "Data Structures", difficulty: "Easy", hint: "Consider the height of the tree" },
    { id: 3, question: "Explain the four pillars of Object-Oriented Programming with examples.", category: "OOPs", difficulty: "Easy", hint: "Encapsulation, Abstraction, Inheritance, Polymorphism" },
    { id: 4, question: "What is the difference between `let`, `const`, and `var` in JavaScript?", category: "JavaScript", difficulty: "Easy", hint: "Consider scope, hoisting, and mutability" },
    { id: 5, question: "How does the `this` keyword work in JavaScript?", category: "JavaScript", difficulty: "Medium", hint: "Context depends on how the function is called" },
    { id: 6, question: "Implement a function to reverse a linked list.", category: "Data Structures", difficulty: "Medium", hint: "Use three pointers: prev, current, next" },
    { id: 7, question: "What is the difference between SQL and NoSQL databases? When would you use each?", category: "Databases", difficulty: "Medium", hint: "Consider ACID vs BASE, schema, and scalability" },
    { id: 8, question: "Explain the concept of closures in JavaScript with an example.", category: "JavaScript", difficulty: "Medium", hint: "Functions that remember their lexical scope" },
    { id: 9, question: "What are Promises in JavaScript and how do they differ from async/await?", category: "JavaScript", difficulty: "Medium", hint: "Both handle asynchronous operations but with different syntax" },
    { id: 10, question: "Design a rate limiter for an API.", category: "System Design", difficulty: "Hard", hint: "Consider token bucket or sliding window algorithms" },
    { id: 11, question: "How would you design a URL shortening service like bit.ly?", category: "System Design", difficulty: "Hard", hint: "Think about hashing, database schema, scalability, and caching" },
    { id: 12, question: "Explain the CAP theorem and its implications for distributed systems.", category: "System Design", difficulty: "Hard", hint: "Consistency, Availability, Partition Tolerance - pick two" },
    { id: 13, question: "What is database normalization? Explain 1NF, 2NF, and 3NF.", category: "Databases", difficulty: "Medium", hint: "Organizing data to reduce redundancy" },
    { id: 14, question: "How would you detect a cycle in a linked list?", category: "Data Structures", difficulty: "Medium", hint: "Floyd's cycle detection algorithm (tortoise and hare)" },
    { id: 15, question: "Design a parking lot system with multiple levels and different vehicle types.", category: "System Design", difficulty: "Hard", hint: "Consider OOP design, classes, and relationships" }
  ],
  
  'Data Scientist': [
    { id: 1, question: "Explain the difference between supervised and unsupervised learning with examples.", category: "Machine Learning", difficulty: "Easy", hint: "Labeled vs unlabeled data" },
    { id: 2, question: "What is overfitting and how can you prevent it?", category: "Machine Learning", difficulty: "Easy", hint: "Model performs well on training data but poorly on test data" },
    { id: 3, question: "Explain the bias-variance tradeoff.", category: "Machine Learning", difficulty: "Medium", hint: "Underfitting vs overfitting" },
    { id: 4, question: "What is the difference between bagging and boosting?", category: "Machine Learning", difficulty: "Medium", hint: "Ensemble methods - parallel vs sequential" },
    { id: 5, question: "How do you handle missing data in a dataset?", category: "Data Preprocessing", difficulty: "Easy", hint: "Imputation, deletion, or using algorithms that handle missing values" },
    { id: 6, question: "Explain cross-validation and why it's important.", category: "Model Evaluation", difficulty: "Medium", hint: "K-fold cross-validation prevents overfitting" },
    { id: 7, question: "What is regularization? Explain L1 and L2 regularization.", category: "Machine Learning", difficulty: "Medium", hint: "Preventing overfitting by adding penalty terms" },
    { id: 8, question: "How would you evaluate a classification model?", category: "Model Evaluation", difficulty: "Easy", hint: "Accuracy, Precision, Recall, F1-score, ROC-AUC" },
    { id: 9, question: "Explain the difference between correlation and causation.", category: "Statistics", difficulty: "Easy", hint: "Correlation doesn't imply causation" },
    { id: 10, question: "What is the Central Limit Theorem and why is it important?", category: "Statistics", difficulty: "Medium", hint: "Sample means approach normal distribution" },
    { id: 11, question: "How would you build a recommendation system for an e-commerce platform?", category: "Machine Learning", difficulty: "Hard", hint: "Collaborative filtering, content-based, or hybrid approach" },
    { id: 12, question: "Explain the difference between Random Forest and Gradient Boosting.", category: "Machine Learning", difficulty: "Medium", hint: "Bagging vs boosting ensemble methods" },
    { id: 13, question: "What is dimensionality reduction and when would you use it?", category: "Data Preprocessing", difficulty: "Medium", hint: "PCA, t-SNE for reducing feature space" },
    { id: 14, question: "How do you handle imbalanced datasets?", category: "Data Preprocessing", difficulty: "Medium", hint: "SMOTE, undersampling, class weights" },
    { id: 15, question: "Design a fraud detection system for credit card transactions.", category: "Machine Learning", difficulty: "Hard", hint: "Real-time anomaly detection with imbalanced data" }
  ],
  
  'Nurse': [
    { id: 1, question: "What are the five rights of medication administration?", category: "Patient Safety", difficulty: "Easy", hint: "Right patient, drug, dose, route, time" },
    { id: 2, question: "How do you assess a patient's pain level?", category: "Patient Care", difficulty: "Easy", hint: "Pain scale, location, intensity, duration" },
    { id: 3, question: "What is the difference between arteries and veins?", category: "Anatomy", difficulty: "Easy", hint: "Blood flow direction and oxygen content" },
    { id: 4, question: "Explain the nursing process (ADPIE).", category: "Nursing Fundamentals", difficulty: "Easy", hint: "Assessment, Diagnosis, Planning, Implementation, Evaluation" },
    { id: 5, question: "How would you respond to a patient experiencing chest pain?", category: "Emergency Care", difficulty: "Medium", hint: "MONA protocol - Morphine, Oxygen, Nitroglycerin, Aspirin" },
    { id: 6, question: "What are the signs and symptoms of hypoglycemia?", category: "Medical Knowledge", difficulty: "Medium", hint: "Low blood sugar symptoms - shakiness, confusion, sweating" },
    { id: 7, question: "How do you prevent pressure ulcers in immobile patients?", category: "Patient Care", difficulty: "Medium", hint: "Repositioning, skin care, nutrition" },
    { id: 8, question: "What is the difference between isolation precautions: contact, droplet, and airborne?", category: "Infection Control", difficulty: "Medium", hint: "Different PPE requirements based on transmission" },
    { id: 9, question: "How would you handle a difficult or aggressive patient?", category: "Communication", difficulty: "Medium", hint: "De-escalation techniques, maintain safety" },
    { id: 10, question: "What are the signs of sepsis?", category: "Emergency Care", difficulty: "Medium", hint: "SIRS criteria - fever, tachycardia, tachypnea" },
    { id: 11, question: "Describe your approach to prioritizing multiple patients with different needs.", category: "Critical Thinking", difficulty: "Hard", hint: "Use ABCs and acuity levels" },
    { id: 12, question: "How do you educate a newly diagnosed diabetic patient?", category: "Patient Education", difficulty: "Medium", hint: "Diet, medication, monitoring, complications" },
    { id: 13, question: "What would you do if you noticed a medication error?", category: "Ethics & Safety", difficulty: "Medium", hint: "Report immediately, assess patient, document" },
    { id: 14, question: "Explain the stages of wound healing.", category: "Medical Knowledge", difficulty: "Medium", hint: "Hemostasis, inflammation, proliferation, remodeling" },
    { id: 15, question: "How would you manage a code blue situation?", category: "Emergency Care", difficulty: "Hard", hint: "CPR, defibrillation, medication administration, documentation" }
  ],
  
  'UI/UX Designer': [
    { id: 1, question: "What is the difference between UI and UX design?", category: "Design Fundamentals", difficulty: "Easy", hint: "UI is look and feel, UX is overall experience" },
    { id: 2, question: "Explain the design thinking process.", category: "Design Process", difficulty: "Easy", hint: "Empathize, Define, Ideate, Prototype, Test" },
    { id: 3, question: "What is a wireframe and how does it differ from a mockup?", category: "Design Tools", difficulty: "Easy", hint: "Wireframe is low-fidelity, mockup is high-fidelity" },
    { id: 4, question: "How do you conduct user research?", category: "User Research", difficulty: "Medium", hint: "Interviews, surveys, usability testing, analytics" },
    { id: 5, question: "What is accessibility in design and why is it important?", category: "Accessibility", difficulty: "Medium", hint: "WCAG guidelines, inclusive design for all users" },
    { id: 6, question: "Explain Gestalt principles in design.", category: "Design Theory", difficulty: "Medium", hint: "Proximity, similarity, closure, continuity" },
    { id: 7, question: "How would you redesign the checkout process for an e-commerce app?", category: "Case Study", difficulty: "Hard", hint: "User pain points, reduce friction, trust signals" },
    { id: 8, question: "What is A/B testing and when would you use it?", category: "UX Research", difficulty: "Medium", hint: "Compare two versions to see which performs better" },
    { id: 9, question: "How do you handle negative feedback on your designs?", category: "Professional Skills", difficulty: "Medium", hint: "Constructive criticism, iterate, user-centered approach" },
    { id: 10, question: "What is a design system and why is it useful?", category: "Design Systems", difficulty: "Medium", hint: "Reusable components, consistency, scalability" },
    { id: 11, question: "Walk me through your design process for a mobile banking app.", category: "Case Study", difficulty: "Hard", hint: "Research, personas, user flows, wireframes, testing" },
    { id: 12, question: "How do you measure the success of a design?", category: "Metrics", difficulty: "Medium", hint: "User satisfaction, task completion rate, time on task" },
    { id: 13, question: "What are some common UX mistakes and how would you avoid them?", category: "Best Practices", difficulty: "Medium", hint: "Too many options, unclear navigation, ignoring feedback" },
    { id: 14, question: "Explain the importance of white space in design.", category: "Visual Design", difficulty: "Easy", hint: "Improves readability, creates focus, reduces cognitive load" },
    { id: 15, question: "How would you design for both iOS and Android platforms?", category: "Mobile Design", difficulty: "Hard", hint: "Platform-specific patterns vs consistent experience" }
  ],
  
  'Business Analyst': [
    { id: 1, question: "What is the role of a Business Analyst in a project?", category: "Fundamentals", difficulty: "Easy", hint: "Bridge between business and IT, requirements gathering" },
    { id: 2, question: "Explain the difference between functional and non-functional requirements.", category: "Requirements", difficulty: "Easy", hint: "What system does vs how it performs" },
    { id: 3, question: "What techniques do you use for requirements gathering?", category: "Requirements", difficulty: "Medium", hint: "Interviews, workshops, surveys, observation" },
    { id: 4, question: "How do you prioritize requirements?", category: "Requirements", difficulty: "Medium", hint: "MoSCoW method, business value, stakeholder input" },
    { id: 5, question: "What is a use case diagram? Create one for an ATM system.", category: "Documentation", difficulty: "Medium", hint: "Actors, use cases, and relationships" },
    { id: 6, question: "Explain Agile methodology and how BAs work in Agile teams.", category: "Methodologies", difficulty: "Medium", hint: "Scrum, sprints, user stories, backlog grooming" },
    { id: 7, question: "How do you handle conflicting requirements from different stakeholders?", category: "Stakeholder Management", difficulty: "Medium", hint: "Facilitate discussion, find compromise, align with business goals" },
    { id: 8, question: "What is a gap analysis?", category: "Analysis", difficulty: "Easy", hint: "Current state vs future state" },
    { id: 9, question: "How would you analyze a business process and identify improvements?", category: "Process Improvement", difficulty: "Hard", hint: "Process mapping, bottlenecks, stakeholder feedback" },
    { id: 10, question: "What SQL queries would you use to analyze sales data?", category: "Technical Skills", difficulty: "Medium", hint: "JOIN, GROUP BY, aggregations" },
    { id: 11, question: "Explain SWOT analysis and when you would use it.", category: "Strategic Analysis", difficulty: "Easy", hint: "Strengths, Weaknesses, Opportunities, Threats" },
    { id: 12, question: "How do you validate requirements with stakeholders?", category: "Requirements", difficulty: "Medium", hint: "Reviews, prototypes, walkthroughs, sign-offs" },
    { id: 13, question: "What is the difference between Waterfall and Agile?", category: "Methodologies", difficulty: "Easy", hint: "Sequential vs iterative development" },
    { id: 14, question: "How would you estimate project timelines and costs?", category: "Project Management", difficulty: "Medium", hint: "Story points, historical data, expert judgment" },
    { id: 15, question: "Describe a challenging project you worked on and how you overcame obstacles.", category: "Behavioral", difficulty: "Hard", hint: "STAR method - Situation, Task, Action, Result" }
  ]
};

// Helper function to get demo interview questions
const getDemoInterviewQuestions = (careerTitle, careerCategory) => {
  // Try to find questions for the specific career
  let questions = demoInterviewQuestionsBanks[careerTitle];
  
  // If not found, provide generic questions
  if (!questions) {
    questions = [
      { id: 1, question: "Tell me about yourself and your background.", category: "General", difficulty: "Easy", hint: "Brief professional summary, relevant experience" },
      { id: 2, question: "Why are you interested in this role?", category: "General", difficulty: "Easy", hint: "Align your goals with company mission" },
      { id: 3, question: "What are your greatest strengths?", category: "Behavioral", difficulty: "Easy", hint: "Relevant skills with concrete examples" },
      { id: 4, question: "What are your weaknesses and how are you addressing them?", category: "Behavioral", difficulty: "Medium", hint: "Show self-awareness and growth mindset" },
      { id: 5, question: "Describe a challenging situation you faced and how you resolved it.", category: "Behavioral", difficulty: "Medium", hint: "Use STAR method" },
      { id: 6, question: "How do you prioritize tasks when you have multiple deadlines?", category: "Work Style", difficulty: "Medium", hint: "Time management, prioritization strategies" },
      { id: 7, question: "Tell me about a time you worked in a team.", category: "Teamwork", difficulty: "Medium", hint: "Collaboration, communication, conflict resolution" },
      { id: 8, question: "How do you handle criticism or feedback?", category: "Behavioral", difficulty: "Medium", hint: "Openness to learning and improvement" },
      { id: 9, question: "Where do you see yourself in 5 years?", category: "Career Goals", difficulty: "Easy", hint: "Realistic goals aligned with the role" },
      { id: 10, question: "Why should we hire you?", category: "General", difficulty: "Medium", hint: "Unique value proposition" },
      { id: 11, question: "What is your expected salary?", category: "General", difficulty: "Medium", hint: "Research market rates, be flexible" },
      { id: 12, question: "How do you stay updated with industry trends?", category: "Professional Development", difficulty: "Easy", hint: "Continuous learning habits" },
      { id: 13, question: "Describe your ideal work environment.", category: "Culture Fit", difficulty: "Easy", hint: "Align with company culture" },
      { id: 14, question: "Do you have any questions for us?", category: "General", difficulty: "Easy", hint: "Always have 2-3 thoughtful questions prepared" },
      { id: 15, question: "What motivates you in your career?", category: "Motivation", difficulty: "Medium", hint: "Intrinsic motivators, passion for the field" }
    ];
  }
  
  return {
    careerTitle,
    questions: questions.slice(0, 15) // Return up to 15 questions
  };
};

// Demo resume matcher analysis
const getDemoResumeMatcher = (resumeText, careerSkills, careerTitle) => {
  // Simple keyword matching for demo mode
  const resumeLower = resumeText.toLowerCase();
  
  // Extract potential skills from resume by keyword matching
  const matchedSkills = careerSkills.filter(skill => {
    const skillLower = skill.toLowerCase();
    // Check if skill or common variations are in resume
    return resumeLower.includes(skillLower) || 
           resumeLower.includes(skillLower.replace(/\s+/g, '')) ||
           resumeLower.includes(skillLower.split(' ')[0]);
  });
  
  const missingSkills = careerSkills.filter(skill => !matchedSkills.includes(skill));
  
  // Calculate match percentage
  const matchPercentage = Math.round((matchedSkills.length / careerSkills.length) * 100);
  
  // Determine career readiness based on percentage
  let careerReadinessScore = 'Not Ready';
  let recommendations = [];
  
  if (matchPercentage >= 80) {
    careerReadinessScore = 'Fully Job Ready';
    recommendations = [
      `Excellent! You have ${matchedSkills.length} out of ${careerSkills.length} required skills.`,
      'Focus on building advanced projects to showcase your expertise.',
      'Start applying to companies and prepare for technical interviews.',
      'Consider contributing to open-source projects to gain visibility.'
    ];
  } else if (matchPercentage >= 60) {
    careerReadinessScore = 'Job Ready';
    recommendations = [
      `Good progress! You have ${matchedSkills.length} out of ${careerSkills.length} skills.`,
      `Focus on learning: ${missingSkills.slice(0, 3).join(', ')}.`,
      'Build 2-3 projects that demonstrate the missing skills.',
      'You can start applying for junior positions while continuing to learn.'
    ];
  } else if (matchPercentage >= 40) {
    careerReadinessScore = 'Getting There';
    recommendations = [
      `You're on the right track with ${matchedSkills.length} out of ${careerSkills.length} skills.`,
      `Priority skills to learn: ${missingSkills.slice(0, 4).join(', ')}.`,
      'Dedicate 3-6 months to intensive learning and project building.',
      'Consider taking structured courses or bootcamps for faster progress.'
    ];
  } else {
    careerReadinessScore = 'Needs Improvement';
    recommendations = [
      `You have ${matchedSkills.length} out of ${careerSkills.length} required skills - there's room to grow!`,
      'Start with foundational skills and build up systematically.',
      `Focus on learning: ${missingSkills.slice(0, 5).join(', ')}.`,
      'Build beginner-friendly projects to gain practical experience.',
      'Set a 6-12 month learning plan to develop these skills.'
    ];
  }
  
  // Add specific recommendations based on missing skills
  if (missingSkills.length > 0 && missingSkills.length <= 5) {
    recommendations.push(`Missing skills: ${missingSkills.join(', ')}. Each of these is crucial for ${careerTitle} roles.`);
  }
  
  return {
    matchPercentage,
    careerReadinessScore,
    matchedSkills,
    missingSkills,
    recommendations,
    summary: `Your resume matches ${matchPercentage}% of ${careerTitle} requirements. ` +
             `You have ${matchedSkills.length} out of ${careerSkills.length} required skills. ` +
             `${matchPercentage >= 60 ? 'You are on the right path!' : 'Focus on enhancing your skillset to become job-ready.'}`
  };
};

// Demo weekly study planner
const getDemoWeeklyStudyPlan = (careerTitle, skillLevel = 'beginner', hoursPerDay = 3) => {
  const baseHours = hoursPerDay;
  
  // Software Engineer plan
  const softwareEngineerPlan = {
    beginner: [
      {
        day: 'Monday',
        dayNumber: 1,
        topic: 'Programming Fundamentals - Variables & Data Types',
        objectives: [
          'Understand variable declarations (var, let, const)',
          'Learn primitive and reference data types',
          'Practice type conversion and coercion'
        ],
        hours: baseHours,
        resources: [
          { title: 'MDN JavaScript Basics', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide', type: 'Documentation' },
          { title: 'JavaScript.info - Variables', url: 'https://javascript.info/variables', type: 'Tutorial' },
          { title: 'FreeCodeCamp - Basic JavaScript', url: 'https://www.freecodecamp.org/learn', type: 'Interactive' }
        ],
        assignments: [
          'Declare 10 variables using different keywords',
          'Create examples of each primitive type',
          'Write code demonstrating type coercion',
          'Complete 15 variable exercises on FreeCodeCamp'
        ],
        project: 'Build a "Personal Info Card" program that stores and displays your details using variables'
      },
      {
        day: 'Tuesday',
        dayNumber: 2,
        topic: 'Control Flow - Conditionals & Loops',
        objectives: [
          'Master if-else statements and switch cases',
          'Understand for, while, and do-while loops',
          'Learn break and continue statements'
        ],
        hours: baseHours,
        resources: [
          { title: 'MDN Control Flow', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling', type: 'Documentation' },
          { title: 'JavaScript Loops Tutorial', url: 'https://javascript.info/while-for', type: 'Tutorial' }
        ],
        assignments: [
          'Write 5 if-else condition programs',
          'Create loops to print patterns (pyramid, triangle)',
          'Solve 10 loop-based problems on LeetCode Easy',
          'Build a number guessing game using conditionals'
        ],
        project: 'Create a basic calculator with menu options using switch-case'
      },
      {
        day: 'Wednesday',
        dayNumber: 3,
        topic: 'Functions & Scope',
        objectives: [
          'Learn function declarations and expressions',
          'Understand function scope and closures',
          'Practice arrow functions and callbacks'
        ],
        hours: baseHours,
        resources: [
          { title: 'MDN Functions', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions', type: 'Documentation' },
          { title: 'JavaScript.info - Functions', url: 'https://javascript.info/function-basics', type: 'Tutorial' }
        ],
        assignments: [
          'Write 10 different functions with parameters',
          'Create examples of function scope',
          'Practice with callback functions',
          'Solve 5 function-based coding challenges'
        ],
        project: 'Build a to-do list with add, remove, and display functions'
      },
      {
        day: 'Thursday',
        dayNumber: 4,
        topic: 'Arrays & Array Methods',
        objectives: [
          'Master array creation and manipulation',
          'Learn array methods (map, filter, reduce)',
          'Practice array iteration techniques'
        ],
        hours: baseHours,
        resources: [
          { title: 'MDN Arrays', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array', type: 'Documentation' },
          { title: 'JavaScript Array Methods', url: 'https://javascript.info/array-methods', type: 'Tutorial' }
        ],
        assignments: [
          'Practice 15 array manipulation problems',
          'Use map, filter, reduce on different datasets',
          'Solve array challenges on HackerRank',
          'Create array sorting and searching functions'
        ],
        project: 'Build a student grade management system using arrays'
      },
      {
        day: 'Friday',
        dayNumber: 5,
        topic: 'Objects & JSON',
        objectives: [
          'Understand object creation and properties',
          'Learn object methods and this keyword',
          'Work with JSON data format'
        ],
        hours: baseHours,
        resources: [
          { title: 'MDN Objects', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects', type: 'Documentation' },
          { title: 'JavaScript.info - Objects', url: 'https://javascript.info/object', type: 'Tutorial' }
        ],
        assignments: [
          'Create 5 object literals with methods',
          'Practice object destructuring',
          'Work with JSON.parse() and JSON.stringify()',
          'Build objects representing real-world entities'
        ],
        project: 'Create a book library system using objects and arrays'
      },
      {
        day: 'Saturday',
        dayNumber: 6,
        topic: 'DOM Manipulation - Part 1',
        objectives: [
          'Learn to select and modify HTML elements',
          'Understand event handling basics',
          'Practice creating dynamic content'
        ],
        hours: baseHours + 1,
        resources: [
          { title: 'MDN DOM', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model', type: 'Documentation' },
          { title: 'JavaScript.info - DOM', url: 'https://javascript.info/dom-nodes', type: 'Tutorial' }
        ],
        assignments: [
          'Select elements using different methods',
          'Modify text content and styles dynamically',
          'Add event listeners to buttons',
          'Create, append, and remove elements'
        ],
        project: 'Build an interactive webpage with click counters and style changers'
      },
      {
        day: 'Sunday',
        dayNumber: 7,
        topic: 'Mini Project Day - Combine Everything',
        objectives: [
          'Apply all concepts learned this week',
          'Build a complete interactive application',
          'Practice debugging and problem-solving'
        ],
        hours: baseHours + 2,
        resources: [
          { title: 'Project Ideas for Beginners', url: 'https://www.freecodecamp.org/news/javascript-projects-for-beginners/', type: 'Inspiration' },
          { title: 'MDN JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide', type: 'Reference' }
        ],
        assignments: [
          'Plan your project structure',
          'Write clean, commented code',
          'Test all functionality',
          'Debug any errors that arise'
        ],
        project: 'Build a complete "Task Manager Web App" with add, delete, edit, and filter features using HTML, CSS, and JavaScript'
      }
    ]
  };

  // Default generic plan
  const genericPlan = [
    {
      day: 'Monday',
      dayNumber: 1,
      topic: 'Introduction & Fundamentals',
      objectives: [
        'Understand the basics of this career field',
        'Learn foundational concepts and terminology',
        'Explore career requirements and paths'
      ],
      hours: baseHours,
      resources: [
        { title: 'Career Overview', url: '#', type: 'Article' },
        { title: 'Getting Started Guide', url: '#', type: 'Tutorial' }
      ],
      assignments: [
        'Read introductory materials',
        'Watch 2-3 beginner tutorials',
        'Take notes on key concepts',
        'Join relevant online communities'
      ],
      project: 'Research and create a mind map of the career field'
    },
    {
      day: 'Tuesday',
      dayNumber: 2,
      topic: 'Core Skill #1',
      objectives: [
        'Learn the first essential skill for this career',
        'Practice with beginner exercises',
        'Build foundational knowledge'
      ],
      hours: baseHours,
      resources: [
        { title: 'Skill Tutorial', url: '#', type: 'Tutorial' },
        { title: 'Practice Exercises', url: '#', type: 'Interactive' }
      ],
      assignments: [
        'Complete 10 beginner exercises',
        'Watch tutorial videos',
        'Practice hands-on examples',
        'Document your learning'
      ],
      project: 'Create a simple project using the skill learned today'
    },
    {
      day: 'Wednesday',
      dayNumber: 3,
      topic: 'Core Skill #2',
      objectives: [
        'Learn the second essential skill',
        'Understand how it connects to previous learning',
        'Practice integration of skills'
      ],
      hours: baseHours,
      resources: [
        { title: 'Advanced Tutorial', url: '#', type: 'Tutorial' },
        { title: 'Documentation', url: '#', type: 'Reference' }
      ],
      assignments: [
        'Complete skill-building exercises',
        'Combine skills from Days 1-3',
        'Solve practical problems',
        'Review and refine understanding'
      ],
      project: 'Build a project combining skills from Days 2 and 3'
    },
    {
      day: 'Thursday',
      dayNumber: 4,
      topic: 'Tools & Technologies',
      objectives: [
        'Learn essential tools used in this field',
        'Practice with industry-standard software',
        'Understand workflow and best practices'
      ],
      hours: baseHours,
      resources: [
        { title: 'Tool Documentation', url: '#', type: 'Documentation' },
        { title: 'Setup Guide', url: '#', type: 'Tutorial' }
      ],
      assignments: [
        'Install and configure necessary tools',
        'Complete tool-specific tutorials',
        'Practice common workflows',
        'Build muscle memory with shortcuts'
      ],
      project: 'Create a small project using the tools learned'
    },
    {
      day: 'Friday',
      dayNumber: 5,
      topic: 'Practical Application',
      objectives: [
        'Apply learned concepts to real scenarios',
        'Work on practical exercises',
        'Build portfolio-worthy work'
      ],
      hours: baseHours,
      resources: [
        { title: 'Case Studies', url: '#', type: 'Article' },
        { title: 'Project Examples', url: '#', type: 'Gallery' }
      ],
      assignments: [
        'Analyze real-world examples',
        'Replicate professional work',
        'Get feedback from peers',
        'Iterate and improve'
      ],
      project: 'Build a portfolio piece showcasing this week\'s learning'
    },
    {
      day: 'Saturday',
      dayNumber: 6,
      topic: 'Advanced Concepts',
      objectives: [
        'Explore intermediate/advanced topics',
        'Challenge yourself with complex problems',
        'Deepen your understanding'
      ],
      hours: baseHours + 1,
      resources: [
        { title: 'Advanced Guide', url: '#', type: 'Tutorial' },
        { title: 'Best Practices', url: '#', type: 'Article' }
      ],
      assignments: [
        'Tackle challenging exercises',
        'Study advanced techniques',
        'Optimize previous projects',
        'Learn from expert examples'
      ],
      project: 'Enhance a previous project with advanced features'
    },
    {
      day: 'Sunday',
      dayNumber: 7,
      topic: 'Week Review & Capstone Project',
      objectives: [
        'Review all concepts learned this week',
        'Build a comprehensive final project',
        'Reflect on progress and plan next steps'
      ],
      hours: baseHours + 2,
      resources: [
        { title: 'Week Summary', url: '#', type: 'Review' },
        { title: 'Next Steps Guide', url: '#', type: 'Article' }
      ],
      assignments: [
        'Complete a self-assessment',
        'Review and revise notes',
        'Identify areas for improvement',
        'Plan next week\'s learning goals'
      ],
      project: 'Build a complete capstone project demonstrating all skills learned this week'
    }
  ];

  // Select appropriate plan
  let weeklyPlan;
  if (careerTitle.toLowerCase().includes('software') || careerTitle.toLowerCase().includes('developer') || careerTitle.toLowerCase().includes('engineer')) {
    weeklyPlan = softwareEngineerPlan.beginner;
  } else {
    weeklyPlan = genericPlan;
  }

  return {
    careerTitle,
    skillLevel,
    hoursPerDay: baseHours,
    weeklyPlan,
    summary: `This 7-day study plan is designed for ${skillLevel} level learners pursuing ${careerTitle}. Each day builds upon the previous, ensuring a structured learning path with ${baseHours} hours of focused study daily.`,
    totalHours: weeklyPlan.reduce((sum, day) => sum + day.hours, 0),
    demoMode: true
  };
};



// Demo course recommendations
const getDemoCourseRecommendations = (careerTitle, skillLevel = 'beginner') => {
  const softwareEngineerCourses = {
    beginner: [
      {
        title: 'The Complete Web Development Bootcamp',
        platform: 'Udemy',
        instructor: 'Dr. Angela Yu',
        duration: '65 hours',
        price: '₹3,499',
        rating: 4.7,
        students: '850,000+',
        level: 'Beginner',
        skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
        description: 'Complete bootcamp covering frontend and backend development with hands-on projects.',
        url: 'https://www.udemy.com/course/the-complete-web-development-bootcamp/',
        highlights: ['12 real-world projects', 'Certificate of completion', 'Lifetime access']
      },
      {
        title: 'JavaScript - The Complete Guide',
        platform: 'Udemy',
        instructor: 'Maximilian Schwarzmüller',
        duration: '52 hours',
        price: '₹2,999',
        rating: 4.6,
        students: '180,000+',
        level: 'Beginner to Advanced',
        skills: ['JavaScript', 'ES6+', 'DOM', 'Async Programming'],
        description: 'Deep dive into JavaScript from basics to advanced concepts.',
        url: 'https://www.udemy.com/course/javascript-the-complete-guide-2020-beginner-advanced/',
        highlights: ['Updated for 2024', 'Includes projects', 'Q&A support']
      },
      {
        title: 'CS50: Introduction to Computer Science',
        platform: 'Harvard Online (edX)',
        instructor: 'David J. Malan',
        duration: '12 weeks',
        price: 'Free (Certificate: $199)',
        rating: 4.9,
        students: '4,000,000+',
        level: 'Beginner',
        skills: ['C', 'Python', 'SQL', 'Algorithms', 'Data Structures'],
        description: 'Harvard\'s legendary intro to CS course covering fundamental programming concepts.',
        url: 'https://www.edx.org/course/cs50s-introduction-to-computer-science',
        highlights: ['World-renowned course', 'University certificate', 'Problem sets']
      },
      {
        title: 'Responsive Web Design',
        platform: 'freeCodeCamp',
        instructor: 'freeCodeCamp Team',
        duration: '300 hours',
        price: 'Free',
        rating: 4.8,
        students: '2,000,000+',
        level: 'Beginner',
        skills: ['HTML5', 'CSS3', 'Flexbox', 'Grid', 'Responsive Design'],
        description: 'Learn HTML and CSS to build responsive websites from scratch.',
        url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
        highlights: ['100% free', 'Hands-on projects', 'Certification']
      },
      {
        title: 'Git & GitHub Crash Course',
        platform: 'Coursera',
        instructor: 'Google',
        duration: '8 hours',
        price: 'Free (Certificate: ₹3,500/month)',
        rating: 4.8,
        students: '500,000+',
        level: 'Beginner',
        skills: ['Git', 'GitHub', 'Version Control'],
        description: 'Master version control with Git and collaboration with GitHub.',
        url: 'https://www.coursera.org/learn/introduction-git-github',
        highlights: ['Google certificate', 'Hands-on labs', 'Career support']
      },
      {
        title: 'Python for Everybody',
        platform: 'Coursera',
        instructor: 'University of Michigan',
        duration: '8 months',
        price: 'Free (Certificate: ₹3,500/month)',
        rating: 4.8,
        students: '2,500,000+',
        level: 'Beginner',
        skills: ['Python', 'Data Structures', 'Web Scraping', 'SQL'],
        description: 'Learn Python programming from scratch with practical applications.',
        url: 'https://www.coursera.org/specializations/python',
        highlights: ['University certificate', 'Practical projects', 'Community support']
      }
    ],
    intermediate: [
      {
        title: 'React - The Complete Guide',
        platform: 'Udemy',
        instructor: 'Maximilian Schwarzmüller',
        duration: '48 hours',
        price: '₹3,499',
        rating: 4.6,
        students: '750,000+',
        level: 'Intermediate',
        skills: ['React', 'Hooks', 'Redux', 'Next.js'],
        description: 'Master React including React Router, Redux, and Next.js.',
        url: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/',
        highlights: ['Includes Next.js', 'Real projects', 'Updated regularly']
      },
      {
        title: 'Node.js - The Complete Guide',
        platform: 'Udemy',
        instructor: 'Maximilian Schwarzmüller',
        duration: '40 hours',
        price: '₹3,499',
        rating: 4.6,
        students: '180,000+',
        level: 'Intermediate',
        skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
        description: 'Build scalable backend applications with Node.js and Express.',
        url: 'https://www.udemy.com/course/nodejs-the-complete-guide/',
        highlights: ['Full-stack projects', 'GraphQL included', 'Best practices']
      }
    ],
    advanced: [
      {
        title: 'Microservices with Node.js and React',
        platform: 'Udemy',
        instructor: 'Stephen Grider',
        duration: '54 hours',
        price: '₹3,999',
        rating: 4.6,
        students: '90,000+',
        level: 'Advanced',
        skills: ['Microservices', 'Docker', 'Kubernetes', 'React', 'Node.js'],
        description: 'Build enterprise-level microservices architecture.',
        url: 'https://www.udemy.com/course/microservices-with-node-js-and-react/',
        highlights: ['Production-ready', 'Docker & K8s', 'Event-driven design']
      }
    ]
  };

  const genericCourses = [
    {
      title: `${careerTitle} Fundamentals`,
      platform: 'Coursera',
      instructor: 'Industry Expert',
      duration: '4-6 weeks',
      price: 'Free (Certificate: ₹3,500/month)',
      rating: 4.5,
      students: '100,000+',
      level: skillLevel.charAt(0).toUpperCase() + skillLevel.slice(1),
      skills: ['Foundation Skills', 'Core Concepts', 'Best Practices'],
      description: `Comprehensive introduction to ${careerTitle} covering essential concepts and practical skills.`,
      url: '#',
      highlights: ['Certificate available', 'Self-paced', 'Industry-recognized']
    },
    {
      title: `Professional ${careerTitle} Course`,
      platform: 'Udemy',
      instructor: 'Expert Instructor',
      duration: '20-30 hours',
      price: '₹2,999',
      rating: 4.6,
      students: '50,000+',
      level: skillLevel.charAt(0).toUpperCase() + skillLevel.slice(1),
      skills: ['Practical Skills', 'Tools', 'Industry Standards'],
      description: `Hands-on course for aspiring professionals in ${careerTitle}.`,
      url: '#',
      highlights: ['Lifetime access', 'Projects included', 'Q&A support']
    },
    {
      title: `${careerTitle} Bootcamp`,
      platform: 'edX',
      instructor: 'University Partner',
      duration: '12 weeks',
      price: 'Free (Certificate: $199)',
      rating: 4.7,
      students: '200,000+',
      level: skillLevel.charAt(0).toUpperCase() + skillLevel.slice(1),
      skills: ['Comprehensive Training', 'Real Projects', 'Career Prep'],
      description: `Intensive bootcamp-style course covering all aspects of ${careerTitle}.`,
      url: '#',
      highlights: ['University certificate', 'Career services', 'Mentor support']
    }
  ];

  let courses;
  if (careerTitle.toLowerCase().includes('software') || careerTitle.toLowerCase().includes('developer') || careerTitle.toLowerCase().includes('engineer')) {
    courses = softwareEngineerCourses[skillLevel] || softwareEngineerCourses.beginner;
  } else {
    courses = genericCourses;
  }

  return {
    careerTitle,
    skillLevel,
    totalCourses: courses.length,
    courses,
    summary: `We found ${courses.length} highly-rated courses perfect for ${skillLevel} level ${careerTitle} learners. These courses cover essential skills and include hands-on projects.`,
    filters: {
      platforms: ['All', 'Udemy', 'Coursera', 'edX', 'freeCodeCamp'],
      priceRanges: ['Free', 'Under ₹1,000', '₹1,000-₹3,000', '₹3,000+']
    },
    demoMode: true
  };
};



// Demo salary predictor
const getDemoSalaryPredictor = (careerTitle, experienceYears = 0, location = 'India', skills = []) => {
  // Base salaries for different careers (in INR per annum)
  const baseSalaries = {
    'Software Engineer': { india: 600000, global: 5000000 },
    'Data Scientist': { india: 800000, global: 6000000 },
    'UI/UX Designer': { india: 500000, global: 4000000 },
    'Product Manager': { india: 1200000, global: 8000000 },
    'Default': { india: 500000, global: 4000000 }
  };

  // Get base salary for career
  const careerKey = Object.keys(baseSalaries).find(key => 
    careerTitle.toLowerCase().includes(key.toLowerCase())
  ) || 'Default';
  
  const base = baseSalaries[careerKey][location.toLowerCase() === 'india' ? 'india' : 'global'];

  // Experience multiplier
  const expMultiplier = 1 + (experienceYears * 0.15);
  
  // Skills premium (5% per skill, max 30%)
  const skillsBonus = Math.min(skills.length * 0.05, 0.3);
  
  // Calculate predicted salary
  const predictedSalary = Math.round(base * expMultiplier * (1 + skillsBonus));
  
  // Generate salary ranges for experience levels
  const salaryByExperience = [
    { years: '0-1', title: 'Entry Level', india: Math.round(base * 0.8), global: Math.round(base * 4) },
    { years: '2-4', title: 'Junior', india: Math.round(base * 1.3), global: Math.round(base * 5.2) },
    { years: '5-7', title: 'Mid-Level', india: Math.round(base * 1.8), global: Math.round(base * 7.2) },
    { years: '8-10', title: 'Senior', india: Math.round(base * 2.5), global: Math.round(base * 10) },
    { years: '10+', title: 'Lead/Principal', india: Math.round(base * 3.5), global: Math.round(base * 14) }
  ];

  // Factors affecting salary
  const factors = [
    { factor: 'Experience Level', impact: `+${Math.round(expMultiplier * 100 - 100)}%`, description: `${experienceYears} years of experience` },
    { factor: 'Skills Portfolio', impact: `+${Math.round(skillsBonus * 100)}%`, description: `${skills.length} relevant skills` },
    { factor: 'Location', impact: location === 'India' ? 'Base' : '+300-400%', description: `${location} market rates` },
    { factor: 'Industry Demand', impact: '+10-20%', description: 'High demand for this role' }
  ];

  // Market insights
  const insights = [
    `${careerTitle} roles are in high demand with ${location === 'India' ? '12%' : '8%'} year-over-year growth`,
    `Professionals with ${experienceYears}+ years experience earn ${Math.round(expMultiplier * 100)}% more than entry-level`,
    `Top 10% of ${careerTitle}s in ${location} earn ${location === 'India' ? '₹25+ LPA' : '$150k+ annually'}`,
    'Remote work opportunities can increase salary potential by 15-25%'
  ];

  return {
    careerTitle,
    location,
    experienceYears,
    skills: skills || [],
    predictedSalary: {
      annual: predictedSalary,
      monthly: Math.round(predictedSalary / 12),
      currency: location === 'India' ? 'INR' : 'USD'
    },
    salaryRange: {
      min: Math.round(predictedSalary * 0.85),
      max: Math.round(predictedSalary * 1.15)
    },
    salaryByExperience,
    factors,
    insights,
    percentile: experienceYears < 2 ? '25th' : experienceYears < 5 ? '50th' : experienceYears < 8 ? '75th' : '90th',
    summary: `Based on ${experienceYears} years of experience and ${skills.length} skills in ${location}, your predicted salary for ${careerTitle} is ${location === 'India' ? '₹' : '$'}${(predictedSalary / (location === 'India' ? 100000 : 1000)).toFixed(1)}${location === 'India' ? ' LPA' : 'k'} annually.`,
    demoMode: true
  };
};



const getDemoResumeSections = (career) => {
  const defaults = {
    title: career,
    skills: ["Communication", "Teamwork", "Problem Solving", "Time Management", "Critical Thinking"],
    projects: [
      {
        name: "Professional Portfolio",
        description: "A showcase of your best work and achievements relevant to the role."
      },
      {
        name: "Capstone Project",
        description: "A major final year project demonstrating your core competencies."
      }
    ],
    experience: [
      "Collaborated with cross-functional teams to deliver key objectives.",
      "Managed multiple responsibilities while meeting strict deadlines.",
      "improved process efficiency by 15% through optimized workflows."
    ],
    education: "Bachelor's Degree in relevant field",
    certifications: ["Industry standard certification 1", "Industry standard certification 2"],
    achievements: ["Employee of the Month", "Dean's List"],
    keywords: [career, "Professional", "Motivated", "Skilled", "Experienced"],
    actionVerbs: ["Achieved", "Developed", "Managed", "Created", "Improved"]
  };

  const specific = {
    "Software Engineer": {
      title: "Software Engineer",
      skills: ["JavaScript/Python", "React.js", "Node.js", "SQL/NoSQL", "Git/GitHub", "System Design", "Problem Solving"],
      projects: [
        {
          name: "E-Commerce Platform",
          description: "Full-stack application with payment gateway integration and user authentication."
        },
        {
          name: "Task Management App",
          description: "Real-time collaboration tool using WebSockets and React."
        }
      ],
      experience: [
        "Developed scalable web applications using React and Node.js, improving user engagement by 20%.",
        "Optimized database queries, reducing API response time by 40%.",
        "Collaborated with UX/UI designers to implement responsive interface designs."
      ],
      education: "B.Tech/B.S. in Computer Science or related field",
      certifications: ["AWS Certified Developer", "Meta Frontend Developer", "Oracle Java Certification"],
      achievements: ["Hackathon Winner 2024", "Top Contributor to Open Source Project"],
      keywords: ["Full Stack", "API Development", "Cloud Computing", "Microservices", "Agile"],
      actionVerbs: ["Architected", "Deployed", "Refactored", "Automated", "Debugged"]
    },
     "Graphic Designer": {
      title: "Graphic Designer",
      skills: ["Adobe Photoshop", "Illustrator", "Figma", "Typography", "Color Theory", "Branding", "Layout Design"],
      projects: [
        {
          name: "Brand Identity Redesign",
          description: "Complete rebrand for a local startup including logo, palette, and guidelines."
        },
        {
          name: "Social Media Campaign",
          description: "Series of 10+ high-engagement posts for a product launch."
        }
      ],
      experience: [
        "Designed visual assets for marketing campaigns, increasing click-through rates by 25%.",
        "Collaborated with marketing team to ensure brand consistency across all channels.",
        "Managed multiple design projects simultaneously, meeting all deadlines."
      ],
      education: "Bachelor's in Bachelor of Design (B.Des) or Fine Arts",
      certifications: ["Adobe Certified Professional", "Google UX Design Certificate"],
      achievements: ["Best Design Award 2023", "Featured in Behance Gallery"],
      keywords: ["Visual Identity", "UI Design", "Creative Suite", "Print Design", "Digital Media"],
      actionVerbs: ["Visualized", "Illustrated", "Designed", "Conceptualized", "Curated"]
    }
  };

  return specific[career] || defaults;
};

module.exports = {
  demoResponses,
  getChatbotDemoResponse,
  getDemoRoadmap,
  demoSkillGapAnalysis,
  getDemoInterviewQuestions,
  getDemoResumeMatcher,
  getDemoWeeklyStudyPlan,
  getDemoCourseRecommendations,
  getDemoSalaryPredictor,
  getDemoResumeSections
};
