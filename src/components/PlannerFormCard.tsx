import {
  GroceryCategory,
  GroceryPriority,
  useGroceryStore,
} from "@/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

const categories: GroceryCategory[] = [
  "Produce",
  "Dairy",
  "Bakery",
  "Pantry",
  "Snacks",
];
const priorities: GroceryPriority[] = ["low", "medium", "high"];

const categoryMeta: Record<string, { icon: string; emoji: string }> = {
  Produce: { icon: "carrot", emoji: "🥦" },
  Dairy: { icon: "droplet", emoji: "🥛" },
  Bakery: { icon: "wheat-awn", emoji: "🍞" },
  Pantry: { icon: "jar", emoji: "🫙" },
  Snacks: { icon: "cookie-bite", emoji: "🍪" },
};

const priorityMeta: Record<string, { icon: string; label: string }> = {
  low: { icon: "seedling", label: "Low" },
  medium: { icon: "triangle-exclamation", label: "Medium" },
  high: { icon: "fire", label: "High" },
};

const PlannerFormCard = () => {
  const { error, addItem } = useGroceryStore();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [category, setCategory] = useState<GroceryCategory>("Produce");
  const [priority, setPriority] = useState<GroceryPriority>("medium");

  const canCreate = name.trim().length > 0;

  const handleQuantityChange = (value: string) => {
    setQuantity(value.replace(/[^0-9]/g, ""));
  };

  const createItem = async () => {
    await addItem({
      name: name.trim(),
      category,
      priority,
      quantity: Number(quantity),
    });
    setName("");
    setQuantity("1");
    setCategory("Produce");
    setPriority("medium");
  };

  return (
    <View className="rounded-3xl border border-border bg-card p-4">
      {/* Item name */}
      <Text className="text-sm font-semibold text-foreground">Item name</Text>
      <View className="mt-2 flex-row items-center rounded-2xl border border-border bg-muted px-4 py-3">
        <FontAwesome6 name="basket-shopping" size={13} color="#5b7567" />
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="e.g. Blueberries, Milk, Bread…"
          className="ml-3 flex-1 text-base text-foreground"
          placeholderTextColor="#8aa397"
        />
        {name.length > 0 && (
          <Pressable onPress={() => setName("")}>
            <FontAwesome6 name="circle-xmark" size={16} color="#8aa397" />
          </Pressable>
        )}
      </View>

      {/* Quantity */}
      <Text className="mt-4 text-sm font-semibold text-foreground">
        Quantity
      </Text>
      <View className="mt-2 flex-row items-center gap-3">
        <Pressable
          className="h-11 w-11 items-center justify-center rounded-xl border border-border bg-muted"
          onPress={() => setQuantity(String(Math.max(1, Number(quantity) - 1)))}
        >
          <FontAwesome6 name="minus" size={12} color="#3b5a4a" />
        </Pressable>
        <View className="flex-1 rounded-2xl border border-border bg-muted px-4 py-3">
          <TextInput
            value={quantity}
            onChangeText={handleQuantityChange}
            keyboardType="number-pad"
            placeholder="1"
            placeholderTextColor="#8aa397"
            className="text-center text-base font-bold text-foreground"
          />
        </View>
        <Pressable
          className="h-11 w-11 items-center justify-center rounded-xl border border-border bg-muted"
          onPress={() => setQuantity(String(Number(quantity) + 1))}
        >
          <FontAwesome6 name="plus" size={12} color="#3b5a4a" />
        </Pressable>
      </View>

      {/* Category */}
      <Text className="mt-4 text-sm font-semibold text-foreground">
        Category
      </Text>
      <View className="mt-2 flex-row flex-wrap gap-2">
        {categories.map((option) => {
          const active = option === category;
          const meta = categoryMeta[option];
          return (
            <Pressable
              key={option}
              onPress={() => setCategory(option)}
              className={`flex-row items-center gap-1.5 rounded-full px-3.5 py-2 ${active ? "bg-primary" : "bg-secondary"}`}
            >
              <FontAwesome6
                name={meta.icon}
                size={11}
                color={active ? "#fff" : "#486856"}
              />
              <Text
                className={`text-sm font-semibold ${active ? "text-primary-foreground" : "text-secondary-foreground"}`}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Priority */}
      <Text className="mt-4 text-sm font-semibold text-foreground">
        Priority
      </Text>
      <View className="mt-2 flex-row gap-2">
        {priorities.map((option) => {
          const active = option === priority;
          const meta = priorityMeta[option];
          return (
            <Pressable
              key={option}
              onPress={() => setPriority(option)}
              className={`flex-1 flex-row items-center justify-center gap-1.5 rounded-2xl py-2.5 ${active ? "bg-primary" : "bg-secondary"}`}
            >
              <FontAwesome6
                name={meta.icon}
                size={12}
                color={active ? "#ffffff" : "#486856"}
              />
              <Text
                className={`text-sm font-semibold capitalize ${active ? "text-primary-foreground" : "text-secondary-foreground"}`}
              >
                {meta.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Submit */}
      <Pressable
        className={`mt-5 flex-row items-center justify-center gap-2 rounded-2xl py-3.5 ${canCreate ? "bg-primary" : "bg-muted"}`}
        onPress={createItem}
        disabled={!canCreate}
      >
        <FontAwesome6
          name="circle-plus"
          size={16}
          color={canCreate ? "#ffffff" : "#7a9386"}
        />
        <Text
          className={`text-base font-semibold ${canCreate ? "text-primary-foreground" : "text-muted-foreground"}`}
        >
          Add to Grocery List
        </Text>
      </Pressable>

      {error && (
        <View className="mt-3 flex-row items-center gap-2 rounded-2xl border border-destructive bg-destructive px-3 py-2">
          <FontAwesome6 name="circle-exclamation" size={14} color="#d45f58" />
          <Text className="text-sm font-medium text-destructive-foreground">
            {error}
          </Text>
        </View>
      )}
    </View>
  );
};
export default PlannerFormCard;
