import { Button, Icon, cx } from "@sk-web-gui/react";
import { isMaximizable } from "../services/featureflag-service";
import { Logo } from "./Logo";
import { useAppContext } from "../context/app.context";

export const ChatHeader = ({ fullscreen, setFullscreen, open, setOpen }) => {
  const { assistantId } = useAppContext();
  return (
    <header
      className={cx(
        "flex justify-between items-center gap-5 cursor-default",
        open && fullscreen
          ? "h-72 rounded-0 bg-background-content text-primitives-gray-900"
          : "h-[6.2rem] rounded-0 sm:rounded-tl-16 bg-primitives-gray-900 text-[#E5E5E5]",
        open
          ? fullscreen
            ? "p-[2rem]"
            : "p-[1.5rem] cursor-pointer"
          : "p-10 cursor-pointer"
      )}
      role="button"
      aria-label={open ? `Stäng assistent` : `Öppna assistent`}
      title={open ? `Stäng assistent` : `Öppna assistent`}
      onClick={() => {
        if (assistantId) {
          setOpen(!open);
        }
      }}
    >
      {import.meta.env.VITE_APPLICATION === "QWERTY" ? (
        <div
          className={cx(
            `bg-[#65b88f] rounded-12 bg-assistant bg-center bg-contain`,
            open ? "w-32 h-32" : "w-40 h-40"
          )}
        ></div>
      ) : import.meta.env.VITE_APPLICATION === "VUX" ? (
        <div
          className={cx(
            `bg-gronsta-surface-primary dark:bg-gronsta-background-200 rounded-12 flex items-center justify-center`,
            open ? "w-32 h-32" : "w-40 h-40"
          )}
        >
          <Logo size={open ? 30 : 36} bgColor={"transparent"} />
        </div>
      ) : import.meta.env.VITE_APPLICATION === "SERVANET" ? (
        <div
          className={cx(
            `rounded-12 flex items-center justify-center`,
            open ? "w-32 h-32" : "w-[4rem] h-[4rem]"
          )}
        >
          <Logo size={open ? 32 : 40} bgColor={"transparent"} />
        </div>
      ) : null}
      <div className="h-full flex-grow leading-none flex flex-col justify-around gap-2">
        <p className="font-bold p-0 !m-0 mt-2">
          {import.meta.env.VITE_ASSISTANT_TITLE}
        </p>
        {!open ? (
          <p className="p-0 !m-0">{import.meta.env.VITE_ASSISTANT_SUBTITLE}</p>
        ) : null}
      </div>
      {isMaximizable() && open ? (
        <Button
          aria-label={fullscreen ? `Förminska` : `Helskärmsläge`}
          iconButton
          variant="tertiary"
          size="sm"
          onClick={() => {
            setFullscreen(!fullscreen);
          }}
          className={cx(
            `cursor-pointer flex items-center justify-center`,
            fullscreen
              ? "null"
              : "bg-primitives-gray-600 hover:bg-primitives-gray-500 text-white"
          )}
        >
          {fullscreen ? (
            <Icon name="arrow-down-right" size={20} />
          ) : (
            <Icon name="arrow-up-left" size={20} />
          )}
        </Button>
      ) : null}
      <Button
        aria-label={open ? `Stäng assistent` : `Öppna assistent`}
        title={open ? `Stäng assistent` : `Öppna assistent`}
        disabled={!assistantId}
        iconButton
        variant={"tertiary"}
        inverted={!fullscreen || !open}
        size="sm"
        onClick={() => {
          setOpen(!open);
        }}
        className={cx(`cursor-pointer flex items-center justify-center`)}
      >
        {open ? (
          <Icon name="chevrons-down" size={20} />
        ) : (
          <Icon name="chevrons-up" size={20} />
        )}
      </Button>
    </header>
  );
};
