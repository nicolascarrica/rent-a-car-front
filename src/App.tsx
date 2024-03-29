import React, { useMemo } from "react"
import styled, { ThemeProvider } from "styled-components"
import { MyRoutes } from "./commons/routes/routes"
import { BrowserRouter } from "react-router-dom"
import { Sidebar } from "./commons/components/Sidebar/Sidebar"
import { Light, Dark } from '../src/commons/styles/Themes'

// export const ThemeContext = React.createContext({})
export const ThemeContext = React.createContext<{ theme: string; setTheme: React.Dispatch<React.SetStateAction<string>> } | null>(null)

function App(): JSX.Element {
  const [theme, setTheme] = React.useState("light")
  const themeStyle = theme === "light" ? Light : Dark

  const [sidebarOpen, setSidebarOpen] = React.useState(true)
  const contextValue = useMemo(() => ({ theme, setTheme }), [theme, setTheme])

  return (
  
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={themeStyle}>
        <BrowserRouter>
          <Container className={sidebarOpen ? "sidebarState active" : "sidebarState"}> 
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
            <MyRoutes />    
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    </ThemeContext.Provider>

  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 90px auto;
  background: ${({ theme }) => theme.bgtotal};
  transition:all 0.3s;
  &.active {
    grid-template-columns: 300px auto;
  }
  color:${({theme})=>theme.text};
`;

export default App
