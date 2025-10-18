import { useNavigate } from 'react-router-dom';

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

export default HomePage;