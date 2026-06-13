import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import {
  GEOLOGY,
  calculateBurden,
  calculateSpacing,
  calculateHoleDepth,
  calculateSubDrilling,
  calculateExplosiveQuantity,
  determineExplosiveType,
  calculateDangerLevel,
  calculateThrowDistance,
} from '../constants/calculations';

export default function CalculatorScreen() {
  // =========================
  // INPUT STATES
  // =========================

  const [rockDensity, setRockDensity] = useState('');
  const [blastArea, setBlastArea] = useState('');
  const [holeDiameter, setHoleDiameter] = useState('');
  const [waterContent, setWaterContent] = useState('');
  const [selectedGeology, setSelectedGeology] = useState('HARD_ROCK');
  const [selectedTerrain, setSelectedTerrain] = useState('Mountainous');



  // =========================
  // OUTPUT STATES
  // =========================

  const [burden, setBurden] = useState(0);
  const [spacing, setSpacing] = useState(0);
  const [holeDepth, setHoleDepth] = useState(0);
  const [subDrilling, setSubDrilling] = useState(0);
  const [explosiveQuantity, setExplosiveQuantity] = useState(0);
  const [throwDistance, setThrowDistance] = useState(0);

  const [explosiveType, setExplosiveType] = useState('');
  const [dangerLevel, setDangerLevel] = useState('');
  const [hasCalculated, setHasCalculated] = useState(false);

  // =========================
  // MAIN CALCULATION
  // =========================

  const handleCalculate = () => {
    const density = parseFloat(rockDensity.replace(',', '.'));
    const area = parseFloat(blastArea.replace(',', '.'));
    const diameter = parseFloat(holeDiameter.replace(',', '.'));
    const water = parseFloat(waterContent.replace(',', '.'));

    if (isNaN(density) || isNaN(area) || isNaN(diameter) || isNaN(water)) {
      Alert.alert('Invalid Input', 'Please ensure all numeric fields are filled correctly.');
      return;
    }

    if (density <= 0 || area <= 0 || diameter <= 0) {
      Alert.alert('Invalid Input', 'Values must be greater than zero.');
      return;
    }

    // Use dynamic geology selection
    const geologyFactor = GEOLOGY[selectedGeology as keyof typeof GEOLOGY] || GEOLOGY.HARD_ROCK;

    // Calculations
    const B = calculateBurden(diameter, geologyFactor);

    const S = calculateSpacing(B);

    const H = calculateHoleDepth(B);

    const J = calculateSubDrilling(B);

    const explosive = calculateExplosiveQuantity(
      B,
      S,
      H,
      density
    );

    const explosiveName = determineExplosiveType(
      selectedTerrain,
      water
    );

    const danger = calculateDangerLevel(
      explosiveName,
      water
    );

    const throwDist = calculateThrowDistance(
      explosive
    );

    // Set results
    setBurden(B);
    setSpacing(S);
    setHoleDepth(H);
    setSubDrilling(J);
    setExplosiveQuantity(explosive);
    setExplosiveType(explosiveName);
    setDangerLevel(danger);
    setThrowDistance(throwDist);
    setHasCalculated(true);
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>
        Blast Calculator
      </Text>

      <TextInput
        placeholder="Rock Density"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        keyboardType="numeric"
        value={rockDensity}
        onChangeText={setRockDensity}
      />

      <TextInput
        placeholder="Blast Area"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        keyboardType="numeric"
        value={blastArea}
        onChangeText={setBlastArea}
      />

      <TextInput
        placeholder="Hole Diameter"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        keyboardType="numeric"
        value={holeDiameter}
        onChangeText={setHoleDiameter}
      />

      <TextInput
        placeholder="Water Content"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        keyboardType="numeric"
        value={waterContent}
        onChangeText={setWaterContent}
      />

      <Text style={{ color: 'white', marginBottom: 10, fontSize: 16 }}>Geology Type</Text>
      <View style={[styles.input, { padding: 0, justifyContent: 'center' }]}>
        <Picker
          selectedValue={selectedGeology}
          onValueChange={(itemValue) => setSelectedGeology(itemValue)}
          style={{ color: 'white' }}
          dropdownIconColor="white"
        >
          <Picker.Item label="Hard Rock" value="HARD_ROCK" />
          <Picker.Item label="Medium Rock" value="MEDIUM_ROCK" />
          <Picker.Item label="Soft Rock" value="SOFT_ROCK" />
        </Picker>
      </View>

      <Text style={{ color: 'white', marginBottom: 10, fontSize: 16 }}>Terrain Type</Text>
      <View style={[styles.input, { padding: 0, justifyContent: 'center' }]}>
        <Picker
          selectedValue={selectedTerrain}
          onValueChange={(itemValue) => setSelectedTerrain(itemValue)}
          style={{ color: 'white' }}
          dropdownIconColor="white"
        >
          <Picker.Item label="Mountainous" value="Mountainous" />
          <Picker.Item label="Flat" value="Flat" />
          <Picker.Item label="Open Pit" value="Open Pit" />
        </Picker>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleCalculate}
      >
        <Text style={styles.buttonText}>
          Calculate
        </Text>
      </TouchableOpacity>

      {hasCalculated && (
        <View style={styles.results}>
        <Text style={styles.result}>
          Burden: {burden.toFixed(2)} m
        </Text>

        <Text style={styles.result}>
          Spacing: {spacing.toFixed(2)} m
        </Text>

        <Text style={styles.result}>
          Hole Depth: {holeDepth.toFixed(2)} m
        </Text>

        <Text style={styles.result}>
          Sub Drilling: {subDrilling.toFixed(2)} m
        </Text>

        <Text style={styles.result}>
          Explosive Quantity:{' '}
          {explosiveQuantity.toFixed(2)} kg
        </Text>

        <Text style={styles.result}>
          Explosive Type: {explosiveType}
        </Text>

        <Text style={styles.result}>
          Danger Level: {dangerLevel}
        </Text>

        <Text style={styles.result}>
          Throw Distance:{' '}
          {throwDistance.toFixed(2)} m
        </Text>
      </View>
      )}
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

  input: {
    backgroundColor: '#1f2937',
    color: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },


  
  button: {
    backgroundColor: '#f97316',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  results: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 15,
    marginBottom: 40,
  },

  result: {
    color: 'white',
    fontSize: 16,
    marginBottom: 12,
  },
});