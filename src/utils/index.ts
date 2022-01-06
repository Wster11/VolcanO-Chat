import dayjs from "dayjs";
const formatTime = (
  date: string | number | Date | dayjs.Dayjs | null | undefined,
  template: string = "YYYY-MM-DD"
) => {
  return dayjs(date).format(template);
};

export { formatTime };
