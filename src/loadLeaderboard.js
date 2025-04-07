// Fetch game history from Supabase
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";


const supabase = createClient(
    "https://ixbbhxnrqkeiontnnbrv.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4YmJoeG5ycWtlaW9udG5uYnJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMjU4MjUsImV4cCI6MjA1OTYwMTgyNX0.fOJV4waUFE0W0R-27tzDq4_xnXS-qNboF7fTNF-zXjI"
  );

async function fetchLeaderboard() {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('id, name, games_played, wins');
  
    if (error) {
      console.error("Error fetching game history:", error);
    } else {
      console.log("Game History:", data);
      renderLeaderboard(data);
    }
  }
  
  function renderLeaderboard(leaderboard) {
    const leaderboardBody = document.getElementById('leaderboardBody');
    
    leaderboardBody.innerHTML = '';

    leaderboard.sort((a, b) => b.wins - a.wins);

    leaderboard.forEach((player, index) => {
        const row = document.createElement('tr');

        row.classList.add('bg-[#302F4A]', 'border', 'border-[#302F4A]');

        row.innerHTML = `
            <td id="name" class="py-2 text-center text-[#676183]">${index + 1}</td>  <!-- Position (sorted by wins) -->
            <td>${index === 0 ? `<i class="fa-solid fa-crown text-yellow-400"></i> ` : ''}${player.name}</td>
            <td class="text-center">${player.games_played}</td>
            <td class="text-center">${player.wins}</td>
        `;


        leaderboardBody.appendChild(row);
    });
}

  
fetchLeaderboard();
  