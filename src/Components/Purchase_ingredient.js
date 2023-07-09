import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select, Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { OpenInBrowserRounded } from "@mui/icons-material";
import { setGlobalState, useGlobalState} from '../state/AlarmStates'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


const Purchase_ingredient = ({name}) => {
  
    const handleOpenAlarm = () => {
      setGlobalState("created", true)
    }
    const [long_name, setLong_name] = React.useState('');
    const [id, setId] = React.useState('');
    const [tag, setTag] = React.useState('');
    const [barcode, setBarcode] = React.useState('');
    const [quantity, setQuantity] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
      handleOpenAlarm()
    }

    const navigate = useNavigate()
    const [eventSaved, setEventSaved] = React.useState('false')

    const getDataLong_name = (e) => {
      setLong_name(e.target.value)
    }
    const getDataId = (e) => {
      setId(e.target.value)
    }
    const getDataTag = (e) => {
      setTag(e.target.value)
    }
    const getDataBarcode = (e) => {
      setBarcode(e.target.value)
    }
    const getDataQuantity = (e) => {
      setQuantity(e.target.value)
    }


    const data = {
      long_name,
      id,
      tag,
      barcode,
      quantity
}




    const postEvent = () => {
      axios.post('purchase_ingredient/purchase', data).then(res => handleClose()).catch(err => console.log(err))
    }


    return (
        <div>
          <Button onClick={handleOpen} variant="contained">Purchase Ingredient</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                <h1>Purchase Ingredient</h1>
                </Grid>
                <Grid item xs={12}>
                <TextField 
                  xs={12} 
                  required 
                  id="long_name" 
                  label="Restaurant Name" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {long_name}
                  onChange = {getDataLong_name}
                  />
                <TextField 
                  xs={12} 
                  required 
                  id="id" 
                  label="Service ID" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {id}
                  onChange = {getDataId}
                  />
                <TextField 
                  xs={12}  
                  id="tag" 
                  label="Tag" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {tag}
                  onChange = {getDataTag}
                  />
                <TextField 
                  xs={12} 
                  required 
                  id="barcode" 
                  label="Barcode" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {barcode}
                  onChange = {getDataBarcode}
                  />
                <TextField 
                  xs={12} 
                  required 
                  id="quantity" 
                  label="Quantity" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {quantity}
                  onChange = {getDataQuantity}
                  />
                </Grid>
                <Grid item xs={12}>
                <Button xs={12} onClick= {postEvent} variant="contained">Purchase Ingredient</Button>
                </Grid>
                </Grid>
            </Box>
          </Modal>
        </div>
      );
}

export default Purchase_ingredient