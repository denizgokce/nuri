import React from "react";
import styles from "./Detail.module.css";
import Loader from "react-loader-spinner";
import { Alert, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import BlockDetailHook from "../../hooks/BlockDetailHook";
import { isNullOrUndefined } from "util";
import * as moment from "moment";

const Detail = () => {
  const { dataRes, loading, error, handlers } = BlockDetailHook();
  const [showTransactions, setShowTransactions] = React.useState(false);
  let navigate = useNavigate();
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
          <div className={styles.Detail} data-testid="Detail">
            <div className="row mb-2 p-1">
              <label className="col w-50" style={{ textAlign: "left" }}>Block Index</label>
              <span className="col w-50" style={{ textAlign: "left" }}>{dataRes.block_index}</span>
            </div>
            <hr />
            <div className="row mb-2 p-1">
              <label className="col w-50" style={{ textAlign: "left" }}>Hash</label>
              <span className="col w-50" style={{ textAlign: "left" }}>{dataRes.hash}</span>
            </div>
            <hr />
            <div className="row mb-2 p-1">
              <label className="col w-50" style={{ textAlign: "left" }}>Height</label>
              <span className="col w-50" style={{ textAlign: "left" }}>{dataRes.height}</span>
            </div>
            <hr />
            <div className="row mb-2 p-1">
              <label className="col w-50" style={{ textAlign: "left" }}>Bits</label>
              <span className="col w-50" style={{ textAlign: "left" }}>{dataRes.bits}</span>
            </div>
            <hr />
            <div className="row mb-2 p-1">
              <label className="col w-50" style={{ textAlign: "left" }}>Fee</label>
              <span className="col w-50" style={{ textAlign: "left" }}>{dataRes.fee}</span>
            </div>
            <hr />
            <div className="row mb-2 p-1">
              <label className="col w-50" style={{ textAlign: "left" }}>Merkel Root</label>
              <span className="col w-50" style={{ textAlign: "left" }}>{dataRes.mrkl_root}</span>
            </div>
            <hr />
            <div className="row mb-2 p-1">
              <label className="col w-50" style={{ textAlign: "left" }}>Nonce</label>
              <span className="col w-50" style={{ textAlign: "left" }}>{dataRes.nonce}</span>
            </div>
            <hr />
            <div className="row mb-2 p-1">
              <label className="col w-50" style={{ textAlign: "left" }}>Size</label>
              <span className="col w-50" style={{ textAlign: "left" }}>{dataRes.size}</span>
            </div>
            <hr />
            <div className="row mb-2 p-1">
              <label className="col w-50" style={{ textAlign: "left" }}>Time</label>
              <span className="col w-50" style={{ textAlign: "left" }}>{dataRes.time}</span>
            </div>
            <hr />
            <div className="row mb-2 p-1">
              <label className="col w-50" style={{ textAlign: "left" }}>Version</label>
              <span className="col w-50" style={{ textAlign: "left" }}>{dataRes.ver}</span>
            </div>
            <hr />
            <div className="row mb-2 p-1">
              <label className="col w-50" style={{ textAlign: "left" }}>Weight</label>
              <span className="col w-50" style={{ textAlign: "left" }}>{dataRes.weight}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <div className="d-flex justify-content-start">
                {
                  dataRes.prev_block && dataRes.prev_block.length > 0 && (
                    <Button className="me-2" variant="outline-primary" onClick={() => {
                      handlers.directPage(dataRes.prev_block);
                      navigate(`/block/${dataRes.prev_block}`);
                    }}>Previous</Button>
                  )
                }
                {
                  (
                    <Button variant="outline-info" onClick={() => {
                      setShowTransactions(!showTransactions);
                    }}>{showTransactions ? "Hide" : "Show"} Transactions</Button>
                  )
                }
              </div>
              {
                dataRes.next_block && dataRes.next_block.length > 0 && (
                  <Button variant="outline-primary" onClick={() => {
                    handlers.directPage(dataRes.next_block);
                    navigate(`/block/${dataRes.next_block}`);
                  }}>Next</Button>
                )
              }
            </div>
            {
              showTransactions && (
                <div className="d-block w-100">
                  {
                    dataRes.tx.length > 0 && dataRes.tx.map((transaction: any, i: number) => {
                      return (
                        <div key={i} className={styles.transaction_item}>
                          <div className="d-flex justify-content-start">
                            <span>Transaction Id: {transaction.tx_index}</span>
                          </div>
                        </div>
                      );
                    })
                  }
                </div>
              )
            }
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
export default Detail;
