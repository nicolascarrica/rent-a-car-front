import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import '../src/commons/scss/App.scss'
import MainLayout from "./commons/layouts/MainLayout";
import Customers from "./commons/components/Pages/Customer/Customers";
import CustomerEdit from "./commons/components/Pages/Customer/CustomerEdit";
import CustomerCreate from "./commons/components/Pages/Customer/CustomerCreate";
import Cars from "./commons/components/Pages/Cars/Cars";
import CarsCreate from "./commons/components/Pages/Cars/CarsCreate";
import CarsEdit from "./commons/components/Pages/Cars/CarsEdit";
import Reservations from "./commons/components/Pages/Reservation/Reservation";
import ReservationEdit from "./commons/components/Pages/Reservation/ReservationEdit";
import ReservationCreate from "./commons/components/Pages/Reservation/ReservationCreate";

export const ThemeContext = React.createContext<{ theme: string; setTheme: React.Dispatch<React.SetStateAction<string>> } | null>(null)

function App(): JSX.Element {
  
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="/customers" element={<Customers />} />
              <Route path="/customers/:userId" element={ <CustomerEdit />} />
              <Route path="/add-customer" element={ <CustomerCreate />} />
              <Route path="/cars" element={<Cars />} />
              <Route path="cars/:carId" element={<CarsEdit />} />
              <Route path="add-cars" element={<CarsCreate />}/>
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/reservations/:reservationId" element={<ReservationEdit />} />
              <Route path="add-reservation" element={<ReservationCreate />}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
        

  )
}



export default App
