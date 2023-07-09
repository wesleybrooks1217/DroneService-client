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


const Add_service = ({name}) => {
  
    const handleOpenAlarm = () => {
      setGlobalState("created", true)
    }

    const [id, setID] = React.useState('');
    const [long_name, setLongName] = React.useState('');
    const [home_base, setHome_base] = React.useState('');
    const [manager, setManager] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
      handleOpenAlarm()
    }

    const navigate = useNavigate()
    const [eventSaved, setEventSaved] = React.useState('false')

    const getDataId = (e) => {
      setID(e.target.value)
    }
    const getDataLongName = (e) => {
      setLongName(e.target.value)
    }
    const getDataHome_base = (e) => {
      setHome_base(e.target.value)
    }
  const getDataManager = (e) => {
    setManager(e.target.value)
  }

    const data = {
      id,
      long_name,
      home_base,
      manager
}




    const postEvent = () => {
      axios.post('/delivery_services/add', data).then(res => handleClose()).catch(err => console.log(err))
    }


    return (
        <div>
          <Button onClick={handleOpen} variant="contained">Add Service</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                <h1>Add Service</h1>
                </Grid>
                <Grid item xs={12}>
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
                  required 
                  id="long_name" 
                  label="Service Name" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {long_name}
                  onChange = {getDataLongName}
                  />
                <TextField 
                  xs={12}  
                  id="home_base" 
                  label="Home Base" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {home_base}
                  onChange = {getDataHome_base}
                  />
                  <TextField 
                  xs={12}  
                  id="manager" 
                  label="Manager" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {manager}
                  onChange = {getDataManager}
                  />
                
                </Grid>
                <Grid item xs={12}>
                <Button xs={12} onClick= {postEvent} variant="contained"> Add Service</Button>
                </Grid>
                </Grid>
            </Box>
          </Modal>
        </div>
      );
}

export default Add_service