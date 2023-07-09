import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import axios from "axios";
import { useState } from "react";
import { TextField, Typography } from "@mui/material";

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

const DeleteModal = ({name, event}) => {

    const [open, setOpen] = useState(false);
    const [username, setUserName] = useState("")

    const getUsername = (event) => {
        setUserName(event.target.value)
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const data = {
        e_id: event,
        rsvp_type: "Invited",
        username
    }

    const deleteUser = () => {
        axios.delete('/attending/delete/' + username + "/" + event + "/" + name).then(res => console.log(data)).catch(err => console.log(err))
    }

    const rsvpUser = () => {
        deleteUser();
        console.log(username + " successfully deleted at event id " + event);
        handleClose();
    }
    
    return (
        <div>
            <Button onClick={handleOpen} variant="contained">Delete Attendee</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h4">
                        Host remove someone.
                    </Typography>
                    <TextField
                        xs={12} 
                        required 
                        id="eventName" 
                        label="Delete name" 
                        variant="outlined"
                        sx={{ width:300 }}
                        value = {username}
                        onChange = {getUsername}
                    />
                    

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

export default DeleteModal