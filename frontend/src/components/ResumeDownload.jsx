import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const ResumeDownload = ({ resume, name }) => {

  const handleDownload = async () => {
    const element = document.getElementById('resume-preview')
    const canvas = await html2canvas(element, { scale: 2 })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save(`${name || 'resume'}_resume.pdf`)
  }

  const lines = resume?.split('\n') || []

  const isHeader = (line) => {
    const headers = ['SUMMARY', 'EDUCATION', 'SKILLS', 'PROJECTS', 'EXPERIENCE', 'CERTIFICATIONS', 'PROFESSIONAL', 'TECHNICAL', 'OBJECTIVE']
    return headers.some(h => line.trim().toUpperCase().includes(h))
  }

  const isBullet = (line) => line.trim().startsWith('-') || line.trim().startsWith('•')

  const isContact = (line) => line.includes('@') || line.includes('|') || line.includes('github') || line.includes('linkedin') || line.includes('+91')

  return (
    <div>
      {/* Download Button */}
      <button
        onClick={handleDownload}
        className='mb-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition'
      >
        ⬇️ Download PDF
      </button>

      {/* Resume Preview */}
      <div
        id='resume-preview'
        style={{
          fontFamily: 'Times New Roman, serif',
          padding: '48px 56px',
          backgroundColor: 'white',
          color: 'black',
          maxWidth: '750px',
          margin: '0 auto',
          fontSize: '12px',
          lineHeight: '1.6'
        }}
      >
        {lines.map((line, index) => {
          const trimmed = line.trim()

          // Empty line
          if (!trimmed) return <div key={index} style={{ height: '6px' }} />

          // Name — first non-empty line
          if (index === 0) {
            return (
              <h1 key={index} style={{
                textAlign: 'center',
                fontSize: '18px',
                fontWeight: 'bold',
                marginBottom: '4px',
                letterSpacing: '2px',
                textTransform: 'uppercase'
              }}>
                {trimmed}
              </h1>
            )
          }

          // Contact lines
          if (isContact(trimmed)) {
            return (
              <p key={index} style={{
                textAlign: 'center',
                fontSize: '11px',
                marginBottom: '2px',
                color: '#222'
              }}>
                {trimmed}
              </p>
            )
          }

          // Section headers
          if (isHeader(trimmed)) {
            return (
              <div key={index} style={{ marginTop: '16px', marginBottom: '6px' }}>
                <h2 style={{
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  borderBottom: '1.5px solid black',
                  paddingBottom: '2px',
                  letterSpacing: '0.5px',
                  margin: '0'
                }}>
                  {trimmed}
                </h2>
              </div>
            )
          }

          // Bullet points
          if (isBullet(trimmed)) {
            return (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: '2px',
                paddingLeft: '12px'
              }}>
                <span style={{ marginRight: '8px', marginTop: '1px' }}>•</span>
                <span>{trimmed.replace(/^[-•]\s*/, '')}</span>
              </div>
            )
          }

          // Bold lines — project titles, degree names
          if (
            trimmed.length < 60 &&
            !trimmed.includes(':') &&
            index > 3
          ) {
            return (
              <p key={index} style={{
                fontWeight: 'bold',
                margin: '4px 0 1px 0',
                fontSize: '12px'
              }}>
                {trimmed}
              </p>
            )
          }

          // Normal text
          return (
            <p key={index} style={{ margin: '2px 0', fontSize: '12px' }}>
              {trimmed}
            </p>
          )
        })}
      </div>
    </div>
  )
}

export default ResumeDownload