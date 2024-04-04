import { cx } from "@sk-web-gui/react";
import { Logo } from "./Logo";

export const AssistantAvatar = () => {
  return import.meta.env.VITE_APPLICATION === "QWERTY" ? (
    <div
      className={cx(
        `bg-[#65b88f] rounded-12 bg-assistant bg-center bg-contain w-[32px] h-32`
      )}
    ></div>
  ) : import.meta.env.VITE_APPLICATION === "QWERTY" ? (
    <div
      aria-label="Assistent"
      className="w-[32px] h-[32px] bg-vattjom-surface-primary rounded-12 flex items-center justify-center"
    >
      <Logo size={28} bgColor="transparent" />
    </div>
  ) : (
    <div
      aria-label="Assistent"
      className="w-[32px] h-[32px] bg-vattjom-surface-primary rounded-12 flex items-center justify-center"
    >
      <Logo size={28} bgColor="transparent" />
    </div>
  );
};
