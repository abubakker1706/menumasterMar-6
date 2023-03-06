import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Menu.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function MenuCrud() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("Restaurant and type", location.state);
  const [DispMenu, setDispMenu] = useState([]);
  const [AddFlag, setAddFlag] = useState(false);
  const [UpdateId, setUpdateId] = useState(null);
  const [action, setaction] = useState(false);
  const [Name, setName] = useState();
  const [Desc, setDesc] = useState();
  const [Price, setPrice] = useState();
  const [Spice, setSpice] = useState();
  const [Ingred, setIngred] = useState();

  const [UpName, setUpName] = useState();
  const [UpDesc, setUpDesc] = useState();
  const [UpPrice, setUpPrice] = useState();
  const [UpSpice, setUpSpice] = useState();
  const [UpIngred, setUpIngred] = useState();

  useEffect(() => {
    axios
      .post(`https://www.thequana.com/apimobile/mmowner`, {
        xversion: "hRs6",
        xuserid: 21,
        xaction: "menu_item_list",
        RestaurantId: location.state.RestaurantId,
        Status: "1",
        TypeId: location.state.Id,
      })
      .then((Response) => {
        console.log("Response from server for MENU", Response.data.data);
        if (Response?.data?.status) {
          setDispMenu(Response?.data?.data);
        }
      });
  }, [AddFlag, action]);

  const AddMenu = () => {
    setAddFlag(true);
  };
  const UpdateMenu = (item) => {
    setUpdateId(item?.Id);
    setUpName(item?.Name);
    setUpDesc(item?.Description);
    setUpPrice(item?.Price);
    setUpSpice(item?.SpiceId);
    setUpIngred(item?.Ingredients);
  };

  const submitMenu = () => {
    axios
      .post(`https://www.thequana.com/apimobile/mmowner`, {
        xversion: "hRs6",
        xuserid: 21,
        xaction: "menu_item_add",
        RestaurantId: location.state.RestaurantId,
        TypeId: 1,
        VegId: 1,
        SpiceId: Spice,
        Price: Price,
        Name: Name,
        Description: Desc,
        Ingredients: Ingred,
        Status: "1",
        TypeId: location.state.Id,
      })
      .then((res) => {
        console.log(res.data.status);
        setaction(!action);
        setAddFlag(false);
      });
  };

  const deleteMenu = (item) => {
    console.log(item);
    axios
      .post(`https://www.thequana.com/apimobile/mmowner`, {
        xversion: "hRs6",
        xuserid: 21,
        xaction: "menu_item_delete",
        RestaurantId: location.state.RestaurantId,
        Id: item?.Id,
        TypeId: location.state.Id,
      })
      .then((res) => {
        console.log(res.data);
        setaction(!action);
      });
  };

  const UpdateItem = () => {
    axios
      .post(
        `https://www.thequana.com/apimobile/mmowner`,
        // {
        //   xversion: "hRs6",
        //   xuserid: 21,
        //   xaction: "menu_item_update",
        //   RestaurantId: location.state.RestaurantId,
        //   Id: UpdateId,
        //   CatId: 0,
        //   SpiceId: UpSpice,
        //   VegId: 1,
        //   Price: UpPrice,
        //   Name: UpName,
        //   Description: UpDesc,
        //   Ingredients: UpIngred,
        //   DiscountType: "%",
        //   DiscountValue: "20",
        //   Status: "1",
        //   // TypeId: location.state.Id,
        // },
        {
          xversion: "hRs6",
          xuserid: 21,
          xaction: "menu_item_update",
          RestaurantId: location.state.RestaurantId,
          TypeId: location.state.Id,
          CatId: 1,
          SpiceId: UpSpice,
          VegId: 1,
          Name: UpName,
          Price: UpPrice,
          DiscountTye: "amount or percent",
          DiscountValue: "22",
          Ingredients: UpIngred,
          Id: UpdateId,
          Description: UpDesc,
          Rank: "5",
          Status: "1",
        }
      )
      .then((res) => {
        console.log(res.data);
        setUpdateId(null);
        setaction(!action);
      });
  };

  return (
    <div>
      {AddFlag == false ? (
        <button onClick={AddMenu}>Add Menu</button>
      ) : (
        <div></div>
      )}
      {AddFlag == false ? (
        DispMenu.map((item, index) => {
          // console.log(item);
          return (
            <div style={{ marginTop: 20 }}>
              <button
                onClick={() => {
                  deleteMenu(item);
                }}
              >
                Delete
              </button>

              <button
                style={{ marginLeft: 10 }}
                onClick={() => {
                  UpdateMenu(item);
                }}
              >
                edit
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
                  <div className="wrap40">
                    <div style={{ marginLeft: 10 }}>
                      <p style={{ marginBottom: -10 }}>
                        Name:{" "}
                        <textarea
                          rows={1}
                          cols={40}
                          defaultValue={UpName}
                          onChange={(event) => {
                            setUpName(event.target.value);
                          }}
                        ></textarea>
                      </p>
                      <p style={{ marginBottom: -10 }}>
                        SpiceId:{" "}
                        <textarea
                          rows={1}
                          cols={10}
                          defaultValue={UpSpice}
                          onChange={(event) => {
                            setUpSpice(event.target.value);
                          }}
                        ></textarea>
                      </p>
                      <p style={{ marginBottom: -10 }}>
                        Price:{" "}
                        <textarea
                          rows={1}
                          cols={20}
                          defaultValue={UpPrice}
                          onChange={(event) => {
                            setUpPrice(event.target.value);
                          }}
                        ></textarea>
                      </p>
                      <p>
                        Description:{" "}
                        <textarea
                          rows={2}
                          cols={40}
                          defaultValue={UpDesc}
                          onChange={(event) => {
                            setUpDesc(event.target.value);
                          }}
                        ></textarea>
                      </p>
                      <p>
                        Ingredients:{" "}
                        <textarea
                          rows={2}
                          cols={40}
                          defaultValue={UpIngred}
                          onChange={(event) => {
                            setUpIngred(event.target.value);
                          }}
                        ></textarea>
                      </p>
                    </div>
                  </div>
                  <button onClick={UpdateItem} style={{ marginLeft: 200 }}>
                    Done
                  </button>
                </div>
              ) : (
                <div className="wrap20">
                  <div style={{ marginLeft: 10 }}>
                    <p style={{ marginBottom: -10 }}>Name: {item?.Name}</p>
                    <p style={{ marginBottom: -10 }}>
                      SpiceId: {item?.SpiceId}
                    </p>
                    <p style={{ marginBottom: -10 }}>Price: {item?.Price}</p>
                    <p style={{ marginBottom: -10 }}>
                      Description: {item?.Description}
                    </p>
                    <p>Ingredients: {item?.Ingredients}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div>
          <div className="wrap30" style={{ flex: 1 }}>
            <p>Add new menu</p>

            <textarea
              name="postContent"
              rows={2}
              cols={40}
              placeholder="Name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />

            <textarea
              name="postContent"
              rows={4}
              cols={40}
              placeholder="Description"
              onChange={(event) => {
                setDesc(event.target.value);
              }}
            />
            <textarea
              name="postContent"
              rows={2}
              cols={40}
              placeholder="Price"
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
            <textarea
              name="postContent"
              rows={2}
              cols={40}
              placeholder="Spice"
              onChange={(event) => {
                setSpice(event.target.value);
              }}
            />
            <textarea
              name="postContent"
              rows={4}
              cols={40}
              placeholder="Ingredients"
              onChange={(event) => {
                setIngred(event.target.value);
              }}
            />
          </div>

          <button type="submit" onClick={submitMenu}>
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
export default MenuCrud;
