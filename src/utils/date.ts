import { format } from "date-fns-jalali";

export const jalaliDate = (created_at: string | null) => {
  return format(new Date(created_at!), "yyyy/MM/dd", {
    useAdditionalWeekYearTokens: true,
  });
};
