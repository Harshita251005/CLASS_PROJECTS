const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');
const { getChatbotDemoResponse, getDemoResumeMatcher, getDemoRoadmap } = require('../utils/demoResponses');

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|txt|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype) || 
                      file.mimetype === 'application/msword' ||
                      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    
    if (extname && (mimetype || file.mimetype === 'text/plain')) {
      return cb(null, true);
    } else {
      cb(new Error('Only PDF, TXT, DOC, and DOCX files are allowed'));
    }
  }
});

// Initialize OpenAI
// Note: Make sure OPENAI_API_KEY is set in .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST /api/ai/chat
router.post('/chat', async (req, res) => {
  const { message, careerContext } = req.body;

  if (!message) {
    return res.status(400).json({ msg: 'Message is required' });
  }

  // Check if OpenAI API key is configured
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
    const demoResponse = getChatbotDemoResponse(careerContext?.title || 'default', message);
    return res.json({ 
      response: demoResponse + '\n\n_💡 Demo Mode: Add OpenAI credits for personalized AI responses._'
    });
  }

  try {
    const systemPrompt = `You are an expert career counselor and mentor specializing in the field of "${careerContext?.title || 'General Career Advice'}". 
    
    Context about this career:
    ${careerContext?.overview || ''}
    
    Your goal is to provide helpful, encouraging, and accurate advice to a user interested in this career. 
    - Be concise but informative.
    - Use bullet points for steps or lists.
    - If asked about salaries, mention that they vary by location and experience, but provide general ranges if known (or use the context provided).
    - If asked about specific steps, guide them through education, skills, and projects.
    
    User Question: ${message}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const botResponse = completion.choices[0].message.content;

    res.json({ response: botResponse });
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    
    // Fallback to demo mode on any error (including quota exceeded)
    const demoResponse = getChatbotDemoResponse(careerContext?.title || 'default', message);
    res.json({ 
      response: demoResponse + '\n\n_💡 Demo Mode: OpenAI quota exceeded. Showing sample response._'
    });
  }
});

// POST /api/ai/quiz-analysis
router.post('/quiz-analysis', async (req, res) => {
  const { answers, quizQuestions } = req.body;

  if (!answers || !quizQuestions) {
    return res.status(400).json({ msg: 'Quiz answers and questions are required' });
  }

  // Check if OpenAI API key is configured
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
    const { demoResponses } = require('../utils/demoResponses');
    return res.json(demoResponses.quizAnalysis);
  }

  try {
    // Build context from quiz answers
    const quizContext = quizQuestions.map((q, index) => {
      const answer = answers[index];
      return `Q${index + 1} [${q.category}]: ${q.question}\nAnswer: ${answer.text}`;
    }).join('\n\n');

    const systemPrompt = `You are an expert career counselor and psychologist specializing in career guidance. 
    
Analyze the following quiz responses and provide comprehensive career recommendations.

Quiz Responses:
${quizContext}

Your task:
1. Identify the top 3 career recommendations based on the user's interests, personality, skills, and preferences
2. For each career, provide:
   - Career name (match one of these if possible: Software Engineer, Data Scientist, Doctor, Teacher, Graphic Designer, UI/UX Designer, Business Analyst, Product Manager, Entrepreneur, Financial Analyst, Cloud Engineer, Cybersecurity Analyst, Lawyer, Journalist, Content Creator, Actor, Musician, IAS Officer, Civil Engineer, Mechanical Engineer, Pharmacist, Chartered Accountant, Professor)
   - Match percentage (0-100)
   - Detailed reasoning (2-3 sentences explaining why this career suits them)
   - Skill analysis with 4-6 identified strengths
   - 3-4 areas for improvement/weaknesses
   - Personalized 3-phase roadmap (Foundation, Intermediate, Advanced) with specific steps

3. Provide personality insights (2-3 sentences)

IMPORTANT: Respond ONLY with valid JSON in this exact format:
{
  "recommendations": [
    {
      "career": "Career Name",
      "matchPercentage": 95,
      "reasoning": "Detailed explanation...",
      "strengths": ["Strength 1", "Strength 2", "Strength 3", "Strength 4"],
      "weaknesses": ["Area to improve 1", "Area to improve 2", "Area to improve 3"],
      "roadmap": [
        {
          "phase": "Foundation",
          "duration": "3-6 months",
          "steps": ["Step 1", "Step 2", "Step 3", "Step 4"]
        },
        {
          "phase": "Intermediate",
          "duration": "6-12 months",
          "steps": ["Step 1", "Step 2", "Step 3", "Step 4"]
        },
        {
          "phase": "Advanced",
          "duration": "1-2 years",
          "steps": ["Step 1", "Step 2", "Step 3"]
        }
      ]
    }
  ],
  "personalityInsights": "Based on your responses..."
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: "Please analyze my quiz responses and provide career recommendations." },
      ],
      max_tokens: 2000,
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const aiResponse = completion.choices[0].message.content;
    const analysisResult = JSON.parse(aiResponse);

    res.json(analysisResult);
  } catch (error) {
    console.error('Error calling OpenAI for quiz analysis:', error);
    
    // Fallback to demo mode on any error (including quota exceeded)
    const { demoResponses } = require('../utils/demoResponses');
    res.json(demoResponses.quizAnalysis);
  }
});

