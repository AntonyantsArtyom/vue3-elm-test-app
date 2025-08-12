import baseApi from "../baseApi";

export async function getOrders(dateFrom: string, dateTo: string, page?: number, limit?: number): Promise<any> {
  const { data } = await baseApi.get("/orders", {
    params: { dateFrom, dateTo, page, limit },
  });

  return data.data;
}
