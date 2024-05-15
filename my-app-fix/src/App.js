import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'; // Upewnij się, że ten plik istnieje

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            // Dodaj tutaj inne ścieżki
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
