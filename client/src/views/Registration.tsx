import { Text, View, Button } from 'react-native'
import React, { useState } from 'react'
import api from '../api/index'

import InputLine from '../components/atoms/InputLine'

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isSignUp, setIsSignUp] = useState(true)

  const sendRegistration = async () => {
    if (isSignUp) {
      await api.signup({ username, password, email })
    } else {
      await api.login({ email, password })
    }
  }
  return (
    <View>
      <Text>Registration</Text>
      <InputLine label='Your email' placeholder='Email' onChangeInput={setEmail} />
      {isSignUp && <InputLine label='Your username' placeholder='Username' onChangeInput={setUsername} />}
      <InputLine label='Your password' placeholder='Password' onChangeInput={setPassword} secureTextEntry />
      {/* onPress takes a function bc the prop type passed to InputLine is void */}
      <Button title="Login" onPress={async () => await sendRegistration()} />
      <Button title={isSignUp ? 'Go to login' : 'Go to signup'} onPress={() => setIsSignUp(!isSignUp)} />
    </View>
  )
}

export default Registration
