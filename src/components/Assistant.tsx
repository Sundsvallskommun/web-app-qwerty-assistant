import { AIModule } from "@sk-web-gui/ai";
import { useThemeQueries } from "@sk-web-gui/theme";

interface AssistantProps {
  questionsTitle?: string;
  questions?: string[];
}

export const Assistant: React.FC<AssistantProps> = (props) => {
  const { isMaxSmallDevice } = useThemeQueries();

  return (
    <div>
      {/* Temporary disable history by providing an empty array.
      Remove to enable history again */}
      <AIModule
        sessionHistory={[]}
        {...props}
        isMobile={isMaxSmallDevice}
        showFeedback
      />
    </div>
  );
};
