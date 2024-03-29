import styled from "styled-components";
import { Variables } from "../../styles/Variables";

interface ContainerProps {
    isOpen: boolean;
  }
export const SidebarContainer = styled.div<ContainerProps>`
  color: ${(props) => props.theme.text}; 
  background: ${(props) => props.theme.bg};
  position: sticky;
  padding-top: 20px;
  .SidebarButton{
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: ${Variables.xxlSpacing};
    right: -18px;
    background: ${(props) => props.theme.bgtgderecha};
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 4px ${(props) => props.theme.bg3}. 0 0 7px ${(props) => props.theme.bg};
    transition: all 0.3s;
    transform: ${({ isOpen }) => (isOpen ? `rotate(0)` : `rotate(180deg)`)};
    border: none;
    letter-spacing: inherit;
    color: inherit;
    font-size: inherit;
    font-family: inherit;
    outline: none;
    padding: 0;
  }
  .logoContent{
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom:${Variables.lgSpacing};
    .imgContent{
      display: flex;
      img{
        max-width: 100%;
        height: 80px;
      }
      cursor: pointer;
      transition: all 0.3s;
      transform: ${({ isOpen }) => (isOpen ? `scale(.7)` : `scale(0.9)`)};
    }
    h2{
      display: ${({ isOpen }) => (isOpen ? `block` : `none`)};
    }
  }
  .LinkContent{
    
    }
    .Links{
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: calc(${Variables.smSpacing}-2px) 0;
      color:${(props) => props.theme.text};
      height: 50px;
      .LinkIcon{
        padding: ${Variables.smSpacing} ${Variables.mdSpacing};
        display: flex;
        svg{
          font-size: 25px;
        }
      }
      &.active{
        .LinkIcon{
          svg{
            color:${(props) => props.theme.bg4};
          }
        }
      }
    }
  }
}
`

export const Divider: React.FC = styled.div`
  height: 1px;
  width: 100%;
  background: ${(props) => props.theme.bg3};
  margin: ${Variables.lgSpacing} 0;
`;

export const LinkContent = styled.div`
    margin: 8px 0;
    padding: 0 15%;
    :hover{
      background: ${(props) => props.theme.bg3};
    }
    .Links{
        display: flex;
        align-items: center;
        text-decoration: none;
        padding: calc(${Variables.smSpacing}-2px) 0;
        color:${(props) => props.theme.text};
        height: 50px;
        .LinkIcon{
          padding: ${Variables.smSpacing} ${Variables.mdSpacing};
          display: flex;
          svg{
            font-size: 25px;
          }
        }
        &.active{
          .LinkIcon{
            svg{
              color:${(props) => props.theme.bg4};
            }
          }
        }
    }
`

export const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 34px;

    &::before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: 0.4s;
      border-radius: 50%;
    }
  }

  input:checked + .slider {
    background-color: #2196f3;
  }

  input:checked + .slider::before {
    transform: translateX(26px);
  }
`;
