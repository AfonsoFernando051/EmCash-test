import React, {useState, useEffect} from 'react';
import { BsFillPencilFill, BsFillTrashFill} from 'react-icons/bs';
import axios from 'axios';
import styled from "styled-components";

export default function WorkersTable() {

    const [funcionarios, setFuncionarios] = useState([
        {
            id: 0,
            nome: 'funcionario',
            cpf: "86853871081",
            cnpj: null,
            celular: '319876543210',
            email: 'funcionario@empresa.com'
        }
    ]) 

    useEffect(() => {        
        const authToken = localStorage.getItem('token'); // Substitua com o token real
        const config = {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          };

        axios.get('http://18.117.195.42/funcionarios', config)
                .then(response => {
                    setFuncionarios(response.data)
                })
                .catch(error => {
                    console.error('Erro na solicitação: ', error);
                    
                })
    }, [])
  
  return (
    <>
        <Table>
            <HeadTable>
                <TbRow>
                    <EmptyTableTh></EmptyTableTh>
                    <NameTableTh>Nome completo</NameTableTh>
                    <CPFTableTh>CPF/CNPJ</CPFTableTh>
                    <PhoneTableTh>Celular</PhoneTableTh>
                    <EmailTableTh>E-mail</EmailTableTh>
                    <TableTh>Editar</TableTh>
                    <TableTh>Apagar</TableTh>
                </TbRow>
            </HeadTable>
            <BodyTable>
                {funcionarios.map((data) => (
                <TbRowData key={data.id}>
                    <TableTdCheck><CheckBox type="checkbox" name="" id="" /></TableTdCheck>
                    <TableTd>{data.nome}</TableTd>
                    <TableTd>{(data.cpf) ? data.cpf : data.cnpj}</TableTd>
                    <TableTd>{data.celular}</TableTd>
                    <TableTd>{data.email}</TableTd>
                    <TableTdIcon><BsFillPencilFill size={20} /></TableTdIcon>
                    <TableTdIcon><BsFillTrashFill size={20} id="trash"/></TableTdIcon>
                </TbRowData> 
                ))}
            </BodyTable>
        </Table>
    </>
  );
}

const Table = styled.table`
    margin-top: 3%;
    padding: 1% 0%;
    width: 100%;
`
const HeadTable = styled.thead`
    display: flex;
    border-radius: 12px 12px 4px 4px;
    background: var(--base-branco, #FFF);
    text-align: left;
    justify-content: flex-start;
`
const TbRow = styled.tr`
    display: flex;
    border-radius: 12px 12px 4px 4px;
    background: var(--base-branco, #FFF);
    width: 100%;
`

const EmptyTableTh = styled.th`
    padding-right: 2%
`

const TableTh = styled.th`
    font-size: 16px;
    padding: 14px 0px;
    width: 12%;
}

`
const NameTableTh = styled.th`
    font-size: 16px;
    padding: 14px 25px;
    width: 15%;
}
`

const CPFTableTh = styled.th`
    margin-left: 4%;
    font-size: 16px;
    padding: 14px 20px;
    width: 12%;
    gap: 10px;
}`

const PhoneTableTh = styled.th`
    margin-left: 5%;
    font-size: 16px;
    padding: 14px 20px;
    width: 12%;
}
`
const EmailTableTh = styled.th`
    margin-left: 4%;
    font-size: 16px;
    padding: 14px 30px;
    width: 13%;
}
`

const TbRowData = styled.tr`
    display: flex;
    border-radius: 12px 12px 4px 4px;
`

const BodyTable = styled.tbody`
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    background: #BABABA;
`

const TableTdCheck = styled.td`
    padding: 12px 12px;
    width: 1%;
`
const TableTd = styled.td`
    padding: 12px 12px;
    width: 20%;
`
const TableTdIcon = styled.td`
    padding: 12px 12px;
    width: 10%;
`
const CheckBox = styled.input`
    backgroung-color: #BABABA;
    display: flex;
    align-items: left;
`
