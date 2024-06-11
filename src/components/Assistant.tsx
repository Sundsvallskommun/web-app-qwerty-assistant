import { AIModule } from "@sk-web-gui/ai";

interface AssistantProps {
  questionsTitle?: string;
  questions?: string[];
}

export const Assistant: React.FC<AssistantProps> = (props) => {
  return (
    <div>
      <AIModule {...props} showFeedback />
    </div>
  );
};
