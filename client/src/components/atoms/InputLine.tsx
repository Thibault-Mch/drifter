import React, { FC } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native';
import globalStyles from "@src/styles/globalStyles"
import colors from "@src/styles/colors"

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
      <TextInput
        placeholder={props.placeholder}
        style={[styles.inputLineText, globalStyles.baseFont]}
        placeholderTextColor={colors.washedWhite}
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
    borderRadius: 5,
    borderWidth: 1,
    padding: 12,
    borderColor: colors.washedWhite,
  },

  errorMessage: {
    color: colors.redError
  }
})

export default InputLine;
