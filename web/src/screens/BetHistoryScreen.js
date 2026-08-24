import React, { useState, useEffect } from 'react';

const BetHistoryScreen = () => {
  const [bets, setBets] = useState([]);

  useEffect(() => {
    loadBets();
  }, []);

  const loadBets = () => {
    try {
      const betData = JSON.parse(localStorage.getItem('bets') || '[]');
      betData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setBets(betData);
    } catch (error) {
      console.error('Error loading bets:', error);
    }
  };

  const deleteBet = (betId) => {
    if (window.confirm('Delete this bet?')) {
      try {
        const betData = JSON.parse(localStorage.getItem('bets') || '[]');
        const filtered = betData.filter(bet => bet.id !== betId);
        localStorage.setItem('bets', JSON.stringify(filtered));
        loadBets();
      } catch (error) {
        alert('Error deleting bet');
      }
    }
  };

  if (bets.length === 0) {
    return (
      <div className="screen-container">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '300px',
          textAlign: 'center',
          color: '#999'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '16px', opacity: 0.5 }}>📜</div>
          <h2 style={{ color: '#666', fontSize: '20px', marginBottom: '8px' }}>No Bets Yet</h2>
          <p style={{ color: '#999', fontSize: '14px' }}>Start by adding your first bet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="screen-container">
      <div className="card" style={{ marginBottom: '0' }}>
        <h2 className="card-title">📜 Bet History ({bets.length})</h2>
      </div>

      {bets.map(bet => (
        <div key={bet.id} className="card" style={{ marginTop: '0' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
            paddingBottom: '8px',
            borderBottom: '1px solid #f0f0f0'
          }}>
            <div style={{ fontSize: '14px', fontWeight: '700' }}>{bet.gameType.toUpperCase()}</div>
            <span className={`badge ${bet.outcome === 'win' ? 'badge-win' : 'badge-loss'}`}>
              {bet.outcome.toUpperCase()}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span>Stake:</span>
              <strong>UGX {bet.stakeAmount.toLocaleString()}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span>Odds:</span>
              <strong>{bet.oddsPicked}</strong>
            </div>
            {bet.outcome === 'win' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span>Winnings:</span>
                <strong style={{ color: '#4CAF50' }}>UGX {bet.winnings.toLocaleString()}</strong>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span>Date:</span>
              <strong>{new Date(bet.timestamp).toLocaleString()}</strong>
            </div>
            {bet.notes && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span>Notes:</span>
                <strong>{bet.notes}</strong>
              </div>
            )}
          </div>

          <button
            className="btn-danger"
            onClick={() => deleteBet(bet.id)}
            style={{ marginTop: '12px' }}
          >
            🗑️ Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default BetHistoryScreen;
