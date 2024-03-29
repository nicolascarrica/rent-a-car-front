import React from "react";
import { ToggleSwitch } from "./Sidebar.styles";

interface ThemeToggleProps {
  sidebarOpen: boolean;
  toggleTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ sidebarOpen, toggleTheme }) => {
  return (
    <div className="ThemeContent">
      {sidebarOpen && <span>Dark Mode</span>}
      <div className="ToggleContent">
        <ToggleSwitch>
          <input type="checkbox" className="theme-switcher" onClick={toggleTheme} />
          <span className="slider"></span>
        </ToggleSwitch>
      </div>
    </div>
  );
}