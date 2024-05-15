import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/accounts/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
      });

      const data = await response.json();
      if (response.status === 200) {
        setMessage('Logowanie przebiegło pomyślnie.');
      } else {
        setMessage(data.error || 'Wystąpił błąd podczas logowania.');
      }
    } catch (error) {
      setMessage('Błąd serwera.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Nazwa użytkownika"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Hasło"
      />
      <button type="submit">Zaloguj się</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default Login;
