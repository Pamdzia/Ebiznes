import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Produkty from './components/Produkty/Produkty.js';
import Platnosci from './components/Platnosci/Platnosci.js';
import Koszyk from './components/Koszyk/Koszyk.js';
import { KoszykProvider } from './components/Koszyk/KoszykContext.js';

function App() {
  return (
      <KoszykProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Produkty />} />
            <Route path="/platnosci" element={<Platnosci />} />
            <Route path="/koszyk" element={<Koszyk />} />
            <Route path="/test" element={<div>Test</div>} />
          </Routes>
        </Router>
      </KoszykProvider>
  );
}

export default App;