// POST /api/ai/roadmap-generator
router.post('/roadmap-generator', async (req, res) => {
  const { careerTitle, careerOverview } = req.body;

  if (!careerTitle) {
    return res.status(400).json({ msg: 'Career title is required' });
  }

  // Check if OpenAI API key is configured
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
    // Use dynamic demo roadmap generator
    return res.json(getDemoRoadmap(careerTitle));
  }

  try {
    const systemPrompt = `You are an expert career counselor specializing in creating comprehensive career roadmaps.

Create a detailed roadmap for becoming a ${careerTitle}.

Career Context: ${careerOverview || 'General information'}

Your task is to create a JSON response with:

1. **steps**: 5-6 major phases with title, duration, description, and 5-6 specific actions
2. **courses**: 6-8 recommended online courses (include platform, level, duration)
3. **certifications**: 4-6 essential certifications (include provider, duration, cost, priority level)
4. **projects**: 5-6 project ideas with difficulty level and required skills
5. **tools**: 8-10 essential tools/technologies with icons and categories
6. **internshipGuide**: 8-10 practical tips for finding internships and jobs

IMPORTANT: Respond ONLY with valid JSON in this exact format:
{
  "careerTitle": "${careerTitle}",
  "overview": "Brief overview paragraph",
  "steps": [{ "title": "", "duration": "", "description": "", "actions": [""] }],
  "courses": [{ "title": "", "platform": "", "level": "", "duration": "" }],
  "certifications": [{ "name": "", "provider": "", "duration": "", "cost": "", "priority": "High/Medium/Low" }],
  "projects": [{ "title": "", "difficulty": "Beginner/Intermediate/Advanced", "description": "", "skills": [""] }],
  "tools": [{ "name": "", "icon": "emoji", "category": "" }],
  "internshipGuide": [{ "title": "", "description": "" }]
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Generate a comprehensive roadmap for ${careerTitle}` },
      ],
      max_tokens: 2500,
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const aiResponse = completion.choices[0].message.content;
    const roadmapData = JSON.parse(aiResponse);

    res.json(roadmapData);
  } catch (error) {
    console.error('Error calling OpenAI for roadmap generation:', error);
    
    // Fallback to demo mode on any error
    // Fallback to demo mode on any error
    return res.json(getDemoRoadmap(careerTitle));
  }
});

