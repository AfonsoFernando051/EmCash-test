import React, {useState, useEffect} from 'react';
import { BsFillPencilFill, BsFillTrashFill} from 'react-icons/bs';
import axios from 'axios';
import styled from "styled-components";
import ModalAddFuncionario from '../modals/AddWorker';
import ModalDropFuncionario from '../modals/DeleteWorker';
import ModalUpdateFuncionario from '../modals/UpdateWorker';
import AuthConfig from '../../services/AuthConfig';
import OrangeButton from '../generics/OrangeButton';
import GrayButton from '../generics/GrayButton';

const PAGE_SIZE = 1; // Número de itens por página

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
    const [count, setCount] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isChecked, setIsChecked] = useState(false);
    const [selections, setSelections] = useState<any>([]);
    const [isModalAddFuncOpen, setIsModalAddFuncOpen] = useState(false);
    const [isModalDropFuncOpen, setIsModalDropFuncOpen] = useState(false);
    const [isModalUpdateFuncOpen, setIsModalUpdateFuncOpen] = useState(false);
    const [idFuncionario, setIdFuncionario] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (isModalAddFuncOpen || isModalDropFuncOpen || isModalUpdateFuncOpen) {
          document.body.classList.add('modal-open');
        } else {
          document.body.classList.remove('modal-open');
        }
    
        return () => {
          document.body.classList.remove('modal-open');
        };
    }, [isModalAddFuncOpen, isModalDropFuncOpen, isModalUpdateFuncOpen]);

    const openModalAddFunc = () => {
        setIsModalAddFuncOpen(true);
        return 0;
    };
  
    const closeModalAddFunc = () => {
        setIsModalAddFuncOpen(false);
    };

    const openModalDropFunc = (id: React.SetStateAction<number>) => {
        setIdFuncionario(id)
        setIsModalDropFuncOpen(true);
    };
  
    const closeModalDropFunc = () => {
        setIsModalDropFuncOpen(false);
    };

    const openModalUpdateFunc = (id: React.SetStateAction<number>) => {
        setIdFuncionario(id)
        setIsModalUpdateFuncOpen(true);
    };
  
    const closeModalUpdateFunc = () => {
        setIsModalUpdateFuncOpen(false);
    };

    const handleCheckboxChange = (event:any, id:number) => {
        const Cheked = event.target.checked;
        if(Cheked) {
            setIsChecked(true);
            console.log(selections);
            setSelections([...selections, id]);
            
            setCount(count + 1);
        } else {
            // @ts-ignore
            const updatedSelections = selections.filter(data => data !== id);
            setSelections(updatedSelections);
            setCount(count - 1);
        }
    }

    useEffect(() => {        
        const {config} = AuthConfig();

        axios.get(`http://18.117.195.42/funcionarios?page=${currentPage}&pageSize=${PAGE_SIZE}`, config)
            .then(response => {
                setFuncionarios(response.data)                
                setTotalPages(Math.ceil(response.data.length / PAGE_SIZE));

            })
            .catch(error => {
                console.error('Erro na solicitação: ', error);
                    
            })
    }, [currentPage])
  
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
      };

  return (
    <>
        <NavSelection>
            <NavSelectionTitle>
                Lista de funcionários
            </NavSelectionTitle>
            <p>
        Página {currentPage} de {totalPages}
      </p>
      
            <OrangeButton size='small' onClick={openModalAddFunc}>Adicionar novo</OrangeButton>
            <ModalAddFuncionario isOpen={isModalAddFuncOpen} onClose={closeModalAddFunc}/>
            <ModalDropFuncionario isOpen={isModalDropFuncOpen} onClose={closeModalDropFunc} id={idFuncionario}/>
            <ModalUpdateFuncionario id={idFuncionario} isOpen={isModalUpdateFuncOpen} onClose={closeModalUpdateFunc}/>
            <Selected>Selecionados({count})</Selected>
            <GrayButton size='small'
                customStyles={{marginLeft: '7px', boxShadow: '0px 4px 16px 0px rgba(0, 0, 0, 0.08)',  color: '#F3F3F3'}}
                onClick={() => openModalDropFunc(selections)}>
                    Apagar Seleção
            </GrayButton>
        </NavSelection>
        <div>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Anterior
        </button>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Próxima
        </button>
      </div>
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
                    <TableTdCheck><CheckBox type="checkbox" name="" id="" checked={selections.includes(data.id)} onChange={e => handleCheckboxChange(e, data.id)}/></TableTdCheck>
                    <TableTd>{data.nome}</TableTd>
                    <TableTd>{(data.cpf) ? data.cpf : data.cnpj}</TableTd>
                    <TableTd>{data.celular}</TableTd>
                    <TableTd>{data.email}</TableTd>
                    <TableTdIcon onClick={() => openModalUpdateFunc(data.id)}><BsFillPencilFill size={20} style={{cursor: 'pointer'}}/></TableTdIcon>
                    <TableTdIcon onClick={() => openModalDropFunc(data.id)}><BsFillTrashFill size={20} id="trash" style={{cursor: 'pointer'}}/></TableTdIcon>
                </TbRowData> 
                ))}
            </BodyTable>
        </Table>
    </>
  );
}

const NavSelection = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    align-self: stretch;
`
const NavSelectionTitle = styled.h1`
    color: var(--dark-500, #1B1B1B);
    font-family: Manrope;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 23.5px; /* 117.5% */
    letter-spacing: -0.4px;
`

const Selected = styled.h1`
    margin-left: 40%;
    color: #1B1B1B;
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 18.8px; /* 117.5% */
    letter-spacing: -0.4px;
`

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
    border-radius: 0px 11px;
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
