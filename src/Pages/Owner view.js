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

import { setGlobalState, useGlobalState} from '../state/AlarmStates'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const theme = createTheme();


const Owner_view = () => {
    const [OpenCreated] = useGlobalState("created")
    const [OpenUpdated] = useGlobalState("updated")

    const navigate = useNavigate();
    const location = useLocation();
    const [events, setEvent] = useState([]);

    const getAllEvents = () => {
        console.log(OpenCreated)
        axios.get('display_owner_view/all').then(response => {
            console.log(response)
            setEvent(response.data)
        })
        .catch (err => {
            console.log(err)
            alert("Error fetching event information")
        })
    }
 
    return (
        <ThemeProvider theme = {theme}>
            <CssBaseline />
            <AppBar position = "relative">
                <Toolbar>
                    <Grid>
                       {/* <Typography variant="h6" color="inherit" noWrap>
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
                            Owners
                        </Typography>
                        <Typography
                        variant = "h6"
                        align = "center"
                        color = "text.secondary"
                        paragraph
                        >
                        </Typography>
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
                                <Typography variant = "h3">Username = {event.username}</Typography>
                                <Typography variant = "h6">First Name= {event.first_name}</Typography>
                                <Typography variant = "h6">Last Name = {event.last_name}</Typography>
                                <Typography variant = "h6">Address = {event.address}</Typography>
                                <Typography variant = "h6">Num Restaurants = {event.num_restaurants}</Typography>
                                <Typography variant = "h6">Places = {event.places}</Typography>
                                <Typography variant = "h6">Highs = {event.highs}</Typography>
                                <Typography variant = "h6">Lows = {event.lows}</Typography>
                                <Typography variant = "h6">Debt = {event.debt}</Typography>
                            </CardContent>
                            <CardActions>

                            </CardActions>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
            </main>
        </ThemeProvider>
    );
}

export default Owner_view