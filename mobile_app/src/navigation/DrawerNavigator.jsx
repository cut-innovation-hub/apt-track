import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import { Feather } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="HomeStack"
        component={StackNavigator}
        options={{
          headerShown: false,
          title: "Home",
          drawerIcon: ({ focused, size }) => (
            <Feather
              name="menu"
              size={size}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
