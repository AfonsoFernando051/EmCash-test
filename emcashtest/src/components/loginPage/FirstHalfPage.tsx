import React from "react";
import styled from 'styled-components';
// @ts-ignore
import Vector from "../../assets/login/vector.png";
// @ts-ignore
import Khaby from "../../assets/login/vetor-khaby-lame.png";
// @ts-ignore
import Card from "../../assets/login/Card.png";
// @ts-ignore
import LogoCash from "../../assets/login/logoCash.png";
// @ts-ignore
import ChipCard from "../../assets/login/ChipCard.png";
// @ts-ignore
import Mastercard from "../../assets/login/mastercard.png";
// @ts-ignore
import LineCardAbout from "../../assets/login/lineCardAbout.png";
// @ts-ignore
import LineCardAbove from "../../assets/login/lineCardAbove.png";

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
                <InvestText>O investimento evoluiu. O empréstimo também.</InvestText>  
            </WholePage>
        </>

    )
}

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
const InvestText = styled.h1`
    margin-top: 10%;
    margin-left: 13%;
    color: var(--dark-500, #1B1B1B);
    /* body1 */
    font-family: Public Sans;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 18.8px; /* 117.5% */
    letter-spacing: -0.4px;
`
