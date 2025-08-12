import type { TStock } from "@/entities/Stocks/Stock.types";
import baseApi from "@/shared/api/baseApi";

export async function getStocks(dateFrom: string, page?: number, limit?: number) {
  const response = await baseApi.get<{ data: TStock[]; meta: { last_page: number } }>("/stocks", {
    params: { dateFrom, page, limit },
  });

  const { data, meta } = response.data;
  return { data, lastPage: meta.last_page };
}
