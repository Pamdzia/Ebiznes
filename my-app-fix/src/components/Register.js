import React, { useState } from 'react';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/accounts/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
      });

      if (response.ok) {
        setMessage('Rejestracja przebiegła pomyślnie.');
      } else {
        const data = await response.json();  // Pobieranie danych JSON tylko jeśli odpowiedź nie jest OK
        setMessage(data.error || 'Wystąpił błąd podczas rejestracji.');
      }
    } catch (error) {
      setMessage('Błąd serwera. Sprawdź połączenie lub konfigurację serwera.');
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
      <button type="submit">Zarejestruj się</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default Register;
