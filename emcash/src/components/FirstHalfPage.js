import React from "react";
import styled from 'styled-components'
import Vector from "../assets/vector.png"
const FrontLetter = styled.div`
   display:flex;
    
`

const FrontEndCashBlack = styled.h1`
    color: var(--dark-500, #1B1B1B);
    /* subtitle2 */
    font-family: Manrope;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 23.5px; /* 117.5% */
    letter-spacing: -0.4px;
`

const FrontEndCashOrange = styled.h1`
color: var(--primary-500, #EF6F2B);
/* subtitle2 */
font-family: Manrope;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: 23.5px;
letter-spacing: -0.4px;
`
const FrontImage = styled.div`
    height: 80%
`
const StyledVector = styled.img`
    width: 710.143px;
    height: 462.772px;
    transform: rotate(15.512deg);
    flex-shrink: 0;
`

export default function FirstHalfPage(){

    return(
        <>
            <FrontLetter>
                <FrontEndCashBlack>front-end-</FrontEndCashBlack>
                <FrontEndCashOrange>emcash</FrontEndCashOrange>
            </FrontLetter>
            <FrontImage>
                <StyledVector src={Vector} alt="Vector"/> 
            </FrontImage>
            
        </>

    )
}