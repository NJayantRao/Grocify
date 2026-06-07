import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import * as Sentry from "@sentry/react-native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";

import "../../global.css";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

// Initialize Sentry BEFORE rendering (not inside component)
const sentryDsn = process.env.EXPO_PUBLIC_SENTRY_DSN;
if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,
    integrations: [Sentry.feedbackIntegration()],
  });
}

export default Sentry.wrap(function RootLayout() {
  const colorScheme = useColorScheme();

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
