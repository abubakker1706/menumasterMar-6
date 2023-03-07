import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./MenuType.css";
import { Exportvalues } from "../context/Context";

function Cat() {
  const navigate = useNavigate();
  const location = useLocation();

  const Brandid =location.state.brandid;
  const restId=location.state.restid;
  const mtId=location.state.mtid;

  console.log(location.state);
  const [Types, setTypes] = useState([]);
  const [AddFlag, setAddFlag] = useState(false);
  const [UpdateId, setUpdateId] = useState(null);
  const [action, setaction] = useState(false);
  const [UpType, setUpType] = useState();
  const [Name, setName] = useState();
  const {Rests, setRests} = useContext(Exportvalues);
  const {Brand, setBrand} = useContext(Exportvalues);
  const {MenuType, setMenuType}= useContext(Exportvalues);
  const {Cat, setCat} = useContext(Exportvalues);
  const storedUserID = localStorage.getItem('userID');
  console.log(Rests.restid);
  useEffect(() => {
    axios
      .post(`https://plankton-app-ovujs.ondigitalocean.app/routes/cat`, {
        userid:  storedUserID,
        action: 'read',
        restid: restId,
        mtid: mtId,
        brandid: Brandid,
      })
      .then((res) => {
        // if (res?.data?.status) {
        //   //   console.log("Rest list", res.data.data);
        //   //   setRests(res.data.data);
        
        // }
        setTypes(res?.data);
      });
  }, [action]);
console.log(Types)
  const UpdateType = (item) => {
    setUpdateId(item?.catid);
    setUpType(item?.cat);
  };
  const selectMenuType = item => {
    console.log(item);
    setCat(item);
    setMenuType(item);
    navigate('menu');
  };
  const UpdateTypeName = () => {
    axios
      .post(`https://plankton-app-ovujs.ondigitalocean.app/routes/cat`, {
        cat: UpType,
      CImage: "",
      catid: UpdateId,
      action: 'update',
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
      .post(`https://plankton-app-ovujs.ondigitalocean.app/routes/cat`, {
        
        cat: Name,
        mtid: mtId,
        brandid: Brandid,
        restid: restId,
        userid: storedUserID,
        notes: 'notes',
        CImage: 'null',
        favourite: 1,
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

  const deleteType = (item) => {
    console.log(item);
    axios
      .post(`https://plankton-app-ovujs.ondigitalocean.app/routes/cat`, {
       
      catid: item?.catid,
      action: 'delete',
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
          <button onClick={AddType}>Add Category</button>
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
                <span onClick={()=>selectMenuType(item)}>select</span>
              </button>

              {UpdateId == item?.catid ? (
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
                    <p style={{ marginBottom: 10 }}>Category: {item?.cat}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div>
          <div className="wrap13" style={{ flex: 1 }}>
            <p>Add New Category</p>
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

export default Cat;
