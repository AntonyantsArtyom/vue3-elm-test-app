import baseApi from "../baseApi";

export async function getIncomes(dateFrom: string, dateTo: string, page?: number, limit?: number): Promise<any> {
  const { data } = await baseApi.get("/incomes", {
    params: { dateFrom, dateTo, page, limit },
  });

  return data.data;
}
