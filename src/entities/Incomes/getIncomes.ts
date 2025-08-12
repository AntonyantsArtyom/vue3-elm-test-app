import type { TIncome } from "@/shared/types/Income";
import baseApi from "@/shared/api/baseApi";

export async function getIncomes(dateFrom: string, dateTo: string, page?: number, limit?: number) {
  const { data } = await baseApi.get<{ data: TIncome[] }>("/incomes", {
    params: { dateFrom, dateTo, page, limit },
  });

  return data.data;
}
