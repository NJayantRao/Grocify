import { useGroceryStore } from "@/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

const CompletedItems = () => {
  const { removeItem, togglePurchased, items, clearPurchased } =
    useGroceryStore();
  const completedItems = items.filter((item) => item.purchased);

  if (!completedItems.length) return null;

  return (
    <View className="mt-3 rounded-3xl border border-border bg-secondary p-4">
      <View className="flex-row items-center justify-between mb-1">
        <View className="flex-row items-center gap-2">
          <FontAwesome6 name="circle-check" size={14} color="#2a9a50" />
          <Text className="text-sm font-semibold uppercase tracking-[1px] text-secondary-foreground">
            Completed ({completedItems.length})
          </Text>
        </View>
        <Pressable
          onPress={clearPurchased}
          className="flex-row items-center gap-1.5 rounded-xl bg-primary/10 px-2.5 py-1"
        >
          <FontAwesome6 name="trash-can" size={10} color="#2a9a50" />
          <Text className="text-xs font-semibold text-primary">Clear all</Text>
        </Pressable>
      </View>

      {completedItems.map((item) => (
        <View
          key={item.id}
          className="mt-3 flex-row items-center justify-between rounded-2xl border border-border bg-card px-3 py-2"
        >
          <View className="flex-row items-center gap-2 flex-1">
            <Pressable
              onPress={() => togglePurchased(item.id)}
              className="h-6 w-6 items-center justify-center rounded-full bg-primary"
            >
              <FontAwesome6 name="check" size={11} color="#ffffff" />
            </Pressable>
            <Text className="flex-1 text-base text-muted-foreground line-through">
              {item.name}
            </Text>
          </View>
          <Pressable
            onPress={() => removeItem(item.id)}
            className="h-8 w-8 items-center justify-center rounded-xl bg-destructive"
          >
            <FontAwesome6 name="trash-can" size={11} color="#d45f58" />
          </Pressable>
        </View>
      ))}
    </View>
  );
};
export default CompletedItems;
