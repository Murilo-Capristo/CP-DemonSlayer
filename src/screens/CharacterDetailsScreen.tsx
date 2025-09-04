import { View, StyleSheet, Text, Image, ScrollView, Alert, ActivityIndicator } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"    


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

    return (
        <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
            <View>
                <Image 
                    source={{ uri: character.img }} 
                    style={{ width: '100%', height: 300, borderRadius: 8 }}
                    />
            </View>

            <View style={styles.nameContainer}>
                {/* Name */}
                <Text style={styles.name}>{character.name}</Text>
            </View>

                {/* Infos*/}
            <View style={styles.infoContainer}>
                <Text style={styles.info}>
                Idade: <Text style={{color: "red"}}>{character.age}</Text>
                </Text>
                <Text style={styles.info}>
                Raça: <Text style={{color: "red"}}>{character.race}</Text>
                </Text>
                <Text style={styles.info}>
                Gênero: <Text style={{color: "red"}}>{character.gender}</Text>
                </Text>                
            </View>

            {/* Desc + Fala*/}
            <ScrollView
             style={styles.descriptionContainer}
             contentContainerStyle={{ paddingBottom: 20 }}
             >
                <Text style={styles.description}>{character.description}</Text>
                <Text style={styles.quote}>"{character.quote}"</Text>
            </ScrollView>
        </SafeAreaView>
        </SafeAreaProvider>
    );
}
const styles = StyleSheet.create({
    nameContainer: {
        marginTop: 16,
        marginBottom: 8,
        alignItems: "center",
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000000",
    },
    infoContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 16,
    },
    info: {
        fontSize: 16,
        color: "#000000",
        fontWeight: "bold",
    },
    descriptionContainer: {
        flex: 1,
    },
    description: {
        fontSize: 16,
        color: "#000000",
        marginBottom: 16,
        textAlign: "justify",
        },
    quote: {
        fontSize: 18,
        fontStyle: "italic",
        backgroundColor: "#424242",
        borderRadius: 8,
        color: "#ffffff",   
        textAlign: "center",     
    },
})