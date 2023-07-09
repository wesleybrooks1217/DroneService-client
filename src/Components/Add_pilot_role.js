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


const Add_pilot_role = ({name}) => {
  
    const handleOpenAlarm = () => {
      setGlobalState("created", true)
    }

    const [username, setUsername] = React.useState('');
    const [licenseID, setLicenseID] = React.useState('');
    const [experience, setExperience] = React.useState('');
    const [open, setOpen] = React.useState(false);
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
    const getDataLicenseID = (e) => {
      setLicenseID(e.target.value)
    }
    const getDataExperience = (e) => {
      setExperience(e.target.value)
    }

    const data = {
      username,
      licenseID,
      experience
}




    const postEvent = () => {
      axios.post('/pilots/add', data).then(res => handleClose()).catch(err => console.log(err))
    }


    return (
        <div>
          <Button onClick={handleOpen} variant="contained">Add Pilot Role</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                <h1>Add Pilot Role</h1>
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
                  required 
                  id="licenseID" 
                  label="License ID" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {licenseID}
                  onChange = {getDataLicenseID}
                  />
                <TextField 
                  xs={12}  
                  id="experience" 
                  label="Experience" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {experience}
                  onChange = {getDataExperience}
                  />
                </Grid>
                <Grid item xs={12}>
                <Button xs={12} onClick= {postEvent} variant="contained"> Add Pilot Role</Button>
                </Grid>
                </Grid>
            </Box>
          </Modal>
        </div>
      );
}

export default Add_pilot_role