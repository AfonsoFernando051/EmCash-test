import React from "react";
import styled from 'styled-components';
import Vector from "../assets/vector.png";
import Khaby from "../assets/vetor-khaby-lame.png";
import Card from "../assets/Card.png";
import LogoCash from "../assets/logoCash.png";
import ChipCard from "../assets/ChipCard.png";
import Mastercard from "../assets/mastercard.png";
import LineCardAbout from "../assets/lineCardAbout.png";
import LineCardAbove from "../assets/lineCardAbove.png";

const WholePage = styled.div`
    margin: 0% 2%;
`

const FrontLetter = styled.div`
   display:flex;
   padding: 4% 10%;
   margin-top: 1%;
   margin-bottom: 10%;
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
    position: relative;
    height: 80%
`
const StyledVector = styled.img`
    width: 710.143px;
    height: 462.772px;
    transform: rotate(15.512deg);
    flex-shrink: 0;
`

const ImageText = styled.h1`
    position: absolute;
    top: 74px;
    left:125px;
    width: 27%;
    color: var(--dark-500, #1B1B1B);
    /* subtitle2 */
    font-family: Manrope;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 23.5px; /* 117.5% */
    letter-spacing: -0.4px;    
`

const KhabyImg = styled.img`
    position: absolute;
    top: 40px;
    left: 310px;
`

const CardImg = styled.img`
    position: absolute;
    top: 233px;
    left: 285px;
`
const LogoEmCash = styled.img`
    position: absolute;
    top: 261px;
    left: 366px;
    width: 173.25px;
    height: 48px;
`
const ChipCardImg = styled.img`
    position: absolute;
    top: 319px;
    left: 317px;
`
const MastercardImg = styled.img`
    position: absolute;
    top: 350px;
    left: 500px;
`
const LineCardAboutImg = styled.img`
    position: absolute;
    top: 235px;
    left: 290px;
`

const LineCardAboveImg = styled.img`
    position: absolute;
    top: 254px;
    left: 279px;
`

export default function FirstHalfPage(){

    return(
        <>
            <WholePage>
                <FrontLetter>
                    <FrontEndCashBlack>front-end-</FrontEndCashBlack>
                    <FrontEndCashOrange>emcash</FrontEndCashOrange>
                </FrontLetter>
                <FrontImage>
                    <StyledVector src={Vector} alt="Vector"/> 
                    <ImageText>Seu mundo financeiro em um só lugar</ImageText>
                    <CardImg src={Card}/>
                    <LogoEmCash src={LogoCash}/>
                    <ChipCardImg src={ChipCard}/>
                    <MastercardImg src={Mastercard}/>
                    <LineCardAboutImg src={LineCardAbout} />
                    <LineCardAboveImg src={LineCardAbove}/>
                    <KhabyImg src={Khaby}></KhabyImg>
                </FrontImage>
            </WholePage>
        </>

    )
}