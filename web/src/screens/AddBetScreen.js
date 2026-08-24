import React, { useState } from 'react';

const AddBetScreen = () => {
  const [gameType, setGameType] = useState('football');
  const [stakeAmount, setStakeAmount] = useState('');
  const [oddsPicked, setOddsPicked] = useState('');
  const [outcome, setOutcome] = useState('');
  const [winnings, setWinnings] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!stakeAmount || !oddsPicked || !outcome) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const newBet = {
        id: Date.now().toString(),
        gameType,
        stakeAmount: parseFloat(stakeAmount),
        oddsPicked: parseFloat(oddsPicked),
        outcome,
        winnings: outcome === 'win' ? parseFloat(winnings || 0) : 0,
        notes,
        timestamp: new Date().toISOString(),
      };

      const existingBets = JSON.parse(localStorage.getItem('bets') || '[]');
      existingBets.push(newBet);
      localStorage.setItem('bets', JSON.stringify(existingBets));

      setSubmitted(true);
      setTimeout(() => {
        setGameType('football');
        setStakeAmount('');
        setOddsPicked('');
        setOutcome('');
        setWinnings('');
        setNotes('');
        setSubmitted(false);
      }, 1500);
    } catch (error) {
      alert('Error saving bet: ' + error.message);
    }
  };

  return (
    <div className="screen-container">
      <div className="card">
        <h2 className="card-title">➕ Record New Bet</h2>
        
        {submitted && (
          <div style={{
            background: '#c8e6c9',
            color: '#2e7d32',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            textAlign: 'center',
            fontWeight: '600'
          }}>
            ✅ Bet added successfully!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>🎮 Game Type</label>
            <select value={gameType} onChange={(e) => setGameType(e.target.value)}>
              <option value="football">Football</option>
              <option value="horseRacing">Horse Racing</option>
              <option value="basketball">Basketball</option>
              <option value="tennis">Tennis</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>💵 Stake Amount (UGX)</label>
            <input
              type="number"
              step="0.01"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>📈 Odds Picked</label>
            <input
              type="number"
              step="0.01"
              value={oddsPicked}
              onChange={(e) => setOddsPicked(e.target.value)}
              placeholder="Enter odds"
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>🎯 Outcome</label>
            <div style={{ display: 'flex', gap: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="radio"
                  name="outcome"
                  value="win"
                  checked={outcome === 'win'}
                  onChange={(e) => setOutcome(e.target.value)}
                />
                ✅ Win
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="radio"
                  name="outcome"
                  value="loss"
                  checked={outcome === 'loss'}
                  onChange={(e) => setOutcome(e.target.value)}
                />
                ❌ Loss
              </label>
            </div>
          </div>

          {outcome === 'win' && (
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>🏆 Winnings (UGX)</label>
              <input
                type="number"
                step="0.01"
                value={winnings}
                onChange={(e) => setWinnings(e.target.value)}
                placeholder="Enter winnings"
              />
            </div>
          )}

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>📝 Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes..."
              rows="3"
            />
          </div>

          <button type="submit" className="btn-primary">
            ➕ Add Bet
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBetScreen;
