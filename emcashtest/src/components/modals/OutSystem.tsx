import React from 'react'
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import OrangeButton from '../generics/OrangeButton';
import GrayButton from '../generics/GrayButton';

interface AddWorkerProps {
    isOpen: boolean;
    onClose : any,
}

const ModalOutSystem: React.FC<AddWorkerProps> = ({ isOpen, onClose} ) => {

    const {handleSubmit} = useForm();
    const navigate = useNavigate();

    if (!isOpen) {
        return null;
    }    

    const onSubmit = () => {
        localStorage.removeItem('token');
        navigate('/');
        onClose(true);
    }

    return (
       <WholeModal>
            <FormModal onSubmit={handleSubmit(onSubmit)}>
            <DropTitle>Sair</DropTitle>
                    <DropSubTitle>Tem certeza que deseja sair?
                    </DropSubTitle>
                    <ButtonModal>
                        <GrayButton onClick={onClose} customStyles={{width: '30%'}}>Cancelar</GrayButton>
                        <OrangeButton size='small' type='submit' customStyles={{width: '30%'}}>Sair</OrangeButton>
                    </ButtonModal>
            </FormModal>
        </WholeModal>
    )
}

export default ModalOutSystem;

const WholeModal = styled.div`
    left: 33%;
    top: 20%;
    position: absolute;
    display: flex;
    width: 40%;
    padding: 32px;
    flex-direction: column;
    align-items: flex-start;
`
const FormModal = styled.form`
    border-radius: 12px;
    background: var(--base-branco, #FFF);
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.25);
    width: 75%;
    padding: 5%;
    flex-direction: column;
    align-items: flex-start;
`
const DropTitle = styled.h2`
    color: #000;
    margin: 0%;
    /* subtitle2 */
    font-family: Manrope;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 23.5px; /* 117.5% */
    letter-spacing: -0.4px;
`

const DropSubTitle = styled.h3`
    color: #000;
    padding: 4% 0%;

    /* body1 */
    font-family: Public Sans;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 18.8px; /* 117.5% */
    letter-spacing: -0.4px;
`

const ButtonModal = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 12px;
    align-self: stretch;

`