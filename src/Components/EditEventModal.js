
import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateEventModal from "./CreateEventModal";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
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

const EditEventModal = ({eventDetail, nameUser}) => {

  const handleOpenAlarm = () => {
    setGlobalState("updated", true)
  }

    const [e_name, setEventName] = React.useState('');
    const [e_date, setEventDate] = React.useState('');
    const [e_time, setEventTime] = React.useState('');
    const [location, setEventLoc] = React.useState('');
    const [capacity, setEventCap] = React.useState('');
    const [info, setEventDesc] = React.useState('');
  
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        if (eventDetail.em.username === nameUser.nm || nameUser.nm == 'Admin') {
            setOpen(true);
            
            setEventName(eventDetail.em.e_name)
            setEventDate(eventDetail.em.e_date)
            setEventTime(eventDetail.em.e_time)
            setEventLoc(eventDetail.em.location)
            setEventCap(eventDetail.em.capacity)
            setEventDesc(eventDetail.em.info)
        }
    }

    const handleClose = () => {
      setOpen(false);
      handleOpenAlarm()
    }
    const navigate = useNavigate()
    const [eventSaved, setEventSaved] = React.useState('false')
    
    const data = {
        e_id: eventDetail.em.e_id,
        e_name,
        o_name: eventDetail.em.o_name,
        username: eventDetail.em.username,
        e_date,
        e_time,
        e_type: eventDetail.em.e_type,
        location,
        cost: eventDetail.em.cost,
        info,
        capacity,
        attendees: eventDetail.em.attendees
    }

    const updateEvent = () => {
      axios.put('event/update/', data).then(res => handleClose()).catch(err => console.log(err))
    }


    
    const getDataName = (e) => {
      setEventName(e.target.value)
    }
    const getDataDesc = (e) => {
      setEventDesc(e.target.value)
    }
    const getDataTime = (e) => {
      setEventTime(e.target.value)
    }
    const getDataLoc = (e) => {
      setEventLoc(e.target.value)
    }
    const getDataDate = (e) => {
      setEventDate(e.target.value)
    }
    const getDataCap = (e) => {
        setEventCap(e.target.value)
    }
    return (
        <div>
          <Button onClick={handleOpen} size="small">Edit</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                <h1>Edit Event Info</h1>
                </Grid>
                <Grid item xs={12}>
                <TextField 
                  xs={12} 
                  required 
                  id="eventName" 
                  label="Event Name" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {e_name}
                  onChange = {getDataName}
                  />
                <TextField 
                  xs={12}  
                  id="eventDesc" 
                  label="Event Description" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {info}
                  onChange = {getDataDesc}
                  />
                <TextField 
                  xs={12} 
                  required 
                  id="eventTime" 
                  label="Time" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {e_time}
                  onChange = {getDataTime}
                  />
                <FormControl sx={{ m: 0, width: 400 }}>
                  <InputLabel id="location-label">Location</InputLabel>
                  <Select
                  labelId="location-label"
                  id = "location"
                  value = {location}
                  label = "Invite Only"
                  onChange={getDataLoc}

                  >
                    <MenuItem value = 'Tech Green'>Tech Green</MenuItem>
                    <MenuItem value = 'CULC'>CULC</MenuItem>
                    <MenuItem value = 'Student Center'>Student Center</MenuItem>
                    <MenuItem value = 'Instructional Center'>Instructional Center</MenuItem>
                    <MenuItem value = 'College of Computing'>College of Computing</MenuItem>
                  </Select>
                </FormControl>
                <TextField 
                  xs={12} 
                  required 
                  id="eventDate" 
                  label="Date" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {e_date}
                  onChange = {getDataDate}
                  />
                  <TextField 
                  xs={12} 
                  required 
                  id="eventCapacity" 
                  label="capacity" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {capacity}
                  onChange = {getDataCap}
                  />
                </Grid>
                <Grid item xs={12}>
                <Button xs={12} onClick= {updateEvent} variant="contained">Edit Event</Button>
                </Grid>
                </Grid>
            </Box>
          </Modal>
        </div>
    );
}

export default EditEventModal