import React, { useState, useEffect, FC } from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

const UselessTextInput: FC = () => {
  const [text, onChangeText] = useState<string>("Useless Text");
  const [number, onChangeNumber] = useState<string>("");
  useEffect(() => {
    onChangeText('hello')
  }, []);
  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default UselessTextInput;
