import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tailwind from "twrnc";

const CustomText = ({ fontFamily, className, text }) => {
  return (
    <View>
      <Text style={tailwind`${className}`}>
        {text}
      </Text>
    </View>
  );
};

export default CustomText;

const styles = StyleSheet.create({});
