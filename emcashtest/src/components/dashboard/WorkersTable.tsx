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
        const authToken = ' 26ef9e4b3c472a254dc1cf99861046d4'; // Substitua com o token real
        const config = {
            headers: {
              Authorization: `Bearer 3a52c47c393024b12475faee82837f20`,
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
                    <TableTh></TableTh>
                    <TableTh>Nome completo</TableTh>
                    <TableTh>CPF/CNPJ</TableTh>
                    <TableTh>Celular</TableTh>
                    <TableTh>E-mail</TableTh>
                    <TableTh>Editar</TableTh>
                    <TableTh>Apagar</TableTh>
            </HeadTable>
            <BodyTable>
                {funcionarios.map((data) => (
                <tr key={data.id}>
                    <TableTd><CheckBox type="checkbox" name="" id="" /></TableTd>
                    <TableTd>{data.nome}</TableTd>
                    <TableTd>{(data.cpf) ? data.cpf : data.cnpj}</TableTd>
                    <TableTd>{data.celular}</TableTd>
                    <TableTd>{data.email}</TableTd>
                    <TableTd><BsFillPencilFill size={20} /></TableTd>
                    <TableTd><BsFillTrashFill size={20} id="trash"/></TableTd>
                </tr> 
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
    padding: 12px 24px;
`
const BodyTable = styled.tbody`
    display: flex;
    flex-direction: column;
    background: #BABABA;

`
const TableTh = styled.th`
    padding: 12px 24px;
    justify-content: right;
    align-items: right
`
const TableTd = styled.td`
    padding: 12px 30px;
    align-items: center
`

const CheckBox = styled.input`
    backgroung-color: #BABABA;
    display: flex;
    align-items: flex-start;
`
// const Table = styled.table`
//     border: 1px solid #ccc;

//     padding: 11px 11px;
//     font-size: 18px;
// `


// const THeadTable = styled.th`
// border: 1px solid #ccc;

//     padding: 11px 11px;
//     font-size: 18px;
// `
// const TableRowHead = styled.tr`

//     display: flex;
//     padding: 12px 24px;
// `
// const TableRowBody = styled.tr`
//     gap: 32px;
//     display: flex;
//     padding: 12px 24px;
//     background: #BABABA;
// `

// const TableData = styled.td` 
// border: 1px solid #ccc;

//     padding: 11px 11px;
//     text-align: left;
//     font-size: 18px;
// `