// POST /api/ai/skill-gap-analysis
router.post('/skill-gap-analysis', async (req, res) => {
  const { careerTitle, careerSkills, userSkills } = req.body;

  if (!careerTitle || !careerSkills || !userSkills) {
    return res.status(400).json({ msg: 'Career title, career skills, and user skills are required' });
  }

  // Normalize skills for comparison (lowercase, trim)
  const normalizeSkill = (skill) => skill.toLowerCase().trim();
  const normalizedCareerSkills = careerSkills.map(normalizeSkill);
  const normalizedUserSkills = userSkills.map(normalizeSkill);

  // Check if OpenAI API key is configured
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
    const { demoSkillGapAnalysis } = require('../utils/demoResponses');
    
    // Simple matching for demo mode
    const matched = careerSkills.filter((skill) => 
      normalizedUserSkills.includes(normalizeSkill(skill))
    );
    const missing = careerSkills.filter((skill) => 
      !normalizedUserSkills.includes(normalizeSkill(skill))
    );
    
    // Return demo response with actual matching
    return res.json({
      ...demoSkillGapAnalysis,
      matchedSkills: matched,
      missingSkills: missing,
      summary: `You have ${matched.length} out of ${careerSkills.length} required skills (${Math.round((matched.length/careerSkills.length)*100)}%). ${missing.length > 0 ? 'Focus on learning the missing skills to advance your career.' : 'Great! You have all the essential skills.'}`
    });
  }

  try {
    const systemPrompt = `You are an expert career counselor specializing in skill gap analysis.

Analyze the user's current skills against the required skills for a ${careerTitle}.

**Required Skills for ${careerTitle}:**
${careerSkills.join(', ')}

**User's Current Skills:**
${userSkills.join(', ')}

Your task:
1. Identify which required skills the user already has (matched skills)
2. Identify which required skills the user is missing
3. Provide 3-5 prioritized learning recommendations with:
   - Skill name
   - Priority level (High/Medium/Low)
   - Brief reason why it's important
   - 2-3 recommended learning resources
4. Provide a summary of their readiness

IMPORTANT: Respond ONLY with valid JSON in this exact format:
{
  "matchedSkills": ["skill1", "skill2"],
  "missingSkills": ["skill3", "skill4"],
  "learningRecommendations": [
    {
      "skill": "Skill Name",
      "priority": "High/Medium/Low",
      "reason": "Why this skill is important",
      "resources": ["Resource 1", "Resource 2"]
    }
  ],
  "summary": "Brief summary of readiness and next steps"
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Analyze my skills for ${careerTitle}` },
      ],
      max_tokens: 1500,
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const aiResponse = completion.choices[0].message.content;
    const analysisResult = JSON.parse(aiResponse);

    res.json(analysisResult);
  } catch (error) {
    console.error('Error calling OpenAI for skill gap analysis:', error);
    
    // Fallback to demo mode on any error
    const { demoSkillGapAnalysis } = require('../utils/demoResponses');
    
    const matched = careerSkills.filter((skill) => 
      normalizedUserSkills.includes(normalizeSkill(skill))
    );
    const missing = careerSkills.filter((skill) => 
      !normalizedUserSkills.includes(normalizeSkill(skill))
    );
    
    res.json({
      ...demoSkillGapAnalysis,
      matchedSkills: matched,
      missingSkills: missing,
      summary: `You have ${matched.length} out of ${careerSkills.length} required skills (${Math.round((matched.length/careerSkills.length)*100)}%). ${missing.length > 0 ? 'Focus on learning the missing skills to advance your career.' : 'Great! You have all the essential skills.'}`
    });
  }
});

