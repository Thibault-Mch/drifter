import React, { useState } from 'react'
import { Text, View, Pressable, StyleSheet } from 'react-native'
import InputLine from '@components/atoms/InputLine'
import api from '../api/index'

import { IUser } from '@interfaces/user.interface'
import { useForm, Controller } from 'react-hook-form'

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { globalStyles, colors } from "@src/styles/index"
import { AFTER_FIRST_UNLOCK } from 'expo-secure-store'
const Registration = () => {

  const validationSchema = Yup.object({
    username: Yup.string().required("Please enter your username"),
    email: Yup.string()
      .email("Please enter a valid address email")
      .required("Please enter your email"),
    password: Yup.string()
      .min(6, "Your  password needs to be minimum 6 characters")
      .required("Please enter your password"),
    confirmPassword: Yup.string()
      .required("Please confirm you")
      .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas"),
  }).required();

  const { control,
    handleSubmit,
    formState: { errors }, } = useForm<IUser>({
      mode: "onSubmit",
      resolver: yupResolver(validationSchema)
    })

  const [isSignUp, setIsSignUp] = useState(true)

  const sendRegistration = async (data: IUser) => {
    if (isSignUp) {
      await api.signup(data)
    } else {
      await api.login(data)
    }
  }

  return (
    <View style={globalStyles.container}>
      <Text style={[globalStyles.baseFont, styles.title]}>Drifter</Text>
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
        <Text style={{ color: colors.redError }}>
          Please fill all the fields
        </Text>
      )
      }
      <Pressable style={styles.buttonPrimary} onPress={handleSubmit(sendRegistration)}><Text style={{ color: colors.tifBlue }}>{isSignUp ? 'Sign up' : 'Login'}</Text></Pressable>
      <Pressable style={styles.buttonPrimary} onPress={() => setIsSignUp(!isSignUp)}><Text style={{ color: colors.tifBlue }}>{isSignUp ? 'Go to login' : 'Go to signup'}</Text></Pressable>

    </View >
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Lato_700Bold'
  },
  buttonPrimary: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: 12,
    width: 120,
    // paddingHorizontal: 32,
    borderRadius: 4,
    color: colors.tifBlue,
    borderColor: colors.tifBlue,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: colors.lighterBlack,

  }
})

export default Registration
