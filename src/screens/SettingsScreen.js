import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Card, Text, Button, Paragraph, Switch } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleExportData = async () => {
    try {
      const bets = await AsyncStorage.getItem('bets');
      if (bets) {
        const betsList = JSON.parse(bets);
        const csvData = convertToCSV(betsList);
        Alert.alert('Export Successful', `${betsList.length} bets exported as CSV`);
        console.log(csvData);
      } else {
        Alert.alert('No Data', 'No bets to export');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to export data');
    }
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'Are you sure you want to delete all bets? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('bets');
              Alert.alert('Success', 'All data has been cleared');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear data');
            }
          },
        },
      ]
    );
  };

  const convertToCSV = (bets) => {
    const headers = ['Date', 'Game Type', 'Stake', 'Odds', 'Outcome', 'Winnings', 'Notes'];
    const rows = bets.map(bet => [
      new Date(bet.timestamp).toISOString(),
      bet.gameType,
      bet.stakeAmount,
      bet.oddsPicked,
      bet.outcome,
      bet.winnings,
      bet.notes,
    ]);
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>App Settings</Text>
          
          <View style={styles.settingItem}>
            <Paragraph>Enable Notifications</Paragraph>
            <Switch 
              value={notifications} 
              onValueChange={setNotifications}
            />
          </View>
          
          <View style={styles.settingItem}>
            <Paragraph>Dark Mode</Paragraph>
            <Switch 
              value={darkMode} 
              onValueChange={setDarkMode}
            />
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Data Management</Text>
          
          <Button 
            mode="contained" 
            style={styles.button}
            onPress={handleExportData}
          >
            Export Data as CSV
          </Button>
          
          <Button 
            mode="contained" 
            color="#f44336"
            style={styles.button}
            onPress={handleClearData}
          >
            Clear All Data
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>About</Text>
          
          <Paragraph>Betpawa Virtual Games Tracker</Paragraph>
          <Paragraph style={styles.version}>Version 1.0.0</Paragraph>
          
          <Paragraph style={styles.description}>
            Track your Betpawa virtual games bets, monitor your performance, and analyze your betting patterns.
          </Paragraph>
          
          <Paragraph style={styles.disclaimer}>
            Remember: Virtual games are purely luck-based and unpredictable. Bet responsibly.
          </Paragraph>
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  button: {
    marginBottom: 10,
  },
  version: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
  },
  description: {
    fontSize: 13,
    color: '#666',
    marginBottom: 15,
  },
  disclaimer: {
    fontSize: 12,
    color: '#f44336',
    fontStyle: 'italic',
  },
});

export default SettingsScreen;
