import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import InvestorPage from './pages/InvestorPage';
import ProjectsPage from './pages/ProjectsPage';
import VentureDetailPage from './pages/VentureDetailPage';
import ApplyPage from './pages/ApplyPage';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#1b1b1b' }}>
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/investors" element={<InvestorPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<VentureDetailPage />} />
          <Route path="/apply" element={<ApplyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}