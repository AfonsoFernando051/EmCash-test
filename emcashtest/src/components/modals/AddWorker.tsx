import React from 'react'
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import axios, { AxiosResponse, AxiosError } from 'axios';

type FormValuesModal = {
    nome: string,
    cpf: string,
    cnpj: string,
    celular: string,
    email: string,
}

interface AddWorkerProps {
    isOpen: boolean;
    onClose : any
  }

  const ModalAddFuncionario: React.FC<AddWorkerProps> = ({ isOpen, onClose }) => {
    
    const form = useForm<FormValuesModal>();
    const {register, handleSubmit} = form;

    if (!isOpen) {
        return null;
    }

    const onSubmit = (data: FormValuesModal) => {
        const authToken = localStorage.getItem('token');
        const config = {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          };
        const url = 'http://18.117.195.42/funcionario/cadastro';
        
        axios.post(url, data, config)
            .then((response: AxiosResponse) => {
                console.log('Resposta: ', response);
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
                    <h2>Adicionar novo funcionário</h2>
                    <InputName  {...register("nome", { required: true })} placeholder="Nome Completo"/>
                    <InputCPF {...register("cpf", { required: true })} placeholder="CPF/CNPJ"/>
                    <InputPhone {...register("celular", { required: true })} placeholder="Celular"/>
                    <InputEmail {...register("email", { required: true })} placeholder="E-mail"/>
                    <ButtonModal>
                        <ButtonCancel onClick={onClose}>Cancelar</ButtonCancel>
                        <ButtonAdd type='submit'>Adicionar</ButtonAdd>
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
const InputName = styled.input`
    display: flex;
    width: 350px;
    padding: 12px;
    align-items: flex-start;
    margin: 4% 0%;
    border-radius: 4px;
`
const InputCPF = styled.input`
    display: flex;
    width: 350px;
    padding: 12px;
    align-items: flex-start;
    margin: 4% 0%;
    border-radius: 4px;

`
const InputPhone = styled.input`
    display: flex;
    width: 350px;
    padding: 12px;
    align-items: flex-start;
    margin: 4% 0%;
    border-radius: 4px;

`
const InputEmail = styled.input`
    display: flex;
    width: 350px;
    padding: 12px;
    align-items: flex-start;
    margin: 4% 0%;
    border-radius: 4px;

`
const ButtonAdd = styled.button`
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
const ButtonCancel = styled.button`
    display: flex;
    padding: 12px 16px;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    color: var(--primary-500, #EF6F2B);
    text-align: center;
    /* button1 */
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 19.5px; /* 139.286% */
    letter-spacing: -0.2px;
`
const ButtonModal = styled.div`
    display: flex;
    flex-direction:row;
    justify-content: flex-end;

`