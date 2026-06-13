import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { registerUser } from '../../firebase-config/auth';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  const [alertMessage, setAlertMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<'error' | 'success'>('error');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const triggerAlert = (message: string, type: 'error' | 'success' = 'error') => {
    setAlertType(type);
    setAlertMessage(message);
    setAlertVisible(true);
    
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.delay(3000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => setAlertVisible(false));
  };

  const handleRegister = async () => {
    if (!email || !password) {
      triggerAlert('Please complete all credential fields.', 'error');
      return;
    }
    setLoading(true);
    try {
      await registerUser(email, password);
      triggerAlert('Registration successful! Launching...', 'success');
      router.replace('/dashboard');
    } catch (error: any) {
      setLoading(false);
      triggerAlert(error.message || 'Registration failed. Try a stronger password.', 'error');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/background.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        {alertVisible && (
          <Animated.View style={[
            styles.alertBanner, 
            { opacity: fadeAnim, backgroundColor: alertType === 'success' ? '#22c55e' : '#ef4444' }
          ]}>
            <Ionicons name={alertType === 'success' ? "checkmark-circle" : "alert-circle"} size={20} color="#ffffff" style={{ marginRight: 8 }} />
            <Text style={styles.alertText}>{alertMessage}</Text>
          </Animated.View>
        )}

        <ScrollView 
          contentContainerStyle={styles.scrollContainer} 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          
          <View style={styles.headerRow}>
            <Text style={styles.logoText}>
              BlastMaster <Text style={styles.logoHighlight}>Pro</Text>
            </Text>
            <TouchableOpacity style={styles.headerSignUpBtn} onPress={() => router.push('/login')}>
              <Text style={styles.headerSignUpText}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.glassCard}>
            <Text style={styles.welcomeText}>Create Account 🚀</Text>

            <Text style={styles.inputLabel}>Email</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Choose your application email"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Create a strong password"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                secureTextEntry={secureText}
                style={[styles.input, { paddingRight: 45 }]}
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity style={styles.eyeIcon} onPress={() => setSecureText(!secureText)}>
                <Ionicons name={secureText ? "eye-off-outline" : "eye-outline"} size={20} color="rgba(255, 255, 255, 0.6)" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={[styles.loginButton, loading && { opacity: 0.7 }]} 
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={styles.loginButtonText}>{loading ? 'Creating Account...' : 'Sign Up'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.footerLinkWrapper} onPress={() => router.push('/login')}>
              <Text style={styles.footerText}>
                Already have an account?{' '}
                <Text style={styles.footerTextHighlight}>Login here</Text>
              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

// Re-uses identical styling layout configuration for look-and-feel parity
const styles = StyleSheet.create({
  backgroundImage: { flex: 1, width: '100%', height: '100%' },
  safeArea: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.35)' },
  scrollContainer: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 },
  alertBanner: { position: 'absolute', top: 60, left: 20, right: 20, paddingVertical: 14, paddingHorizontal: 16, borderRadius: 14, flexDirection: 'row', alignItems: 'center', zIndex: 9999, elevation: 99, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 6 },
  alertText: { color: '#ffffff', fontSize: 14, fontWeight: '600', flex: 1 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.06)', paddingVertical: 14, paddingHorizontal: 20, borderRadius: 30, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.12)', marginBottom: 25, marginTop: 10 },
  logoText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
  logoHighlight: { color: '#f97316' },
  headerSignUpBtn: { backgroundColor: 'rgba(255, 255, 255, 0.08)', paddingVertical: 6, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' },
  headerSignUpText: { color: '#ffffff', fontWeight: '600', fontSize: 14 },
  glassCard: { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 32, padding: 24, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' },
  welcomeText: { color: '#ffffff', fontSize: 26, fontWeight: 'bold', textAlign: 'left', marginBottom: 24 },
  inputLabel: { color: 'rgba(255, 255, 255, 0.8)', fontSize: 13, fontWeight: '600', marginBottom: 8, marginLeft: 4 },
  inputWrapper: { position: 'relative', marginBottom: 18 },
  input: { backgroundColor: 'rgba(0, 0, 0, 0.2)', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 14, color: '#ffffff', paddingVertical: 14, paddingHorizontal: 16, fontSize: 15 },
  eyeIcon: { position: 'absolute', right: 15, top: 16 },
  loginButton: { backgroundColor: 'rgba(255, 255, 255, 0.08)', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 30, paddingVertical: 14, alignItems: 'center', marginTop: 10 },
  loginButtonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
  footerLinkWrapper: { marginTop: 24, alignItems: 'center' },
  footerText: { color: 'rgba(255, 255, 255, 0.55)', fontSize: 13 },
  footerTextHighlight: { color: '#f97316', fontWeight: '600' },
});