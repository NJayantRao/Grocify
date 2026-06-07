import InsightsCategorySection from "@/components/InsightsCategory";
import InsightsCompletedSection from "@/components/InsightsCompleted";
import InsightsPrioritySection from "@/components/InsightsPriorities";
import InsightsStatsSection from "@/components/InsightsStats";
import TabScreenBackground from "@/components/TabScreenBg";
import UserProfileCard from "@/components/UserProfileCard";
import { ScrollView } from "react-native";

const InsightsScreen = () => {
  return (
    <>
      <ScrollView
        className="flex-1 bg-background py-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, gap: 14 }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <TabScreenBackground />
        <UserProfileCard />
        <InsightsStatsSection />
        <InsightsCategorySection />
        <InsightsPrioritySection />
        <InsightsCompletedSection />
      </ScrollView>
    </>
  );
};

export default InsightsScreen;
