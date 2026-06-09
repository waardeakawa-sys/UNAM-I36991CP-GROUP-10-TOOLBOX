/// app/index.tsx

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>BLAST ASSIST</Text>

      <Text style={styles.subtitle}>
        Safety Blasting Arrangement App
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/login')}
      >
        <Text style={styles.buttonText}>Enter App</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  logo: {
    color: '#f97316',
    fontSize: 34,
    fontWeight: 'bold',
  },

  subtitle: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },

  button: {
    backgroundColor: '#f97316',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 40,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
