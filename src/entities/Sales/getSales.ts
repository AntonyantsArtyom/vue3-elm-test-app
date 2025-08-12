import type { TSale } from "@/shared/types/Sale";
import baseApi from "@/shared/api/baseApi";

export async function getSales(dateFrom: string, dateTo: string, page?: number, limit?: number) {
  const { data } = await baseApi.get<{ data: TSale[] }>("/sales", {
    params: { dateFrom, dateTo, page, limit },
  });

  return data.data;
}
