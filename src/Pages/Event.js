import React from "react";
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import axios from "axios";
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from "@mui/material";
import { setGlobalState, useGlobalState} from '../state/AlarmStates'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import './Event.css';
import CreateEventModal from '../Components/CreateEventModal';
import EditEventModal from "../Components/EditEventModal";

const theme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const Event = () => {
    const [OpenDeleted, setOpenDeleted] = useState(false)
    const [OpenCreated] = useGlobalState("created")
    const [OpenUpdated] = useGlobalState("updated")
    const handleCreatedClose = (event, reason) => {

        if (reason === 'clickaway') {
            return;
        }

        setGlobalState("created", false)
    }

    const handleUpdatedClose = (event, reason) => {

        if (reason === 'clickaway') {
            return;
        }

        setGlobalState("updated", false)
    }

    const handleDeletedOpen = () => {
        setOpenDeleted(true)
    }

    const handleDeletedClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenDeleted(false)
    }

    const navigate = useNavigate();
    const location = useLocation();
    const [events, setEvent] = useState([]);

    const getAllEvents = () => {
        console.log(OpenCreated)
        axios.get('users/all').then(response => {
            console.log(response)
            setEvent(response.data)
        })
        .catch (err => {
            console.log(err)
            alert("Error fetching event information")
        })
    }

    const deleteEvent = (id) => {
        const link = "event/delete/" + location.state.name +"/" + id
        axios.delete(link).then(response => {
            if (response.data === 1) {
                handleDeletedOpen()
            }
        }).catch(err => console.log(err))
    }

    const viewEvent = (id) => {
        navigate('/event/' + id, {state: {name:location.state.name}});
    }
    
    return (
        <ThemeProvider theme = {theme}>
            <CssBaseline />
            <AppBar position = "relative">
                <Toolbar>
                    <Grid>
                   {  /*   <Typography variant="h6" color="inherit" noWrap>
                            Hi, {location.state.name}
                        </Typography>
                        <Typography variant="h8" color="inherit" noWrap>
                            {location.state.role}
    </Typography> */}
                    
                    </Grid>
                </Toolbar>
            </AppBar>
            <main>
                
                <Box
                sx = {{
                    pt: 8,
                    pb: 0
                }}
                >
                    <Container maxWidth = "sm" align = "center">
                        <Typography
                        className = "title"
                        component = "h1"
                        variant = "h3"
                        align = "center"
                        color = "text.primary"
                        gutterBottom
                        >
                            All Events
                        </Typography>
                        <Typography
                        variant = "h6"
                        align = "center"
                        color = "text.secondary"
                        paragraph
                        >
                            Looking to get involved on campus? Take a look below at all current and upcoming
                            events.
                        </Typography>
                        <CreateEventModal name = {{um: location.state.name}}/>
                        <Snackbar open={OpenCreated} autoHideDuration={6000} onClose={handleCreatedClose}>
                            <Alert onClose={handleCreatedClose} severity="success" sx={{ width: '100%' }}>
                            New Event Created!!
                            </Alert>
                        </Snackbar>
                        <Button onClick = {getAllEvents} size = "small">Reload</Button>
                    </Container>
                </Box>
                <Grid container spacing={4}>
                    {events.map(event => (
                    <Grid item key={event.e_id} xs={12} sm={6} md={4}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">{event.e_name}</Typography>
                                <Typography>{event.info}</Typography>
                                <Typography variant = "h6">Username = {event.username}</Typography>
                                <Typography variant = "h6">First Name (24h) = {event.first_name}</Typography>
                                <Typography variant = "h6">Last Name (24h) = {event.last_name}</Typography>
                                <Typography variant = "h6">Address = {event.address}</Typography>
                                <Typography variant = "h6">Birthdate = {event.birthdate}</Typography>
                            </CardContent>
                            <CardActions>
                            <Button onClick = {()=>viewEvent(event.e_id)} size="small">View</Button>
                                <EditEventModal eventDetail={{em: event}} nameUser = {{nm: location.state.name}}/>
                                <Snackbar open={OpenUpdated} autoHideDuration={6000} onClose={handleUpdatedClose}>
                                    <Alert onClose={handleUpdatedClose} severity="success" sx={{ width: '100%' }}>
                                    Event updated!!
                                    </Alert>
                                </Snackbar>
                                <Button onClick = {()=>deleteEvent(event.e_id)} size = "small">Delete</Button>
                                <Snackbar open={OpenDeleted} autoHideDuration={6000} onClose={handleDeletedClose}>
                                    <Alert onClose={handleDeletedClose} severity="success" sx={{ width: '100%' }}>
                                    Event Deleted!!
                                    </Alert>
                                </Snackbar>
                            </CardActions>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
            </main>
        </ThemeProvider>
    );
}

export default Event