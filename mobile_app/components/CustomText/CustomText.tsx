import React, { FunctionComponent } from "react";
import { Text, StyleSheet } from "react-native";
import tw from 'tailwind-react-native-classnames'

type CustomTextProps = {
  children?: any;
  className?: string
};

const CustomText: FunctionComponent<CustomTextProps> = ({
  children,
  className
}: CustomTextProps) => {
  return <Text style={[tw`${className ? className : ` ` }`, styles.text]}>{children}</Text>;
};

const styles = StyleSheet.create({
    text:{}
});
export default CustomText;
