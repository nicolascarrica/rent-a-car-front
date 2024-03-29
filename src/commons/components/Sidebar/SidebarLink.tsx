import React from "react";
import { NavLink } from "react-router-dom";
import { LinkContent } from "./Sidebar.styles";

interface SidebarLinkProps {
  item: {
    label: string;
    icon: JSX.Element;
    to: string;
  };
  sidebarOpen: boolean;
}

export const SidebarLink: React.FC<SidebarLinkProps> = ({ item, sidebarOpen }) => {
  
  return (
    <LinkContent>
      <NavLink to={item.to} className={`Links${sidebarOpen ? ' true' : ''}`}>
        <div className="LinkIcon">{item.icon}</div>
        {sidebarOpen && <span>{item.label}</span>}
      </NavLink>
    </LinkContent>
  );
}



