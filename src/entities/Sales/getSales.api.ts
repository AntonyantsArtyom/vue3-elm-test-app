import type { TSale } from "@/entities/Sales/Sale.types";
import baseApi from "@/shared/api/baseApi";

export async function getSales(dateFrom: string, dateTo: string, page?: number, limit?: number) {
  const response = await baseApi.get<{ data: TSale[]; meta: { last_page: number } }>("/sales", {
    params: { dateFrom, dateTo, page, limit },
  });

  const { data, meta } = response.data;
  return { data, lastPage: meta.last_page };
}
