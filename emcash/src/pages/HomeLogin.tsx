import React from "react";
import styled from 'styled-components'
import FirstHalfPage from "../components/FirstHalfPage";
import SecondtHalfPage from "../components/SecondHalfPage";

const WholePage = styled.div`
    display: flex
`

const HalfPage = styled.div`
    width: 50%;
    background-color: #E8E8E8;
`

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