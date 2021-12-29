import React from "react";
import styles from "./Home.module.css";
import { Alert, Pagination, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as moment from "moment";
import Loader from "react-loader-spinner";
import BlocksHook from "../../hooks/BlocksHook";
import { isNullOrUndefined } from "util";

const Home = () => {
  const { dataRes, loading, error, handlers } = BlocksHook();
  let navigate = useNavigate();
  React.useEffect(() => {
    navigate(`?page=${dataRes.page}`);
  }, [dataRes.page, navigate]);
  return (
    !isNullOrUndefined(error) && error.length > 0 ?
      (
        //region Alert
        <Alert variant={"danger"}>
          {error}
        </Alert>
        //endregion
      ) :
      (
        !isNullOrUndefined(loading) && !loading ? (
          //region Content
          <div className={styles.Blocks} data-testid="Blocks">
            <Table striped bordered hover>
              <thead>
              <tr>
                <th>#</th>
                <th>Hash</th>
                <th>Height</th>
                <th>Time</th>
              </tr>
              </thead>
              <tbody>
              {
                dataRes.data.length > 0 && dataRes.data.map((block: any, i: number) => {
                  return (
                    <tr key={i}>
                      <td>{block.block_index}</td>
                      <td><Link to={`/block/${block.hash}`}>{block.hash}</Link></td>
                      <td>{block.height}</td>
                      <td>{moment.unix(block.time).fromNow()}</td>
                    </tr>
                  );
                })
              }
              </tbody>
            </Table>
            <div className={"mt-3"}>
              <Pagination>
                {
                  dataRes.page > 1 && (
                    <Pagination.Prev onClick={handlers.prevPage} />
                  )
                }
                {
                  dataRes.pageCount > 0 && [...Array(dataRes.pageCount)].map((_, i) => {
                    i += 1;
                    if (dataRes.page === i) {
                      return (<Pagination.Item key={i} active>{i}</Pagination.Item>);
                    } else {
                      return (<Pagination.Item key={i} onClick={() => {
                        handlers.directPage(i);
                      }}>{i}</Pagination.Item>);
                    }
                  })
                }
                {
                  dataRes.page < dataRes.pageCount && (
                    <Pagination.Next onClick={handlers.nextPage} />
                  )
                }
              </Pagination>
            </div>
          </div>
          //endregion
        ) : (
          //region Loader
          <div className={styles.center_loader}>
            <Loader
              type="Oval"
              color="#00BFFF"
              height={100}
              width={100}
            />
          </div>
          //endregion
        )
      )
  );
};

export default Home;
