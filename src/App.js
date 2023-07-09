import {Route, Routes} from "react-router-dom"
import Event from "./Pages/Event";
import EventPage from "./Pages/EventPage";
import RSVP from "./Pages/RSVP";
import Employees from "./Pages/Employees";
import Owner_view from "./Pages/Owner view";
import Employee_view from "./Pages/Employee view";
import Ingredient_view from "./Pages/Ingredient view";
import Location_view from "./Pages/Location view";
import Pilot_view from "./Pages/Pilot view";
import Service_view from "./Pages/Service view";
import Welcome from "./Pages/Welcome";

//<Route path = "/" element = {<Welcome />} />
function App() {
  return (
    <Routes>
      <Route path = "/" element = {<Welcome />} />
      <Route path = "/Event" element = {<EventPage />} />
      <Route path = "/Event/:id" element = {<EventPage />} />
      <Route path = "/Event/RSVP" element = {<RSVP />} />
      <Route path = "/Owner_View" element = {<Owner_view />} />
      <Route path = "/Employee_View" element = {<Employee_view />} />
      <Route path = "/Ingredient_View" element = {<Ingredient_view />} />
      <Route path = "/Location_View" element = {<Location_view />} />
      <Route path = "/Pilot_View" element = {<Pilot_view />} />
      <Route path = "/Service_View" element = {<Service_view />} />
    </Routes>
  );
}

export default App;
