import React, { useState } from "react";
import styled from "styled-components";

export default function NavFuncionarios(){
    const [count, setCount] = useState(0);

    return(
        <NavSelection>
            <NavSelectionTitle>
                Lista de funcionários
            </NavSelectionTitle>
            <NavSelectionButton>Adicionar novo</NavSelectionButton>
            <Selection>
                <Selected>Selecionados({count})</Selected>
                <DeleteSelection>Apagar Seleção</DeleteSelection>
            </Selection>
        </NavSelection>
    )
}

const NavSelection = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    align-self: stretch;
`
const NavSelectionTitle = styled.h1`
    color: var(--dark-500, #1B1B1B);

    font-family: Manrope;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 23.5px; /* 117.5% */
    letter-spacing: -0.4px;
`
const NavSelectionButton = styled.button`
    display: flex;
    padding: 12px 16px;
    flex-direction: column;
    align-items: center;
    border-radius: 4px;
    background: var(--primary-500, #EF6F2B);

    color: var(--base-branco, #FFF);
    text-align: center;

    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 19.5px; /* 139.286% */
    letter-spacing: -0.2px;
`

const Selection = styled.div`
    display: flex;
    padding-left: 42%
`

const Selected = styled.h1`
    color: #1B1B1B;
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 18.8px; /* 117.5% */
    letter-spacing: -0.4px;
`

const DeleteSelection = styled.button`
    padding: 12px 16px;
    color: #767676;
    text-align: center;

    /* Button1 */
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: 19.5px; /* 150% */
    letter-spacing: -0.2px;
    margin-left: 1%;
    width: 145px;

`