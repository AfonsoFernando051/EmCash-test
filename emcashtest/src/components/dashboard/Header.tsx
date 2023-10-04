import React, {useState, useEffect}  from "react";
import styled from 'styled-components';
import FrontEndCash from "../generics/FrontEndCash";
import User from "../../assets/dashboard/avatarUser.png";
import { GoSignOut } from "react-icons/go"
import ModalOutSystem from "../modals/OutSystem";

export default function Header(){

    const [isModalOutSystem, setModalOutSystem] = useState(false);

    useEffect(() => {
      if (isModalOutSystem) {
        document.body.classList.add('modal-open');
      } else {
        document.body.classList.remove('modal-open');
      }
  
      return () => {
        document.body.classList.remove('modal-open');
      };
    }, [isModalOutSystem]);
  
    const openModalOutSystem = () => {
      setModalOutSystem(true);
      return 0;
    };
  
    const closeModalOutSystem = () => {
      setModalOutSystem(false);
    };

    return(
        <>
          <ModalOutSystem isOpen={isModalOutSystem} onClose={closeModalOutSystem}/>
            <HeaderDashboard>
                <FrontLetter>
                    <FrontEndCash />
                </FrontLetter>
                <UserLogo>
                    <UserImg src={User}/>
                    <UserText> Olá, EmCasher</UserText>
                </UserLogo>
                <GoOutIcon >
                    <GoSignOut onClick={openModalOutSystem}/>
                </GoOutIcon>
            </HeaderDashboard>
        </>
    )
}

const HeaderDashboard = styled.header`
    display: flex;
    padding: 10px 12px;
    align-items: center;
    gap: 24px;
    background: var(--base-branco, #FFF);
    box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.15);
    justify-content: center;
    align-items: center;
`
const FrontLetter = styled.div`
    padding-left:10%
`
const UserLogo = styled.div`
    display: flex;
    align-items:center;
    gap:5px;
    padding-left: 55%
`

const UserImg = styled.img`
    width: 32px;
    height: 32px;
    flex-shrink: 0; 
`

const UserText = styled.h1`
    color: var(--dark-500, #1B1B1B);
    text-align: center;
    /* Body1 */
    font-family: Public Sans;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 18.8px; /* 117.5% */
    letter-spacing: -0.4px;
`
const GoOutIcon = styled.div`
    color: #EF6F2B;
    display: flex;
    font-size: 20px;
    width: 24px;
    height: 24px;
    padding: 3px 2.997px 3px 3px;
    justify-content: center;
    align-items: center;
`
