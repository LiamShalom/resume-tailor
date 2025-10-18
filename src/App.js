import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './Components/Header';
import HomePage from './Pages/HomePage';
import TailoredResult from './Pages/TailoredResult';
import TailorPage from './Pages/TailorPage';
import './App.css';

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