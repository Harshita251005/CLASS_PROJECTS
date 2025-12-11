// Career Quiz Questions
export const quizQuestions = [
  {
    id: 1,
    category: 'Interest',
    question: 'What type of activities do you enjoy the most?',
    options: [
      { text: 'Solving complex problems and puzzles', careers: ['software-engineer', 'data-scientist'], points: 3 },
      { text: 'Helping people and making a difference', careers: ['doctor', 'teacher'], points: 3 },
      { text: 'Creating and designing things', careers: ['graphic-designer', 'architect'], points: 3 },
      { text: 'Managing teams and leading projects', careers: ['business-analyst', 'product-manager'], points: 3 }
    ]
  },
  {
    id: 2,
    category: 'Skills',
    question: 'Which skill do you think you excel at?',
    options: [
      { text: 'Analytical thinking and logic', careers: ['software-engineer', 'data-scientist'], points: 3 },
      { text: 'Communication and empathy', careers: ['doctor', 'teacher'], points: 3 },
      { text: 'Creativity and innovation', careers: ['graphic-designer', 'content-creator'], points: 3 },
      { text: 'Leadership and decision-making', careers: ['business-analyst', 'entrepreneur'], points: 3 }
    ]
  },
  {
    id: 3,
    category: 'Work Environment',
    question: 'What kind of work environment do you prefer?',
    options: [
      { text: 'Remote/flexible with technology', careers: ['software-engineer', 'data-scientist'], points: 2 },
      { text: 'Hands-on with people interaction', careers: ['doctor', 'teacher'], points: 2 },
      { text: 'Creative studio or collaborative space', careers: ['graphic-designer', 'architect'], points: 2 },
      { text: 'Corporate office with structured environment', careers: ['business-analyst', 'financial-analyst'], points: 2 }
    ]
  },
  {
    id: 4,
    category: 'Personality',
    question: 'How would you describe yourself?',
    options: [
      { text: 'Logical and detail-oriented', careers: ['software-engineer', 'data-scientist'], points: 3 },
      { text: 'Caring and patient', careers: ['doctor', 'teacher'], points: 3 },
      { text: 'Imaginative and artistic', careers: ['graphic-designer', 'content-creator'], points: 3 },
      { text: 'Ambitious and strategic', careers: ['business-analyst', 'entrepreneur'], points: 3 }
    ]
  },
  {
    id: 5,
    category: 'Learning Style',
    question: 'How do you prefer to learn new things?',
    options: [
      { text: 'Through coding and experimentation', careers: ['software-engineer', 'data-scientist'], points: 2 },
      { text: 'Through practical experience and mentorship', careers: ['doctor', 'teacher'], points: 2 },
      { text: 'Through visual examples and inspiration', careers: ['graphic-designer', 'architect'], points: 2 },
      { text: 'Through case studies and analysis', careers: ['business-analyst', 'financial-analyst'], points: 2 }
    ]
  },
  {
    id: 6,
    category: 'Work Preference',
    question: 'What type of work excites you?',
    options: [
      { text: 'Building software and applications', careers: ['software-engineer', 'cloud-engineer'], points: 3 },
      { text: 'Diagnosing and treating health issues', careers: ['doctor', 'pharmacist'], points: 3 },
      { text: 'Designing visual content and branding', careers: ['graphic-designer', 'ui-ux-designer'], points: 3 },
      { text: 'Analyzing data and making business decisions', careers: ['business-analyst', 'data-scientist'], points: 3 }
    ]
  },
  {
    id: 7,
    category: 'Strength',
    question: 'What is your biggest strength?',
    options: [
      { text: 'Problem-solving and debugging', careers: ['software-engineer', 'data-scientist'], points: 3 },
      { text: 'Compassion and understanding', careers: ['doctor', 'teacher'], points: 3 },
      { text: 'Creativity and visual thinking', careers: ['graphic-designer', 'architect'], points: 3 },
      { text: 'Strategic planning and execution', careers: ['business-analyst', 'product-manager'], points: 3 }
    ]
  },
  {
    id: 8,
    category: 'Challenge',
    question: 'What kind of challenges do you enjoy?',
    options: [
      { text: 'Technical and algorithmic challenges', careers: ['software-engineer', 'data-scientist'], points: 2 },
      { text: 'Life-saving and critical situations', careers: ['doctor', 'surgeon'], points: 2 },
      { text: 'Creative briefs and design problems', careers: ['graphic-designer', 'content-creator'], points: 2 },
      { text: 'Business growth and market challenges', careers: ['business-analyst', 'entrepreneur'], points: 2 }
    ]
  },
  {
    id: 9,
    category: 'Impact',
    question: 'How do you want to make an impact?',
    options: [
      { text: 'Through innovative technology solutions', careers: ['software-engineer', 'cloud-engineer'], points: 3 },
      { text: 'By improving people\'s health and wellbeing', careers: ['doctor', 'pharmacist'], points: 3 },
      { text: 'By creating inspiring visual experiences', careers: ['graphic-designer', 'ui-ux-designer'], points: 3 },
      { text: 'By driving business success and growth', careers: ['business-analyst', 'product-manager'], points: 3 }
    ]
  },
  {
    id: 10,
    category: 'Future Vision',
    question: 'Where do you see yourself in 10 years?',
    options: [
      { text: 'Leading tech teams or starting a tech company', careers: ['software-engineer', 'entrepreneur'], points: 2 },
      { text: 'Running a clinic or becoming a specialist doctor', careers: ['doctor', 'surgeon'], points: 2 },
      { text: 'Running a design agency or being a creative director', careers: ['graphic-designer', 'creative-director'], points: 2 },
      { text: 'In C-suite or managing large business operations', careers: ['business-analyst', 'ceo'], points: 2 }
    ]
  },
  {
    id: 11,
    category: 'Technology',
    question: 'How comfortable are you with technology?',
    options: [
      { text: 'Very comfortable - I love learning new tech tools', careers: ['software-engineer', 'data-scientist', 'cloud-engineer'], points: 3 },
      { text: 'Comfortable - I use technology as needed for work', careers: ['business-analyst', 'financial-analyst'], points: 2 },
      { text: 'Moderate - I prefer human interaction over screens', careers: ['doctor', 'teacher', 'lawyer'], points: 2 },
      { text: 'I prefer creative tools like design software', careers: ['graphic-designer', 'ui-ux-designer', 'content-creator'], points: 3 }
    ]
  },
  {
    id: 12,
    category: 'Values',
    question: 'What do you value most in a career?',
    options: [
      { text: 'Financial stability and high earning potential', careers: ['software-engineer', 'financial-analyst', 'chartered-accountant'], points: 3 },
      { text: 'Making a positive impact on society', careers: ['doctor', 'teacher', 'ias-officer'], points: 3 },
      { text: 'Creative freedom and self-expression', careers: ['graphic-designer', 'content-creator', 'musician'], points: 3 },
      { text: 'Power, influence, and leadership opportunities', careers: ['entrepreneur', 'product-manager', 'lawyer'], points: 3 }
    ]
  },
  {
    id: 13,
    category: 'Teamwork',
    question: 'How do you prefer to work?',
    options: [
      { text: 'Independently with minimal supervision', careers: ['software-engineer', 'data-scientist', 'content-creator'], points: 2 },
      { text: 'In small collaborative teams', careers: ['ui-ux-designer', 'product-manager', 'architect'], points: 2 },
      { text: 'Leading and managing teams', careers: ['business-analyst', 'entrepreneur', 'professor'], points: 3 },
      { text: 'Directly with clients or patients', careers: ['doctor', 'lawyer', 'teacher'], points: 2 }
    ]
  },
  {
    id: 14,
    category: 'Stress Management',
    question: 'How do you handle pressure and deadlines?',
    options: [
      { text: 'I thrive under pressure and work well with tight deadlines', careers: ['software-engineer', 'journalist', 'surgeon'], points: 3 },
      { text: 'I prefer steady, predictable work without sudden pressure', careers: ['teacher', 'pharmacist', 'professor'], points: 2 },
      { text: 'I enjoy high-stakes situations where quick decisions matter', careers: ['doctor', 'entrepreneur', 'ias-officer'], points: 3 },
      { text: 'I work best with creative deadlines and project-based work', careers: ['graphic-designer', 'architect', 'content-creator'], points: 2 }
    ]
  },
  {
    id: 15,
    category: 'Career Goals',
    question: 'What is your primary career goal?',
    options: [
      { text: 'To become a technical expert in my field', careers: ['software-engineer', 'data-scientist', 'cybersecurity-analyst'], points: 3 },
      { text: 'To help and serve others directly', careers: ['doctor', 'teacher', 'pharmacist'], points: 3 },
      { text: 'To build and grow my own business or brand', careers: ['entrepreneur', 'content-creator', 'graphic-designer'], points: 3 },
      { text: 'To lead organizations and make strategic decisions', careers: ['business-analyst', 'product-manager', 'ias-officer'], points: 3 }
    ]
  }
];

export default quizQuestions;
