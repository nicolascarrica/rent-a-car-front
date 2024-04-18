import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import '../src/commons/scss/App.scss'
import MainLayout from "./commons/layouts/MainLayout";
import Customers from "./commons/components/Pages/Customers";



// export const ThemeContext = React.createContext({})
export const ThemeContext = React.createContext<{ theme: string; setTheme: React.Dispatch<React.SetStateAction<string>> } | null>(null)

function App(): JSX.Element {
  
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="/customers" element={<Customers />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
        

  )
}



export default App
