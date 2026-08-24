import React from 'react';

const SettingsScreen = () => {
  const handleExportData = () => {
    try {
      const bets = JSON.parse(localStorage.getItem('bets') || '[]');
      if (bets.length === 0) {
        alert('No bets to export');
        return;
      }

      const headers = ['Date', 'Game Type', 'Stake', 'Odds', 'Outcome', 'Winnings', 'Notes'];
      const rows = bets.map(bet => [
        new Date(bet.timestamp).toLocaleString(),
        bet.gameType,
        bet.stakeAmount,
        bet.oddsPicked,
        bet.outcome,
        bet.winnings,
        bet.notes,
      ]);

      const csvContent = [headers, ...rows].map(row => 
        row.map(cell => `"${cell}"`).join(',')
      ).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `betpawa-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('Error exporting: ' + error.message);
    }
  };

  const handleClearData = () => {
    if (window.confirm('Delete ALL bets? This cannot be undone!')) {
      if (window.confirm('Click OK again to confirm permanent deletion')) {
        localStorage.removeItem('bets');
        alert('✅ All data cleared');
        window.location.reload();
      }
    }
  };

  return (
    <div className="screen-container">
      <div className="card">
        <h2 className="card-title">📥 Export Data</h2>
        <button className="btn-primary" onClick={handleExportData}>
          📥 Download as CSV
        </button>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '12px', textAlign: 'center' }}>
          Export all your bets as a CSV file
        </p>
      </div>

      <div className="card">
        <h2 className="card-title">🗑️ Danger Zone</h2>
        <button className="btn-danger" onClick={handleClearData}>
          🗑️ Delete All Data
        </button>
        <p style={{ fontSize: '12px', color: '#f44336', marginTop: '12px', textAlign: 'center' }}>
          ⚠️ This will permanently delete all your bets
        </p>
      </div>

      <div className="card">
        <h2 className="card-title">ℹ️ About</h2>
        <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.8' }}>
          <p><strong>Betpawa Virtual Games Tracker</strong></p>
          <p>Version 1.0.0</p>
          <p>Track and analyze your Betpawa virtual games betting.</p>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">⚠️ Disclaimer</h2>
        <div style={{ fontSize: '13px', color: '#f44336', lineHeight: '1.8', fontWeight: '500' }}>
          <p>Virtual games are <strong>100% random</strong>. No strategy can predict outcomes.</p>
          <p><strong>Bet responsibly:</strong></p>
          <ul style={{ marginLeft: '16px' }}>
            <li>Only bet money you can afford to lose</li>
            <li>Set and stick to your budget</li>
            <li>Treat as entertainment only</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
