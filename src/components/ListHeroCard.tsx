import { useGroceryStore } from "@/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { Text, View } from "react-native";

const ListHeroCard = () => {
  const { items } = useGroceryStore();

  const completedCount = items.filter((item) => item.purchased).length;
  const pendingCount = items.length - completedCount;
  const completionRate = items.length ? Math.round((completedCount / items.length) * 100) : 0;

  return (
    <View className="rounded-3xl bg-primary p-5">
      {/* Header row */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <View className="h-7 w-7 items-center justify-center rounded-xl bg-white/20">
            <FontAwesome6 name="basket-shopping" size={14} color="#fff" />
          </View>
          <Text className="text-sm font-semibold uppercase tracking-[1px] text-primary-foreground/70">
            Today
          </Text>
        </View>
        <View className="flex-row items-center gap-1 rounded-full bg-white/15 px-2.5 py-1">
          <FontAwesome6 name="leaf" size={10} color="#b8f0c8" />
          <Text className="text-xs font-semibold text-primary-foreground/80">
            Grocify
          </Text>
        </View>
      </View>

      <Text className="mt-2 text-3xl font-extrabold text-primary-foreground">
        Your Grocery Board
      </Text>

      {/* Stats row */}
      <View className="mt-3 flex-row gap-3">
        <View className="flex-row items-center gap-1.5">
          <FontAwesome6 name="clock" size={12} color="rgba(255,255,255,0.7)" />
          <Text className="text-sm text-primary-foreground/80">
            {pendingCount} pending
          </Text>
        </View>
        <Text className="text-sm text-primary-foreground/40">·</Text>
        <View className="flex-row items-center gap-1.5">
          <FontAwesome6 name="circle-check" size={12} color="rgba(255,255,255,0.7)" />
          <Text className="text-sm text-primary-foreground/80">
            {completedCount} done
          </Text>
        </View>
      </View>

      {/* Progress bar */}
      <View className="mt-4">
        <View className="mb-1.5 flex-row justify-between">
          <Text className="text-xs text-primary-foreground/60">Progress</Text>
          <Text className="text-xs font-bold text-primary-foreground/80">{completionRate}%</Text>
        </View>
        <View className="overflow-hidden rounded-full bg-white/25">
          <View
            className="h-2 rounded-full bg-white"
            style={{ width: `${Math.max(2, completionRate)}%` }}
          />
        </View>
      </View>
    </View>
  );
};

export default ListHeroCard;