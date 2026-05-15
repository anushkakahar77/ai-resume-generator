const axios = require('axios')

const generateResumeFromAI = async (profile, jobDescription) => {
  try {
const prompt = `
You are an expert resume writer. Generate a Harvard style ATS friendly resume.

CANDIDATE PROFILE:
Name: ${profile.name}
Email: ${profile.email}
Phone: ${profile.phone || ''}
City: ${profile.city || ''}
GitHub: ${profile.github || ''}
LinkedIn: ${profile.linkedin || ''}
Summary: ${profile.summary || ''}
Skills: ${profile.skills?.join(', ') || ''}

Education:
${profile.education?.map(e => `${e.degree} from ${e.institute} (${e.year})`).join('\n') || ''}

Projects:
${profile.projects?.map(p => `
  Title: ${p.title}
  Tech: ${p.tech?.join(', ')}
  Points: ${p.points?.join(', ')}
`).join('\n') || ''}

Certifications: ${profile.certifications?.join(', ') || ''}

JOB DESCRIPTION:
${jobDescription}

Generate the resume in EXACTLY this format:

${profile.name}
${profile.phone} | ${profile.email} | ${profile.city}
GitHub: ${profile.github} | LinkedIn: ${profile.linkedin}

PROFESSIONAL SUMMARY
Write a 2-3 line summary in normal sentence case. Not all caps.

TECHNICAL SKILLS
- Languages: [list]
- Frameworks: [list]
- Database: [list]
- Tools: [list]
- Core Concepts: [list]

EDUCATION
[Degree] — [Institute] ([Year])

PROJECTS
[Project Title] | [Tech Stack]
- [point 1]
- [point 2]
- [point 3]

CERTIFICATIONS
- [cert 1]
- [cert 2]

IMPORTANT RULES:
- Summary must be in normal sentence case NOT ALL CAPS
- Project title must be LEFT aligned not centered
- No extra labels or fields
- Follow the format exactly


Then generate:

---COVER LETTER---
[cover letter here]

---MATCH SCORE---
[match score and explanation here]
`

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model:  'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 4000
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.AI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data.choices[0].message.content

  } catch (err) {
    console.log('AI Error:', err.response?.data)
    throw err
  }
}

module.exports = { generateResumeFromAI }