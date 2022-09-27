import React, { useState } from 'react'
import { Text, View, Pressable, StyleSheet, ImageBackground } from 'react-native'
import InputLine from '@components/atoms/InputLine'
import api from '../api/index'

import { IUser } from '@interfaces/user.interface'
import { useForm, Controller } from 'react-hook-form'

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { globalStyles, colors } from "@src/styles/index"

const Registration = () => {
  const [isSignUp, setIsSignUp] = useState(true)

  const validationSchema = Yup.object({
    isSignUp: Yup.boolean(),
    username: isSignUp ? Yup.string().required("Please enter your username") : Yup.string(),
    email: Yup.string()
      .email("Please enter a valid address email")
      .required("Please enter your email"),
    password: Yup.string()
      .min(6, "Your  password needs to be minimum 6 characters")
      .required("Please enter your password"),
  }).required();

  const { control,
    handleSubmit,
    formState: { errors }, } = useForm<IUser>({
      mode: "onSubmit",
      resolver: yupResolver(validationSchema)
    })

  const sendRegistration = async (data: IUser) => {
    try {
      if (isSignUp) {
        console.log("signup")
        await api.signUp(data)
      } else {
        console.log('login')
        await api.login(data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <ImageBackground source={require("../../assets/login-background.png")} resizeMode="cover" style={styles.backgroundImage}>
      <View style={[globalStyles.container, { flexDirection: "column", flex: 1 }]}>
        <Text style={[globalStyles.baseFont, styles.title]}>Drifter</Text>
        <View style={{ flex: 2, justifyContent: isSignUp ? 'space-between' : 'space-evenly' }}>
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
                error={isSignUp ? !!error : false}
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
                placeholder='Password'
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
        </View>
        <View style={{ flex: 2, justifyContent: 'space-evenly' }}>
          <Pressable style={globalStyles.buttonPrimary} onPress={handleSubmit(sendRegistration)}>
            <Text style={globalStyles.textBtnPrimary}>{isSignUp ? 'Sign up' : 'Login'}</Text>
          </Pressable>
          <Text style={globalStyles.baseFont}>Credentials forgotten ? </Text>
          {!isSignUp && <Text style={[globalStyles.baseFont, { textAlign: 'center' }]}>Don't have an account ?</Text>}
          <Text onPress={() => setIsSignUp(!isSignUp)} style={[globalStyles.baseFont, styles.toggleSignupLogin]}>{isSignUp ? 'Go to login!' : 'Go to signup!'}</Text>
        </View>
      </View >
    </ImageBackground >
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 56,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Lato_700Bold',
    flex: 1,
  },

  toggleSignupLogin: {
    color: 'white',
    textDecorationLine: 'underline',
    textAlign: 'center'
  },

  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  }
})

export default Registration
