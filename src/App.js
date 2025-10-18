import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, NavLink, useLocation } from 'react-router-dom';
import './App.css';

function Header() {
  const location = useLocation();
  return (
    <header className="header">
      <nav className="nav-tabs">
        <NavLink 
          to="/" 
          className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}
          end
        >
          Home
        </NavLink>
        <NavLink 
          to="/tailor" 
          className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}
        >
          Tailor
        </NavLink>
      </nav>
    </header>
  );
}


function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <div className="overlay" />
      <h1 className="title">AI Resume & Cover Letter Tailor</h1>
      <button onClick={() => navigate('/tailor')} className="get-started-btn">
        Get Started
      </button>
    </div>
  );
}


function TailoredResult() {
  const location = useLocation();
  const [fileContent, setFileContent] = useState('');
  const { type, file, jobDesc } = location.state || {};

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        setFileContent(e.target.result);
      };

      if (file.type === 'text/plain') {
        reader.readAsText(file);
      } else {
        reader.readAsDataURL(file);
      }
    }
  }, [file]);

  return (
    <div className="result-container">
      <aside className="changes-panel">
        <h3>Suggested Changes</h3>
        <div className="changes-list">
          {/* Will be populated with AI suggestions */}
        </div>
      </aside>
      <main className="document-preview">
        <h3>Your {type === 'resume' ? 'Resume' : 'Cover Letter'}</h3>
        <div className="document-content">
          {file?.type === 'text/plain' ? (
            <div className="text-content">{fileContent}</div>
          ) : (
            <iframe 
              src={fileContent} 
              title="document-preview"
              className="document-iframe"
            />
          )}
        </div>
      </main>
    </div>
  );
}

function TailorPage() {
  const navigate = useNavigate();
  const [type, setType] = useState('resume');
  const [jobDesc, setJobDesc] = useState('');
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '' });

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) setFile(uploadedFile);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && 
        (droppedFile.type === 'application/pdf' || 
         droppedFile.type === 'application/msword' ||
         droppedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
         droppedFile.type === 'text/plain')) {
      setFile(droppedFile);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check for missing values
    if (!jobDesc.trim()) {
      setAlert({ 
        show: true, 
        message: 'Please enter a job description'
      });
      return;
    }
    
    if (!file) {
      setAlert({ 
        show: true, 
        message: `Please upload your ${type === 'resume' ? 'resume' : 'cover letter'}`
      });
      return;
    }

    // If all values are present, clear any existing alert and proceed
    setAlert({ show: false, message: '' });
    navigate('/result', { state: { type, jobDesc, file } });
  };


  return (
    <div className="tailor-container">
      <h2 className="page-title">Tailor Your {type === 'resume' ? 'Resume' : 'Cover Letter'}</h2>
      {alert.show && (
        <div className="alert">
          {alert.message}
          <button 
            className="alert-close"
            onClick={() => setAlert({ show: false, message: '' })}
          >
            ×
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="form-card">
        <label className="form-label">
          <span>Select Type</span>
          <select value={type} onChange={(e) => setType(e.target.value)} className="form-select">
            <option value="resume">Resume</option>
            <option value="coverLetter">Cover Letter</option>
          </select>
        </label>


        <label className="form-label">
          <span>Job Description</span>
          <textarea
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
            rows="6"
            placeholder="Paste job description here..."
            className="form-textarea"
          />
        </label>


        <label className="form-label">
          <span>Upload Your {type === 'resume' ? 'Resume' : 'Cover Letter'}</span>
          <div
            className={`upload-area ${isDragging ? 'dragging' : ''}`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.txt"
              className="file-input"
              id="file-input"
            />
            <div className="upload-content">
              <svg className="upload-icon" viewBox="0 0 24 24" width="40" height="40">
                <path fill="currentColor" d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
              </svg>
              {file ? (
                <div className="file-info">
                  <span className="file-name">{file.name}</span>
                  <button 
                    className="remove-file" 
                    onClick={(e) => {
                      e.preventDefault();
                      setFile(null);
                    }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <p>Click here to upload your file or drag and drop</p>
                  <p className="upload-text-2">Supported Formats: .pdf, .docx, .txt</p>
                </>
              )}
            </div>
          </div>
        </label>


        <button type="submit" className="submit-btn" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}


export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tailor" element={<TailorPage />} />
            <Route 
              path="/result" 
              element={<TailoredResult type="resume" />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}