import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Text, Button, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

  const loadStats = async () => {
    try {
      const bets = await AsyncStorage.getItem('bets');
      if (bets) {
        const betsList = JSON.parse(bets);
        const calculatedStats = calculateStats(betsList);
        setStats(calculatedStats);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Overall Summary</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Total Bets</Text>
              <Text style={styles.statValue}>{stats.totalBets}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Wins</Text>
              <Text style={[styles.statValue, { color: '#4CAF50' }]}>{stats.wins}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Losses</Text>
              <Text style={[styles.statValue, { color: '#f44336' }]}>{stats.losses}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Win Rate</Text>
              <Text style={styles.statValue}>{stats.winRate}%</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Financial Summary</Text>
          <Paragraph>Total Staked: UGX {stats.totalStaked.toLocaleString()}</Paragraph>
          <Paragraph>Total Winnings: UGX {stats.totalWinnings.toLocaleString()}</Paragraph>
          <Paragraph style={[styles.profit, { color: stats.profit >= 0 ? '#4CAF50' : '#f44336' }]}>
            Profit/Loss: UGX {stats.profit.toLocaleString()}
          </Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Quick Actions</Text>
          <Button mode="contained" style={styles.button}>Add New Bet</Button>
          <Button mode="outlined" style={styles.button}>View History</Button>
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statBox: {
    width: '48%',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  profit: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  button: {
    marginBottom: 10,
  },
});

export default DashboardScreen;
