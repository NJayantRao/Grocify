import { useGroceryStore } from "@/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export default function InsightsCompletedSection() {
  const { clearPurchased, items } = useGroceryStore();
  const count = items.filter((i) => i.purchased).length;

  return (
    <Pressable
      className="flex-row items-center justify-center gap-2 rounded-2xl bg-primary py-3.5"
      onPress={clearPurchased}
    >
      <FontAwesome6 name="broom" size={15} color="#fff" />
      <Text className="text-base font-semibold text-primary-foreground">
        Clear {count > 0 ? `${count} ` : ""}Completed Items
      </Text>
    </Pressable>
  );
}
