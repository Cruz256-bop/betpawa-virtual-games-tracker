import React, { useState, useEffect } from 'react';
import { calculateStats } from '../utils/statsCalculator';

const DashboardScreen = () => {
  const [stats, setStats] = useState({
    totalBets: 0,
    wins: 0,
    losses: 0,
    winRate: 0,
    totalStaked: 0,
    totalWinnings: 0,
    profit: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    try {
      const bets = JSON.parse(localStorage.getItem('bets') || '[]');
      const calculatedStats = calculateStats(bets);
      setStats(calculatedStats);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  return (
    <div className="screen-container">
      <div className="card">
        <h2 className="card-title">📊 Overall Summary</h2>
        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-label">Total Bets</div>
            <div className="stat-value">{stats.totalBets}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Wins</div>
            <div className="stat-value" style={{ color: '#4CAF50' }}>{stats.wins}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Losses</div>
            <div className="stat-value" style={{ color: '#f44336' }}>{stats.losses}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Win Rate</div>
            <div className="stat-value">{stats.winRate}%</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">💰 Financial Summary</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
          <span>Total Staked:</span>
          <strong>UGX {stats.totalStaked.toLocaleString()}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
          <span>Total Winnings:</span>
          <strong style={{ color: '#4CAF50' }}>UGX {stats.totalWinnings.toLocaleString()}</strong>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: '12px',
          borderTop: '1px solid #f0f0f0',
          marginTop: '12px'
        }}>
          <span>Profit/Loss:</span>
          <strong style={{ color: stats.profit >= 0 ? '#4CAF50' : '#f44336', fontSize: '18px' }}>
            UGX {stats.profit.toLocaleString()}
          </strong>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">⚠️ Reminder</h2>
        <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
          Virtual games are <strong>100% random</strong> and unpredictable. No strategy can predict outcomes. Bet responsibly!
        </p>
      </div>
    </div>
  );
};

export default DashboardScreen;
