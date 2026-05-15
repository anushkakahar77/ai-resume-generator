import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'
import  ResumeDownload from '../components/ResumeDownload'

const Generate = () => {
  const navigate = useNavigate()
  const [jobDescription, setJobDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [activeTab, setActiveTab] = useState('resume')

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      setError('Please paste a job description!')
      return
    }
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await API.post('/resume/generate', { jobDescription })
      setResult(res.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard! ✅')
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div className='min-h-screen bg-gray-950 px-4 py-10'>
      <div className='max-w-4xl mx-auto'>

        {/* Header */}
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-white'>AI Resume Generator 🤖</h1>
            <p className='text-gray-400 mt-1'>Paste a job description and get a tailored resume instantly</p>
          </div>
          <div className='flex gap-3'>
            <button
              onClick={() => navigate('/profile')}
              className='bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition'
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className='bg-red-600/20 hover:bg-red-600/30 text-red-400 px-4 py-2 rounded-lg text-sm transition'
            >
              Logout
            </button>
          </div>
        </div>

        {/* Job Description Input */}
        <div className='bg-gray-900 p-6 rounded-2xl border border-gray-800 mb-6'>
          <label className='text-gray-400 text-sm mb-2 block'>Paste Job Description here</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder='We are looking for a MERN stack developer with experience in React, Node.js...'
            rows={6}
            className='w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 resize-none'
          />

          {error && (
            <div className='bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mt-3 text-sm'>
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className='w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50'
          >
            {loading ? '⏳ Generating your resume...' : '✨ Generate Resume'}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className='bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden'>

            {/* Match Score */}
            <div className='bg-green-500/10 border-b border-green-500/20 px-6 py-4'>
              <p className='text-green-400 font-semibold text-sm'>🎯 {result.matchScore}</p>
            </div>

            {/* Tabs */}
            <div className='flex border-b border-gray-800'>
              <button
                onClick={() => setActiveTab('resume')}
                className={`px-6 py-3 text-sm font-medium transition ${activeTab === 'resume' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
              >
                📄 Resume
              </button>
              <button
                onClick={() => setActiveTab('cover')}
                className={`px-6 py-3 text-sm font-medium transition ${activeTab === 'cover' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
              >
                ✉️ Cover Letter
              </button>
            </div>

            {/* Content */}
            <div className='p-6'>
              
              {activeTab === 'resume' && (
                  <>
                    <div className='flex justify-between items-center mb-4'>
                      <h2 className='text-white font-semibold'>Your Tailored Resume</h2>
                      <button
                        onClick={() => handleCopy(result.resume)}
                        className='bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded-lg text-sm'
                      >
                        Copy ✅
                      </button>
                    </div>
                    <ResumeDownload
                      resume={result.resume}
                      name={JSON.parse(localStorage.getItem('user'))?.name}
                    />
                  </>
                )}

              {activeTab === 'cover' && (
                <>
                  <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-white font-semibold'>Your Cover Letter</h2>
                    <button
                      onClick={() => handleCopy(result.coverLetter)}
                      className='bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded-lg text-sm'
                    >
                      Copy ✅
                    </button>
                  </div>
                  <pre className='text-gray-300 text-sm whitespace-pre-wrap leading-relaxed'>
                    {result.coverLetter}
                  </pre>
                </>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Generate