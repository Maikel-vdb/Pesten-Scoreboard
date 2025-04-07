document.addEventListener('DOMContentLoaded', () => {
    const leaderboard = document.getElementById('leaderboard');
    const gamehistory = document.getElementById('gamehistory');
    const leaderboardTable = document.getElementById('leaderboardTable');
    const gamehistoryTable = document.getElementById('gamehistoryTable');
 
    gamehistory.addEventListener('click', () => {
        console.log('game history clicked');
        gamehistory.classList.remove('hover:bg-white/10', 'text-white');
        gamehistory.classList.add('bg-white', 'text-black');
        leaderboard.classList.remove('bg-white', 'text-black');
        leaderboard.classList.add('hover:bg-white/10');
        leaderboardTable.classList.add('hidden')
        gamehistoryTable.classList.remove('hidden')
    });

    leaderboard.addEventListener('click', () => {
        console.log('game history clicked');
        leaderboard.classList.remove('hover:bg-white/10', 'text-white');
        leaderboard.classList.add('bg-white', 'text-black');
        gamehistory.classList.remove('bg-white', 'text-black');
        gamehistory.classList.add('hover:bg-white/10');
        gamehistoryTable.classList.add('hidden')
        leaderboardTable.classList.remove('hidden')
    });
 });