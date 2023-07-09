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


const Add_employee = ({name}) => {
  
    const handleOpenAlarm = () => {
      setGlobalState("created", true)
    }

    const [ip_username, setUsername] = React.useState('');
    const [ip_first_name, setFirstName] = React.useState('');
    const [ip_last_name, setLastName] = React.useState('');
    const [ip_address, setAddress] = React.useState('');
    const [ip_birthdate, setBirthdate] = React.useState('');
    const [ip_taxID, setTaxID] = React.useState('');
    const [ip_hired, setHired] = React.useState('');
    const [ip_employee_experience, setExperience] = React.useState('');
    const [ip_salary, setSalary] = React.useState(''); 
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
    const getTaxID = (e) => {
      setTaxID(e.target.value)
    }
    const getDataHired = (e) => {
      setHired(e.target.value)
    }
    const getDataExperience = (e) => {
      setExperience(e.target.value)
    }
    const getDataSalary = (e) => {
      setSalary(e.target.value)
    }

    const data = {
      ip_username,
      ip_first_name,
      ip_last_name,
      ip_address,
      ip_birthdate,
      ip_taxID,
      ip_hired,
      ip_employee_experience,
      ip_salary
}




    const postEvent = () => {
      axios.post('add_employees/add', data).then(res => handleClose()).catch(err => console.log(err))
    }


    return (
        <div>
          <Button onClick={handleOpen} variant="contained">Add Employee</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                <h1>Add Employee</h1>
                </Grid>
                <Grid item xs={12}>
                <TextField 
                  xs={12} 
                  required 
                  id="ip_username" 
                  label="Username" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {ip_username}
                  onChange = {getDataUsername}
                  />
                <TextField 
                  xs={12}  
                  id="ip_first_name" 
                  label="First Name" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {ip_first_name}
                  onChange = {getDataFirstName}
                  />
                <TextField 
                  xs={12} 
                  required 
                  id="ip_last_name" 
                  label="Last Name" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {ip_last_name}
                  onChange = {getDataLastName}
                  />
                <TextField 
                  xs={12} 
                  required 
                  id="ip_address" 
                  label="Address" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {ip_address}
                  onChange = {getDataAddress}
                  />
                  <TextField 
                  xs={12} 
                  required 
                  id="ip_birthdate" 
                  label="Birthdate" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {ip_birthdate}
                  onChange = {getDataBirthdate}
                  />
                  <TextField 
                  xs={12} 
                  required 
                  id="ip_taxID" 
                  label="Tax ID" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {ip_taxID}
                  onChange = {getTaxID}
                  />
                  <TextField 
                  xs={12} 
                  required 
                  id="ip_hired" 
                  label="Hiring Date" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {ip_hired}
                  onChange = {getDataHired}
                  />
                  <TextField 
                  xs={12} 
                  required 
                  id="ip_experience" 
                  label="Experience" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {ip_employee_experience}
                  onChange = {getDataExperience}
                  />
                  <TextField 
                  xs={12} 
                  required 
                  id="ip_salary" 
                  label="Salary" 
                  variant="outlined"
                  sx={{ width:400 }}
                  value = {ip_salary}
                  onChange = {getDataSalary}
                  />
                
                </Grid>
                <Grid item xs={12}>
                <Button xs={12} onClick= {postEvent} variant="contained">Add Employee</Button>
                </Grid>
                </Grid>
            </Box>
          </Modal>
        </div>
      );
}

export default Add_employee