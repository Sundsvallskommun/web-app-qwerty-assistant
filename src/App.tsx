import {
  ColorSchemeMode,
  GuiProvider,
  defaultTheme,
  extendTheme,
} from "@sk-web-gui/react";
import { Suspense, useEffect, useMemo, useState } from "react";
import "./App.css";
import {
  useAssistantStore,
  AssistantSettings,
  AssistantInfo,
  setAssistantStoreName,
  useSessions,
} from "@sk-web-gui/ai";
import { Assistant } from "./components/Assistant";

function App({
  user,
  hash,
  assistantId,
  fontBase,
  topSpace,
  bottomSpace,
  leftSpace,
  rightSpace,
  questionsTitle,
  questions,
}: {
  user?: string | null;
  hash?: string | null;
  assistantId?: string | null;
  fontBase?: string;
  topSpace?: string;
  bottomSpace?: string;
  leftSpace?: string;
  rightSpace?: string;
  questionsTitle?: string;
  questions?: string[];
}) {
  const [setSettings, setInfo] = useAssistantStore((state) => [
    state.setSettings,
    state.setInfo,
  ]);
  const newSession = useSessions((state) => state.newSession);

  const [loaded, setLoaded] = useState<boolean>(false);

  const units = useMemo(
    () => ({
      assistanttop: topSpace || "0px",
      assistantbottom: bottomSpace || "0px",
      assistantleft: leftSpace || "0px",
      assistantright: rightSpace || "0px",
    }),
    [topSpace, bottomSpace, leftSpace, rightSpace]
  );

  const theme = useMemo(
    () =>
      extendTheme({
        spacing: { ...defaultTheme.spacing, ...units },
      }),
    [units]
  );

  useEffect(() => {
    const settings: AssistantSettings = {
      user: user || "",
      assistantId: assistantId || "",
      stream: import.meta.env.VITE_STREAM_DEFAULT,
      hash: hash || "",
      apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
      app: import.meta.env.VITE_APPLICATION,
    };

    const info: AssistantInfo = {
      name: "Qwerty",
      shortName: "AI",
      title: "Din AI-guide på intranätet.",
      description:
        "Din personliga AI-guide på intranätet. Svarar med glädje på frågor som rör din anställning på Sundsvalls Kommun.",
      avatar: `${import.meta.env.BASE_URL}assets/assistanticon.png`,
    };

    setSettings(settings);
    setInfo(info);
    setAssistantStoreName(assistantId);
    newSession();

    setLoaded(true);
  }, [user, hash, assistantId, setSettings, setInfo, newSession]);

  return (
    <GuiProvider
      theme={theme}
      colorScheme={ColorSchemeMode.Light}
      htmlFontSize={fontBase ? parseFloat(fontBase) : 16}
    >
      <Suspense fallback="loading">
        {loaded && (
          <Assistant questions={questions} questionsTitle={questionsTitle} />
        )}
      </Suspense>
    </GuiProvider>
  );
}

export default App;
