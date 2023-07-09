import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
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

const RSVPModalDelete = ({name, event}) => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const data = {
        username: name,
        e_id: event
    }

    const postUser = () => {
        //axios.delete('/attending/delete', data).then(res => console.log(data)).catch(err => console.log(err));
        //const link = '/attending/delete/' + name + '/' + event + '/' + name;
        const link = '/attending/delete/' + name + '/' + event + '/' + name;
        //console.log (link)
        axios.delete(link);
        //axios.delete('http://localhost:8081/attending/delete/' + name + '/' + event + '/' + name);
    }

    const rsvpRemUser = () => {
        postUser();
        console.log(name + " successfully removed from the RSVP list for event id " + event);
        handleClose();
    }
    
    return (
        <div>
            <Button onClick={handleOpen} variant="contained">Delete RSVP</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h4">
                        Confirm Delete?
                    </Typography>
                    <Button onClick={handleClose} variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={rsvpRemUser} variant="contained">
                        Confirm
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}

export default RSVPModalDelete