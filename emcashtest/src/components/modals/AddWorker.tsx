import React from 'react'
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import axios, { AxiosResponse, AxiosError } from 'axios';
import AuthConfig from '../../services/AuthConfig';
import { FormValuesModal } from '../types/FormType';
import OrangeButton from '../generics/OrangeButton';
import GrayButton from '../generics/GrayButton';

interface AddWorkerProps {
    isOpen: boolean;
    onClose : any;
}

  const ModalAddFuncionario: React.FC<AddWorkerProps> = ({ isOpen, onClose }) => {
    const form = useForm<FormValuesModal>();
    const {register, handleSubmit} = form;

    if (!isOpen) {
        return null;
    }

    const onSubmit = (data: FormValuesModal) => {
   
        const {config} = AuthConfig();

        const url = 'http://18.117.195.42/funcionario/cadastro';
        
        axios.post(url, data, config)
            .then((response: AxiosResponse) => {
                console.log('Resposta: ', response);
                onClose(true, 200);
            })
            .catch((error: AxiosError )=> {
                console.log('Erro: ', error);
                onClose(true, 400);
            })
      }

    return (
       <WholeModal>
            <FormModal onSubmit={handleSubmit(onSubmit)}>
                <div className="modal-content">
                    <ModalTitle>Adicionar novo funcionário</ModalTitle>
                    <InputName  {...register("nome", { required: true })} placeholder="Nome Completo"/>
                    <InputCPF {...register("cpf", { required: true })} placeholder="CPF/CNPJ"/>
                    <InputPhone {...register("celular", { required: true })} placeholder="Celular"/>
                    <InputEmail {...register("email", { required: true })} placeholder="E-mail"/>
                    <ButtonModal>
                        <GrayButton size='medium' onClick={onClose}>Cancelar</GrayButton>
                        <OrangeButton size='medium' type='submit'>Adicionar</OrangeButton>
                    </ButtonModal>
                </div>
            </FormModal>
        </WholeModal>
    )
}

export default ModalAddFuncionario;

const WholeModal = styled.div`
    left: 37%;
    top: 21%;
    position: absolute;
`
const FormModal = styled.form`
    display: inline-flex;
    padding: 32px;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    border-radius: 12px;
    background: var(--base-branco, #FFF);
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.25);
    height: 400px;
`
const ModalTitle = styled.h2`
    margin: auto;
    color: var(--dark-400, #767676);
    /* subtitle2 */
    font-family: Manrope;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 23.5px; /* 117.5% */
    letter-spacing: -0.4px;
`

const InputName = styled.input`
    display: flex;
    width: 350px;
    padding: 16px;
    align-items: flex-start;
    margin: 6% 0%;
    border-radius: 4px;
    font-size: 15px;
`
const InputCPF = styled.input`
    display: flex;
    width: 350px;
    padding: 16px;
    align-items: flex-start;
    margin: 6% 0%;
    border-radius: 4px;
    font-size: 15px;

`
const InputPhone = styled.input`
    display: flex;
    width: 350px;
    padding: 16px;
    align-items: flex-start;
    margin: 6% 0%;
    border-radius: 4px;
    font-size: 15px;

`
const InputEmail = styled.input`
    display: flex;
    width: 350px;
    padding: 16px;
    align-items: flex-start;
    margin: 6% 0%;
    border-radius: 4px;
    font-size: 15px;

`

const ButtonModal = styled.div`
    margin: 6% 0%;
    display: flex;
    flex-direction:row;
    justify-content: flex-end;
    gap: 2%;

`