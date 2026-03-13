import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import About from './pages/About';
import SignUp from './pages/SignUp';
import Logout from './pages/Logout';
import Contact from './pages/Contact';
import ResetPassword from './pages/ResetPassword';

const AppContent = () => {
  const location = useLocation();

  // Determine if user is logged in
  const isAuthenticated = localStorage.getItem('user');

  // Conditional rendering of Layout based on route if needed
  const isAuthPage = ['/logout', '/contact', '/reset-password'].includes(location.pathname);

  return (
    <>
      {!isAuthPage && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignUp />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
