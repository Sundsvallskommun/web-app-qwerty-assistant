import dayjs from "dayjs";

export const isToday = (date: string) => {
  const today =
    dayjs(date).isAfter(dayjs().subtract(1, "day").endOf("day")) &&
    dayjs(date).isBefore(dayjs().endOf("day"));
  return today;
};

export const isYesterday = (date: string) => {
  const yesterday =
    dayjs(date).isAfter(dayjs().subtract(2, "day").endOf("day")) &&
    dayjs(date).isBefore(dayjs().subtract(1, "day").endOf("day"));
  return yesterday;
};

export const isEarlier = (date: string) => {
  const earlier = dayjs(date).isBefore(
    dayjs().subtract(1, "day").startOf("day")
  );
  return earlier;
};
