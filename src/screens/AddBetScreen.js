import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Card, TextInput, Button, RadioButton, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddBetScreen = () => {
  const [gameType, setGameType] = useState('football');
  const [stakeAmount, setStakeAmount] = useState('');
  const [oddsPicked, setOddsPicked] = useState('');
  const [outcome, setOutcome] = useState('');
  const [winnings, setWinnings] = useState('');
  const [notes, setNotes] = useState('');

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleAddBet = async () => {
    if (!stakeAmount || !oddsPicked || !outcome) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      const newBet = {
        id: generateId(),
        gameType,
        stakeAmount: parseFloat(stakeAmount),
        oddsPicked: parseFloat(oddsPicked),
        outcome,
        winnings: outcome === 'win' ? parseFloat(winnings || 0) : 0,
        notes,
        timestamp: new Date().toISOString(),
      };

      const existingBets = await AsyncStorage.getItem('bets');
      const bets = existingBets ? JSON.parse(existingBets) : [];
      bets.push(newBet);

      await AsyncStorage.setItem('bets', JSON.stringify(bets));
      Alert.alert('Success', 'Bet added successfully!');
      
      setGameType('football');
      setStakeAmount('');
      setOddsPicked('');
      setOutcome('');
      setWinnings('');
      setNotes('');
    } catch (error) {
      Alert.alert('Error', 'Failed to add bet');
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Record a New Bet</Text>

          <Text style={styles.label}>Game Type</Text>
          <RadioButton.Group onValueChange={setGameType} value={gameType}>
            <RadioButton.Item label="Football" value="football" />
            <RadioButton.Item label="Horse Racing" value="horseRacing" />
            <RadioButton.Item label="Basketball" value="basketball" />
            <RadioButton.Item label="Tennis" value="tennis" />
            <RadioButton.Item label="Other" value="other" />
          </RadioButton.Group>

          <TextInput
            label="Stake Amount (UGX)"
            value={stakeAmount}
            onChangeText={setStakeAmount}
            keyboardType="decimal-pad"
            style={styles.input}
            mode="outlined"
          />

          <TextInput
            label="Odds Picked"
            value={oddsPicked}
            onChangeText={setOddsPicked}
            keyboardType="decimal-pad"
            style={styles.input}
            mode="outlined"
          />

          <Text style={styles.label}>Outcome</Text>
          <RadioButton.Group onValueChange={setOutcome} value={outcome}>
            <RadioButton.Item label="Win" value="win" />
            <RadioButton.Item label="Loss" value="loss" />
          </RadioButton.Group>

          {outcome === 'win' && (
            <TextInput
              label="Winnings (UGX)"
              value={winnings}
              onChangeText={setWinnings}
              keyboardType="decimal-pad"
              style={styles.input}
              mode="outlined"
            />
          )}

          <TextInput
            label="Notes (Optional)"
            value={notes}
            onChangeText={setNotes}
            style={styles.input}
            mode="outlined"
            multiline
            numberOfLines={3}
          />

          <Button 
            mode="contained" 
            onPress={handleAddBet}
            style={styles.button}
          >
            Add Bet
          </Button>
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
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 8,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
    paddingVertical: 8,
  },
});

export default AddBetScreen;
