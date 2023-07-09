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


const Hire_employee = ({name}) => {
  
    const handleOpenAlarm = () => {
      setGlobalState("created", true)
    }

    const [username, setUsername] = React.useState('');
    const [id, setID] = React.useState('');
    const [open, setOpen] = React.useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
      handleOpenAlarm()
    }

    const navigate = useNavigate()
    const [eventSaved, setEventSaved] = React.useState('false')

    const getDataUsername = (e) => {
      setUsername(e.target.value)
    }
    const getDataID = (e) => {
      setID(e.target.value)
    }

    const data = {
      username,
      id
}




    const postEvent = () => {
      axios.post('work_for/hire', data).then(res => handleClose()).catch(err => console.log(err))
    }


    return (
        <div>
          <Button onClick={handleOpen} variant="contained">Hire Employee</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                <h1>Hire Employee</h1>
                </Grid>
                <Grid item xs={12}>
                <TextField 
                  xs={12} 
                  required 
                  id="username" 
                  label="Username" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {username}
                  onChange = {getDataUsername}
                  />
                <TextField 
                  xs={12}  
                  id="id" 
                  label="Service ID" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {id}
                  onChange = {getDataID}
                  />
                
                </Grid>
                <Grid item xs={12}>
                <Button xs={12} onClick= {postEvent} variant="contained">Hire Employee</Button>
                </Grid>
                </Grid>
            </Box>
          </Modal>
        </div>
      );
}

export default Hire_employee