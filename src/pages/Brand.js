import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Brand.css";
import Button from '@mui/material/Button'; 

import { useNavigate } from "react-router-dom";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import { Exportvalues } from "../context/Context";
import { TextField } from "@mui/material";



function Brand() {
  const navigate = useNavigate();
  const {Brand, setBrand} = useContext(Exportvalues);
  

  const storedUserID = localStorage.getItem('userID');
  // console.log(storedUserID,"stIDDDDD");
 





  const [AddFlag, setAddFlag] = useState(false);
  const [UpdateId, setUpdateId] = useState(null);
  const [UpName, setUpName] = useState();
  const [Name, setName] = useState();
  const [action, setaction] = useState(false);



 

  useEffect(() => {
    axios
    .post(`https://plankton-app-ovujs.ondigitalocean.app/routes/brand`, {
      userid:  storedUserID ,
      action: 'read',
    })
    .then(res => {
      console.log(res.data);
      setBrand(res?.data);
     

    });
   
  }, [action]);

console.log(Brand,"Brand");
  const AddBrand = () => {
    setAddFlag(true);
  };

  const UpdateBrand = (item) => {
    setUpdateId(item?.brandid);
    setUpName(item?.brand);
  };

 

  const UpdateBrandName= () => {
    axios.post(`https://plankton-app-ovujs.ondigitalocean.app/routes/brand`, {
      userid:  storedUserID ,
      action: 'update',
      brand: UpName,
      BImage: "",
      brandid: UpdateId,
    }).then(res => {
      console.log(res.data);
      setaction(!action);
      setUpdateId(null);
    });
  };

  const deleteBrand = (item) => {
    console.log(item);
    axios
      .post(`https://plankton-app-ovujs.ondigitalocean.app/routes/brand`, {
        userid:  storedUserID ,
      action: 'delete',
      brandid: item?.brandid,
      })
      .then((res) => {
        console.log(res.data);
        setaction(!action);
      });
  };

  const submitBrand = () => {
    axios
      .post(`https://plankton-app-ovujs.ondigitalocean.app/routes/brand`, {
        brand: Name,
        BImage: 'null',
        userid:  storedUserID ,
        rank1: 1,
        cUser: storedUserID,
        status1: 1,
        action: 'create',
      })
      .then((res) => {
        console.log(res.data.status);
        setAddFlag(false);
        setaction(!action);
      });
  };

  return (
    <div className="brands" >
      {/* <p>welcome to Menu</p> */}
      {AddFlag == false ? (
        <div style={{ marginTop: 10 }}>
          <Button onClick={AddBrand} variant="contained" 
          startIcon={<AddCircleIcon />}
          style={{display:"flex",alignItems:"center",justifyContent:"center"}}>

          <span style={{marginTop:"0.2rem"}}>Add Brand</span></Button>
        </div>
      ) : (
        <div></div>
      )}
      {AddFlag == false ? (
        Brand.map((item, index) => {
          // console.log(item);
          return (
            <div style={{marginTop: 20} }>
            <div 
            style={{ 
            
            display:"flex" ,
            alignItems:"center",
           justifyContent:"center",
            
            
            gap:"1rem"
            
            }}
            
             >
            {UpdateId == item?.brandid ? (
                <div>
                  <button
                    style={{ marginLeft: 200 }}
                    onClick={() => {
                      setUpdateId(null);
                    }}
                  >
                    cancel
                  </button>
                  <div className="wrap41">
                    <div style={{ marginLeft: 10 }}>
                      <p style={{ marginBottom: 10 }}>
                        Brand Name:{" "}
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
                  <button onClick={UpdateBrandName} style={{ marginLeft: 200 }}>
                    Done
                  </button>
                </div>
              ) : (
                <div className="wrap21">
                  <div style={{ marginLeft: 10 }}>
                    <p style={{ marginBottom: 10 ,fontSize:"25px",fontWeight:600,}} >
                      Brand Name: {item?.brand}
                
                    </p>
                   
                  </div>
                </div>
              )}
           
              <Button
                onClick={() => {
                  deleteBrand(item);
                
                }}
                variant="contained" 
                color="error"
                size="small"
                startIcon={<DeleteIcon />}
              >
                <span style={{marginTop:"0.2rem"}}>Delete</span>
              </Button>
            
              <Button
                style={{ marginLeft: 10 }}
                onClick={() => {
                  UpdateBrand(item);
                }}
                variant="contained" 
                size="small"
                color="warning"
                startIcon={<EditIcon />}
              >
           
           <span style={{marginTop:"0.2rem"}}>Edit</span>
           
              </Button>
              <Button
                style={{ marginLeft: 10 }}
                onClick={() => {
                  navigate("/rest", { state: { item, selectedIndex: index }  });
                }}
                variant="contained" 
                size="small"
                color="success"
                startIcon={<TouchAppIcon/>}
              >
                 <span style={{marginTop:"0.2rem"}}>Select</span>
              </Button>

             </div>
             <hr/>
            </div>
          );
        })
      ) : (
        <div style={{
          display:"flex",
          flexDirection:"column",
          alignItems:"center",
          justifyContent:"center",
          gap:"1rem"
        }}
        >
          <div className="wrap31" >
            <p>Add new brand</p>
            <div style={{ marginTop: 10 }}>
              <TextField 
                name="postContent"
                rows={2}
                cols={40}
             
                onChange={(event) => {
                  setName(event.target.value);
                }}
                label="Brand Name"
                 variant="outlined"
              />
            </div>
          </div>
<div  style={{
          display:"flex",
        
          alignItems:"center",
          justifyContent:"center",
          gap:"1rem"
        }}>
          <Button type="submit" variant="contained" onClick={submitBrand}>
            Submit
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={() => {
              setAddFlag(false);
            }}
            style={{ marginLeft: 20 }}
          >
            cancel
          </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Brand;
