import React, { FC } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native';

interface InputLineProps {
  label: string,
  value: string,
  placeholder: string,
  formKey: string,
  onChangeText: () => void,
  secureTextEntry: boolean | undefined
}

const InputLine: FC<InputLineProps> = (props) => {
  return (
    <View style={styles.InputLineWrapper}>
      <Text style={styles.labelText}>{props.label}</Text>
      <TextInput
        placeholder={props.placeholder}
        style={styles.InputLineText}
        onChangeText={props.onChangeText}
        secureTextEntry={props.secureTextEntry}
        autoCorrect={false}
        value={props.value}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  InputLineWrapper: {
  },
  InputLineText: {
    fontSize: 20,
    borderRadius: 15,
    borderWidth: 1,
    padding: 12
  },
  labelText: {
    fontSize: 20,
    marginBottom: 12,
    paddingLeft: 10,
    paddingTop: 10
  }
})

export default InputLine;
