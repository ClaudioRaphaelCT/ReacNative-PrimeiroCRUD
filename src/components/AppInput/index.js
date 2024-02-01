import React from 'react';
import AppInput from './styles';

const Input = ({ placeholder, value, onChangeText, keyboardType }) => {
  return <AppInput placeholder={placeholder} value={value} onChangeText={onChangeText} keyboardType={keyboardType} />;
};

export default Input;
