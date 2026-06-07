import { useGroceryStore } from "@/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function InsightsStatsSection() {
  const { items } = useGroceryStore();

  const totalItems = items.length;
  const completedItems = items.filter((item) => item.purchased).length;
  const pendingItems = totalItems - completedItems;
  const completionRate = totalItems
    ? Math.round((completedItems / totalItems) * 100)
    : 0;
  const highPriority = items.filter(
    (i) => !i.purchased && i.priority === "high"
  ).length;

  const stats = [
    {
      icon: "clock",
      label: "Pending",
      value: pendingItems,
      accent: "bg-amber-500",
    },
    {
      icon: "circle-check",
      label: "Done",
      value: completedItems,
      accent: "bg-primary",
    },
    {
      icon: "fire",
      label: "Urgent",
      value: highPriority,
      accent: "bg-red-500",
    },
  ];

  return (
    <>
      <View className="flex-row gap-2">
        {stats.map((stat) => (
          <View
            key={stat.label}
            className="flex-1 rounded-3xl border border-border bg-card p-4"
          >
            <View
              className={`h-8 w-8 items-center justify-center rounded-xl ${stat.accent}`}
            >
              <FontAwesome6 name={stat.icon} size={15} color="#fff" />
            </View>
            <Text className="mt-3 text-xs uppercase tracking-[1px] text-muted-foreground">
              {stat.label}
            </Text>
            <Text className="mt-1 text-3xl font-extrabold text-foreground">
              {stat.value}
            </Text>
          </View>
        ))}
      </View>

      {/* Completion rate card */}
      <View className="rounded-3xl border border-border bg-card p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <FontAwesome6 name="chart-line" size={14} color="#2a9a50" />
            <Text className="text-sm font-semibold text-foreground">
              Completion Rate
            </Text>
          </View>
          <View className="rounded-full bg-secondary px-2.5 py-1">
            <Text className="text-sm font-bold text-primary">
              {completionRate}%
            </Text>
          </View>
        </View>
        <View className="mt-3 overflow-hidden rounded-full bg-secondary">
          <View
            className="h-3 rounded-full bg-ring"
            style={{ width: `${Math.max(2, completionRate)}%` }}
          />
        </View>
        <Text className="mt-2 text-xs text-muted-foreground">
          {completedItems} of {totalItems} items completed
        </Text>
      </View>
    </>
  );
}
