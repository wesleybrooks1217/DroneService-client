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


const CreateEventModal = ({name}) => {
  
    const handleOpenAlarm = () => {
      setGlobalState("created", true)
    }

    const [username, setUsername] = React.useState('');
    const [first_name, setFirstName] = React.useState('');
    const [last_name, setLastName] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [birthdate, setBirthdate] = React.useState('');
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
    const getDataFirstName = (e) => {
      setFirstName(e.target.value)
    }
    const getDataLastName = (e) => {
      setLastName(e.target.value)
    }
    const getDataAddress = (e) => {
      setAddress(e.target.value)
    }
    const getDataBirthdate = (e) => {
      setBirthdate(e.target.value)
    }

    const data = {
      username,
      first_name,
      last_name,
      address,
      birthdate
    }



    const postEvent = () => {
      axios.post('users/add', data).then(res => handleClose()).catch(err => console.log(err))
    }


    return (
        <div>
          <Button onClick={handleOpen} variant="contained">Add User</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                <h1>Create New User</h1>
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
                  id="first_name" 
                  label="First Name" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {first_name}
                  onChange = {getDataFirstName}
                  />
                <TextField 
                  xs={12} 
                  required 
                  id="last_name" 
                  label="Last Name" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {last_name}
                  onChange = {getDataLastName}
                  />
                <TextField 
                  xs={12} 
                  required 
                  id="address" 
                  label="Address" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {address}
                  onChange = {getDataAddress}
                  />
                <TextField 
                  xs={12} 
                  required 
                  id="birthdate" 
                  label="Birthdate" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {birthdate}
                  onChange = {getDataBirthdate}
                  />
                
                </Grid>
                <Grid item xs={12}>
                <Button xs={12} onClick= {postEvent} variant="contained">Create User</Button>
                </Grid>
                </Grid>
            </Box>
          </Modal>
        </div>
      );
}

export default CreateEventModal