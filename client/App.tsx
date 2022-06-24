import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const fetchApi = async () => {
    fetch('http://localhost:3001/add_user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: 'yoyo', age: 12 })
    }).then(response => response.json()).then(data => console.log(data))
  }

  const getUsers = async () => {
    const res = await fetch('http://localhost:3001/users')
    const data = await res.json()
    console.log(data)
  }



  return (
    <View style={styles.container}>
      <Text>nemnlw try</Text>
      <StatusBar style="auto" />
      <Button
        onPress={fetchApi}
        title="Create user"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button onPress={getUsers} title="Get Users" />
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
