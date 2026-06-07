import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import * as Sentry from "@sentry/react-native";
import dotenv from "dotenv";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";

import "../../global.css";

dotenv.config();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

export default Sentry.wrap(function RootLayout() {
  const colorScheme = useColorScheme();

  Sentry.init({
    dsn: process.env.EXPO_PUBLIC_SENTRY_DSN!,

    integrations: [Sentry.feedbackIntegration()],
  });

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <KeyboardProvider>
        {/* <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}> */}
        <Stack screenOptions={{ headerShown: false }} />
        {/* </ThemeProvider> */}
      </KeyboardProvider>
    </ClerkProvider>
  );
});
