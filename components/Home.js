import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  Alert,
  Image,
} from "react-native";
import { Searchbar } from "react-native-paper";
import {
  createTable,
  getMenuItems,
  saveMenuItems,
  filterByQueryAndCategories,
} from "../database";
import Categories from "./Categories";
import Hero from "./Hero";

const API_URL =
  "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";

const sections = ["Starters", "Mains", "Desserts", "Drinks", "Specials"];

const Item = ({ name, price, description, imageFileName }) => (
  <View style={homeStyles.item}>
    <View style={homeStyles.itemDetails}>
      <Text style={homeStyles.dishName}>{name}</Text>
      <Text style={homeStyles.dishDescription}>{description}</Text>
      <Text style={homeStyles.dishPrice}>${price}</Text>
    </View>
    <Image
      style={homeStyles.dishImage}
      source={{
        uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${imageFileName}?raw=true`,
      }}
    />
  </View>
);

const Separator = () => <View style={homeStyles.separator} />;

export default function Home() {
  const [data, setData] = useState([]);
  const [searchBarText, setSearchBarText] = useState("");

  const [filterSections, setFilterSections] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const responseData = await response.json();
      const menu = responseData.menu.map((item) => ({ ...item }));
      return menu;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await createTable();

        let menuItems = await getMenuItems();

        if (!menuItems.length) {
          const menuItems = await fetchData();
          saveMenuItems(menuItems);
        }

        setData(menuItems);
      } catch (e) {
        Alert.alert(e.message);
      }
    })();
  }, []);

  const handleSearchChange = (text) => {
    setSearchBarText(text);
  };

  const handleFiltersChange = async (section) => {
    const filterSectionsCopy = [...filterSections];
    const index = filterSectionsCopy.indexOf(section);
    if (index !== -1) {
      filterSectionsCopy.splice(index, 1);
    } else {
      filterSectionsCopy.push(section);
    }

    setFilterSections(filterSectionsCopy);
  };

  useEffect(() => {
    filterByQueryAndCategories(searchBarText, filterSections).then(
      (filteredData) => {
        setData(filteredData);
      }
    );
  }, [searchBarText, filterSections]);

  return (
    <SafeAreaView style={homeStyles.container}>
      <Hero />
      <Searchbar
        placeholder="Search"
        placeholderTextColor="white"
        onChangeText={handleSearchChange}
        value={searchBarText}
        style={homeStyles.searchBar}
        iconColor="white"
        inputStyle={{ color: "white" }}
        elevation={0}
      />
      <Categories
        selections={filterSections}
        onChange={handleFiltersChange}
        sections={sections}
      />
      <FlatList
        style={homeStyles.flatList}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Item
            name={item.name}
            price={item.price}
            description={item.description}
            imageFileName={item.image}
          />
        )}
        ItemSeparatorComponent={Separator}
      />
    </SafeAreaView>
  );
}

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  flatList: {
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  searchBar: {
    marginBottom: 10,
    backgroundColor: "#495E57",
    shadowRadius: 0,
    shadowOpacity: 0,
    borderRadius: 0,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "start",
    padding: 8,
    color: "black",
    flex: 1,
  },
  itemDetails: {
    flex: 1,
  },
  dishName: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    paddingBottom: 8,
  },
  dishDescription: {
    fontSize: 18,
    color: "black",
    paddingBottom: 8,
  },
  dishPrice: {
    fontSize: 18,
    color: "black",
    paddingBottom: 4,
  },
  dishImage: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
  hero: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  heroText: {
    flex: 1,
    fontSize: 20,
    color: "white",
  },
  image: {
    height: 130,
    width: 130,
    resizeMode: "contain",
    borderRadius: 20,
  },
  mainTitle: {
    padding: 10,
  },
  mainTitleText: {
    color: "#FAFA33",
    fontWeight: "bold",
    fontSize: 36,
  },
  mainTitleSubText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
  },
  heroContainer: {
    backgroundColor: "#495E57",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CED0CE",
  },
});
