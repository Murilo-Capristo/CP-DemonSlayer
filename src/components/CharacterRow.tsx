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
          <Image source={{ uri: character.img }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{character.name}</Text>
          </View>
        </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    width: 60,
    height: 60
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
});