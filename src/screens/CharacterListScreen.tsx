import { View, StyleSheet, Text, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, Alert, Pressable } from "react-native"
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";
import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCharacters } from "../services/characterService";
import CharacterRow, { Character } from "../components/CharacterRow";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function CharacterListScreen() {
    const navigation = useNavigation();
    const queryClient = useQueryClient();

    const { data: characters, isLoading, isError, refetch, isFetching } = useQuery({
        queryKey: ['characters'],
        queryFn: getCharacters,
    });

    useFocusEffect(
        useCallback(() => {
            queryClient.invalidateQueries({ queryKey: ['characters'] });
        }, [queryClient])
    );

        if (isLoading) {
        return(
            <View style={styles.center}>
                <ActivityIndicator size='large' color="#eb4435" />
            </View>
        )
    }

    if (isError) {
        return(
           <View style={styles.center}>
                <Text>Erro ao carregar Personagens!</Text>
            </View>
        )
    }

    return(
        <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
            <SwipeListView
                style={styles.list}
                data={characters}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate("CharacterDetailsScreen", { characterId: item.id })}>
                        <CharacterRow character={item} />
                    </TouchableOpacity>
                )}

                // Pull to Refresh
                refreshControl={
                    <RefreshControl
                        refreshing={isFetching}
                        onRefresh={refetch}
                        colors={["#eb4435"]}
                        tintColor="#eb4435"
                    />
                }
            />
        </SafeAreaView>
        </SafeAreaProvider>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    list: {
        flex: 1,
        marginTop: 10,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})