import { View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import React, { useEffect } from "react";
import { Button } from "react-native-paper";
import Logo from "../components/logo";
import { useProduct } from "../context/ItemContext";
import CustomCheckbox from "../components/checkboxes/CustomCheckbox";
import { fetchData } from "../services/fetchData";
import { GlassBrand, GlassGender, GlassType } from "../../types";
import CustomCheckboxHeader from "../components/checkboxes/CustomCheckboxHeader";


export default function Filter(props: any) {

  const {
    glassItems,
    glassItemsByType,
    setGlassItemsByType,
    glassItemsByGender,
    setGlassItemsByGender,
    glassItemsByBrand,
    setGlassItemsByBrand,
    selectedGlasses,
    setSelectedGlasses,
    setIsFiltered,
    setFilteredGlassItems
  } = useProduct();

  const setDataToState = () => {
    fetchData("types").then(data => {
      setGlassItemsByType(data);

    });

    // add endpoint!
    fetchData("gender").then(data => {
      setGlassItemsByGender(data);
    });

    fetchData("brands").then(data => {
      setGlassItemsByBrand(data);
    });
  };

  useEffect(() => {
    setDataToState();
  }, []);

  function applyFiltersHandler(): void {

    const tempType = selectedGlasses.filter(val => val.hasOwnProperty("type_name")) as any;
    const tempGender = selectedGlasses.filter(val => val.hasOwnProperty("gender_name")) as any;
    const tempBrand = selectedGlasses.filter(val => val.hasOwnProperty("brand_name")) as any;

    const newArray = glassItems
      .filter(val => tempType.map((item: GlassType) => item.type_name).includes(val.type.type_name))
      .filter(val => tempGender.map((item: GlassGender) => item.gender_name).includes(val.gender.gender_name))
      .filter(val => tempBrand.map((item: GlassBrand) => item.brand_name).includes(val.brand.brand_name));

    setFilteredGlassItems(newArray);

    setIsFiltered(true);
    props.navigation.navigate("Home");

  }

  function handleTypeClick(value: any): void {
    setSelectedGlasses(prevstate => [...prevstate, value.type_name]);
  }

  function handleGenderClick(value: any): void {
    setSelectedGlasses(prevstate => [...prevstate, value.gender_name]);
  }

  function handleBrandClick(value: any): void {
    setSelectedGlasses(prevstate => [...prevstate, value.brand_name]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo />
      </View>
      <View style={styles.body}>
        <CustomCheckboxHeader text="Show glasses by type:" />
        <View style={styles.checkboxes}>
          {glassItemsByType.map((item: GlassType, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleTypeClick(item.type_name)}
              style={styles.bor}
            >
              <CustomCheckbox item={item} index={index} name={item.type_name} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.body}>
        <CustomCheckboxHeader text="Show glasses by gender:" />
        <View style={styles.checkboxes}>
          {glassItemsByGender.map((item: GlassGender, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleGenderClick(item.gender_name)}
              style={styles.bor}
            >
              <CustomCheckbox item={item} index={index} name={item.gender_name} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.body}>
        <CustomCheckboxHeader text="Show glasses by brand:" />
        <View style={styles.checkboxes}>
          {glassItemsByBrand.map((item: GlassBrand, index: number) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => handleBrandClick(item.brand_name)}
              style={styles.bor}
            >
              <CustomCheckbox item={item} index={index} name={item.brand_name} />
            </TouchableWithoutFeedback>
          ))}
        </View>
      </View>
      <View style={styles.btn}>
        <Button mode="contained" onPress={applyFiltersHandler}>
          Apply filters
        </Button>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex: 1,
    backgroundColor: "#fff"
  },
  body: {
    flex: 9,
    backgroundColor: "#fff"
  },
  checkboxes: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end"
  },
  option: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black"
  },
  bor: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black"
  },
  btn: {
    padding: 5,
    backgroundColor: "#fff"
  },
  checkboxLabel: {
    fontSize: 12
  }
});
