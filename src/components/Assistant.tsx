import { AIModule } from "@sk-web-gui/ai";
import { useThemeQueries } from "@sk-web-gui/theme";

interface AssistantProps {
  questionsTitle?: string;
  questions?: string[];
}

export const Assistant: React.FC<AssistantProps> = (props) => {
  const { isMaxSmallDevice } = useThemeQueries();

  return (
    <>
      {/* Temporary disable history by providing an empty array.
      Remove to enable history again */}
      <AIModule
        sessionHistory={[]}
        {...props}
        isMobile={isMaxSmallDevice}
        showFeedback
        readmore={{
          url: "https://www.sundsvall.se/AI",
          description:
            "Hur Sundsvalls kommun använder artificiell intelligens (AI): www.sundsvall.se/AI",
        }}
      />
    </>
  );
};
