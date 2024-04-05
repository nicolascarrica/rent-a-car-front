import React from "react"
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./commons/components/Sidebar/Sidebar";
import '../src/commons/scss/App.scss'



// export const ThemeContext = React.createContext({})
export const ThemeContext = React.createContext<{ theme: string; setTheme: React.Dispatch<React.SetStateAction<string>> } | null>(null)

function App(): JSX.Element {
  
  return (
      <div className="App">
        <BrowserRouter>
            <Sidebar/> 
        </BrowserRouter>
      </div>
        

  )
}



export default App
