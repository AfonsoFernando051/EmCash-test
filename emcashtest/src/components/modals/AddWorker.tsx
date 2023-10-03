import React from 'react'
import styled from 'styled-components';
import { useForm } from "react-hook-form";

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
    if (!isOpen) {
        return null;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const form = useForm<FormValuesModal>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {register, handleSubmit} = form;

    return (
       <WholeModal>
            <FormModal>
                <div className="modal-content">
                    <h2>Adicionar novo funcionário</h2>
                    <InputName  {...register("nome", { required: true })} placeholder="Nome Completo"/>
                    <InputCPF {...register("cpf", { required: true })} placeholder="CPF/CNPJ"/>
                    <InputPhone {...register("celular", { required: true })} placeholder="Celular"/>
                    <InputEmail {...register("email", { required: true })} placeholder="E-mail"/>
                    <ButtonModal>
                        <ButtonCancel onClick={onClose}>Cancelar</ButtonCancel>
                        <ButtonAdd>Adicionar</ButtonAdd>
                    </ButtonModal>
                </div>
            </FormModal>
        </WholeModal>
    )
}

export default ModalAddFuncionario;

const WholeModal = styled.div`
    left: 550px;
    top: 258px;
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
`
const InputName = styled.input`
    display: flex;
    width: 350px;
    padding: 12px;
    align-items: flex-start;
`
const InputCPF = styled.input`
    display: flex;
    width: 350px;
    padding: 12px;
    align-items: flex-start;
`
const InputPhone = styled.input`
    display: flex;
    width: 350px;
    padding: 12px;
    align-items: flex-start;
`
const InputEmail = styled.input`
    display: flex;
    width: 350px;
    padding: 12px;
    align-items: flex-start;
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
    display: flex
    justify-content: flex-end;

`