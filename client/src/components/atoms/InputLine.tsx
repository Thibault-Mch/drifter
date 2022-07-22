import React, { FC } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native';

interface InputLineProps {
  label: string;
  value?: string;
  placeholder: string;
  onChangeInput: (value: string) => void;
  secureTextEntry?: boolean | undefined;
  onBlur?: () => void;
  error?: boolean;
  errorDetails?: string;
  autoCapitalize?: string;
}

const InputLine: FC<InputLineProps> = (props) => {
  return (
    <View style={styles.inputLineWrapper}>
      <Text style={styles.labelText}>{props.label}</Text>
      <TextInput
        placeholder={props.placeholder}
        style={styles.inputLineText}
        onChangeText={props.onChangeInput}
        secureTextEntry={props.secureTextEntry}
        autoCorrect={false}
        autoCapitalize='none'
        value={props.value}
      />
      {!!props.errorDetails && (
        <Text style={styles.errorMessage} >
          {props.errorDetails}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  inputLineWrapper: {
    padding: 8
  },
  inputLineText: {
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
  },
  errorMessage: {
    color: 'red'
  }
})

export default InputLine;
