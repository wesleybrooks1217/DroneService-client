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


const Add_restaurant = ({name}) => {
  
    const handleOpenAlarm = () => {
      setGlobalState("created", true)
    }

    const [long_name, setLongName] = React.useState('');
    const [rating, setRating] = React.useState('');
    const [spent, setSpent] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
      handleOpenAlarm()
    }

    const navigate = useNavigate()
    const [eventSaved, setEventSaved] = React.useState('false')

    const getDataLongName = (e) => {
      setLongName(e.target.value)
    }
    const getDataRating = (e) => {
      setRating(e.target.value)
    }
    const getDataSpent = (e) => {
      setSpent(e.target.value)
    }
  const getDataLocation = (e) => {
    setLocation(e.target.value)
  }

    const data = {
      long_name,
      rating,
      spent,
      location
}




    const postEvent = () => {
      axios.post('restaurants/add', data).then(res => handleClose()).catch(err => console.log(err))
    }


    return (
        <div>
          <Button onClick={handleOpen} variant="contained">Add Restaurant</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                <h1>Add Restaurants</h1>
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
                  onChange = {getDataLongName}
                  />
                <TextField 
                  xs={12} 
                  required 
                  id="rating" 
                  label="Rating" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {rating}
                  onChange = {getDataRating}
                  />
                <TextField 
                  xs={12}  
                  id="spent" 
                  label="Spent" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {spent}
                  onChange = {getDataSpent}
                  />
                  <TextField 
                  xs={12}  
                  id="location" 
                  label="Location" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {location}
                  onChange = {getDataLocation}
                  />
                
                </Grid>
                <Grid item xs={12}>
                <Button xs={12} onClick= {postEvent} variant="contained"> Add Restaurant</Button>
                </Grid>
                </Grid>
            </Box>
          </Modal>
        </div>
      );
}

export default Add_restaurant