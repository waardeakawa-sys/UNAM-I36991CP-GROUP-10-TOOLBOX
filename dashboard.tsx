import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { router } from 'expo-router';
import { signOutUser } from '../../firebase-config/auth';

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Engineer Dashboard</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/calculator')}
      >
        <Text style={styles.cardText}>Blast Calculator</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/map')}
      >
        <Text style={styles.cardText}>GIS Mapping</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/schedule')}
      >
        <Text style={styles.cardText}>Blast Scheduling</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/history')}
      >
        <Text style={styles.cardText}>Blast History</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/alerts')}
      >
        <Text style={styles.cardText}>Community Alerts</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, styles.logoutCard]}
        onPress={async () => {
          try {
            await signOutUser();
          } catch (error) {
            // still navigate to login even if sign-out fails
          }
          router.replace('/login');
        }}
      >
        <Text style={styles.cardText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
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
    padding: 25,
    borderRadius: 15,
    marginBottom: 15,
  },

  logoutCard: {
    backgroundColor: '#ef4444',
  },

  cardText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { router } from 'expo-router';
import { signOutUser } from '../../firebase-config/auth';

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Engineer Dashboard</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/calculator')}
      >
        <Text style={styles.cardText}>Blast Calculator</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/map')}
      >
        <Text style={styles.cardText}>GIS Mapping</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/schedule')}
      >
        <Text style={styles.cardText}>Blast Scheduling</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/history')}
      >
        <Text style={styles.cardText}>Blast History</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/alerts')}
      >
        <Text style={styles.cardText}>Community Alerts</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, styles.logoutCard]}
        onPress={async () => {
          try {
            await signOutUser();
          } catch (error) {
            // still navigate to login even if sign-out fails
          }
          router.replace('/login');
        }}
      >
        <Text style={styles.cardText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
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
    padding: 25,
    borderRadius: 15,
    marginBottom: 15,
  },

  logoutCard: {
    backgroundColor: '#ef4444',
  },

  cardText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});