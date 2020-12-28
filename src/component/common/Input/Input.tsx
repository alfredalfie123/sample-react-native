import React from 'react';
import { StyleSheet, TextInput, TextInputProps, ViewStyle } from 'react-native';
import Layout from '../Layout/Layout';

interface Props extends TextInputProps {
  withEye?: boolean;
  wrapperStyle?: ViewStyle;
}

const Input: React.FC<Props> = (props: Props) => {
  const { withEye, wrapperStyle, ...inputProps } = props;

  return (
    <Layout
      align="flex-start"
      fullWidth
      style={[styles.root, wrapperStyle]}
      color="white"
    >
      <TextInput style={styles.input} {...inputProps} />
    </Layout>
  );
};

export default Input;

const styles = StyleSheet.create({
  root: {
    paddingLeft: 12,
    paddingRight: 12,
    height: 50,
    maxWidth: 400,
    borderRadius: 25
  },
  input: {
    width: '100%',
    fontSize: 15
  }
});
