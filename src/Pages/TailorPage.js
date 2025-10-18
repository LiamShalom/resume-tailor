import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        droppedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
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
                <path fill="currentColor" d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
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
                  <p className="upload-text-2">Supported Formats: .pdf or .docx</p>
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

export default TailorPage;