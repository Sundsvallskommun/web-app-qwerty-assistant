import { cx, Icon } from "@sk-web-gui/react";

export const UserAvatar = () => {
  return (
    <div
      className={cx(
        `bg-bjornstigen-surface-primary rounded-12 w-[32px] h-32 flex items-center justify-center text-white font-bold`
      )}
    >
      <Icon name="user" size={20} />
    </div>
  );
};
