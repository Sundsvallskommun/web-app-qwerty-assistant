import { cx } from "@sk-web-gui/react";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/app.context";
import {
  AssistantPublic,
  PaginatedResponseAssistantPublic,
  PaginatedResponseSessionMetadataPublic,
  SessionPublic,
} from "../data-contracts/data-contracts";
import useChat from "../hooks/useChat";
import {
  getAssistantSessionById,
  getAssistantSessions,
  getAssistants,
} from "../services/assistant-service";
import {
  hasExtendedFunctionality,
  isMaximizable,
} from "../services/featureflag-service";
import { ChatHeader } from "./ChatHeader";
import { ChatSidebar } from "./ChatSidebar";
import { ChatWindow } from "./ChatWindow";

export const Assistant = () => {
  const { assistant, assistantId, sessionId, setSessionId, user, hash } =
    useAppContext();
  const [open, setOpen] = useState(false);
  const { history, sendQuery, addHistoryEntry, clearHistory, done } = useChat();
  const [fullscreen, setFullscreen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<SessionPublic>(null);
  const [assistants, setAssistants] = useState<AssistantPublic[]>([]);
  const [sessions, setSessions] = useState([]);

  const refreshSessions = (a: AssistantPublic) => {
    if (hasExtendedFunctionality()) {
      getAssistantSessions(a.id, user, hash)
        .then((res: PaginatedResponseSessionMetadataPublic) => {
          setSessions(res.items);
        })
        .catch(() => {
          console.error("Error when fetching session");
        });
    }
  };

  useEffect(() => {
    if (hasExtendedFunctionality() && user && assistantId && hash) {
      getAssistants(assistantId, user, hash)
        .then((res: PaginatedResponseAssistantPublic) => {
          setAssistants(res.items);
        })
        .catch(() => {
          console.error("Error when fetching assistants");
        });
    }
  }, [user, assistant, hash]);

  useEffect(() => {
    if (
      hasExtendedFunctionality() &&
      assistantId &&
      sessionId &&
      sessionId !== selectedSession?.id
    ) {
      getAssistantSessionById(assistantId, sessionId, user, hash)
        .then((res: SessionPublic) => {
          if (res) {
            setSelectedSession(res);
          }
        })
        .catch((e) => {
          console.error("Error when fetching session.");
        });
    }
  }, [sessionId]);

  useEffect(() => {
    if (fullscreen && assistant?.id) {
      setTimeout(() => {
        refreshSessions(assistant);
      }, 1000);
    }
  }, [done, assistant]);

  useEffect(() => {
    clearHistory();
    setSessionId(selectedSession?.id);
    if (selectedSession) {
      selectedSession?.messages?.slice().forEach((m) => {
        const answerId = crypto.randomUUID();
        const questionId = crypto.randomUUID();
        addHistoryEntry("user", m.question, questionId);
        addHistoryEntry(
          "assistant",
          m.answer,
          answerId,
          m.references?.map((r) => ({
            title: r.metadata.title || r.metadata.url,
            url: r.metadata.url,
          })) || []
        );
      });
    }
  }, [selectedSession]);

  return (
    <>
      <div
        className={cx(
          `fixed bg-white rounded-tl-16 right-0 bottom-0 shadow-2xl transition-all flex flex-row max-h-full sm:max-h-[95vh] z-[20000]`,
          open
            ? fullscreen
              ? "w-full h-full max-h-screen"
              : "w-full h-full sm:w-[42.5rem] sm:h-[63.2rem]"
            : "w-full sm:w-[30.6rem] sm:h-62"
        )}
      >
        {isMaximizable() && open && fullscreen && (
          <ChatSidebar
            assistants={assistants}
            sessions={sessions}
            setSessions={setSessions}
            setSelectedSession={setSelectedSession}
          />
        )}
        <div
          className={cx(
            `max-h-full flex flex-col justify-between`,
            open
              ? fullscreen
                ? "w-full h-full max-h-screen"
                : "w-full h-full"
              : "w-full h-full"
          )}
        >
          <ChatHeader
            fullscreen={fullscreen}
            setFullscreen={setFullscreen}
            open={open}
            setOpen={setOpen}
          />

          {open ? (
            <>
              <ChatWindow sendQuery={sendQuery} />
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};
