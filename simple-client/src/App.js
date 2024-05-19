import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const apiUrl = 'http://3.72.81.68:3001'; 
    fetch(`${apiUrl}/api/message`)
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error("Error fetching data: ", err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{message}</p>
      </header>
    </div>
  );
}

export default App;
