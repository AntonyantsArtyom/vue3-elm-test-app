import type { TStock } from "@/entities/Stocks/Stock.types";
import baseApi from "@/shared/api/baseApi";

export async function getStocks(dateFrom: string, page?: number, limit?: number) {
  const { data } = await baseApi.get<{ data: TStock[] }>("/stocks", {
    params: { dateFrom, page, limit },
  });

  return data.data;
}
