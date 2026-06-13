import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function HistoryScreen() {
  const blastHistory = [
    {
      id: 1,
      location: 'Walvis Bay Mine',
      explosive: 'ANFO',
      danger: 'LOW',
      date: '25 May 2026',
    },
    {
      id: 2,
      location: 'Otjikoto Site',
      explosive: 'Emulsion',
      danger: 'HIGH',
      date: '24 May 2026',
    },
    {
      id: 3,
      location: 'Erongo Quarry',
      explosive: 'Heavy ANFO',
      danger: 'MEDIUM',
      date: '23 May 2026',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Blast History
      </Text>

      {blastHistory.map((blast) => (
        <View key={blast.id} style={styles.card}>
          <Text style={styles.location}>
            {blast.location}
          </Text>

          <Text style={styles.text}>
            Explosive: {blast.explosive}
          </Text>

          <Text style={styles.text}>
            Danger Level: {blast.danger}
          </Text>

          <Text style={styles.date}>
            {blast.date}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  location: {
    color: '#f97316',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  date: {
    color: '#94a3b8',
    marginTop: 10,
  },
});