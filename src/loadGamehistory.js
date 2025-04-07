// Fetch game history from Supabase
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";


const supabase = createClient(
  "https://ixbbhxnrqkeiontnnbrv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4YmJoeG5ycWtlaW9udG5uYnJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMjU4MjUsImV4cCI6MjA1OTYwMTgyNX0.fOJV4waUFE0W0R-27tzDq4_xnXS-qNboF7fTNF-zXjI"
);

async function fetchGameHistory() {
    const { data, error } = await supabase
      .from('game_history')
      .select('id, winner, players, date');
  
    if (error) {
      console.error("Error fetching game history:", error);
    } else {
      console.log("Game History:", data);
      renderGameHistory(data);
    }
  }
  
  function renderGameHistory(games) {
    const gameHistoryBody = document.getElementById('gameHistoryBody');
  
    gameHistoryBody.innerHTML = '';
  
    games.forEach(game => {
      const row = document.createElement('tr');
  
      row.classList.add('bg-[#302F4A]', 'border', 'border-[#302F4A]');
      row.innerHTML = `
        <td class="py-2 text-center text-[#676183]">${game.id}</td>
        <td>${game.winner}</td>
        <td>${game.players.join(', ')}</td>
        <td>${new Date(game.date).toLocaleString()}</td>
      `;
  
      gameHistoryBody.appendChild(row);
    });
  }
  
  fetchGameHistory();
  