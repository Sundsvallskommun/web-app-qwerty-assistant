import { Button, Icon, cx } from "@sk-web-gui/react";
import {
  AssistantPublic,
  PaginatedResponseSessionMetadataPublic,
  SessionPublic,
} from "../data-contracts/data-contracts";
import { getAssistantSessions } from "../services/assistant-service";
import { useAppContext } from "../context/app.context";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { isEarlier, isToday, isYesterday } from "../services/date-service";

export const ChatSidebar = ({
  assistants,
  sessions,
  setSessions,
  setSelectedSession,
}: {
  assistants: AssistantPublic[];
  sessions: SessionPublic[];
  setSessions: (s: SessionPublic[]) => void;
  setSelectedSession: (s: SessionPublic | null) => void;
}) => {
  const { assistant, setAssistant, setSessionId, user, hash } = useAppContext();
  const [todaysSessions, setTodaysSessions] = useState([]);
  const [yesterdaysSessions, setYesterdaysSessions] = useState([]);
  const [olderSessions, setOlderSessions] = useState([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setTodaysSessions(sessions.filter((s) => isToday(s.created_at)));
    setYesterdaysSessions(sessions.filter((s) => isYesterday(s.created_at)));
    setOlderSessions(sessions.filter((s) => isEarlier(s.created_at)));
  }, [sessions]);

  const sessionList = (ss: SessionPublic[]) => (
    <>
      <div className="flex flex-col gap-12 items-start">
        {ss
          .slice(-5)
          .reverse()
          .map((s: SessionPublic) => (
            <div
              key={s.id}
              className="flex items-center gap-4 cursor-pointer bg-gray-200 hover:bg-gray-300 p-8 rounded-6 whitespace-nowrap max-w-[200px] truncate"
              onClick={() => {
                setSessionId(s.id);
              }}
            >
              <small className="truncate">
                {s.name} {dayjs(s.created_at).format("HH:mm:ss")}
              </small>
            </div>
          ))}
      </div>
    </>
  );

  return (
    <aside className="w-[480px] border-r flex">
      <div
        className={cx(
          `absolute h-full px-16 py-24 bg-primitives-gray-900 text-[#E5E5E5] flex flex-col items-start justify-start gap-16 transition-all`,
          expanded ? "w-[272px]" : "w-[72px]"
        )}
      >
        <div className="w-full mb-md text-white flex items-center justify-between self-end">
          <span className="text-xl font-bold truncate">
            {expanded ? "Mina assistenter" : ""}
          </span>
          <Button
            iconButton
            variant="tertiary"
            className="cursor-pointer bg-primitives-gray-600 hover:bg-primitives-gray-500 text-white flex items-center justify-center"
            onClick={() => {
              setExpanded(!expanded);
            }}
          >
            <Icon
              name={expanded ? `chevrons-left` : `chevrons-right`}
              size={20}
            />
          </Button>
        </div>
        {assistants?.map((a) => (
          <Button
            iconButton={!expanded}
            size="lg"
            leftIcon={
              <div
                className={cx(
                  `border border-black bg-[#65b88f] rounded-12 bg-assistant bg-center bg-contain w-[40px] h-[40px]`
                )}
              ></div>
            }
            key={a.id}
            className={cx(
              `w-full cursor-pointer justify-start p-8`,
              a.id === assistant.id
                ? `bg-background-content hover:bg-gray-200 text-primitives-gray-900`
                : `bg-primitives-gray-600 hover:bg-primitives-gray-500 text-white`
            )}
            variant="tertiary"
            onClick={() => {
              setAssistant(a);
              getAssistantSessions(a.id, user, hash).then(
                (res: PaginatedResponseSessionMetadataPublic) => {
                  setSessions(res.items);
                }
              );
            }}
          >
            <div>{expanded ? a.name : null}</div>
          </Button>
        ))}
        <Button
          iconButton
          variant="tertiary"
          className="cursor-pointer bg-primitives-gray-600 hover:bg-primitives-gray-500 text-white flex items-center justify-center p-8"
        >
          <Icon name="arrow-up-left" size={20} />
        </Button>
        <Button
          iconButton
          variant="tertiary"
          className="cursor-pointer bg-primitives-gray-600 hover:bg-primitives-gray-500 text-white flex items-center justify-center p-8"
        >
          <Icon name="arrow-up-right" size={20} />
        </Button>
        <Button
          iconButton
          variant="tertiary"
          className="cursor-pointer bg-primitives-gray-600 hover:bg-primitives-gray-500 text-white flex items-center justify-center"
        >
          <Icon name="arrow-down-right" size={20} />
        </Button>
        <Button
          iconButton
          variant="tertiary"
          className="cursor-pointer bg-primitives-gray-600 hover:bg-primitives-gray-500 text-white flex items-center justify-center"
        >
          <Icon name="arrow-down-left" size={20} />
        </Button>
      </div>
      <div className="flex-grow w-[408px] pl-[96px] py-[24px] bg-background-content flex flex-col overflow-y-scroll">
        <div className="flex flex-col gap-12 items-start">
          <div
            className="flex items-center gap-4 cursor-pointer bg-blue-200 hover:bg-blue-300 p-8 rounded-6 whitespace-nowrap"
            onClick={() => {
              setSelectedSession(null);
              setSessionId(null);
            }}
          >
            <small>Starta ny session</small>
          </div>
        </div>
        {todaysSessions?.length > 0 ? (
          <div className="my-12">
            <p className="font-bold">Idag</p>
            {sessionList(todaysSessions)}
          </div>
        ) : null}
        {yesterdaysSessions?.length > 0 ? (
          <div className="my-12">
            <p className="font-bold">Igår</p>
            {sessionList(yesterdaysSessions)}
          </div>
        ) : null}
        {olderSessions?.length > 0 ? (
          <div className="my-12">
            <p className="font-bold">Tidigare</p>
            {sessionList(olderSessions)}
          </div>
        ) : null}
      </div>
    </aside>
  );
};
