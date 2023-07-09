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


const Join_swarm = ({name}) => {
  
    const handleOpenAlarm = () => {
      setGlobalState("created", true)
    }

    const [id, setId] = React.useState('');
    const [tag, setTag] = React.useState('');
    const [swarm_tag, setSwarm_tag] = React.useState('');
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
    const getDataSwarmTag = (e) => {
      setSwarm_tag(e.target.value)
    }

    const data = {
      id,
      tag,
      swarm_tag
}




    const postEvent = () => {
      axios.post('drones/join_swarm', data).then(res => handleClose()).catch(err => console.log(err))
    }


    return (
        <div>
          <Button onClick={handleOpen} variant="contained">Join Swarm</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                <h1>Join Swarm</h1>
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
                  id="swarm_tag" 
                  label="Swarm Tag" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {swarm_tag}
                  onChange = {getDataSwarmTag}
                  />
                
                </Grid>
                <Grid item xs={12}>
                <Button xs={12} onClick= {postEvent} variant="contained">Join Swarm</Button>
                </Grid>
                </Grid>
            </Box>
          </Modal>
        </div>
      );
}

export default Join_swarm