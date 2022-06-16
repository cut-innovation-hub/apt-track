import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import tw from 'tailwind-react-native-classnames'

interface Props {
  children?: any;
}

const GeneralLayout = ({ children }: Props) => {
  return <SafeAreaView style={tw`h-full bg-white`}>{children}</SafeAreaView>;
};

export default GeneralLayout;

const styles = StyleSheet.create({});
