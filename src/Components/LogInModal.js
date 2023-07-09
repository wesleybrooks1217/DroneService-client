import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import {Link,  useNavigate } from "react-router-dom";
import axios from "axios";
import { setGlobalState, useGlobalState} from '../state/AlarmStates'

const roles = [
  {
    value: 'Student',
    label: 'Pilot',
  },
  {
    value: 'Teacher',
    label: 'Worker',
  },
  {
    value: 'Organizer',
    label: 'Owner',
  },
];


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const LogInModal = () => {

  
  const [name, setName] = React.useState('')
  const [role, setRole] = React.useState('Student')
  const [errorName, setErrorName] = React.useState(true)
  const [errorRole, setErrorRole] = React.useState(true)
  const [errorNameLogin, setErrorNameLogin] = React.useState(false)
  const [errorRoleLogin, setErrorRoleLogin] = React.useState(false)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate()
  const [logedIn, setLogIn] = React.useState('false')

  const getDataName = (event) => {
    setName(event.target.value)
  }

  const getDataRole = (event) => {
    setRole(event.target.value)
  }


  const data = {
    username: name,
    name: 'rand',
    admin_role: false
  }

  const postUser = () => {
    axios.post('user/add', data).then(res => console.log(data)).catch(err => console.log(err))
  }

  const Login = () => {
      if (name.trim().length === 0) {
        setErrorName(false)
        setErrorNameLogin(false)
      } else {
        setErrorName(true)
        setErrorNameLogin(true)
      }

      if (role.trim().length === 0) {
        setErrorRole(false)
        setErrorRoleLogin(false)
      } else {
        setErrorRole(true)
        setErrorRoleLogin(true)
      }
  }

  React.useEffect(() => {
      if (errorNameLogin && errorRoleLogin) {
          postUser()
          setLogIn('true')
          navigate('/event', {state: {name:name, role:role}})
      } else {
          setLogIn('false')
      }
  }, [errorNameLogin, errorRoleLogin])

  


  return (
    <div>
      <Button onClick={handleOpen} variant="contained">Log In</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
            <h1>Enter Login Info</h1>
            </Grid>
            <Grid item xs={12}>
            <TextField 
              xs={12} 
              required 
              id="name" 
              label="Name" 
              variant="outlined"
              helperText = {!errorName ? "Invalid Name" : "Please enter your name"} 
              sx={{ width:400 }}
              value = {name}
              onChange = {getDataName}
              error = {!errorName}
              />
            </Grid>

            <Grid item xs={12}>
            <TextField 
            xs={12} 
            required 
            id="role" 
            select
            label="Role" 
            sx={{ width:400 }}
            variant="outlined" 
            helperText = {!errorRole ? "Please select a role" : "Please select your campus role" }
            value = {role}
            onChange = {getDataRole}
            error = {!errorRole}
            >
                {roles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}   
            </TextField>
            </Grid>

            <Grid item xs={12}>
            <Button xs={12} onClick= {Login} variant="contained">Log In</Button>
            </Grid>
            </Grid>
        </Box>
      </Modal>
    </div>
  );
}

export default LogInModal