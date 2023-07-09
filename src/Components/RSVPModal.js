import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useState } from "react";
import { Typography } from "@mui/material";

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

const types = [
    {
      value: 'Will Attend',
      label: 'Will Attend',
    },
    {
      value: 'Maybe',
      label: 'Maybe',
    },
    {
      value: "Won't Attend",
      label: "Won't Attend",
    },
    {
      value: "I'm Your Nemesis",
      label: "I'm Your Nemesis",
    },
];  

const RSVPModal = ({name, event}) => {

    const [open, setOpen] = useState(false);
    const [rsvpType, setRsvpType] = useState('Will Attend'); 

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const data = {
        e_id: event,
        rsvp_type: rsvpType,
        username: name
    }

    const getDataRSVP = (event) => {
        setRsvpType(event.target.value)
    }

    const postUser = () => {
        axios.post('/attending/add', data).then(res => console.log(data)).catch(err => console.log(err))
    }

    const rsvpUser = () => {
        postUser();
        handleClose();
    }
    
    return (
        <div>
            <Button onClick={handleOpen} variant="contained">RSVP</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h4">
                        Confirm RSVP?
                    </Typography>
                    <TextField 
                        xs={12}  
                        id="rsvpType" 
                        select
                        label="RSVP Type" 
                        sx={{ width:400 }}
                        variant="outlined" 
                        helperText = { "Select your RSVP type" }
                        value = {rsvpType}
                        onChange = {getDataRSVP}
                    >
                        {types.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}   
                    </TextField>
                    <Button onClick={handleClose} variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={rsvpUser} variant="contained">
                        Confirm
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}

export default RSVPModal