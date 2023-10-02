import * as React from "react";
import { useForm } from "react-hook-form";
import styled from 'styled-components'

const WholePage = styled.div`
    background: linear-gradient(286deg, rgba(243, 243, 243, 0.16) 8.14%, rgba(243, 243, 243, 0.04) 38.39%, rgba(243, 243, 243, 0.16) 88.69%);
    box-shadow: 0px 0px 30px 0px rgba(12, 5, 7, 0.10);
    backdrop-filter: blur(5px);
`

const Form = styled.form`
    padding: 22% 23%;
`

const TitleForm = styled.h1`
    color: var(--primary-500, #EF6F2B);
    /* title */
    font-family: Poppins;
    font-size: 36px;
    font-style: normal;
    font-weight: 600;
    line-height: 54px; /* 150% */
    letter-spacing: -0.4px;
`
const SubTitleForm = styled.h3`
    color: var(--dark-500, #1B1B1B);
    text-align: center;
    /* body1 */
    font-family: Public Sans;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 18.8px; /* 117.5% */
    letter-spacing: -0.4px;
    width: 75%;

`
const RegisterInput = styled.input`
    display: flex;
    border-radius: 11px;
    padding: 18.5px 40px;
    align-items: center;
    gap: 2px;
    flex: 1 0 0;
    margin: 3% 2%;
`
const RegisterButton = styled.button`
    display: flex;
    width: 200px;
    padding: 12px 16px;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    border-radius: 4px;
    background: var(--primary-500, #EF6F2B);

    /* Dropshodow2 */
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
    margin: 0% 7%;

`

export default function App() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      usuario: '',
      senha: '',
    }
  });

  return (
    <WholePage>
        <Form onSubmit={handleSubmit(console.log)}>
        <TitleForm>Seja bem-vindo!</TitleForm>
        <SubTitleForm>Insira os seus dados nos campos abaixo para acessar sua conta.</SubTitleForm>
        <RegisterInput {...register("usuario", { required: true })} placeholder="Usuário" />
        <RegisterInput {...register("senha", { minLength: 2 })} placeholder="Senha" />
        <RegisterButton type="submit">Entrar</RegisterButton>
        </Form>
    </WholePage>
  );
}