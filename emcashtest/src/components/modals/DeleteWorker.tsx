import React from 'react'
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { DevTool } from '@hookform/devtools'
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
    onClose : any,
    id: number
  }

const ModalDropFuncionario: React.FC<AddWorkerProps> = ({ isOpen, onClose, id} ) => {
    if (!isOpen) {
        return null;
    }    

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const form = useForm<FormValuesModal>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {register, control, handleSubmit} = form;

    const onSubmit = (data: FormValuesModal) => {
        const authToken = localStorage.getItem('token');
        const config = {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          };
        const url = `http://18.117.195.42/funcionario/${id}`;
        
        axios.delete(url, config)
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
                    <h2>Apagar funcionário(s)</h2>
                    <h3>Esta ação é irreversível. Tem certeza que deseja Apagar
                        este(s) funcionário(s) do sistema?
                    </h3>
                    <ButtonModal>
                        <ButtonCancel onClick={onClose}>Cancelar</ButtonCancel>
                        <ButtonAdd type='submit'>Apagar</ButtonAdd>
                    </ButtonModal>
                </div>
            </FormModal>
            <DevTool control={control}/>
        </WholeModal>
    )
}

export default ModalDropFuncionario;

const WholeModal = styled.div`
    left: 24%;
    top: 18%;
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