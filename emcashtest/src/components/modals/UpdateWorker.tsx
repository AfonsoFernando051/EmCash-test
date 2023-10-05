import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import axios, { AxiosResponse, AxiosError } from 'axios';
import AuthConfig from '../../services/AuthConfig';
import { FormValuesModal } from '../types/FormType';
import OrangeButton from '../generics/OrangeButton';
import GrayButton from '../generics/GrayButton';

interface AddWorkerProps {
    id: number;
    isOpen: boolean;
    onClose : any;
  }

  const ModalUpdateFuncionario: React.FC<AddWorkerProps> = ({id, isOpen, onClose }) => {
  
    const form = useForm<FormValuesModal>();
    const {register, reset, handleSubmit} = form;
    const {config} = AuthConfig();
    const url = `http://18.117.195.42/funcionario/${id}`;

    useEffect(() => {        
      if(isOpen){
        axios.get(url, config)
        .then(response => {
            reset(response.data);
        })
        .catch(error => {
            console.error('Erro na solicitação: ', error);
                
        })
      }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const onSubmit = (data: FormValuesModal) => {
        axios.patch(url, data, config)
            .then((response: AxiosResponse) => {
                console.log('Resposta: ', response.data);
            })
            .catch((error: AxiosError )=> {
                console.log('Erro: ', error);
            })

            onClose(true);
      }

    return (
       <WholeModal>
            <FormModal onSubmit={handleSubmit(onSubmit)}>
                <div className="modal-content">
                    <ModalTitle>Editar funcionário</ModalTitle>
                    <Container>
                        <InputName  {...register("nome", { required: true })} placeholder="Nome Completo"/>
                        <Label isActive={true}>Nome</Label>
                    </Container>
                    <Container>
                        <InputCPF {...register("cpf", { required: true })} placeholder="CPF/CNPJ"/>
                        <Label isActive={true}>CPF/CNPJ</Label>
                    </Container>
                    <Container>
                    <InputPhone {...register("celular", { required: true })} placeholder="Celular"/>
                        <Label isActive={true}>Celular</Label>
                    </Container>
                    <Container>
                    <InputEmail {...register("email", { required: true })} placeholder="E-mail"/>
                        <Label isActive={true}>E-mail</Label>
                    </Container>
                    <ButtonModal>
                        <GrayButton size='medium' onClick={onClose}>Cancelar</GrayButton>
                        <OrangeButton size='large' type='submit'>Salvar alterações</OrangeButton>
                    </ButtonModal>
                </div>
            </FormModal>
        </WholeModal>
    )
}

export default ModalUpdateFuncionario;

const Container = styled.div`
  position: relative;
  margin: 16px 0;
`;

const Label = styled.label<{ isActive: boolean }>`
  position: absolute;
  top: ${(props) => (props.isActive ? '-10px' : '12px')};
  left: 10px;
  font-size: ${(props) => (props.isActive ? '12px' : '16px')};
  color: #333;
  transition: top 0.2s, font-size 0.2s;
  background-color: white;
  padding: ${(props) => (props.isActive ? '0 5px' : '0')};
`;

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
    display: flex;
    flex-direction:row;
    justify-content: flex-end;
    gap: 2%
`