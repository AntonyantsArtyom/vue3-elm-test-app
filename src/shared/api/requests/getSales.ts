import baseApi from "../baseApi";

export async function getSales(dateFrom: string, dateTo: string, page?: number, limit?: number): Promise<any> {
  const { data } = await baseApi.get("/sales", {
    params: { dateFrom, dateTo, page, limit },
  });

  return data.data;
}
