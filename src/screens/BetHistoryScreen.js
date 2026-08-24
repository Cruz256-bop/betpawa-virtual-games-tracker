import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { Card, Text, Button, Chip } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

const BetHistoryScreen = ({ navigation }) => {
  const [bets, setBets] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadBets();
    const unsubscribe = navigation?.addListener?.('focus', loadBets);
    return unsubscribe;
  }, [navigation]);

  const loadBets = async () => {
    try {
      setRefreshing(true);
      const betData = await AsyncStorage.getItem('bets');
      if (betData) {
        const betsList = JSON.parse(betData);
        betsList.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setBets(betsList);
      }
      setRefreshing(false);
    } catch (error) {
      console.error('Error loading bets:', error);
      setRefreshing(false);
    }
  };

  const deleteBet = async (betId) => {
    try {
      const betData = await AsyncStorage.getItem('bets');
      if (betData) {
        const betsList = JSON.parse(betData);
        const filtered = betsList.filter(bet => bet.id !== betId);
        await AsyncStorage.setItem('bets', JSON.stringify(filtered));
        loadBets();
        Alert.alert('Success', 'Bet deleted');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to delete bet');
    }
  };

  const renderBetItem = ({ item }) => (
    <Card style={styles.betCard}>
      <Card.Content>
        <View style={styles.betHeader}>
          <Text style={styles.gameType}>{item.gameType.toUpperCase()}</Text>
          <Chip 
            label={item.outcome.toUpperCase()} 
            style={[
              styles.chip,
              { backgroundColor: item.outcome === 'win' ? '#4CAF50' : '#f44336' }
            ]}
            textStyle={{ color: 'white', fontWeight: 'bold' }}
          />
        </View>
        
        <View style={styles.betDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Stake:</Text>
            <Text style={styles.value}>UGX {item.stakeAmount.toLocaleString()}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Odds:</Text>
            <Text style={styles.value}>{item.oddsPicked}</Text>
          </View>
          {item.outcome === 'win' && (
            <View style={styles.detailRow}>
              <Text style={styles.label}>Winnings:</Text>
              <Text style={[styles.value, { color: '#4CAF50' }]}>UGX {item.winnings.toLocaleString()}</Text>
            </View>
          )}
          <View style={styles.detailRow}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{format(new Date(item.timestamp), 'dd MMM yyyy HH:mm')}</Text>
          </View>
          {item.notes && (
            <View style={styles.detailRow}>
              <Text style={styles.label}>Notes:</Text>
              <Text style={styles.value}>{item.notes}</Text>
            </View>
          )}
        </View>
        
        <Button 
          mode="text" 
          color="#f44336"
          onPress={() => deleteBet(item.id)}
          style={styles.deleteButton}
        >
          Delete
        </Button>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {bets.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No bets recorded yet</Text>
          <Text style={styles.emptySubText}>Start by adding a new bet</Text>
        </View>
      ) : (
        <FlatList
          data={bets}
          renderItem={renderBetItem}
          keyExtractor={item => item.id}
          onRefresh={loadBets}
          refreshing={refreshing}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 10,
  },
  betCard: {
    marginBottom: 12,
    elevation: 3,
  },
  betHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  gameType: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  chip: {
    paddingHorizontal: 5,
  },
  betDetails: {
    marginVertical: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  value: {
    fontSize: 12,
    color: '#333',
  },
  deleteButton: {
    marginTop: 10,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  emptySubText: {
    fontSize: 14,
    color: '#666',
  },
});

export default BetHistoryScreen;
