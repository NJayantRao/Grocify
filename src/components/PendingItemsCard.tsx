import { GroceryItem, useGroceryStore } from "@/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

const priorityPillBg = {
  low: "bg-priority-low",
  medium: "bg-priority-medium",
  high: "bg-priority-high",
};

const priorityPillText = {
  low: "text-priority-low-foreground",
  medium: "text-priority-medium-foreground",
  high: "text-priority-high-foreground",
};

// Category icons using FontAwesome6
const categoryIcon: Record<string, { icon: string; color: string; bg: string }> = {
  Produce:  { icon: "carrot",        color: "#2a9a50", bg: "bg-secondary" },
  Dairy:    { icon: "droplet",       color: "#2a7abf", bg: "bg-blue-100" },
  Bakery:   { icon: "wheat-awn",     color: "#c08030", bg: "bg-amber-100" },
  Pantry:   { icon: "jar",           color: "#9060c0", bg: "bg-purple-100" },
  Snacks:   { icon: "cookie-bite",   color: "#d05030", bg: "bg-red-100" },
};

const priorityIcons: Record<string, string> = {
  low: "circle",
  medium: "triangle-exclamation",
  high: "fire",
};

const PendingItemCard = ({ item }: { item: GroceryItem }) => {
  const { removeItem, updateQuantity, togglePurchased } = useGroceryStore();
  const catInfo = categoryIcon[item.category] ?? { icon: "tag", color: "#666", bg: "bg-secondary" };

  return (
    <View className="rounded-3xl border border-border bg-card p-4">
      <View className="flex-row items-start gap-3">
        {/* Checkbox */}
        <Pressable
          className="mt-1 size-6 items-center justify-center rounded-full border-2 border-primary/50 bg-card"
          onPress={() => togglePurchased(item.id)}
        >
          <View className="size-2.5 rounded-full bg-transparent" />
        </Pressable>

        <View className="flex-1">
          <View className="flex-row items-center justify-between gap-2">
            <Text className="flex-1 text-lg font-semibold text-card-foreground">
              {item.name}
            </Text>
            {/* Priority badge */}
            <View className={`flex-row items-center gap-1 rounded-full px-2.5 py-1 ${priorityPillBg[item.priority]}`}>
              <FontAwesome6
                name={priorityIcons[item.priority]}
                size={9}
                color={item.priority === "high" ? "#c0392b" : item.priority === "medium" ? "#c07800" : "#276e3b"}
              />
              <Text className={`text-xs font-bold uppercase ${priorityPillText[item.priority]}`}>
                {item.priority}
              </Text>
            </View>
          </View>

          {/* Category chip */}
          <View className="mt-2 flex-row items-center gap-2">
            <View className={`flex-row items-center gap-1.5 rounded-full ${catInfo.bg} px-3 py-1`}>
              <FontAwesome6 name={catInfo.icon} size={10} color={catInfo.color} />
              <Text className="text-xs font-semibold text-secondary-foreground">
                {item.category}
              </Text>
            </View>
          </View>

          {/* Quantity controls */}
          <View className="mt-3 flex-row items-center gap-2">
            <Pressable
              className="h-8 w-8 items-center justify-center rounded-xl border border-border bg-muted"
              onPress={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
            >
              <FontAwesome6 name="minus" size={11} color="#3b5a4a" />
            </Pressable>

            <View className="min-w-9 items-center rounded-xl bg-secondary px-2 py-1">
              <Text className="text-center text-base font-bold text-secondary-foreground">
                {item.quantity}
              </Text>
            </View>

            <Pressable
              className="h-8 w-8 items-center justify-center rounded-xl border border-border bg-muted"
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <FontAwesome6 name="plus" size={11} color="#3b5a4a" />
            </Pressable>

            <Text className="text-xs text-muted-foreground">units</Text>
          </View>
        </View>

        {/* Delete */}
        <Pressable
          className="h-9 w-9 items-center justify-center rounded-xl bg-destructive"
          onPress={() => removeItem(item.id)}
        >
          <FontAwesome6 name="trash-can" size={13} color="#d45f58" />
        </Pressable>
      </View>
    </View>
  );
};

export default PendingItemCard;