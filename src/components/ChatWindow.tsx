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

export const ChatWindow = ({
  history,
  sendQuery,
  done,
}: {
  history: ChatHistory;
  sendQuery: (q: string) => void;
  done: boolean;
}) => {
  const showReferences = true;
  const [query, setQuery] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [lastMessage, setLastMessage] = useState("");

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

  return (
    <>
      <div className="flex-grow p-[16px] pb-[24px] bg-white flex flex-col overflow-y-scroll">
        {history.length < 2 ? (
          <ChatWelcome
            setQuery={setQuery}
            handleQuerySubmit={handleQuerySubmit}
          />
        ) : (
          <div tabIndex={0}>
            {history
              .filter((msg) => msg.text !== "")
              .map((msg, idx) => (
                <div
                  key={`history-${idx}`}
                  className="mb-24 flex items-start gap-12"
                >
                  <div aria-hidden>
                    {msg.origin === "assistant" ? (
                      <AssistantAvatar />
                    ) : msg.origin === "system" ? (
                      <AssistantAvatar />
                    ) : (
                      <UserAvatar />
                    )}
                  </div>
                  <div>
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
                      <MarkdownRendered text={sanitized(msg.text)} />
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
      <div className="border-0 border-t-1 border-solid border-gray-100 h-[64px] flex items-center justify-center gap-md bg-white flex-shrink-0">
        <FormControl id="query" className="w-4/5">
          <FormLabel className="sr-only">
            {history.length < 2
              ? `Ställ en fråga till ${import.meta.env.VITE_ASSISTANT_NAME}`
              : "Ställ en följdfråga"}
          </FormLabel>
          <Input
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
          aria-label="Skicka fråga"
          color={"primary"}
          variant={done ? "primary" : "tertiary"}
          className="p-8 hover:opacity-90"
          onClick={() => handleQuerySubmit()}
        >
          {done ? (
            <Icon name="send-horizontal" size={20} />
          ) : (
            <Spinner size={2} />
          )}
        </Button>
      </div>
    </>
  );
};
