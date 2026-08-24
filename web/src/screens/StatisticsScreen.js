import React, { useState, useEffect } from 'react';
import { calculateStats } from '../utils/statsCalculator';

const StatisticsScreen = () => {
  const [stats, setStats] = useState({
    totalBets: 0,
    wins: 0,
    losses: 0,
    winRate: 0,
    totalStaked: 0,
    totalWinnings: 0,
    profit: 0,
    avgStake: 0,
    avgOdds: 0,
  });
  const [gameStats, setGameStats] = useState({});

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    try {
      const bets = JSON.parse(localStorage.getItem('bets') || '[]');
      const calculatedStats = calculateStats(bets);
      setStats(calculatedStats);

      const byGame = {};
      bets.forEach(bet => {
        if (!byGame[bet.gameType]) {
          byGame[bet.gameType] = { total: 0, wins: 0, losses: 0, staked: 0 };
        }
        byGame[bet.gameType].total += 1;
        if (bet.outcome === 'win') byGame[bet.gameType].wins += 1;
        else byGame[bet.gameType].losses += 1;
        byGame[bet.gameType].staked += bet.stakeAmount;
      });
      setGameStats(byGame);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  return (
    <div className="screen-container">
      <div className="card">
        <h2 className="card-title">📊 Overall Performance</h2>
        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-label">Total Bets</div>
            <div className="stat-value">{stats.totalBets}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Win Rate</div>
            <div className="stat-value">{stats.winRate}%</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Avg Stake</div>
            <div className="stat-value">UGX {Math.round(stats.avgStake)}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Avg Odds</div>
            <div className="stat-value">{stats.avgOdds.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">💰 Financial Performance</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
          <span>Total Staked:</span>
          <strong>UGX {stats.totalStaked.toLocaleString()}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
          <span>Total Winnings:</span>
          <strong style={{ color: '#4CAF50' }}>UGX {stats.totalWinnings.toLocaleString()}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
          <span>Wins:</span>
          <strong style={{ color: '#4CAF50' }}>{stats.wins}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
          <span>Losses:</span>
          <strong style={{ color: '#f44336' }}>{stats.losses}</strong>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: '12px',
          borderTop: '1px solid #f0f0f0',
          marginTop: '12px'
        }}>
          <span>Profit/Loss:</span>
          <strong style={{
            color: stats.profit >= 0 ? '#4CAF50' : '#f44336',
            fontSize: '18px'
          }}>
            UGX {stats.profit.toLocaleString()}
          </strong>
        </div>
      </div>

      {Object.keys(gameStats).length > 0 && (
        <div className="card">
          <h2 className="card-title">🎮 Performance by Game Type</h2>
          {Object.entries(gameStats).map(([gameType, stat]) => (
            <div key={gameType} style={{
              background: '#f9f9f9',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '10px',
              border: '1px solid #f0f0f0'
            }}>
              <div style={{ fontWeight: 'bold', color: '#1976d2', marginBottom: '8px' }}>
                {gameType.toUpperCase()}
              </div>
              <div style={{ fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
                <div>Bets: <strong>{stat.total}</strong> | Wins: <strong style={{color: '#4CAF50'}}>{stat.wins}</strong> | Losses: <strong style={{color: '#f44336'}}>{stat.losses}</strong></div>
                <div>Total Staked: <strong>UGX {stat.staked.toLocaleString()}</strong></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatisticsScreen;
