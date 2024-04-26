import {
  Accordion,
  Button,
  cx,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Link,
  Spinner,
} from "@sk-web-gui/react";
import { useEffect, useRef, useState } from "react";
import { ChatHistory } from "../interfaces/history";
import sanitized from "../services/sanitizer-service";
import { AssistantAvatar } from "./AssistantAvatar";
import { ChatWelcome } from "./ChatWelcome";
import { UserAvatar } from "./UserAvatar";
import { MarkdownRendered } from "./MarkdownRendered";
import { useAppContext } from "../context/app.context";
import useChat from "../hooks/useChat";
import { Feedback } from "./Feedback";

export const ChatWindow = ({
  sendQuery,
}: {
  sendQuery: (q: string) => void;
}) => {
  const showReferences = true;
  const [query, setQuery] = useState("");
  const { history, done } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [lastMessage, setLastMessage] = useState("");
  const { assistantId } = useAppContext();
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const timeout = useRef(setTimeout(() => {}));
  const showHistory = history.length > 0;

  useEffect(() => {
    if (!done) {
      timeout.current = setTimeout(() => {
        setShowLoading(true);
      }, 3500);
    } else {
      clearTimeout(timeout.current);
      setShowLoading(false);
    }
  }, [done]);

  const handleQuerySubmit = (s?: string) => {
    const q = s || query;
    if (q.trim() !== "") {
      sendQuery(q);
      setQuery("");
    }
  };

  useEffect(() => {
    if (done) {
      const last = history?.at(-1);
      if (last) {
        const lastText =
          last.origin === "assistant" || last.origin === "system"
            ? `${import.meta.env.VITE_ASSISTANT_NAME} svarar: ${last?.text}`
            : last?.text;
        setLastMessage(lastText);
      }
    }
  }, [done]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.parentElement.scrollTop = scrollRef.current.offsetTop;
    }
  }, [history]);

  const messageIsAriaHidden = (idx, history, done, msg) =>
    idx === history.length - 1 && msg.origin === "assistant" ? !done : false;

  return (
    <>
      <div
        className="flex-grow p-[16px] pb-[24px] bg-background-content flex flex-col overflow-y-scroll"
        aria-live="polite"
        aria-atomic={false}
      >
        {!showHistory ? (
          <ChatWelcome
            setQuery={setQuery}
            handleQuerySubmit={handleQuerySubmit}
            inputRef={inputRef}
          />
        ) : (
          <div tabIndex={0}>
            {history.map((msg, idx) => (
              <div
                key={`history-${idx}`}
                className="mb-24 flex items-start gap-12"
              >
                <div aria-hidden={true}>
                  {msg.origin === "assistant" ? (
                    <AssistantAvatar />
                  ) : msg.origin === "system" ? (
                    <AssistantAvatar />
                  ) : (
                    <UserAvatar />
                  )}
                </div>
                {idx === history.length - 1 &&
                msg.origin === "assistant" &&
                showLoading ? (
                  <div className="sr-only" aria-live="polite">
                    Inväntar svar
                  </div>
                ) : null}
                <div
                  aria-hidden={messageIsAriaHidden(idx, history, done, msg)}
                  className="max-w-[85%]"
                >
                  {msg.origin === "assistant" || msg.origin === "system" ? (
                    <strong>{import.meta.env.VITE_ASSISTANT_NAME}</strong>
                  ) : (
                    <strong>Du</strong>
                  )}
                  <div
                    className={cx(
                      msg.origin === "system" ? `text-error` : null
                    )}
                  >
                    <MarkdownRendered
                      text={msg.text}
                      messageId={msg.id}
                      hideElements={messageIsAriaHidden(
                        idx,
                        history,
                        done,
                        msg
                      )}
                    />
                  </div>
                  {showReferences && msg.references?.length > 0 ? (
                    <Accordion size="sm" className="mt-20 p-0">
                      <Accordion.Item
                        className="bg-gray-100 border-1 border-gray-100 rounded-12 pl-20 pr-12 dark:text-black"
                        header={
                          <span className="dark:text-black">
                            Kunskapskällor ({msg.references?.length || 0})
                          </span>
                        }
                      >
                        <ul aria-label="Kunskapskällor">
                          {msg.references?.map((r, i) => (
                            <li
                              className="max-w-full w-full my-8 rounded-6 whitespace-normal text-base"
                              key={`ref-${i}-${idx}`}
                            >
                              <small>
                                <Link
                                  external
                                  href={r.url}
                                  className="dark:text-black"
                                >
                                  {r.title}
                                </Link>
                              </small>
                            </li>
                          ))}
                        </ul>
                      </Accordion.Item>
                    </Accordion>
                  ) : null}
                  {done ? (
                    <Feedback
                      history={history}
                      msg={msg}
                      idx={idx}
                      scrollRef={scrollRef}
                      inputRef={inputRef}
                    />
                  ) : null}
                </div>
              </div>
            ))}
            <div aria-live={"polite"} className="sr-only">
              <MarkdownRendered
                tabbable={false}
                text={sanitized(lastMessage)}
              />
            </div>
          </div>
        )}
        <div ref={scrollRef}></div>
      </div>
      <div className="mx-md border-0 border-t-1 border-solid border-gray-100 h-[64px] flex items-center justify-around gap-sm bg-background-content flex-shrink-0">
        <FormControl id="query" className="w-4/5">
          <FormLabel className="sr-only">
            {showHistory
              ? "Ställ en följdfråga"
              : `Ställ en fråga till ${import.meta.env.VITE_ASSISTANT_NAME}`}
          </FormLabel>
          <Input
            ref={inputRef}
            type="text"
            value={query}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                handleQuerySubmit();
              }
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
          />
        </FormControl>

        <Button
          className="p-8 hover:opacity-90"
          disabled={!assistantId || !query || query.trim() === ""}
          onClick={() => {
            handleQuerySubmit(query);
            setQuery("");
            inputRef.current?.focus();
          }}
          size="md"
        >
          {done ? <span>Skicka</span> : <Spinner size={2} />}
        </Button>
      </div>
    </>
  );
};
