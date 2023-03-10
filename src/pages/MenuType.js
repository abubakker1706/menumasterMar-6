import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./MenuType.css";
import { Exportvalues } from "../context/Context";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import { Button, TextField } from "@mui/material";

function MenuType() {
  const navigate = useNavigate();
  const location = useLocation();
  const restId=location.state.restid
  const Brandid =location.state.brandid
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
  const storedUserID = localStorage.getItem('userID');
  console.log(Rests.restid);
  useEffect(() => {
    axios
      .post(`https://plankton-app-ovujs.ondigitalocean.app/routes/menutype`, {
        userid:  storedUserID,
        action: 'read',
        restid: restId,
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
    setUpdateId(item?.mtid);
    setUpType(item?.menutype);
  };
  const selectMenuType = item => {
    console.log(item);
    setMenuType(item);
    navigate('/cat');
  };
  const UpdateTypeName = () => {
    axios
      .post(`https://plankton-app-ovujs.ondigitalocean.app/routes/menutype`, {
        menutype: UpType,
        MTImage: "",
        mtid: UpdateId,
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
      .post(`https://plankton-app-ovujs.ondigitalocean.app/routes/menutype`, {
        menutype: Name,
        brandid: Brandid,
        restid:restId,
        userid: storedUserID,
        notes: 'notes',
        MTImage: 'null',
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
      .post(`https://plankton-app-ovujs.ondigitalocean.app/routes/menutype`, {
       
      mtid: item.mtid,
      action: 'delete',
      })
      .then((res) => {
        console.log(res.data);
        setaction(!action);
      });
  };

  return (
    <div className="menutype">
      {/* <p>welcome to Menu</p> */}
      {AddFlag == false ? (
        
        <div style={{ marginTop: 10 }}>
          <Button onClick={AddType} variant="contained" 
          startIcon={<AddCircleIcon/>}
          style={{display:"flex",alignItems:"center",justifyContent:"center"}}>

          <span style={{marginTop:"0.2rem"}}>Add Menu Type</span></Button>
        </div>
      ) : (
        <div></div>
      )}
      {AddFlag == false ? (
        Types.map((item, index) => {
          // console.log(item);
          return (
            <div style={{ marginTop: 20 }}>
            <div 
            style={{ 
            
            display:"flex" ,
            alignItems:"center",
           justifyContent:"center",
            
            
            gap:"1rem"
            
            }}
            
            
            >
              {UpdateId == item?.mtid ? (
                <div
                 style={{
                  display:"flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                }}
                
                >
                <div className="wrap14">
                <div >
                      
                        
                      <TextField 
                        
                        defaultValue={UpType}
                        onChange={(event) => {
                          setUpType(event.target.value);
                        }}
                        label="Menu-Type Name"
               variant="outlined"
                      />
                   
                  </div>
                  </div>
                 
                  <Button
                    
                    onClick={() => {
                      setUpdateId(null);
                    }}
                    variant="contained" 
                color="error"
                size="small"
                  >
                    cancel
                  </Button>
                  
                  <Button onClick={UpdateTypeName}
                  variant="contained" 
                color="warning"
                size="small"
                  
                  >
                    Done
                  </Button>
                </div>
              ) : (
                <div className="wrap12">
                  <div style={{ marginLeft: 10 }}>
                    <p style={{ marginBottom: 10 }}>Menu Type: {item?.menutype}</p>
                  </div>
                </div>
              )}
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
                  navigate("/cat", { state: item });
                }}
              >
                <span onClick={()=>selectMenuType(item)}>select</span>
              </button>

            
              </div>
              <hr/>
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
