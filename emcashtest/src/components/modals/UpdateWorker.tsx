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
    respostWork: any;
    modalCase: any;
  }

  const ModalUpdateFuncionario: React.FC<AddWorkerProps> = ({id, isOpen, respostWork,onClose, modalCase }) => {
    const form = useForm<FormValuesModal>();
    const {register, reset, handleSubmit} = form;
    const {config} = AuthConfig();
    const url = `http://18.117.195.42/funcionario/${id}`;
    const [respost, setRespost] = useState(0);
    const [usarCpf, setUsarCpf] = useState(true);

    const toggleInputName = (event: any) => {
        if(event > 11){
            setUsarCpf(false);
        }else{
            setUsarCpf(true);
        }
        
    }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, reset, url]);

    if (!isOpen) {
        return null;
    }

    const onSubmit = (data: FormValuesModal) => {

        if(data.cnpj){
            data.cpf = ''
        }
                
        modalCase('Update')
        axios.patch(url, data, config)
            .then((response: AxiosResponse) => {
                console.log(response.status);
                setRespost(200);
            })
            .catch((error: AxiosError )=> {
                console.log('Erro: ', error);
                console.log( error.request.status);
                setRespost(400);
            })
            respostWork(respost);

            respost !== 0 ? onClose(true): alert('Altere para salvar!');          
      }

    return (
       <WholeModal>
            <FormModal onSubmit={handleSubmit(onSubmit)}>
                <div className="modal-content">
                    <ModalTitle>Editar funcionário</ModalTitle>
                    <Container>
                        <InputName  {...register("nome", { required: true })} placeholder="Nome Completo"/>
                        <Label>Nome</Label>
                    </Container>
                    {usarCpf ? (
                        <Container>
                            <InputCPF {...register("cpf", { required: true })} placeholder="CPF/CNPJ" onChange={e => toggleInputName(e.target.value.length)}/>
                            <Label>CPF/CNPJ</Label>
                        </Container>
                    ) : (
                        <Container>
                            <InputCPF {...register("cnpj", { required: true })} placeholder="CPF/CNPJ" onChange={e => toggleInputName(e.target.value.length)}/>
                            <Label>CPF/CNPJ</Label>
                        </Container> 
                    )}                   
                    <Container>
                    <InputPhone {...register("celular", { required: true })} placeholder="Celular"/>
                        <Label>Celular</Label>
                    </Container>
                    <Container>
                    <InputEmail {...register("email", { required: true })} placeholder="E-mail"/>
                        <Label>E-mail</Label>
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

const Label = styled.label`
  position: absolute;
  top: -10px; //'-10px' : '12px'
  left: 10px;
  font-size: 12px; //12px' : '16px'
  color: #333;
  transition: top 0.2s, font-size 0.2s;
  background-color: white;
  padding: 0 5px; //'0 5px' : '0'
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