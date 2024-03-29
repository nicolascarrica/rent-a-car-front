import { AiOutlineCalendar, AiOutlineCar, AiOutlineHome, AiOutlineUser } from "react-icons/ai";

export const DataLinks = [
  {
    label: "Home",
    icon: <AiOutlineHome />,
    to: "/", 
  },
  {
    label: "Cars",
    icon: <AiOutlineCar />,
    to: "/cars",
  },
  {
    label: "Users",
    icon: <AiOutlineUser />,
    to: "/users",
  },
  {
    label: "Reservations",
    icon: <AiOutlineCalendar />,
    to: "/reservations",
  }
]

export const SecondaryLinks = [
  {
    label: "Logout",
    icon: <AiOutlineUser />,
    to: "/",
  },

{
  label: "Login",
  icon: <AiOutlineUser />,
  to: "/",
}

  
]

