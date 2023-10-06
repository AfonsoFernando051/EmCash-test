import React, {useState, useEffect} from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { PiTrash} from 'react-icons/pi';
import { GoPencil } from 'react-icons/go';
import axios from 'axios';
import styled from "styled-components";
import ModalAddFuncionario from '../modals/AddWorker';
import ModalDropFuncionario from '../modals/DeleteWorker';
import ModalUpdateFuncionario from '../modals/UpdateWorker';
import AuthConfig from '../../services/AuthConfig';
import OrangeButton from '../generics/OrangeButton';
import GrayButton from '../generics/GrayButton';
import AlertGreen from '../generics/AlertGreen';
import { AlertColor } from '@mui/material';
import Pagination from '../generics/Paginator';

const perPage = 8; // Número de itens por página

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
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [selections, setSelections] = useState<any>([]);
    const [isModalAddFuncOpen, setIsModalAddFuncOpen] = useState(false);
    const [isModalDropFuncOpen, setIsModalDropFuncOpen] = useState(false);
    const [isModalUpdateFuncOpen, setIsModalUpdateFuncOpen] = useState(false);
    const [idFuncionario, setIdFuncionario] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [hideCPF, setHideCPF] = useState(false);
    const [modalWorkAdd, setModalWorkAdd] = useState(0);
    const [modalWorkUpdate, setModalWorkUpdate] = useState(0);
    const [modalWorkDelete, setModalWorkDelete] = useState(0);

    const [respost, setRespost] = useState('');
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [severity, setSeverity] = useState<AlertColor>("error");

    //Coloca background transparente na página quando o modal está aberto
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

    //Estas operações abaixo são de controle de abertura e fechamento dos modais
    const openModalAddFunc = () => {
        setIsModalAddFuncOpen(true);
        return 0;
    };
  
    const closeModalAddFunc = (event: boolean) => {
        setIsModalAddFuncOpen(false);
    };

    const openModalDropFunc = (id: React.SetStateAction<number>) => {
        setIdFuncionario(id)
        setIsModalDropFuncOpen(true);
    };
  
    const closeModalDropFunc = (event: boolean, response: any) => {
        setIsModalDropFuncOpen(false);
    };

    const openModalUpdateFunc = (id: React.SetStateAction<number>) => {
        setIdFuncionario(id)
        setIsModalUpdateFuncOpen(true);
    };
  
    const closeModalUpdateFunc = (event: boolean ,response: number) => {
        setIsModalUpdateFuncOpen(false);
    };

    //Caso a requisição do modal retorne um erro ou sucesso, exibe um alert componentizado com a mensagem da operação.
    useEffect(() => {
        switch (respost) {
            case 'Add':
                if(mostrarAlerta){                                        
                    if(modalWorkAdd === 400){      
                        setMessageAlert('Erro ao adicionar funcionário.');
                        setSeverity('error')
                        setTimeout(() => {
                            setMostrarAlerta(false);
                        }, 3000);
            
                    }else if(modalWorkAdd === 200){
                        console.log('chega no ceto');
                        setMessageAlert('Funcionário Adicionado com sucesso!');
                        setSeverity('success')
                        setTimeout(() => {
                            setMostrarAlerta(false);
                        }, 3000);
                    }        
                }  
                break;
            case 'Update':
                if(mostrarAlerta){
                    if(modalWorkUpdate === 400){      
                        setMessageAlert('Erro ao atualizar funcionário.');
                        setSeverity('error')
                        setTimeout(() => {
                            setMostrarAlerta(false);
                        }, 3000);
            
                    }else if(modalWorkUpdate === 200){
                        setMessageAlert('Funcionário atualizado com sucesso!');
                        setSeverity('success')
                        setTimeout(() => {
                            setMostrarAlerta(false);
                        }, 3000);
                    }        
                }     
            break;
            case 'Delete':
                if(mostrarAlerta){
                    if(modalWorkDelete === 400){      
                        setMessageAlert('Erro ao excluir funcionário.');
                        setSeverity('error')
                        setTimeout(() => {
                            setMostrarAlerta(false);
                        }, 3000);
            
                    }else if(modalWorkDelete === 200){
                        setMessageAlert('Funcionário Excluído com sucesso!');
                        setSeverity('success')
                        setTimeout(() => {
                            setMostrarAlerta(false);
                        }, 3000);
                    }        
                } 
                break;
            default:
                break;
        }
    }, [modalWorkAdd, modalWorkDelete, modalWorkUpdate, mostrarAlerta, respost])

    //Função que controla os eventos do checkbox
    const handleCheckboxChange = (event:any, id:any) => {
        const Cheked = event.target.checked;
        
        if(Array.isArray(id)){
            if(Cheked){                
                setIsAllChecked(true);
                setSelections(id);
                setCount(id.length);  
            }else{
                setIsAllChecked(false);
                setSelections([]);
                setCount(0);
            }
        }else{
            if(Cheked) {
                setIsChecked(true);
                setSelections([...selections, id]);    
                setCount(count + 1);          
            } else {
                // @ts-ignore
                const updatedSelections = selections.filter(data => data !== id);
                setSelections(updatedSelections);
                setCount(count - 1);
            }
        }
    }

    //Função que esconde ou mostra CPF/CNPJ
    const showCPF = () => {
        hideCPF ? setHideCPF(false) : setHideCPF(true)
    }

    //Funcionários vêm da URL via promise para parginar.
    useEffect(() => {        
        const {config} = AuthConfig();
        const fetchData = async () => {
            try{
                const response = await axios.get(`http://18.117.195.42/funcionarios`, config);
                setTotalPages(Math.ceil(response.data.length / perPage));
                const startIndex = (currentPage - 1) * perPage;
                const endIndex = startIndex + perPage;
                const currentEmployees = response.data.slice(startIndex, endIndex);
                setFuncionarios(currentEmployees)                
            }catch(error){
                console.error('Erro na solicitação: ', error);
            }
        }
        fetchData()
    }, [currentPage, modalWorkAdd, modalWorkDelete, modalWorkUpdate])
    
  return (
    <>
        <NavSelection>
            <NavSelectionTitle>
                Lista de funcionários
            </NavSelectionTitle>
            <OrangeButton size='small' onClick={openModalAddFunc}>Adicionar novo</OrangeButton>
            <ModalAddFuncionario mostrarAlerta={setMostrarAlerta} respostWork={setModalWorkAdd} modalCase={setRespost} isOpen={isModalAddFuncOpen} onClose={closeModalAddFunc}/>
            <ModalDropFuncionario  mostrarAlerta={setMostrarAlerta} count={setCount} respostWork={setModalWorkDelete} modalCase={setRespost} isOpen={isModalDropFuncOpen} onClose={closeModalDropFunc} id={idFuncionario}/>
            <ModalUpdateFuncionario mostrarAlerta={setMostrarAlerta} respostWork={setModalWorkUpdate} modalCase={setRespost} id={idFuncionario} isOpen={isModalUpdateFuncOpen} onClose={closeModalUpdateFunc}/>
            {mostrarAlerta === true ? (
                <AlertSpace>
                    <AlertGreen severity={severity} message={messageAlert} onClick={() => setMostrarAlerta(false)}/>
                </AlertSpace>
            ) : (
            <>
                <Selected>Selecionados({count})</Selected>
                    <GrayButton size='small'
                        customStyles={{marginLeft: '7px', boxShadow: '0px 4px 16px 0px rgba(0, 0, 0, 0.08)',  color: '#F3F3F3'}}
                        onClick={() => openModalDropFunc(selections)}>
                        Apagar Seleção
                    </GrayButton>
            </>
            )
        }
        </NavSelection>
        <Table>
            <HeadTable>
                <TbRow>
                    <EmptyTableTh>
                        <CheckBox type="checkbox" checked={isAllChecked} onChange={e => handleCheckboxChange(e, (funcionarios.map((data) => data.id)))}/>
                    </EmptyTableTh>
                    <NameTableTh>Nome completo</NameTableTh>
                    <CPFTableTh>CPF/CNPJ <EyeIcon onClick={showCPF}><AiOutlineEye/></EyeIcon></CPFTableTh>
                    <PhoneTableTh>Celular</PhoneTableTh>
                    <EmailTableTh>E-mail</EmailTableTh>
                    <TableTh>Editar</TableTh>
                    <TableTh>Apagar</TableTh>
                </TbRow>
            </HeadTable>
            <BodyTable>
                {funcionarios.map((data) => (
                <TbRowData key={data.id}>
                    <TableTdCheck>                        
                        <CheckBox type="checkbox" checked={selections.includes(data.id)} onChange={e => handleCheckboxChange(e, data.id)}/></TableTdCheck>
                    <TableTd>{data.nome}</TableTd>
                    <TableTdCPF> {(hideCPF) ? '************' : (data.cpf) ? data.cpf : data.cnpj}</TableTdCPF>
                    <TableTd>{data.celular}</TableTd>
                    <TableTd>{data.email}</TableTd>
                    <TableTdIcon onClick={() => openModalUpdateFunc(data.id)}><GoPencil size={23} style={{cursor: 'pointer', color: '#EF6F2B'}}/></TableTdIcon>
                    <TableTdIcon onClick={() => openModalDropFunc(data.id)}><PiTrash size={23} id="trash" style={{cursor: 'pointer', color: '#EF6F2B'}}/></TableTdIcon>
                </TbRowData> 
                ))}
            </BodyTable>
        </Table>
        <Pagination currentPage={currentPage} totalPages={totalPages} nextPage={setCurrentPage}/>
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
    margin-right: 1%;
    color: var(--dark-500, #1B1B1B);
    font-family: Manrope;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 23.5px; /* 117.5% */
    letter-spacing: -0.4px;
`

const Selected = styled.h1`
    margin-left: 39%;
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
    width: 1%;
    padding: 12px 12px;
`

const TableTh = styled.th`
    font-weight: 500;
    font-size: 17px;
    padding: 14px 0px;
    width: 12%;
`
const NameTableTh = styled.th`
    font-weight: 500;
    font-size: 17px;
    padding: 14px 16px;
    width: 15%;
}
`

const CPFTableTh = styled.th`
    font-weight: 500;
    margin-left: 1%;
    font-size: 17px;
    padding: 14px 20px;
    width: 12%;
    gap: 10px;
}`

const EyeIcon = styled.span`
    padding-left: 7%;
    vertical-align: middle;
    cursor: pointer;
