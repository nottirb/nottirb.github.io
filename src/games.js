const GAME_UNIVERSE_ID = '3094269783';
const LIVE_PLAYER_COUNT_ELEMENT_ID = 'livePlayerCount';

async function fetchLivePlayerCount() {
  try {
    const response = await fetch(`https://games.roproxy.com/v1/games?universeIds=${GAME_UNIVERSE_ID}`);
    const data = await response.json();

    console.log(data);
    console.log(data.data);
    console.log(data.data[0]);
    console.log(data.data[0].playing);

    const playerCount = data.data[0].playing;
    document.getElementById(LIVE_PLAYER_COUNT_ELEMENT_ID).textContent = `${playerCount} Playing Now`;
  } catch (error) {
    console.error('Error fetching live player count:', error);
  }
}

// Fetch live player count initially
fetchLivePlayerCount();