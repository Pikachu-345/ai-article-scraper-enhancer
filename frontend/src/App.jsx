import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ArticleList from './pages/ArticleList';
import ArticleDetail from './pages/ArticleDetail';
import './index.css';

function App() {
  return (
    <Router>
      <div className="w-lvw flex justify-center min-h-screen bg-stone-900 font-mono selection:bg-pink-500 selection:text-white pb-20 relative">

        <div
          className="fixed inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        ></div>

        <div className="relative z-10">
          <Navbar />
          <Routes>
            <Route path="/" element={<ArticleList filter="all" />} />
            <Route path="/original" element={<ArticleList filter="original" />} />
            <Route path="/enhanced" element={<ArticleList filter="enhanced" />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;