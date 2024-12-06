import React, { useState } from 'react';
import './App.css';

function App() {
  const [accessToken, setAccessToken] = useState(null);

  const handleAuth = () => {
    window.location.href = 'https://www.bungie.net/en/OAuth/Authorize?client_id=48620&response_type=code&redirect_uri=YOUR_REDIRECT_URI';
  };

  const fetchPlayerData = async () => {
    if (!accessToken) return;
    try {
      const response = await fetch('https://www.bungie.net/Platform/Destiny2/2/Profile/{destinyMembershipId}/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching player data:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleAuth}>Authenticate with Bungie</button>
        <button onClick={fetchPlayerData} disabled={!accessToken}>
          Fetch Player Data
        </button>
      </header>
    </div>
  );
}

export default App;
