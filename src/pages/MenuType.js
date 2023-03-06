import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./MenuType.css";

function MenuType() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state.Id);
  const [Types, setTypes] = useState([]);
  const [AddFlag, setAddFlag] = useState(false);
  const [UpdateId, setUpdateId] = useState(null);
  const [action, setaction] = useState(false);
  const [UpType, setUpType] = useState();
  const [Name, setName] = useState();

  useEffect(() => {
    axios
      .post(`https://www.thequana.com/apimobile/mmowner`, {
        xversion: "hRs6",
        xuserid: 21,
        xaction: "menu_type_list",
        RestaurantId: location.state.Id,
        Status: "1",
      })
      .then((res) => {
        if (res?.data?.status) {
          //   console.log("Rest list", res.data.data);
          //   setRests(res.data.data);
          setTypes(res?.data?.data);
        }
      });
  }, [action]);

  const UpdateType = (item) => {
    setUpdateId(item?.Id);
    setUpType(item?.Type);
  };

  const UpdateTypeName = () => {
    axios
      .post(`https://www.thequana.com/apimobile/mmowner`, {
        xversion: "hRs6",
        xuserid: 21,
        xaction: "menu_type_update",
        RestaurantId: location.state.Id,
        Id: UpdateId,
        Type: UpType,
        Status: "1",
      })
      .then((res) => {
        console.log(res.data);
        setaction(!action);
        setUpdateId(null);
      });
  };

  const AddType = () => {
    setAddFlag(true);
  };

  const submitType = () => {
    axios
      .post(`https://www.thequana.com/apimobile/mmowner`, {
        xversion: "hRs6",
        xuserid: 21,
        xaction: "menu_type_add",
        RestaurantId: location.state.Id,
        Type: Name,
        Status: "1",
      })
      .then((res) => {
        console.log(res.data.status);
        setAddFlag(false);
        setaction(!action);
      });
  };

  const deleteType = (item) => {
    console.log(item);
    axios
      .post(`https://www.thequana.com/apimobile/mmowner`, {
        xversion: "hRs6",
        xuserid: 21,
        xaction: "menu_type_delete",
        RestaurantId: location.state.Id,
        Id: item?.Id,
        Status: "1",
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
          <button onClick={AddType}>Add Menu Type</button>
        </div>
      ) : (
        <div></div>
      )}
      {AddFlag == false ? (
        Types.map((item, index) => {
          // console.log(item);
          return (
            <div style={{ marginTop: 20 }}>
              <button
                onClick={() => {
                  deleteType(item);
                }}
              >
                Delete
              </button>

              <button
                style={{ marginLeft: 10 }}
                onClick={() => {
                  UpdateType(item);
                }}
              >
                edit
              </button>
              <button
                style={{ marginLeft: 10 }}
                onClick={() => {
                  navigate("/menu", { state: item });
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
                  <div className="wrap14">
                    <div style={{ marginLeft: 10 }}>
                      <p style={{ marginBottom: 10 }}>
                        Menu Type:{" "}
                        <textarea
                          rows={1}
                          cols={40}
                          defaultValue={UpType}
                          onChange={(event) => {
                            setUpType(event.target.value);
                          }}
                        ></textarea>
                      </p>
                    </div>
                  </div>
                  <button onClick={UpdateTypeName} style={{ marginLeft: 200 }}>
                    Done
                  </button>
                </div>
              ) : (
                <div className="wrap12">
                  <div style={{ marginLeft: 10 }}>
                    <p style={{ marginBottom: 10 }}>Menu Type: {item?.Type}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div>
          <div className="wrap13" style={{ flex: 1 }}>
            <p>Add new menu type</p>
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

          <button type="submit" onClick={submitType}>
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

export default MenuType;
