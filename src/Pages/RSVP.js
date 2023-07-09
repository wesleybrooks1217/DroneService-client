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
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { Snackbar } from "@mui/material";
import { setGlobalState, useGlobalState} from '../state/AlarmStates'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import './Event.css';
import CreateEventModal from '../Components/CreateEventModal';
import EditEventModal from "../Components/EditEventModal";

const theme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const RSVP = () => {
    const [OpenDeleted, setOpenDeleted] = useState(false)
    const [OpenCreated] = useGlobalState("created")
    const [OpenUpdated] = useGlobalState("updated")
    const [loading, setLoading] = useState(false);

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
    const [events, setEvent] = useState([]); // full event list
    const [eventsList, setEventList] = useState([]); // full event list
    const [isFiltering, setIsFiltering] = useState(false);





    /*
    *   Sends GET request for all event data and adds this to events array
    */
    const loadEventsAll = () => {
        axios.get('getRSVP/' + location.state.name).then(response => {
            //console.log(response)
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

    const viewMap = () => {
        navigate('/event/map', {state: {name:location.state.name}});
    }

    const viewRSVP = () => {
        navigate('/event/RSVP', {state: {name:location.state.name}});
    }
    
    /*
    *   Plays loading animation for 1 second while
    *   axios sends GET request for all events
    */
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        loadEventsAll();
    }, []);

    return (
        <ThemeProvider theme = {theme}>
            <CssBaseline />
            <AppBar position = "sticky">
                <Toolbar>
                    <Grid>
                        <Typography variant="h6" color="inherit" noWrap>
                            Hi, {location.state.name}
                        </Typography>
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
                    <Container maxWidth = "sm" align = "center" sx={{ mb: 6 }}>
                        <Typography
                        className = "title"
                        component = "h1"
                        variant = "h3"
                        align = "center"
                        color = "text.primary"
                        gutterBottom
                        >
                            All RSVP events
                        </Typography>
                    </Container>
                </Box>
                <Grid container spacing={4} sx={{ mx: "auto", width: 1200, mb: 4 }}>
                    {events.map(event => (
                        <Grid item key={event.e_id} xs={12} sm={6} md={4}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">{event.e_name}</Typography>
                                        <Typography>{event.info}</Typography>
                                        <Typography variant = "h6">Time (24h) = {event.e_time}</Typography>
                                        <Typography variant = "h6">Date = {event.e_date}</Typography>
                                        <Typography variant = "h6">Location = {event.location}</Typography>
                                        <Typography variant = "h6">Creator = {event.username}</Typography>
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

export default RSVP;