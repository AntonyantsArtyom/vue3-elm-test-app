import baseApi from "./baseApi";

export async function getStocks(dateFrom: string, page?: number, limit?: number): Promise<any> {
  const { data } = await baseApi.get("/stocks", {
    params: { dateFrom, page, limit },
  });

  return data.data;
}
