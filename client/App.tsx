import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import api from "./src/api/index"
import { IUser } from '../server/src/interfaces/user.interface'
export default function App() {
  const createUser = async () => {
    const dataToSend: IUser = {
      username: "Joseph", password: "123456", email: "test@test.com"
    }
    console.log(await api.createUser(dataToSend))
  }

  const fetchUsers = async () => {
    console.log(await api.getUsers())
  }



  return (
    <View style={styles.container}>
      <Text>nemnlw try</Text>
      <StatusBar style="auto" />
      <Button
        onPress={createUser}
        title="Create user"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button onPress={fetchUsers} title="Get Users" />
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
