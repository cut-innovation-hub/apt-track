import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tailwind from "twrnc";
import BusSvg from "../../assets/svgs/BusSvg";

const BusComponent = () => {
  return (
    <View style={tailwind`flex flex-row`}>
      <View
        style={tailwind`bg-gray-200 relative rounded-lg h-16 w-16 p-2 mr-4`}
      >
        <View style={tailwind`absolute`}>
          {/* <BusSvg /> */}
        </View>
      </View>
      <View style={tailwind`flex flex-col justify-around`}>
        <Text style={[tailwind`text-gray-900 text-lg`, { fontWeight: "700" }]}>
          TO HARARE
        </Text>
        <Text style={[tailwind`text-gray-400 text-sm`, { fontWeight: "200" }]}>
          Bus Arrives in 5 hours
        </Text>
      </View>
    </View>
  );
};

export default BusComponent;

const styles = StyleSheet.create({});
