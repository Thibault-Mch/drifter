import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
export default function App() {
  const fetchApi = async () => {
    fetch('http://localhost:3001/add_user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: 'titi', age: 12 })
    }).then(response => response.json()).then(data => console.log(data))
  }

  useEffect(() => {
    fetchApi()
  }, [])

  return (
    <View style={styles.container}>
      <Text>nemnw try</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
