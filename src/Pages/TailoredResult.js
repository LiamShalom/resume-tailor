import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DocViewer, { DocViewerRenderers }  from "react-doc-viewer";

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

      reader.readAsDataURL(file);
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
          <DocViewer pluginRenderers={DocViewerRenderers} documents={[fileContent]} />
        </div>
      </main>
    </div>
  );
}

export default TailoredResult;