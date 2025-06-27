import React from 'react';
import { Routes, Route } from 'react-router-dom';
import URLShortenerPage from './pages/URLShortenerPage';
import URLStatsPage from './pages/URLStatsPage';
import RedirectHandler from './pages/RedirectHandler';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<URLShortenerPage />} />
        <Route path="/stats" element={<URLStatsPage />} />
        <Route path="/:shortcode" element={<RedirectHandler />} />
      </Routes>
    </>
  );
};

export default App;