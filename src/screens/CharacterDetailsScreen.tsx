import { View, StyleSheet, Text, Image, ScrollView, Alert } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"    


import { useRoute } from "@react-navigation/native"
import { useState } from "react"
import { Character } from "../components/CharacterRow"

export default function CharacterDetailsScreen() {

    const route = useRoute();
    const {character} = route.params as { character: Character };

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
        color: "#b535eb",
    },
    infoContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 16,
    },
    info: {
        fontSize: 16,
        color: "#333",
        fontWeight: "bold",
    },
    descriptionContainer: {
        flex: 1,
    },
    description: {
        fontSize: 16,
        color: "#555",
        marginBottom: 16,
        lineHeight: 22,
    },
    quote: {
        fontSize: 18,
        fontStyle: "italic",
        color: "#b535eb",   
        textAlign: "center",     
    },
})