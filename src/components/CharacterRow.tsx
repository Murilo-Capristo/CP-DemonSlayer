import { View, Text, Image, StyleSheet } from "react-native";

export type Character = {
  id: number;
  img: string;
  name: string;
  age: number;
  race: string;
  gender: string;
  description: string;
  quote: string;
};

export default function CharacterRow({ character }: { character: Character }) {
  return(
        <View style={styles.container}>

          <View>
              <Image source={{ uri: character.img }} style={styles.image} />
          </View>
          
          <View style={styles.textContainer}>
            <Text style={styles.name}>{character.name}</Text>
          </View>

        </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#ebebeb",
    marginVertical: 8,
    borderRadius: 8,
    justifyContent: "space-around",
  },
  image: {
    width: 70,
    height: 100,
    margin: 4,
    marginLeft: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
});