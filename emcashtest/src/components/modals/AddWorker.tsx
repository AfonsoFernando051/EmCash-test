import React, {useState} from 'react'
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
    respostWork: any;
    modalCase: any;
    mostrarAlerta: any
}

  const ModalAddFuncionario: React.FC<AddWorkerProps> = ({ isOpen, onClose, respostWork, modalCase, mostrarAlerta}) => {
    const form = useForm<FormValuesModal>();
    const {register, handleSubmit} = form;
    const [respost, setRespost] = useState(0);
    const [usarCpf, setUsarCpf] = useState(true);

    const toggleInputName = (event: any) => {
        if(event > 11){
            setUsarCpf(false);
        }else{
            setUsarCpf(true);
        }
      };

    const onSubmit = (data: FormValuesModal) => {
        const {config} = AuthConfig();
        const url = 'http://18.117.195.42/funcionario/cadastro';

        if(data.cnpj){
            data.cpf = ''
        }

        modalCase('Add')
        setRespost(400);
        axios.post(url, data, config)        
            .then((response: AxiosResponse) => {
                console.log('Resposta: ', response);
                respostWork(0);
                mostrarAlerta(true)
            })
            .catch((error: AxiosError )=> {
                console.log('Erro: ', error);
                respostWork(-1);
                mostrarAlerta(true)
            })
            console.log(respost);

            onClose(true)
    }

    if (!isOpen) {
        return null;
    }

    return (
       <WholeModal>
            <FormModal onSubmit={handleSubmit(onSubmit)}>
                <div className="modal-content">
                    <ModalTitle>Adicionar novo funcionário</ModalTitle>
                    <InputName  {...register("nome", { required: true })} placeholder="Nome Completo"/>
                    {usarCpf ? (
                        <InputCPF {...register("cpf", { required: true })} placeholder="CPF/CNPJ" onChange={e => toggleInputName(e.target.value.length)}/>
                    ) : (
                        <InputCPF {...register("cnpj", { required: true })} placeholder="CPF/CNPJ" onChange={e => toggleInputName(e.target.value.length)}/>
                    )}
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
    left: 34%;
    top: 23%;
    position: absolute;
`
const FormModal = styled.form`
    display: inline-flex;
    padding:40px 30px;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    border-radius: 12px;
    background: var(--base-branco, #FFF);
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.25);
    height: 400px;
`
const ModalTitle = styled.h2`
    margin: -2% 0%;
    padding-bottom: 4%;
    color: var(--dark-400, #767676);
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
    margin: 7% 0%;
    display: flex;
    flex-direction:row;
    justify-content: flex-end;
    gap: 2%;

`