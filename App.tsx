import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
export default function App() {
  const fetchApi = async () => {
    try {
      const response = await fetch('http://localhost:3001/api');
      const json = await response.json();
      console.log(json)
    } catch (error) {
      console.error(error);
    } finally {
      console.log("hello")
    }
  }

  useEffect(() => {
    fetchApi()
  }, [])

  return (
    <View style={styles.container}>
      <Text>Etienne</Text>
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
