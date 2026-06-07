import { FontAwesome6 } from "@expo/vector-icons";
import { useClerk, useUser } from "@clerk/expo";
import { Image, Pressable, Text, View } from "react-native";

const UserProfileCard = () => {
  const { signOut } = useClerk();
  const { user } = useUser();

  const email = user?.primaryEmailAddress?.emailAddress;
  const displayName = user?.fullName || email?.split("@")[0];

  return (
    <View className="rounded-3xl border border-border bg-card p-4">
      <View className="flex-row items-center gap-3">
        {/* Avatar */}
        <View className="size-14 overflow-hidden rounded-2xl border-2 border-primary/20">
          {user?.imageUrl ? (
            <Image source={{ uri: user.imageUrl }} style={{ width: "100%", height: "100%" }} />
          ) : (
            <View className="flex-1 items-center justify-center bg-secondary">
              <FontAwesome6 name="user" size={22} color="#2a9a50" />
            </View>
          )}
        </View>

        <View className="flex-1">
          <View className="flex-row items-center gap-1.5">
            <FontAwesome6 name="circle-user" size={10} color="#999" />
            <Text className="text-xs uppercase tracking-[1px] text-muted-foreground">
              Signed in
            </Text>
          </View>
          <Text className="mt-0.5 text-lg font-bold text-foreground">{displayName}</Text>
          <Text className="text-sm text-muted-foreground">{email}</Text>
        </View>

        {/* Sign out */}
        <Pressable
          onPress={() => signOut()}
          className="h-10 w-10 items-center justify-center rounded-xl bg-destructive"
        >
          <FontAwesome6 name="right-from-bracket" size={14} color="#d45f58" />
        </Pressable>
      </View>
    </View>
  );
};

export default UserProfileCard;