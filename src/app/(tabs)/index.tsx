import CompletedItems from "@/components/CompletedItems";
import ListHeroCard from "@/components/ListHeroCard";
import PendingItemCard from "@/components/PendingItemsCard";
import TabScreenBackground from "@/components/TabScreenBg";
import { useGroceryStore } from "@/store/grocery-store";
import { useAuth, useClerk, useUser, useUserProfileModal } from "@clerk/expo";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import SignInScreen from "../(auth)/sign-in";

export default function MainScreen() {
  const { isSignedIn, isLoaded } = useAuth({ treatPendingAsSignedOut: false });
  const { user } = useUser();
  const { signOut } = useClerk();
  const { presentUserProfile } = useUserProfileModal();

  if (!isLoaded) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isSignedIn) {
    return <SignInScreen />;
  }
  const { items } = useGroceryStore();

  const pendingItems = items.filter((item) => !item.purchased);

  return (
    <FlatList
      className="flex-1 bg-background "
      data={pendingItems}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PendingItemCard item={item} />}
      contentContainerStyle={{ padding: 20, gap: 14 }}
      contentInsetAdjustmentBehavior="automatic"
      ListHeaderComponent={
        <View style={{ gap: 14, paddingTop: 20 }}>
          <TabScreenBackground />
          <ListHeroCard />
          <View className="flex-row items-center justify-between px-1">
            <Text className="text-sm font-semibold uppercase tracking-[1px] text-muted-foreground">
              Shopping items
            </Text>
            <Text className="text-sm text-muted-foreground">
              {pendingItems.length} active
            </Text>
          </View>
        </View>
      }
      ListFooterComponent={<CompletedItems />}
    />
  );
}
