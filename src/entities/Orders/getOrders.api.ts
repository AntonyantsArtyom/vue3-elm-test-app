import type { TOrder } from "@/entities/Orders/Order.types";
import baseApi from "@/shared/api/baseApi";

export async function getOrders(dateFrom: string, dateTo: string, page?: number, limit?: number) {
  const { data } = await baseApi.get<{ data: TOrder[] }>("/orders", {
    params: { dateFrom, dateTo, page, limit },
  });

  return data.data;
}
