import axios, { AxiosResponse } from "axios";
import React from "react";
import { useParams } from "react-router-dom";
const BlockDetailHook = () => {
  let params = useParams();

  const url: string = `http://localhost:3000/api/blockchain/block`;
  const [hash, setHash] = React.useState(params.hash);

  const [dataRes, setData] = React.useState({} as any);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    axios.get(`${url}?hash=${hash}`)
      .then((response: AxiosResponse<any>) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [hash, url]);

  const handlers = React.useMemo(
    () => ({
      directPage: (hash: string) => {
        setHash(hash);
      }
    }),
    []
  );

  return { dataRes, error, loading, handlers };

};

export default BlockDetailHook;
