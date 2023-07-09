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


const Add_ingredient = ({name}) => {
  
    const handleOpenAlarm = () => {
      setGlobalState("created", true)
    }

    const [barcode, setBarcode] = React.useState('');
    const [iname, setIname] = React.useState('');
    const [weight, setWeight] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
      handleOpenAlarm()
    }

    const navigate = useNavigate()
    const [eventSaved, setEventSaved] = React.useState('false')

    const getDataBarcode = (e) => {
      setBarcode(e.target.value)
    }
    const getDataIname = (e) => {
      setIname(e.target.value)
    }
    const getDataWeight = (e) => {
      setWeight(e.target.value)
    }

    const data = {
      barcode,
      iname,
      weight
}




    const postEvent = () => {
      axios.post('/ingredients/add', data).then(res => handleClose()).catch(err => console.log(err))
    }


    return (
        <div>
          <Button onClick={handleOpen} variant="contained">Add Ingredient</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                <h1>Add Ingredient</h1>
                </Grid>
                <Grid item xs={12}>
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
                  id="iname" 
                  label="Ingredient Name" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {iname}
                  onChange = {getDataIname}
                  />
                <TextField 
                  xs={12}  
                  id="weight" 
                  label="Weight" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {weight}
                  onChange = {getDataWeight}
                  />
                </Grid>
                <Grid item xs={12}>
                <Button xs={12} onClick= {postEvent} variant="contained"> Add Ingredient</Button>
                </Grid>
                </Grid>
            </Box>
          </Modal>
        </div>
      );
}

export default Add_ingredient