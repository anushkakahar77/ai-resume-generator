import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

const Profile = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    phone: '',
    city: '',
    github: '',
    linkedin: '',
    summary: '',
    skills: '',
    certifications: '',
    education: [{ degree: '', institute: '', year: '' }],
    projects: [{ title: '', description: '', tech: '', points: '' }]
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleEducationChange = (index, e) => {
    const updated = [...form.education]
    updated[index][e.target.name] = e.target.value
    setForm({ ...form, education: updated })
  }

  const handleProjectChange = (index, e) => {
    const updated = [...form.projects]
    updated[index][e.target.name] = e.target.value
    setForm({ ...form, projects: updated })
  }

  const addEducation = () => {
    setForm({ ...form, education: [...form.education, { degree: '', institute: '', year: '' }] })
  }

  const addProject = () => {
    setForm({ ...form, projects: [...form.projects, { title: '', description: '', tech: '', points: '' }] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      await API.put('/profile/update', {
        ...form,
        skills: form.skills.split(',').map(s => s.trim()),
        certifications: form.certifications.split(',').map(c => c.trim()),
        education: form.education,
        projects: form.projects.map(p => ({
          ...p,
          tech: p.tech.split(',').map(t => t.trim()),
          points: p.points.split(',').map(pt => pt.trim())
        }))
      })
      setSuccess('Profile saved successfully! ✅')
      setTimeout(() => navigate('/generate'), 1500)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = 'w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500'
  const labelClass = 'text-gray-400 text-sm mb-1 block'

  return (
    <div className='min-h-screen bg-gray-950 px-4 py-10'>
      <div className='max-w-2xl mx-auto'>

        <div className='flex justify-between items-center mb-2'>
        <h1 className='text-3xl font-bold text-white'>Your Profile 👤</h1>
        <button
          type='button'
          onClick={() => navigate('/generate')}
          className='bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition'
        >
          ← Back
        </button>
      </div>
        <p className='text-gray-400 mb-8'>Fill in your details — this will be used to generate your resume</p>

        {error && <div className='bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-4 text-sm'>{error}</div>}
        {success && <div className='bg-green-500/10 border border-green-500 text-green-400 px-4 py-3 rounded-lg mb-4 text-sm'>{success}</div>}

        <form onSubmit={handleSubmit} className='space-y-6'>

          {/* Basic Info */}
          <div className='bg-gray-900 p-6 rounded-2xl border border-gray-800'>
            <h2 className='text-white font-semibold text-lg mb-4'>Basic Info</h2>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className={labelClass}>Phone</label>
                <input name='phone' value={form.phone} onChange={handleChange} placeholder='+91 XXXXXXXXXX' className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>City</label>
                <input name='city' value={form.city} onChange={handleChange} placeholder='Your city' className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>GitHub</label>
                <input name='github' value={form.github} onChange={handleChange} placeholder='github.com/username' className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>LinkedIn</label>
                <input name='linkedin' value={form.linkedin} onChange={handleChange} placeholder='linkedin.com/in/username' className={inputClass} />
              </div>
            </div>
            <div className='mt-4'>
              <label className={labelClass}>Summary</label>
              <textarea name='summary' value={form.summary} onChange={handleChange} placeholder='Brief professional summary...' rows={3} className={inputClass} />
            </div>
          </div>

          {/* Skills */}
          <div className='bg-gray-900 p-6 rounded-2xl border border-gray-800'>
            <h2 className='text-white font-semibold text-lg mb-4'>Skills</h2>
            <label className={labelClass}>Enter skills separated by commas</label>
            <input name='skills' value={form.skills} onChange={handleChange} placeholder='React.js, Node.js, MongoDB, Express.js' className={inputClass} />
          </div>

          {/* Education */}
          <div className='bg-gray-900 p-6 rounded-2xl border border-gray-800'>
            <h2 className='text-white font-semibold text-lg mb-4'>Education</h2>
            {form.education.map((edu, index) => (
              <div key={index} className='grid grid-cols-3 gap-4 mb-4'>
                <div>
                  <label className={labelClass}>Degree</label>
                  <input name='degree' value={edu.degree} onChange={(e) => handleEducationChange(index, e)} placeholder='BSc IT' className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Institute</label>
                  <input name='institute' value={edu.institute} onChange={(e) => handleEducationChange(index, e)} placeholder='University of Mumbai' className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Year</label>
                  <input name='year' value={edu.year} onChange={(e) => handleEducationChange(index, e)} placeholder='2026' className={inputClass} />
                </div>
              </div>
            ))}
            <button type='button' onClick={addEducation} className='text-blue-400 text-sm hover:underline'>+ Add Education</button>
          </div>

          {/* Projects */}
          <div className='bg-gray-900 p-6 rounded-2xl border border-gray-800'>
            <h2 className='text-white font-semibold text-lg mb-4'>Projects</h2>
            {form.projects.map((proj, index) => (
              <div key={index} className='mb-6 border border-gray-700 p-4 rounded-lg'>
                <div className='mb-3'>
                  <label className={labelClass}>Project Title</label>
                  <input name='title' value={proj.title} onChange={(e) => handleProjectChange(index, e)} placeholder='Event Management System' className={inputClass} />
                </div>
                <div className='mb-3'>
                  <label className={labelClass}>Tech Stack (comma separated)</label>
                  <input name='tech' value={proj.tech} onChange={(e) => handleProjectChange(index, e)} placeholder='React, Node.js, MongoDB' className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Key Points (comma separated)</label>
                  <textarea name='points' value={proj.points} onChange={(e) => handleProjectChange(index, e)} placeholder='Built REST APIs, Implemented RBAC...' rows={2} className={inputClass} />
                </div>
              </div>
            ))}
            <button type='button' onClick={addProject} className='text-blue-400 text-sm hover:underline'>+ Add Project</button>
          </div>

          {/* Certifications */}
          <div className='bg-gray-900 p-6 rounded-2xl border border-gray-800'>
            <h2 className='text-white font-semibold text-lg mb-4'>Certifications</h2>
            <label className={labelClass}>Enter certifications separated by commas</label>
            <input name='certifications' value={form.certifications} onChange={handleChange} placeholder='JavaScript — Scaler, React Bootcamp' className={inputClass} />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50'
          >
            {loading ? 'Saving...' : 'Save Profile →'}
          </button>

        </form>
      </div>
    </div>
  )
}

export default Profile