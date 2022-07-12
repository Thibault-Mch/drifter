import React, { FC } from 'react'
import { View, Text, StyleSheet, TextInput, TextInputProps } from 'react-native';

interface Props extends

const FormField: FC = (props: TextInputProps) => {
  return <>(
    <View style={styles.formFieldWrapper}>
      <Text style={styles.labelText}>{props.label}</Text>
      <TextInput
        placeholder={props.placeholder}
        style={styles.formFieldText}
        onChange={(event) => props.handleFormValueChange(props.formKey, event.nativeEvent.text)}
        {...props.textInputProps}
      />
    </View>
    )</>
}

const styles = StyleSheet.create({
  formFieldWrapper: {
  },
  formFieldText: {
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

export default FormField;
