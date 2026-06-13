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
import { loginUser, resetPassword } from '../../firebase-config/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  // States for our custom 3-second alert banner
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<'error' | 'success'>('error');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const triggerAlert = (message: string, type: 'error' | 'success' = 'error') => {
    setAlertType(type);
    setAlertMessage(message);
    setAlertVisible(true);

    Animated.sequence([
      Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      }),
      Animated.delay(3000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => setAlertVisible(false));
  };

  const handleLogin = async () => {
    if (!email || !password) {
      triggerAlert('Please fill in all fields.', 'error');
      return;
    }
    setLoading(true);
    try {
      await loginUser(email, password);
      triggerAlert('Welcome back! Redirecting...', 'success');
      router.replace('/dashboard');
    } catch (error: any) {
      setLoading(false);
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        triggerAlert('Incorrect email or password. Please try again.', 'error');
      } else {
        triggerAlert(error.message || 'Login failed. Please try again.', 'error');
      }
    }
  };


  // PASSWORD RESET HANDLER
  const handleForgotPassword = async () => {
    if (!email) {
      triggerAlert('Please enter your email address in the box below first.', 'error');
      return;
    }

    try {
      await resetPassword(email);
      triggerAlert('Password reset link sent! Check your email inbox.', 'success');
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        triggerAlert('This email address is not registered with an account.', 'error');
      } else if (error.code === 'auth/invalid-email') {
        triggerAlert('Please enter a valid email format.', 'error');
      } else {
        triggerAlert(error.message || 'Could not send reset email.', 'error');
      }
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/background.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        
        {/* Custom 3-Second Floating Alert Banner */}
        {alertVisible && (
          <Animated.View style={[
            styles.alertBanner, 
            { opacity: fadeAnim, backgroundColor: alertType === 'success' ? '#22c55e' : '#ef4444' }
          ]}>
            <Ionicons 
              name={alertType === 'success' ? "checkmark-circle" : "alert-circle"} 
              size={20} 
              color="#ffffff" 
              style={{ marginRight: 8 }} 
            />
            <Text style={styles.alertText}>{alertMessage}</Text>
          </Animated.View>
        )}

        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          
          {/* Header Row */}
          <View style={styles.headerRow}>
            <Text style={styles.logoText}>
              BlastMaster <Text style={styles.logoHighlight}>Pro</Text>
            </Text>
            <TouchableOpacity 
              style={styles.headerSignUpBtn}
              onPress={() => router.push('/register')}
            >
              <Text style={styles.headerSignUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Form Container */}
          <View style={styles.glassCard}>
            <Text style={styles.welcomeText}>Hi, Welcome Back 👋🏾</Text>

            {/* Social Buttons */}
            <TouchableOpacity style={styles.socialButton} onPress={() => triggerAlert('Social login coming soon!', 'error')}>
              <Ionicons name="logo-apple" size={20} color="white" style={styles.socialIcon} />
              <Text style={styles.socialButtonText}>Continue with Apple</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} onPress={() => triggerAlert('Social login coming soon!', 'error')}>
              <Ionicons name="logo-google" size={18} color="#EA4335" style={styles.socialIcon} />
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or Login with Email</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Email Input */}
            <Text style={styles.inputLabel}>Email</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Enter your email address"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            {/* Password Input */}
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                secureTextEntry={secureText}
                style={[styles.input, { paddingRight: 45 }]}
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity 
                style={styles.eyeIcon} 
                onPress={() => setSecureText(!secureText)}
              >
                <Ionicons 
                  name={secureText ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="rgba(255, 255, 255, 0.6)" 
                />
              </TouchableOpacity>
            </View>

            {/* Remember Me & Forgot Password Row */}
            <View style={styles.utilitiesRow}>
              <TouchableOpacity 
                style={styles.checkboxRow} 
                onPress={() => setRememberMe(!rememberMe)}
              >
                <Ionicons 
                  name={rememberMe ? "checkbox" : "square-outline"} 
                  size={18} 
                  color={rememberMe ? "#f97316" : "rgba(255, 255, 255, 0.6)"} 
                />
                <Text style={styles.utilityText}> Remember Me</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.utilityText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Submit Button */}
            <TouchableOpacity 
              style={[styles.loginButton, loading && { opacity: 0.7 }]} 
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.loginButtonText}>{loading ? 'Logging in...' : 'Login'}</Text>
            </TouchableOpacity>

            {/* Bottom Registration Link */}
            <TouchableOpacity 
              style={styles.footerLinkWrapper} 
              onPress={() => router.push('/register')}
            >
              <Text style={styles.footerText}>
                Not Registered yet? Create an account{' '}
                <Text style={styles.footerTextHighlight}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

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
  socialButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.06)', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 30, paddingVertical: 14, marginBottom: 12 },
  socialIcon: { marginRight: 10 },
  socialButtonText: { color: '#ffffff', fontWeight: '500', fontSize: 14 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.15)' },
  dividerText: { color: 'rgba(255, 255, 255, 0.5)', paddingHorizontal: 12, fontSize: 12 },
  inputLabel: { color: 'rgba(255, 255, 255, 0.8)', fontSize: 13, fontWeight: '600', marginBottom: 8, marginLeft: 4 },
  inputWrapper: { position: 'relative', marginBottom: 18 },
  input: { backgroundColor: 'rgba(0, 0, 0, 0.2)', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 14, color: '#ffffff', paddingVertical: 14, paddingHorizontal: 16, fontSize: 15 },
  eyeIcon: { position: 'absolute', right: 15, top: 16 },
  utilitiesRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, paddingHorizontal: 4 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center' },
  utilityText: { color: 'rgba(255, 255, 255, 0.65)', fontSize: 13 },
  loginButton: { backgroundColor: 'rgba(255, 255, 255, 0.08)', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 30, paddingVertical: 14, alignItems: 'center' },
  loginButtonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
  footerLinkWrapper: { marginTop: 24, alignItems: 'center' },
  footerText: { color: 'rgba(255, 255, 255, 0.55)', fontSize: 13 },
  footerTextHighlight: { color: '#f97316', fontWeight: '600' },
});
