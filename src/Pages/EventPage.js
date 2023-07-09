import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from "@mui/material/Toolbar";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import axios from "axios";

import { ArrowBack, Place, AccessTimeFilled, Restaurant, Add } from '@mui/icons-material';
import { CssBaseline, ListItemText, Tooltip } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import './EventPage.css';
import RSVPModal from "../Components/RSVPModal";
import RSVPModalDelete from "../Components/RSVPModalDelete";
import InviteModal from "../Components/InviteModal";
import DeleteModal from "../Components/DeleteModal";
import CreateEventModal from "../Components/CreateEventModal";

//gui commands
import Add_owner from "../Components/Add_owner";
import Add_drone from "../Components/Add_drone";
import Takeover_drone from "../Components/Takeover_drone";
import Add_restaurant from "../Components/Add_restaurant";
import Add_service from "../Components/Add_service";
import Add_ingredient from "../Components/Add_ingredient";
import Add_pilot_role from "../Components/Add_pilot_role";
import Add_worker_role from "../Components/Add_worker_role";
import Add_location from "../Components/Add_location";
import Start_funding from "../Components/Start_funding";
import Add_employee from "../Components/Add_employee";
import Hire_employee from "../Components/Hire_employee";
import Manage_service from "../Components/Manage_service";
import Fire_employee from "../Components/Fire_employee";
import Join_swarm from "../Components/Join_swarm";
import Leave_swarm from "../Components/Leave_swarm copy";
import Load_drone from "../Components/Load_drone";
import Refuel_drone from "../Components/Refuel_drone";
import Fly_drone from "../Components/Fly_drone";
import Purchase_ingredient from "../Components/Purchase_ingredient";
import Remove_ingredient from "../Components/Remove_ingredient";
import Remove_pilot_role from "../Components/Remove_pilot_role";
import Remove_drone from "../Components/Remove_drone";

const theme = createTheme({
    palette: {
        text: {
            secondary: '#fff',
        },
    },
});

const EventPage = () => {

    let ButtonUser
    let ButtonDelete
    let ButtonOwner
    let ButtonDrone
    let ButtonTakeover
    let ButtonRestaurantAdd
    let ButtonServiceAdd
    let ButtonIngredientAdd
    let ButtonPilotAdd
    let ButtonWorkerAdd
    let ButtonLocationAdd
    let ButtonStartFunding
    let ButtonEmployeeAdd
    let ButtonEmployeeHire
    let ButtonEmployeeFire
    let ButtonJoinSwarm
    let ButtonLeaveSwarm
    let ButtonLoadDrone
    let ButtonRefuelDrone
    let ButtonFlyDrone
    let ButtonPurchaseIngredient
    let ButtonRemoveIngredient



    const navigate = useNavigate();
    const location = useLocation();
    const viewOwner = () =>{
        navigate('/Owner_View')
    }

    const viewEmployee = () =>{
        navigate('/Employee_view')
    }

    const viewLocation = () =>{
        navigate('/Location_view')
    }
    
    const viewPilot = () =>{
        navigate('/Pilot_view')
    }
    
    const viewIngredient = () =>{
        navigate('/Ingredient_view')
    }

    const viewService = () =>{
        navigate('/Service_view')
    }
    const { id } = useParams();

    const [eventInfo, setEventInfo] = useState('');

    return (
        <ThemeProvider theme = { theme }>
            <CssBaseline />
            <AppBar position = "relative">
                <Toolbar>
                    </Toolbar> 
           </AppBar> 
            <main>
                <Container>
                    <Box sx = {{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}>
                        <CreateEventModal name = {location.state.name} event = {id}/>
                        <Add_owner name = {location.state.name} event = {id}/>
                        <Add_employee name = {location.state.name} event = {id}/>
                        <Add_worker_role name = {location.state.name} event = {id}/>
                        <Add_pilot_role name = {location.state.name} event = {id}/>
                        <Remove_pilot_role name = {location.state.name} event = {id}/>
                        <Hire_employee name = {location.state.name} event = {id}/>
                        <Manage_service name = {location.state.name} event = {id}/>
                        <Fire_employee name = {location.state.name} event = {id}/>
                        <Add_drone name = {location.state.name} event = {id}/>
                        <Remove_drone name = {location.state.name} event = {id}/>
                        <Takeover_drone name = {location.state.name} event = {id}/>
                        <Join_swarm name = {location.state.name} event = {id}/>
                        <Leave_swarm name = {location.state.name} event = {id}/>
                        <Load_drone name = {location.state.name} event = {id}/>
                        <Refuel_drone name = {location.state.name} event = {id}/>
                        <Fly_drone name = {location.state.name} event = {id}/>
                        <Add_restaurant name = {location.state.name} event = {id}/>
                        <Add_location name = {location.state.name} event = {id}/>
                        <Start_funding name = {location.state.name} event = {id}/>
                        <Add_service name = {location.state.name} event = {id}/>
                        <Add_ingredient name = {location.state.name} event = {id}/>
                        <Purchase_ingredient name = {location.state.name} event = {id}/>
                        <Remove_ingredient name = {location.state.name} event = {id}/>

                        <Button onClick = {()=>viewOwner()} size ="small">Owner View</Button>
                        <Button onClick = {()=>viewEmployee()} size ="small">Employee View</Button>
                        <Button onClick = {()=>viewPilot()} size ="small">Pilot View</Button>
                        <Button onClick = {()=>viewLocation()} size ="small">Location View</Button>
                        <Button onClick = {()=>viewIngredient()} size ="small">Ingredient View</Button>
                        <Button onClick = {()=>viewService()} size ="small">Service View</Button>
                        <div>{ButtonUser}</div>
                        <div>{ButtonOwner}</div>
                        <div>{ButtonEmployeeAdd}</div>
                        <div>{ButtonEmployeeHire}</div>
                        <div>{ButtonEmployeeFire}</div>
                        <div>{ButtonDrone}</div>
                        <div>{ButtonTakeover}</div>
                        <div>{ButtonJoinSwarm}</div>
                        <div>{ButtonLeaveSwarm}</div>
                        <div>{ButtonLoadDrone}</div>
                        <div>{ButtonRefuelDrone}</div>
                        <div>{ButtonFlyDrone}</div>
                        <div>{ButtonRestaurantAdd}</div>
                        <div>{ButtonLocationAdd}</div>
                        <div>{ButtonStartFunding}</div>
                        <div>{ButtonServiceAdd}</div>
                        <div>{ButtonIngredientAdd}</div>
                        <div>{ButtonPurchaseIngredient}</div>
                        <div>{ButtonRemoveIngredient}</div>
                        <div>{ButtonPilotAdd}</div>
                        <div>{ButtonWorkerAdd}</div>
                        
                        
                    </Box>
                </Container>
            </main>
        </ThemeProvider>
    );
}

export default EventPage