// POST /api/ai/interview-questions
router.post('/interview-questions', async (req, res) => {
  const { careerTitle, careerCategory, numberOfQuestions = 15 } = req.body;

  if (!careerTitle) {
    return res.status(400).json({ msg: 'Career title is required' });
  }

  // Check if OpenAI API key is configured
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
    const { getDemoInterviewQuestions } = require('../utils/demoResponses');
    return res.json(getDemoInterviewQuestions(careerTitle, careerCategory));
  }

  try {
    const systemPrompt = `You are an expert interviewer and career counselor specializing in ${careerTitle} interviews.

Generate ${numberOfQuestions} interview questions for a ${careerTitle} position.

Career Category: ${careerCategory || 'General'}

Requirements:
1. Create realistic questions that would be asked in actual interviews
2. Include a mix of difficulty levels:
   - 40% Easy (fundamental concepts)
   - 40% Medium (practical application)
   - 20% Hard (advanced/system design)
3. Cover diverse topics relevant to this career
4. For each question, provide:
   - Question text
   - Category/topic (e.g., "Data Structures", "System Design", "OOPs")
   - Difficulty level (Easy/Medium/Hard)
   - A brief hint or key points to address

IMPORTANT: Respond ONLY with valid JSON in this exact format:
{
  "careerTitle": "${careerTitle}",
  "questions": [
    {
      "id": 1,
      "question": "Question text here?",
      "category": "Category name",
      "difficulty": "Easy",
      "hint": "Brief hint or key points"
    }
  ]
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Generate ${numberOfQuestions} interview questions for ${careerTitle}` },
      ],
      max_tokens: 2500,
      temperature: 0.8,
      response_format: { type: "json_object" }
    });

    const aiResponse = completion.choices[0].message.content;
    const questionsData = JSON.parse(aiResponse);

    res.json(questionsData);
  } catch (error) {
    console.error('Error calling OpenAI for interview questions:', error);
    
    // Fallback to demo mode on any error
    const { getDemoInterviewQuestions } = require('../utils/demoResponses');
    res.json(getDemoInterviewQuestions(careerTitle, careerCategory));
  }
});

