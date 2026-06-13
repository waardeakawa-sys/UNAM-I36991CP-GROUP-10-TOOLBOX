import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        GIS Blast Mapping
      </Text>

      <View style={styles.mapPlaceholder}>
        <Text style={styles.placeholderText}>
          Map Integration Coming Soon
        </Text>

        <Text style={styles.subText}>
          Google Maps and blast radius
          visualization will appear here.
        </Text>
      </View>
    </View>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 30,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  placeholderText: {
    color: '#f97316',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  subText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});