import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { auth } from "../../firebase";
import { getChoirs } from "../utils/api";

export default function HomeScreen({ navigation }) {
  const capitalizeFirstLetter = ([ first, ...rest ], locale = navigator.language) =>
  first.toLocaleUpperCase(locale) + rest.join('')

  const [choirs, setChoirs ] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getChoirs().then((choirs) => {
      setChoirs(choirs)
      setIsLoading(false);
    }).catch((err) => {
      setIsLoading(false);
      console.log(err)
    })
  }, []);

  // const handleSignOut = () => {
  //   auth
  //     .signOut()
  //     .then(() => {
  //       navigation.navigate("Login");
  //     })
  //     .catch((error) => alert(error.message));
  // };

  const handleSearch = () => {
    console.log('searching')
  };
  // const goToChoir = (id) => {
  //   navigation.navigate("Choir", {id: id})
  // }

  if (isLoading) {
    return <Image style={styles.loading} source={{ uri: "https://www.teahub.io/photos/full/226-2267889_animated-circle-gif-transparent.gif"}} />
  } 

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/white-background.png")}
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Find your local choir</Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.location}>
            <Text style={styles.loc}>LOCATION</Text>
          </View>
          <View style={styles.dropdown}>
          <Text style={styles.loc}>dropdown</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSearch} style={styles.button}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.choirCardsContainer}>
          <ScrollView>

          {choirs.map((choir) => {
            return (
              <View style={[styles.card, styles.shadowProp]}>
              <Text style={styles.choirTitle} onPress={() => navigation.navigate("Choir", {choirId: choir._id})}>{choir.name}</Text>
              <Text style={styles.loc}>{capitalizeFirstLetter(choir.location)}</Text>
              {/* <Text numberOfLines={2} ellipsizeMode="tail" style={styles.choirDesc} onPress={goToChoir(choir._id)}>{choir.description} </Text> */}
              </View>
            )
          })}

          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    paddingTop: 0,
  },
  background: {
    flex: 1,
    alignItems: "center",
  },

//-------------------------TITLE
  titleContainer: {
    marginTop: 10,
    flex: 1,
    width: '100%',
    // borderWidth: 1,
    // borderColor: 'red',
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "700",
    color: '#BD7D1E',
  },

//-------------------------SEARCH
  searchContainer: {
    marginTop: 10,
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'blue',
    flexDirection: 'row',
    width: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  location: {
    width: '40%',
    // borderWidth: 1,
    // borderColor: 'pink',
  },
  dropdown: {
    width: '60%',
    // borderWidth: 1,
    // borderColor: 'pink',
  },
  buttonContainer: {
    flex: 1,
    width: 350,
    // borderWidth: 1,
    // borderColor: 'black',
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#B2DED9",
    width: "50%",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    margin: 5,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 14,
  },
  loading: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
//-------------------------CARDS
  choirCardsContainer: {
    flex: 10,
    // borderWidth: 1,
    width: 350,
    // borderColor: 'green',
    alignItems: "center",
    margin: 5,
  },
  card: {
    height: 100,
    width: 330,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
  },
  loc: {
    fontWeight: "700",
  },
  choirTitle: {
    fontWeight: "700",
    color: '#586F7C',
  },
  choirDesc: {

  },
  seeMore: {
    color: '#BC9C22',
    alignSelf: 'flex-start',
  },
//-------------------------BUTTONS
  
  
  logo: {
    width: 300,
    height: 300,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
});
