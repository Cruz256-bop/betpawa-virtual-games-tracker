import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Text, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { calculateStats } from '../utils/statsCalculator';

const StatisticsScreen = ({ navigation }) => {
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
    const unsubscribe = navigation?.addListener?.('focus', loadStats);
    return unsubscribe;
  }, [navigation]);

  const loadStats = async () => {
    try {
      const bets = await AsyncStorage.getItem('bets');
      if (bets) {
        const betsList = JSON.parse(bets);
        const calculatedStats = calculateStats(betsList);
        setStats(calculatedStats);

        const byGame = {};
        betsList.forEach(bet => {
          if (!byGame[bet.gameType]) {
            byGame[bet.gameType] = {
              total: 0,
              wins: 0,
              losses: 0,
              staked: 0,
            };
          }
          byGame[bet.gameType].total += 1;
          if (bet.outcome === 'win') {
            byGame[bet.gameType].wins += 1;
          } else {
            byGame[bet.gameType].losses += 1;
          }
          byGame[bet.gameType].staked += bet.stakeAmount;
        });
        setGameStats(byGame);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Overall Performance</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Bets</Text>
              <Text style={styles.statNumber}>{stats.totalBets}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Win Rate</Text>
              <Text style={styles.statNumber}>{stats.winRate}%</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Avg Stake</Text>
              <Text style={styles.statNumber}>UGX {Math.round(stats.avgStake)}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Financial Performance</Text>
          
          <Paragraph>
            <Text style={styles.label}>Total Staked:</Text>
            {' '}
            <Text style={styles.value}>UGX {stats.totalStaked.toLocaleString()}</Text>
          </Paragraph>
          
          <Paragraph>
            <Text style={styles.label}>Total Winnings:</Text>
            {' '}
            <Text style={[styles.value, { color: '#4CAF50' }]}>UGX {stats.totalWinnings.toLocaleString()}</Text>
          </Paragraph>
          
          <Paragraph>
            <Text style={styles.label}>Profit/Loss:</Text>
            {' '}
            <Text style={[styles.value, { color: stats.profit >= 0 ? '#4CAF50' : '#f44336' }]}>
              UGX {stats.profit.toLocaleString()}
            </Text>
          </Paragraph>
          
          <Paragraph>
            <Text style={styles.label}>Wins:</Text>
            {' '}
            <Text style={[styles.value, { color: '#4CAF50' }]}>{stats.wins}</Text>
          </Paragraph>
          
          <Paragraph>
            <Text style={styles.label}>Losses:</Text>
            {' '}
            <Text style={[styles.value, { color: '#f44336' }]}>{stats.losses}</Text>
          </Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Performance by Game Type</Text>
          
          {Object.entries(gameStats).map(([gameType, stat]) => (
            <View key={gameType} style={styles.gameStatBox}>
              <Text style={styles.gameTypeLabel}>{gameType.toUpperCase()}</Text>
              <Paragraph>
                Bets: {stat.total} | Wins: {stat.wins} | Losses: {stat.losses} | Total Staked: UGX {stat.staked.toLocaleString()}
              </Paragraph>
            </View>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  card: {
    marginBottom: 15,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  gameStatBox: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  gameTypeLabel: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1976d2',
  },
});

export default StatisticsScreen;
