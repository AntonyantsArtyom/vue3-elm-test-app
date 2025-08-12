import type { TOrder } from "@/entities/Orders/Order.types";
import baseApi from "@/shared/api/baseApi";

export async function getOrders(dateFrom: string, dateTo: string, page?: number, limit?: number) {
  const response = await baseApi.get<{ data: TOrder[]; meta: { last_page: number } }>("/orders", {
    params: { dateFrom, dateTo, page, limit },
  });

  const { data, meta } = response.data;
  return { data, lastPage: meta.last_page };
}
