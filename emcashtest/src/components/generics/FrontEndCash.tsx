import React from "react";
import styled from 'styled-components';

export default function FrontEndCash(){

    return(
        <>
            <FrontLetter>
                <FrontEndCashBlack>front-end-</FrontEndCashBlack>
                <FrontEndCashOrange>emcash</FrontEndCashOrange>
            </FrontLetter>
        </>
    )
}

const FrontLetter = styled.div`
   display:flex;
`

const FrontEndCashBlack = styled.h1`
    color: var(--dark-500, #1B1B1B);
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