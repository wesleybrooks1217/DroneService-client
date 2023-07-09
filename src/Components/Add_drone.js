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


const Add_drone = ({name}) => {
  
    const handleOpenAlarm = () => {
      setGlobalState("created", true)
    }

    const [id, setId] = React.useState('');
    const [tag, setTag] = React.useState('');
    const [fuel, setFuel] = React.useState('');
    const [capacity, setCapacity] = React.useState('');
    const [sales, setSales] = React.useState('');
    const [flown_by, setFlown_By] = React.useState('');
    /*const [swarm_id, setSwarm_Id] = React.useState(false);
    const [swarm_tag, setSwarmTag] = React.useState(false);
    const [hover, setHover] = React.useState(false); */
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
      handleOpenAlarm()
    }

    const navigate = useNavigate()
    const [eventSaved, setEventSaved] = React.useState('false')

    const getDataId = (e) => {
      setId(e.target.value)
    }
    const getDataTag = (e) => {
      setTag(e.target.value)
    }
    const getDatafuel = (e) => {
      setFuel(e.target.value)
    }
    const getDataCapacity = (e) => {
      setCapacity(e.target.value)
    }
    const getDataSales = (e) => {
      setSales(e.target.value)
    }
    const getDataFlown_by = (e) => {
      setFlown_By(e.target.value)
    }
    /*
    const getSwarm_Id = (e) => {
      setSwarm_id(e.target.value)
    }
    const getDataSwarmTag = (e) => {
      setSwarmTag(e.target.value)
    }
    const getDataHover = (e) => {
      setHover(e.target.value)
    } */

    const data = {
      id,
      tag,
      fuel,
      capacity,
      sales,
      flown_by
}




    const postEvent = () => {
      axios.post('drones/add', data).then(res => handleClose()).catch(err => console.log(err))
    }


    return (
        <div>
          <Button onClick={handleOpen} variant="contained">Add Drone</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                <h1>Add Drone</h1>
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
                  id="fuel" 
                  label="Fuel" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {fuel}
                  onChange = {getDatafuel}
                  />
                <TextField 
                  xs={12} 
                  required 
                  id="capacity" 
                  label="Capacity" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {capacity}
                  onChange = {getDataCapacity}
                  />
                <TextField 
                  xs={12} 
                  required 
                  id="sales" 
                  label="Sales" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {sales}
                  onChange = {getDataSales}
                  />
                  <TextField 
                  xs={12} 
                  required 
                  id="flown_by" 
                  label="Flown By" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {flown_by}
                  onChange = {getDataFlown_by}
                  />
                
                </Grid>
                <Grid item xs={12}>
                <Button xs={12} onClick= {postEvent} variant="contained">Add Drone</Button>
                </Grid>
                </Grid>
            </Box>
          </Modal>
        </div>
      );
}

export default Add_drone