export const calculateStats = (bets) => {
  if (!bets || bets.length === 0) {
    return {
      totalBets: 0,
      wins: 0,
      losses: 0,
      winRate: 0,
      totalStaked: 0,
      totalWinnings: 0,
      profit: 0,
      avgStake: 0,
      avgOdds: 0,
    };
  }

  let wins = 0;
  let losses = 0;
  let totalStaked = 0;
  let totalWinnings = 0;
  let totalOdds = 0;

  bets.forEach(bet => {
    if (bet.outcome === 'win') {
      wins++;
    } else {
      losses++;
    }
    totalStaked += bet.stakeAmount;
    totalWinnings += bet.winnings || 0;
    totalOdds += bet.oddsPicked;
  });

  const totalBets = bets.length;
  const winRate = totalBets > 0 ? Math.round((wins / totalBets) * 100) : 0;
  const profit = totalWinnings - totalStaked;
  const avgStake = totalStaked / totalBets;
  const avgOdds = totalOdds / totalBets;

  return {
    totalBets,
    wins,
    losses,
    winRate,
    totalStaked,
    totalWinnings,
    profit,
    avgStake,
    avgOdds,
  };
};
