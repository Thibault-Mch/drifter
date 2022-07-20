import React, { useState } from 'react'
import { Text, View, Button } from 'react-native'
// import api from '../api/index'
import { IUser } from '../../../server/src/interfaces/user.interface'
import { useForm } from 'react-hook-form'
import InputLine from '../components/atoms/InputLine'

const Registration = () => {
  const { control, handleSubmit } = useForm<IUser>()

  const [isSignUp, setIsSignUp] = useState(true)

  const sendRegistration = async (data: IUser) => {
    console.log(data)
    // if (isSignUp) {
    //   await api.signup({ username, password, email })
    // } else {
    //   await api.login({ email, password })
    // }
  }

  return (
    <View>
      <Text>Registration</Text>
      <InputLine label='Your email' placeholder='Email' control={control} />
      {isSignUp && <InputLine label='Your username' placeholder='Username' control={control} />}
      <InputLine label='Your password' placeholder='Password' control={control} secureTextEntry />
      {/* onPress takes a function bc the prop type passed to InputLine is void */}
      <Button title="Login" onPress={handleSubmit(sendRegistration)} />
      <Button title={isSignUp ? 'Go to login' : 'Go to signup'} onPress={() => setIsSignUp(!isSignUp)} />
    </View>
  )
}

export default Registration
