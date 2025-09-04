import { View, StyleSheet, Text, Image, ScrollView, ActivityIndicator, ImageBackground } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"    
import background_demon from '../../assets/background-demon.png'
import background_human from '../../assets/background-human.png'


import { useRoute } from "@react-navigation/native"
import { Character } from "../components/CharacterRow"
import { useEffect, useState } from "react";
import axios from "axios";

export default function CharacterDetailsScreen() {
  const route = useRoute();
  const { characterId } = route.params as { characterId: number };
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCharacter() {
      try {
        setLoading(true);
        const response = await axios.get(`https://www.demonslayer-api.com/api/v1/characters?id=${characterId}`);
        setCharacter((response.data.content as Character[])[0]);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchCharacter();
  }, [characterId]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#b535eb" />
      </View>
    );
  }

  if (error || !character) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Erro ao carregar personagem.</Text>
      </View>
    );
  }
const backgroundImage = character?.race === "Human" ? background_human : background_demon;

 return (
          <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">

    <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Image 
            source={{ uri: character.img }}
            style={styles.characterImage}
            resizeMode="contain"
          />

          <View style={styles.infoCard}>
            <Text style={styles.name}>{character.name}</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Idade: <Text style={styles.value}>{character.age}</Text></Text>
              <Text style={styles.label}>Raça: <Text style={styles.value}>{character.race}</Text></Text>
              <Text style={styles.label}>Gênero: <Text style={styles.value}>{character.gender}</Text></Text>
            </View>

            <Text style={styles.description}>{character.description}</Text>
            <Text style={styles.quote}>"{character.quote}"</Text>
          </View>
        </ScrollView>
    </SafeAreaView>
          </ImageBackground>

  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  characterImage: {
    width: '80%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: -30, 
    zIndex: 1,
  },
  infoCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    zIndex: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    height: "100%",
  },
  name: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    marginTop: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: '#cacaca',
    borderRadius: 8,
    padding: 4,
  },
  value: {
    color: 'red',
    fontWeight: 'normal',
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 12,
  },
  quote: {
    fontStyle: 'italic',
    backgroundColor: '#424242',
    borderRadius: 8,
    color: '#fff',
    textAlign: 'center',
    padding: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});