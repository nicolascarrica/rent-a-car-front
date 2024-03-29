
import { ThemeContext } from "../../../App";
import { useContext } from "react";
import { Divider, SidebarContainer } from "./Sidebar.styles";
import { AiOutlineLeft } from "react-icons/ai";
import logo from "../../assets/images/rent-a-car.png"
import { DataLinks, SecondaryLinks } from "../../utils/DataLinks";
import { SidebarLink } from "./SidebarLink";
import { ThemeToggle } from "./ThemeToggle";
interface SidebarProps {
  readonly sidebarOpen: boolean;
  readonly setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) =>{
  const { theme, setTheme } = useContext(ThemeContext) || { theme: "default", setTheme: () => {} }
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light")

  return (
    <SidebarContainer isOpen={sidebarOpen}>
      <button 
        className="SidebarButton"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <AiOutlineLeft/>
      </button>
      <div className="logoContent">
        <div className="imgContent">
          <img src={logo} alt="Logo" />
        </div>
        <h2>Rent-A-Car</h2>
      </div>
      {DataLinks.map((item) => (
        <SidebarLink key={item.label} item={item} sidebarOpen={sidebarOpen} />
      ))}
      <Divider />
      {SecondaryLinks.map((item) => (
        <SidebarLink key={item.label} item={item} sidebarOpen={sidebarOpen} />
      ))}
      <Divider />
      <ThemeToggle sidebarOpen={sidebarOpen} toggleTheme={toggleTheme} />
    </SidebarContainer>
  ) 
}