import type { TIncome } from "@/entities/Incomes/Income.types";
import baseApi from "@/shared/api/baseApi";

export async function getIncomes(dateFrom: string, dateTo: string, page?: number, limit?: number) {
  const response = await baseApi.get<{ data: TIncome[]; meta: { last_page: number } }>("/incomes", {
    params: { dateFrom, dateTo, page, limit },
  });

  const { data, meta } = response.data;
  return { data, lastPage: meta.last_page };
}
