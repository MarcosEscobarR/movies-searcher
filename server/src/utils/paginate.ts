export function paginate(params: {
  data: unknown[];
  page: number;
  pageSize: number;
  total: number;
}) {
  const { data, ...otherParams } = params;
  return {
    data,
    meta: {
      ...otherParams,
    },
  };
}
