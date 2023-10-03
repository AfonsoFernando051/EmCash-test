import React from "react";
import styled from 'styled-components'
import FirstHalfPage from "../components/loginPage/FirstHalfPage";
import SecondtHalfPage from "../components/loginPage/SecondHalfPage";

export default function HomeLogin(){

    return(
        <>
        <WholePage>
        <HalfPage>
          <FirstHalfPage />  
        </HalfPage>  
        <HalfPage>
            <SecondtHalfPage />  
        </HalfPage>   
        </WholePage>       
        </>

    )
}

const WholePage = styled.div`
    display: flex
`

const HalfPage = styled.div`
    width: 50%;
    background-color: #E8E8E8;
`
