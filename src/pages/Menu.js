import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Menu.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Exportvalues } from "../context/Context";

function Menu() {
  const navigate = useNavigate();
  const location = useLocation();
  const Brandid =location.state.brandid;
  const restId=location.state.restid;
  const mtId=location.state.mtid;
const catId = location.state.catid;
  console.log("Restaurant and type", location.state);
  const [DispMenu, setDispMenu] = useState([]);
  const [AddFlag, setAddFlag] = useState(false);
  const [UpdateId, setUpdateId] = useState(null);
  const [action, setaction] = useState(false);
  const [Name, setName] = useState("");
  const [Desc, setDesc] = useState("");
  const [Price, setPrice] = useState();
  const [Spice, setSpice] = useState();
  const [Ingred, setIngred] = useState("");

  const [UpName, setUpName] = useState("");
  const [UpDesc, setUpDesc] = useState("");
  const [UpPrice, setUpPrice] = useState();
  const [UpSpice, setUpSpice] = useState();
  const [UpIngred, setUpIngred] = useState("");
  const [AddVeg, setAddVeg] = useState(1);
  const {Rests, setRests} = useContext(Exportvalues);
  const {Brand, setBrand} = useContext(Exportvalues);
  const {MenuType, setMenuType}= useContext(Exportvalues);
  const storedUserID = localStorage.getItem('userID');
  const {Cat, setCat} = useContext(Exportvalues);
  useEffect(() => {
    axios
      .post(`https://plankton-app-ovujs.ondigitalocean.app/routes/menu`, {
        userid: storedUserID,
        restid: restId,
        brandid: Brandid,
        mtid: mtId,
        catid:catId,
        
        action: 'read',
      })
      .then((Response) => {
        // console.log("Response from server for MENU", Response.data.data);
        // if (Response?.data?.status) {
        //   setDispMenu(Response?.data?.data);
        // }
        console.log(Response,"ress")
        setDispMenu(Response?.data);
      });
  }, [action]);
 // console.log(MenuType.mtid);
console.log(DispMenu,"Dispmenuuuu")
  const AddMenu = () => {
    setAddFlag(true);
  };
  const UpdateMenu = (item) => {
    setUpdateId(item?.menuid);
    setUpName(item?.menu);
    setUpDesc(item?.description);
    setUpPrice(item?.price);
    setUpSpice(item?.spice);
    setUpIngred(item?.ingredients);
  };
  const selectMenu = item => {
    console.log(item);
    setCat(item);
    setMenuType(item);
    setRests(item);
    
  };
  const submitMenu = () => {
    axios
      .post(`https://plankton-app-ovujs.ondigitalocean.app/routes/menu`, {
       

        menu: Name,
        mtid: mtId,
        brandid: Brandid,
        restid: restId,
        catid: catId,
        userid: storedUserID,
        notes: 'blah',
        MImage: 'null',
        veg: AddVeg,
        spice: Spice,
        price: 100,
        description: Desc,
        ingredients: Ingred,
        favourite: 1,
        status1: 1,
        rank1: 1,
        cUser: storedUserID ,
        action: 'create',




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
      .post(`https://plankton-app-ovujs.ondigitalocean.app/routes/menu`, {
        menuid: item.menuid,
      action: 'delete',
      })
      .then((res) => {
        console.log(res.data);
        setaction(!action);
      });
  };

  const UpdateItem = () => {
    axios
      .post(
        `https://plankton-app-ovujs.ondigitalocean.app/routes/menu`,
        {
          menu: UpName,
      MImage: "",
      spice: UpSpice,
      price: UpPrice,
      veg: 1,
      description: UpDesc,
      ingredients: UpIngred,
      menuid: UpdateId,
      action: 'update',
          // TypeId: location.state.Id,
        },
       
      )
      .then((res) => {
        console.log(res.data);
        setUpdateId(null);
        setaction(!action);
      });
  };

  return (
    <div className="menu">
      {AddFlag == false ? (
        <div style={{ marginTop: 10 }}>
        <button onClick={AddMenu}>Add Menu</button>
        </div>
       
      ) : (
        <div></div>
      )}
      {DispMenu.length>0&&<button
                style={{ marginLeft: 10 }}
                onClick={() => {
                  navigate("/publish", { state: restId });
                }}
              >
                <span onClick={(item)=>selectMenu(item)}>generate Qr</span>
              </button>}
                  
               
      {AddFlag == false ? (
        DispMenu.map((item, index) => {
         
          // console.log(item);
          return (
            
            <div style={{ marginTop: 20 }}>
           {console.log(item)}
            <div
              style={{ 
            
            display:"flex" ,
            alignItems:"center",
           justifyContent:"center",
            
            
            gap:"1rem"
            
            }}
            >
            {UpdateId == item?.menuid ? (
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
                    <p style={{ marginBottom: -10 }}>Name: {item?.menu}</p>
                    <p style={{ marginBottom: -10 }}>
                      SpiceId: {item?.spice}
                    </p>
                    <p style={{ marginBottom: -10 }}>Price: {item?.price}</p>
                    <p style={{ marginBottom: -10 }}>
                      Description: {item?.description}
                    </p>
                    <p>Ingredients: {item?.ingredients}</p>
                  </div>
                </div>
              )}
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

              
              </div>
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
export default Menu;
