import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, RefreshControl, FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCharacters } from "../services/characterService";
import CharacterRow from "../components/CharacterRow";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function CharacterListScreen() {
  const navigation = useNavigation();

  const { data: characters, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['characters'],
    queryFn: getCharacters,
  });
  console.log('Characters fetched:', characters);

//   useFocusEffect(
//     useCallback(() => {
//       queryClient.invalidateQueries({ queryKey: ['characters'] });

//     }, [queryClient])
//   );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#eb4435" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text>Erro ao carregar personagens!</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
<FlatList
  data={characters ?? []}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("CharacterDetailsScreen", { characterId: item.id })
      }
    >
      <CharacterRow character={item} />
    </TouchableOpacity>
  )}
  showsVerticalScrollIndicator={false}
/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
