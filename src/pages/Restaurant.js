import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Restaurant.css";
import { Exportvalues } from "../context/Context";

function Restaurant() {
  const navigate = useNavigate();
  const location = useLocation();
  const {Brand, setBrand} = useContext(Exportvalues);
  const {Rests, setRests} = useContext(Exportvalues);
  

  const [AddFlag, setAddFlag] = useState(false);
  const [UpdateId, setUpdateId] = useState(null);
  const [UpName, setUpName] = useState();
  const [Name, setName] = useState();
  const [action, setaction] = useState(false);
  const storedUserID = localStorage.getItem('userID');



console.log(Brand.brandid,"rest nrand")
  useEffect(() => {
    axios
      .post(`https://plankton-app-ovujs.ondigitalocean.app/routes/rest`, {
        userid: storedUserID,
      action: 'read',
      brandid: Brand.brandid,
      })
      .then((res) => {
        if (res?.data?.status) {
          console.log("Rest list", res.data.data);
          setRests(res.data.data);
        }
      });
  }, [action]);

  const UpdateRest = (item) => {
    setUpdateId(item?.Id);
    setUpName(item?.Restaurant);
  };

  const UpdateRestName = () => {
    axios
      .post(`https://plankton-app-ovujs.ondigitalocean.app/routes/rest`, {
        action: 'update',
      rest: UpName,
      RImage: "",
      restid: UpdateId,
      })
      .then((res) => {
        console.log(res.data);
        setaction(!action);
        setUpdateId(null);
      });
  };

  const AddRest = () => {
    setAddFlag(true);
  };

  const submitRest = () => {
    axios
      .post(`https://plankton-app-ovujs.ondigitalocean.app/routes/rest`, {
        rest: Name,
        userid: storedUserID,
        brandid: Brand.brandid,
        RImage: 'null',
        notes: 'nill',
        favourite: 0,
        status1: 1,
        rank1: 1,
        cUser: storedUserID,
        action: 'create',
      })
      .then((res) => {
        console.log(res.data.status);
        setAddFlag(false);
        setaction(!action);
      });
  };

  const deleteRest = (item) => {
    console.log(item);
    axios
      .post(`https://plankton-app-ovujs.ondigitalocean.app/routes/rest`, {
        action: 'delete',
        restid: item?.restid,
      })
      .then((res) => {
        console.log(res.data);
        setaction(!action);
      });
  };

  return (
    <div>
      {/* <p>welcome to Menu</p> */}
      {AddFlag == false ? (
        <div style={{ marginTop: 10 }}>
          <button onClick={AddRest}>Add Restaurant</button>
        </div>
      ) : (
        <div></div>
      )}
      {AddFlag == false ? (
        Rests.map((item, index) => {
          // console.log(item);
          return (
            <div style={{ marginTop: 20 }}>
              <button
                onClick={() => {
                  deleteRest(item);
                }}
              >
                Delete
              </button>

              <button
                style={{ marginLeft: 10 }}
                onClick={() => {
                  UpdateRest(item);
                }}
              >
                edit
              </button>
              <button
                style={{ marginLeft: 10 }}
                onClick={() => {
                  navigate("/menutype", { state: item });
                }}
              >
                select
              </button>

              {UpdateId == item?.Id ? (
                <div>
                  <button
                    style={{ marginLeft: 200 }}
                    onClick={() => {
                      setUpdateId(null);
                    }}
                  >
                    cancel
                  </button>
                  <div className="wrap4">
                    <div style={{ marginLeft: 10 }}>
                      <p style={{ marginBottom: 10 }}>
                        Restaurant Name:{" "}
                        <textarea
                          rows={1}
                          cols={40}
                          defaultValue={UpName}
                          onChange={(event) => {
                            setUpName(event.target.value);
                          }}
                        ></textarea>
                      </p>
                    </div>
                  </div>
                  <button onClick={UpdateRestName} style={{ marginLeft: 200 }}>
                    Done
                  </button>
                </div>
              ) : (
                <div className="wrap2">
                  <div style={{ marginLeft: 10 }}>
                    <p style={{ marginBottom: 10 }}>
                      Restaurant Name: {item?.Restaurant}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div>
          <div className="wrap3" style={{ flex: 1 }}>
            <p>Add new Restaurant</p>
            <div style={{ marginTop: 10 }}>
              <textarea
                name="postContent"
                rows={2}
                cols={40}
                placeholder="Name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>
          </div>

          <button type="submit" onClick={submitRest}>
            Submit
          </button>
          <button
            type="submit"
            onClick={() => {
              setAddFlag(false);
            }}
            style={{ marginLeft: 20 }}
          >
            cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default Restaurant;
