import React, { useState, FC } from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

const UselessTextInput: FC = () => {
  const [text, onChangeText] = useState("Useless Text");

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
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
