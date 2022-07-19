import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import tailwind from "twrnc";
import BottomSheet, {
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import CustomText from "../../Text/CustomText";
import { Feather } from "@expo/vector-icons";
import BusComponent from "../BusComponent/BusComponent";

const HomeBottomSheet = ({ top_text, hide_search_bar }) => {
  const [query, setQuery] = useState("");
  const sheetRef = useRef(null);

  // variables
  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );

  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);

  // render
  const renderItem = useCallback(
    (item) => (
      <View key={item} style={tailwind`my-2`}>
        <BusComponent />
      </View>
    ),
    []
  );

  return (
    <>
      <BottomSheet
        ref={sheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
      >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <View style={tailwind`p-4 `}>
            <CustomText
              text={top_text ? top_text : "Where to today?"}
              className="text-cyan-800 text-3xl font-bold pb-8"
            />

            {/* // the search bar in bottom sheet */}
            {!hide_search_bar && (
              <View
                style={tailwind`flex-row items-center p-2 flex bg-gray-200 rounded-lg mb-8 `}
              >
                <View>
                  <Feather name="search" size={20} color="#9ca3af" />
                </View>
                <View>
                  <TextInput
                    style={tailwind`text-lg p-2`}
                    onChangeText={(text) => setQuery(text)}
                    value={query}
                    placeholder="Search Location"
                    keyboardType="numeric"
                  />
                </View>
              </View>
            )}
            {data?.map(renderItem)}
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </>
  );
};

export default HomeBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
  },
  contentContainer: {
    backgroundColor: "white",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
});
