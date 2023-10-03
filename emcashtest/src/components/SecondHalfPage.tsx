import * as React from "react";
import { useForm } from "react-hook-form";
import styled from 'styled-components'
import { AiFillCheckCircle, AiOutlineClose } from 'react-icons/ai'

const WholePage = styled.div`
    background: linear-gradient(286deg, rgba(243, 243, 243, 0.16) 8.14%, rgba(243, 243, 243, 0.04) 38.39%, rgba(243, 243, 243, 0.16) 88.69%);
    box-shadow: 0px 0px 30px 0px rgba(12, 5, 7, 0.10);
    backdrop-filter: blur(5px);
`

const Form = styled.form`
    padding: 22% 23% 0% 23%;
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
    margin: 0% 6%;
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
    padding: 18.5px 6px;
    width: 264px;
    align-items: center;
    gap: 2px;
    flex: 1 0 0;
    margin: 6% 2%;
    color: var(--dark-500, #1B1B1B);
    /* body2 */
    font-family: Manrope;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 18.8px; /* 117.5% */
    letter-spacing: -0.2px;
`

const LoginInvalid = styled.div`
    border-radius: 4px;
    display: flex;
    width: 280px;
    align-items: flex-start;
    justify-content:center;
    margin: 6% 2%;
    gap: 12px;
    align-self: stretch;
    border: 1px solid #FEBFB8;
    background: var(--red-100, #FFE1DB);
    /* Dropshodow2 */
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
`
const LoginInvalidContent = styled.h3`
    color: #AD2C55;

    /* Button1 */
    font-family: Poppins;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: 19.5px; /* 150% */
    letter-spacing: -0.2px;
`
const LoginInvalidIconCheck = styled.i`
    color: #AD2C55;
    padding: 14px 1px 0px 0px;

`

const LoginInvalidIconX = styled.i`
    color: #AD2C55;
    padding: 15px 1px 0px 0px;
`

const RegisterButton = styled.button`
    display: flex;
    width: 200px;
    padding: 12px 16px;
    flex-direction: column;
    align-items: center;
    border-radius: 4px;
    background: var(--primary-500, #EF6F2B);

    /* Dropshodow2 */
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
    margin: 0% 12%;

    color: var(--base-branco, #FFF);
    text-align: center;
    /* button1 */
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 19.5px; /* 139.286% */
    letter-spacing: -0.2px;
`
const ForgotPassword = styled.div`
    color: var(--primary-500, #EF6F2B);
    text-align: right;
    /* button2 */
    font-size: 17px;
    margin:5% 21%;
    font-style: normal;
    font-weight: 400;
    line-height: 19.5px; /* 139.286% */
    letter-spacing: -0.2px;
`
const OrangeLink = styled.a`
    color: var(--primary-500, #EF6F2B);
    text-decoration: none;
`

const NotYet = styled.div`
    margin: 6% 6%;

    font-family: Poppins;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 19.5px; /* 139.286% */
    letter-spacing: -0.2px;
`

const NotYetText = styled.span`
    padding-right: 4px
`

const NeedHelp = styled.div`
    padding: 5% 0% 6% 58%;

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
        <LoginInvalid>
            <LoginInvalidIconCheck>
                <AiFillCheckCircle size={23}/>
            </LoginInvalidIconCheck>
            <LoginInvalidContent>
                Usuário e/ou senha incorretos.
            </LoginInvalidContent>
            <LoginInvalidIconX>
                <AiOutlineClose size={13}/>
            </LoginInvalidIconX>
        </LoginInvalid>
        <ForgotPassword>
            <OrangeLink href="">Esqueci minha senha</OrangeLink>
        </ForgotPassword>
        <RegisterButton type="submit">Entrar</RegisterButton>
        <NotYet>
            <NotYetText>
                Ainda não tem uma conta?
            </NotYetText>
            <OrangeLink  href="">
                Cadastrar
            </OrangeLink>
        </NotYet>
        </Form>
        <NeedHelp>
            <OrangeLink>
                Precisa de Ajuda?
            </OrangeLink>
        </NeedHelp>
    </WholePage>
    
  );
}