`

const PhoneTableTh = styled.th`
    font-weight: 500;
    margin-left: 5%;
    font-size: 17px;
    padding: 14px 20px;
    width: 12%;
}
`
const EmailTableTh = styled.th`
    font-weight: 500;    
    margin-left: 4%;
    font-size: 17px;
    padding: 14px 30px;
    width: 13%;
    margin-right: 4%;
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
    background: var(--dark-200, #F3F3F3);`

const TableTdCheck = styled.td`
    padding: 12px 12px;
    width: 1%;
`
const TableTd = styled.td`
    padding: 12px 12px;
    width: 20%;
`
const TableTdCPF = styled.td`
    padding: 12px 12px;
    width: 20%;
`

const TableTdIcon = styled.td`
    padding: 12px 12px;
    width: 10%;
`
const CheckBox = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: none;
  background-color: #BABABA;
  border-radius: 4px;
  outline: none;
  cursor: pointer;

 &:checked{
    background-color: #EF6F2B; /* Cor de fundo do checkbox quando marcado */
    background-image: url('../../assets/dashboard/Icon.png');
    background-size: cover; /* Ajuste o tamanho do ícone conforme necessário */
    border: none;
}
`
const AlertSpace = styled.div`
    position: absolute;
    width: 521px;
    left: 60%;
    display: flex;
    align-items: flex-start;
    gap: 12px;
`