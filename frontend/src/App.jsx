import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ArticleList from './pages/ArticleList';
import ArticleDetail from './pages/ArticleDetail';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<ArticleList filter="all" />} />
          <Route path="/original" element={<ArticleList filter="original" />} />
          <Route path="/enhanced" element={<ArticleList filter="enhanced" />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
