import React from 'react'
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import axios, { AxiosResponse, AxiosError } from 'axios';

interface AddWorkerProps {
    isOpen: boolean;
    onClose : any,
    id: number
  }

const ModalDropFuncionario: React.FC<AddWorkerProps> = ({ isOpen, onClose, id} ) => {

    const {handleSubmit} = useForm();
    
    if (!isOpen) {
        return null;
    }    

    const onSubmit = () => {
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
                    <DropTitle>Apagar funcionário(s)</DropTitle>
                    <DropSubTitle>Esta ação é irreversível. Tem certeza que deseja Apagar
                        este(s) funcionário(s) do sistema?
                    </DropSubTitle>
                    <ButtonModal>
                        <ButtonCancel onClick={onClose}>Cancelar</ButtonCancel>
                        <ButtonAdd type='submit'>Apagar</ButtonAdd>
                    </ButtonModal>
                </div>
            </FormModal>
        </WholeModal>
    )
}

export default ModalDropFuncionario;

const WholeModal = styled.div`
    left: 33%;
    top: 20%;
    position: absolute;
    display: flex;
    width: 414px;
    padding: 32px;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
`
const FormModal = styled.form`
    border-radius: 12px;
    background: var(--base-branco, #FFF);
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    width: 414px;
    padding: 32px;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
`
const DropTitle = styled.h2`
    color: #000;

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

    /* body1 */
    font-family: Public Sans;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 18.8px; /* 117.5% */
    letter-spacing: -0.4px;
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
justify-content: flex-end;
align-items: flex-start;
gap: 12px;
align-self: stretch;

`