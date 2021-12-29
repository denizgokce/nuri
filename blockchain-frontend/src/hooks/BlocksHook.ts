import axios, { AxiosResponse } from "axios";
import React from "react";

const BlocksHook = () => {
  const url: string = `http://localhost:3000/api/blockchain/blocks`;
  const [page, setPage] = React.useState(1);

  const [dataRes, setData] = React.useState({
    data: [],
    page: page,
    pageCount: 0
  });
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    axios.get(`${url}?page=${page - 1}&limit=10`)
      .then((response: AxiosResponse<any>) => {
        setData({
          data: response.data.data,
          page: page,
          pageCount: response.data.pageCount
        });

      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, url]);

  const handlers = React.useMemo(
    () => ({
      nextPage: () => {
        setPage(page => page + 1);
      },
      prevPage: () => {
        setPage(page => page - 1);
      },
      directPage: (pageNumber: number) => {
        setPage(pageNumber);
      }
    }),
    []
  );

  return { dataRes, error, loading, handlers };

};

export default BlocksHook;
