import React, { useState } from 'react'
import { Text, View, Button } from 'react-native'
import InputLine from '@components/atoms/InputLine'
// import api from '../api/index'

import { IUser } from '@interfaces/user.interface'
import { useForm, Controller } from 'react-hook-form'

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Registration = () => {

  const validationSchema = Yup.object({
    username: Yup.string().required("Please enter your username"),
    email: Yup.string()
      .email("Please enter a valid address email")
      .required("Please enter your email"),
    password: Yup.string()
      .min(6, "Your  password needs to be minimum 6 characters")
      .required("Please enter your password"),
    // confirmPassword: Yup.string()
    //   .required("Please confirm you")
    //   .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas"),
  }).required();

  const { control,
    handleSubmit,
    formState: { errors }, } = useForm<IUser>({
      mode: "onSubmit",
      resolver: yupResolver(validationSchema)
    })

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
      <Controller
        control={control}
        name="email"
        render={({
          field: { onChange, value, onBlur },
          fieldState: { error },
        }) => (
          <InputLine
            label='Your email'
            placeholder='Email'
            onChangeInput={onChange}
            value={value}
            onBlur={onBlur}
            error={!!error}
            errorDetails={error?.message}
          />

        )}
      />
      {isSignUp && <Controller
        control={control}
        name="username"
        render={({
          field: { onChange, value, onBlur },
          fieldState: { error },
        }) => (
          <InputLine
            label='Your username'
            placeholder='Username'
            onChangeInput={onChange}
            value={value}
            onBlur={onBlur}
            error={!!error}
            errorDetails={error?.message}
          />

        )}
      />}
      <Controller
        control={control}
        name="password"
        render={({
          field: { onChange, value, onBlur },
          fieldState: { error },
        }) => (
          <InputLine
            label='Your password'
            placeholder='password'
            onChangeInput={onChange}
            value={value}
            onBlur={onBlur}
            error={!!error}
            errorDetails={error?.message}
            secureTextEntry
          />

        )}
      />
      {errors && Object.keys(errors).length > 0 && (
        <Text>
          Please fill all the fields
        </Text>
      )}
      <Button title={isSignUp ? 'Sign up' : 'Login'} onPress={handleSubmit(sendRegistration)} />
      <Button title={isSignUp ? 'Go to login' : 'Go to signup'} onPress={() => setIsSignUp(!isSignUp)} />
    </View>
  )
}

export default Registration