// POST /api/ai/resume-matcher
router.post('/resume-matcher', upload.single('resume'), async (req, res) => {
  const { careerTitle, careerSkills } = req.body;

  if (!req.file) {
    return res.status(400).json({ msg: 'Resume file is required' });
  }

  if (!careerTitle || !careerSkills) {
    // Clean up uploaded file
    if (req.file) fs.unlinkSync(req.file.path);
    return res.status(400).json({ msg: 'Career title and skills are required' });
  }

  const filePath = req.file.path;
  let resumeText = '';

  try {
    // Parse resume based on file type
    if (req.file.mimetype === 'application/pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);
      resumeText = pdfData.text;
    } else if (req.file.mimetype === 'text/plain') {
      resumeText = fs.readFileSync(filePath, 'utf8');
    } else {
      // For DOC/DOCX, we'll treat as text for now (would need additional library for full parsing)
      resumeText = fs.readFileSync(filePath, 'utf8');
    }

    // Parse career skills from JSON string
    const skillsArray = JSON.parse(careerSkills);

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      const demoResult = getDemoResumeMatcher(resumeText, skillsArray, careerTitle);
      
      // Clean up uploaded file
      fs.unlinkSync(filePath);
      
      return res.json({ 
        ...demoResult,
        demoMode: true,
        message: '💡 Demo Mode: Using keyword matching. Add OpenAI credits for advanced semantic analysis.'
      });
    }

    // Use OpenAI for advanced analysis
    try {
      const systemPrompt = `You are an expert career counselor and resume analyzer specializing in ${careerTitle} positions.

Analyze the following resume and compare it against the required skills for a ${careerTitle} role.

**Required Skills:**
${skillsArray.join(', ')}

**Resume Content:**
${resumeText.substring(0, 4000)}

Your task:
1. Identify which required skills are present in the resume (matched skills)
2. Identify which required skills are missing from the resume
3. Calculate an overall match percentage (0-100)
4. Determine career readiness: "Fully Job Ready" (80%+), "Job Ready" (60-79%), "Getting There" (40-59%), "Needs Improvement" (<40%)
5. Provide 4-6 specific, actionable recommendations for improvement

IMPORTANT: Respond ONLY with valid JSON in this exact format:
{
  "matchPercentage": 75,
  "careerReadinessScore": "Job Ready",
  "matchedSkills": ["Skill1", "Skill2"],
  "missingSkills": ["Skill3", "Skill4"],
  "recommendations": [
    "Recommendation 1",
    "Recommendation 2",
    "Recommendation 3"
  ],
  "summary": "Brief summary of analysis"
}`;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analyze this resume for ${careerTitle} position` },
        ],
        max_tokens: 1500,
        temperature: 0.7,
        response_format: { type: "json_object" }
      });

      const aiResponse = completion.choices[0].message.content;
      const analysisResult = JSON.parse(aiResponse);

      // Clean up uploaded file
      fs.unlinkSync(filePath);

      res.json({
        ...analysisResult,
        demoMode: false
      });
    } catch (aiError) {
      console.error('OpenAI error, falling back to demo mode:', aiError);
      
      // Fallback to demo mode
      const demoResult = getDemoResumeMatcher(resumeText, skillsArray, careerTitle);
      
      // Clean up uploaded file
      fs.unlinkSync(filePath);
      
      res.json({ 
        ...demoResult,
        demoMode: true,
        message: '💡 Demo Mode: OpenAI quota exceeded. Using keyword matching.'
      });
    }
  } catch (error) {
    console.error('Error processing resume:', error);
    
    // Clean up uploaded file
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    res.status(500).json({ 
      msg: 'Error processing resume file',
      error: error.message 
    });
  }
});

// POST /api/ai/weekly-study-plan
router.post('/weekly-study-plan', async (req, res) => {
  const { careerTitle, careerSkills, skillLevel = 'beginner', hoursPerDay = 3 } = req.body;

  if (!careerTitle) {
    return res.status(400).json({ msg: 'Career title is required' });
  }

  // Check if OpenAI API key is configured
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
    const { getDemoWeeklyStudyPlan } = require('../utils/demoResponses');
    return res.json(getDemoWeeklyStudyPlan(careerTitle, skillLevel, hoursPerDay));
  }

  try {
    const systemPrompt = `You are an expert learning coach creating a personalized 7-day study plan for someone pursuing a career in ${careerTitle}.

Skill Level: ${skillLevel}
Available Hours/Day: ${hoursPerDay}
${careerSkills ? `Required Skills: ${careerSkills.join(', ')}` : ''}

Create a structured weekly study plan that:
1. Starts with fundamentals (Days 1-2) for beginners
2. Builds to intermediate concepts (Days 3-5)
3. Includes practical projects and applications (Days 6-7)
4. Progressively increases complexity throughout the week
5. Includes hands-on assignments and mini projects daily
6. Provides specific, actionable learning resources with real URLs
7. Adjusts difficulty based on the ${skillLevel} level

Each day should have:
- Clear topic and focus area
- 2-3 specific learning objectives
- Study hours (based on ${hoursPerDay} hours/day)
- 2-3 quality learning resources (tutorials, docs, courses)
- 3-4 specific assignments/exercises
- A mini project to apply concepts

IMPORTANT: Respond ONLY with valid JSON in this exact format:
{
  "careerTitle": "${careerTitle}",
  "skillLevel": "${skillLevel}",
  "hoursPerDay": ${hoursPerDay},
  "weeklyPlan": [
    {
      "day": "Monday",
      "dayNumber": 1,
      "topic": "Specific topic name",
      "objectives": ["Objective 1", "Objective 2", "Objective 3"],
      "hours": ${hoursPerDay},
      "resources": [
        {"title": "Resource name", "url": "https://...", "type": "Documentation/Tutorial/Interactive/Video"},
        {"title": "Resource name", "url": "https://...", "type": "Type"}
      ],
      "assignments": ["Assignment 1", "Assignment 2", "Assignment 3"],
      "project": "Mini project description"
    }
  ],
  "summary": "Brief summary of the week's focus and goals",
  "totalHours": 0
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Create a comprehensive 7-day study plan for ${careerTitle} at ${skillLevel} level with ${hoursPerDay} hours per day` },
      ],
      max_tokens: 3000,
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const aiResponse = completion.choices[0].message.content;
    const studyPlan = JSON.parse(aiResponse);

    // Calculate total hours if not provided
    if (!studyPlan.totalHours) {
      studyPlan.totalHours = studyPlan.weeklyPlan.reduce((sum, day) => sum + day.hours, 0);
    }

    res.json({
      ...studyPlan,
      demoMode: false
    });
  } catch (error) {
    console.error('Error calling OpenAI for weekly study plan:', error);
    
    // Fallback to demo mode on any error
    const { getDemoWeeklyStudyPlan } = require('../utils/demoResponses');
    res.json(getDemoWeeklyStudyPlan(careerTitle, skillLevel, hoursPerDay));
  }
});

// POST /api/ai/course-recommendations
router.post('/course-recommendations', async (req, res) => {
  const { careerTitle, skillLevel = 'beginner' } = req.body;

  if (!careerTitle) {
    return res.status(400).json({ msg: 'Career title is required' });
  }

  // Check if OpenAI API key is configured
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
    const { getDemoCourseRecommendations } = require('../utils/demoResponses');
    return res.json(getDemoCourseRecommendations(careerTitle, skillLevel));
  }

  try {
    const systemPrompt = `You are an expert online course curator specializing in ${careerTitle} education.

Skill Level: ${skillLevel}

Your task is to recommend 4-6 high-quality online courses for someone pursuing ${careerTitle} at the ${skillLevel} level.

For each course, provide:
- Actual course title (use real courses from Udemy, Coursera, edX, freeCodeCamp, etc.)
- Platform name
- Instructor name
- Duration (e.g., "20 hours", "6 weeks")
- Price (use realistic pricing, include free options)
- Star rating (4.0-5.0)
- Number of students (realistic estimate)
- Level (Beginner/Intermediate/Advanced)
- Skills covered (3-5 key skills as array)
- Brief description (1-2 sentences)
- Course URL (actual URL if known, or placeholder)
- 2-3 highlights/key features

Mix free and paid options. Include courses from different platforms. Prioritize highly-rated, popular courses.

IMPORTANT: Respond ONLY with valid JSON in this exact format:
{
  "careerTitle": "${careerTitle}",
  "skillLevel": "${skillLevel}",
  "totalCourses": 0,
  "courses": [
    {
      "title": "Course Title",
      "platform": "Platform Name",
      "instructor": "Instructor Name",
      "duration": "XX hours/weeks",
      "price": "Price or Free",
      "rating": 4.7,
      "students": "100,000+",
      "level": "Beginner/Intermediate/Advanced",
      "skills": ["Skill 1", "Skill 2"],
      "description": "Course description",
      "url": "https://...",
      "highlights": ["Feature 1", "Feature 2"]
    }
  ],
  "summary": "Brief summary of recommendations",
  "filters": {
    "platforms": ["All", "Udemy", "Coursera", "edX"],
    "priceRanges": ["Free", "Under ₹1,000", "₹1,000-₹3,000", "₹3,000+"]
  }
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Recommend courses for ${careerTitle} at ${skillLevel} level` },
      ],
      max_tokens: 2500,
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const aiResponse = completion.choices[0].message.content;
    const recommendations = JSON.parse(aiResponse);

    res.json({
      ...recommendations,
      demoMode: false
    });
  } catch (error) {
    console.error('Error calling OpenAI for course recommendations:', error);
    
    // Fallback to demo mode on any error
    const { getDemoCourseRecommendations } = require('../utils/demoResponses');
    res.json(getDemoCourseRecommendations(careerTitle, skillLevel));
  }
});

// POST /api/ai/salary-predictor
router.post('/salary-predictor', async (req, res) => {
  const { careerTitle, experienceYears = 0, location = 'India', skills = [] } = req.body;

  if (!careerTitle) {
    return res.status(400).json({ msg: 'Career title is required' });
  }

  // Check if OpenAI API key is configured
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
    const { getDemoSalaryPredictor } = require('../utils/demoResponses');
    return res.json(getDemoSalaryPredictor(careerTitle, experienceYears, location, skills));
  }

  try {
    const systemPrompt = `You are an expert salary analyst and career advisor specializing in ${careerTitle} compensation.

Career: ${careerTitle}
Experience: ${experienceYears} years
Location: ${location}
Skills: ${skills.join(', ')}

Provide a detailed salary prediction including:
1. Predicted annual salary based on the inputs
2. Salary range (min-max)
3. Breakdown by experience levels (Entry, Junior, Mid, Senior, Lead)
4. Factors affecting the salary with impact percentages
5. Market insights and trends
6. Percentile ranking

Use realistic market data for ${location}. Consider experience multiplier, skills premium, and location factors.

IMPORTANT: Respond ONLY with valid JSON in this exact format:
{
  "careerTitle": "${careerTitle}",
  "location": "${location}",
  "experienceYears": ${experienceYears},
  "skills": ${JSON.stringify(skills)},
  "predictedSalary": {
    "annual": 0,
    "monthly": 0,
    "currency": "${location === 'India' ? 'INR' : 'USD'}"
  },
  "salaryRange": {
    "min": 0,
    "max": 0
  },
  "salaryByExperience": [
    {"years": "0-1", "title": "Entry Level", "india": 0, "global": 0}
  ],
  "factors": [
    {"factor": "Factor name", "impact": "+X%", "description": "Description"}
  ],
  "insights": ["Insight 1", "Insight 2"],
  "percentile": "50th",
  "summary": "Brief summary"
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Predict salary for ${careerTitle} with ${experienceYears} years experience in ${location}` },
      ],
      max_tokens: 2000,
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const aiResponse = completion.choices[0].message.content;
    const prediction = JSON.parse(aiResponse);

    res.json({
      ...prediction,
      demoMode: false
    });
  } catch (error) {
    console.error('Error calling OpenAI for salary prediction:', error);
    
    // Fallback to demo mode on any error
    const { getDemoSalaryPredictor } = require('../utils/demoResponses');
    res.json(getDemoSalaryPredictor(careerTitle, experienceYears, location, skills));
  }
});

// POST /api/ai/resume-sections
router.post('/resume-sections', async (req, res) => {
  const { career } = req.body;

  if (!career) {
    return res.status(400).json({ msg: 'Career title is required' });
  }

  // Check if OpenAI API key is configured
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
    const { getDemoResumeSections } = require('../utils/demoResponses');
    return res.json(getDemoResumeSections(career));
  }

  try {
    const systemPrompt = `Generate career-specific resume sections for the selected profession.
For this career, provide the most important resume categories such as skills, projects, experience, certifications, tools, achievements, and portfolio requirements.
Make the resume sections short, clear, ATS-friendly, and tailored for freshers or experienced candidates depending on the user selection.
Also suggest AI-recommended keywords and action verbs that increase resume selection chances.

IMPORTANT: Respond ONLY with valid JSON in this exact format:
{
  "title": "${career}",
  "skills": ["Skill 1", "Skill 2", "Skill 3"],
  "projects": [
    { "name": "Project Name", "description": "Short description" },
    { "name": "Project Name", "description": "Short description" }
  ],
  "experience": [
    "Action-verb bullet point 1",
    "Action-verb bullet point 2",
    "Action-verb bullet point 3"
  ],
  "education": "Required Degree/Course",
  "certifications": ["Cert 1", "Cert 2"],
  "achievements": ["Achievement 1", "Achievement 2"],
  "keywords": ["Keyword 1", "Keyword 2", "Keyword 3"],
  "actionVerbs": ["Verb 1", "Verb 2", "Verb 3"]
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Generate resume sections for ${career}` },
      ],
      max_tokens: 2000,
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const aiResponse = completion.choices[0].message.content;
    const result = JSON.parse(aiResponse);

    res.json({
      ...result,
      demoMode: false
    });
  } catch (error) {
    console.error('Error calling OpenAI for resume sections:', error);
    
    // Fallback to demo mode on any error
    const { getDemoResumeSections } = require('../utils/demoResponses');
    res.json(getDemoResumeSections(career));
  }
});

module.exports = router;
