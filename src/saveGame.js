import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const supabase = createClient(
    "https://ixbbhxnrqkeiontnnbrv.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4YmJoeG5ycWtlaW9udG5uYnJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMjU4MjUsImV4cCI6MjA1OTYwMTgyNX0.fOJV4waUFE0W0R-27tzDq4_xnXS-qNboF7fTNF-zXjI"
  );

  document.getElementById('submitGame').addEventListener('click', async () => {
    const checkboxes = document.querySelectorAll('.playerCheckbox:checked');
    const players = Array.from(checkboxes).map(cb => cb.value);

    if (players.length < 2) {
      alert('Please select at least 2 players.');
      return;
    }

    const winnerInput = document.querySelector('input[name="winner"]:checked');
    if (!winnerInput) {
      alert('Please select a winner.');
      return;
    }

    const winner = winnerInput.value;

    if (!players.includes(winner)) {
      alert('Winner must be one of the selected players.');
      return;
    }

    const game = {
      winner,
      players,
      date: new Date().toISOString()
    };

    const { error: gameError } = await supabase
      .from('game_history')
      .insert([game]);

    if (gameError) {
      console.error(gameError);
      alert('Failed to save game history.');
      return;
    }

    for (const player of players) {
      const { data: existing, error } = await supabase
        .from('leaderboard')
        .select('*')
        .eq('name', player)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error(error);
        continue;
      }

      if (existing) {
        await supabase
          .from('leaderboard')
          .update({
            games_played: existing.games_played + 1,
            wins: existing.wins + (player === winner ? 1 : 0)
          })
          .eq('id', existing.id);
      } else {
        await supabase
          .from('leaderboard')
          .insert([{
            name: player,
            games_played: 1,
            wins: player === winner ? 1 : 0
          }]);
      }
    }

    alert('Game saved successfully ✅');
    location.reload();
  });