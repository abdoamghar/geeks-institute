import './App.css'
import Articles from './pages/articles'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import EditPage from './pages/EditPage';
import NewArticle from './pages/NewArticle';
import NotFound from './pages/notFound';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles/:id" element={<Articles />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/articles/new" element={<ProtectedRoute><NewArticle /></ProtectedRoute>} />
          <Route path="/admin/articles/:id/edit" element={<ProtectedRoute><EditPage /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App
