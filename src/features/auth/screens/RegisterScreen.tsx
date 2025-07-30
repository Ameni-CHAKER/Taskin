import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../services/firebase';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Succès', 'Compte créé. Vous pouvez vous connecter.');
      navigation.navigate('Login');
    } catch (err) {
      Alert.alert('Erreur', 'Impossible de créer le compte.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} value={email} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry onChangeText={setPassword} value={password} />
      <Button title="Créer le compte" onPress={handleRegister} />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Déjà un compte ? Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 },
  link: { color: 'blue', marginTop: 20, textAlign: 'center' },
});
