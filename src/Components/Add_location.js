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


const Add_location = ({name}) => {
  
    const handleOpenAlarm = () => {
      setGlobalState("created", true)
    }

    const [label, setLabel] = React.useState('');
    const [x_coord, setXCoord] = React.useState('');
    const [y_coord, setYCoord] = React.useState('');
    const [space, setSpace] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
      handleOpenAlarm()
    }

    const navigate = useNavigate()
    const [eventSaved, setEventSaved] = React.useState('false')

    const getDataLabel = (e) => {
      setLabel(e.target.value)
    }
    const getDataXCoord = (e) => {
      setXCoord(e.target.value)
    }
    const getDataYCoord = (e) => {
      setYCoord(e.target.value)
    }
  const getDataSpace = (e) => {
    setSpace(e.target.value)
  }

    const data = {
      label,
      x_coord,
      y_coord,
      space
}




    const postEvent = () => {
      axios.post('locations/add', data).then(res => handleClose()).catch(err => console.log(err))
    }


    return (
        <div>
          <Button onClick={handleOpen} variant="contained">Add Location</Button>
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
                  id="label" 
                  label="Location Label" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {label}
                  onChange = {getDataLabel}
                  />
                <TextField 
                  xs={12} 
                  required 
                  id="x_coord" 
                  label="X Coordinate" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {x_coord}
                  onChange = {getDataXCoord}
                  />
                <TextField 
                  xs={12}  
                  id="y_coord" 
                  label="Y Coordinate" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {y_coord}
                  onChange = {getDataYCoord}
                  />
                  <TextField 
                  xs={12}  
                  id="space" 
                  label="Space" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {space}
                  onChange = {getDataSpace}
                  />
                
                </Grid>
                <Grid item xs={12}>
                <Button xs={12} onClick= {postEvent} variant="contained"> Add Location</Button>
                </Grid>
                </Grid>
            </Box>
          </Modal>
        </div>
      );
}

export default Add_location