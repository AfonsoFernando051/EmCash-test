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
                    if(modalWorkAdd === 0){
                        setMessageAlert('Funcionário adicionado com sucesso!');
                        setSeverity('success')
                        setTimeout(() => {
                            setMostrarAlerta(false);
                        }, 3000);
                    }else if(modalWorkAdd === -1){      
                        setMessageAlert('Erro ao adicionar funcionário.');
                        setSeverity('error')
                        setTimeout(() => {
                            setMostrarAlerta(false);
                        }, 3000);
            
                    }        
                }  
                break;
            case 'Update':
                if(mostrarAlerta){
                    if(modalWorkUpdate === 0){
                        setMessageAlert('Funcionário atualizado com sucesso!');
                        setSeverity('success')
                        setTimeout(() => {
                            setMostrarAlerta(false);
                        }, 3000);
                    }else if(modalWorkUpdate === -1){      
                        setMessageAlert('Erro ao atualizar funcionário.');
                        setSeverity('error')
                        setTimeout(() => {
                            setMostrarAlerta(false);
                        }, 3000);
            
                    }     
                }     
            break;
            case 'Delete':
                if(mostrarAlerta){
                    switch (modalWorkDelete) {
                        case 0:
                        setMessageAlert('Funcionário excluído com sucesso!');
                        setSeverity('success')
                        setTimeout(() => {
                            setMostrarAlerta(false);
                        }, 3000);
                            break;
                        case 1:
                            setMessageAlert('Funcionários excluídos com sucesso!');
                            setSeverity('success')
                            setTimeout(() => {
                                setMostrarAlerta(false);
                            }, 3000);
                                break; 
                        case -1:
                            setMessageAlert('Erro ao excluir funcionário.');
                            setSeverity('error')
                            setTimeout(() => {
                                setMostrarAlerta(false);
                            }, 3000);
                            break;
                        case -2:
                            setMessageAlert('Erro ao excluir funcionários.');
                            setSeverity('error')
                            setTimeout(() => {
                                setMostrarAlerta(false);
                            }, 3000);
                            break;
                        default:
                            break;
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
    }, [currentPage, funcionarios])
    
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
                    <AlertGreen severity={severity} message={messageAlert} onClicked={() => setMostrarAlerta(false)}/>
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
                    <CheckBoxTh>
                        <CheckBox type="checkbox" checked={isAllChecked} onChange={e => handleCheckboxChange(e, (funcionarios.map((data) => data.id)))}/>
                    </CheckBoxTh>
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

const CheckBoxTh = styled.th`
    width: 1%;
    margin-top: 2px;
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
    font-size: 17px;
    padding: 14px 20px;
    width: 13%;
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
  width: 15px;
  height: 15px;
  border: none;
  background-color: #BABABA;
  border-radius: 4px;
  outline: none;
  cursor: pointer;

 &:checked{
    background-color: #EF6F2B;
    background-image: url("data:image/svg+xml,%3Csvg width='305' height='24' viewBox='0 0 300 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='1.66663' y='3.66663' width='20' height='22' rx='4' fill='%23EF6F2B'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M13.8854 9.10985C14.0382 9.2563 14.0382 9.49375 13.8854 9.6402L8.40712 14.8902C8.25431 15.0366 8.00657 15.0366 7.85375 14.8902L5.11462 12.2653C4.9618 12.1189 4.96179 11.8814 5.1146 11.735C5.26741 11.5885 5.51517 11.5885 5.66799 11.7349L8.13043 14.0947L13.332 9.10983C13.4848 8.96338 13.7326 8.96339 13.8854 9.10985Z' fill='white'/%3E%3Cpath d='M53.464 18.5V6.932H60.936L60.928 8.42H55.184V11.932H60.312V13.396H55.176V16.988L61.072 16.996V18.5H53.464ZM65.6666 18.66C64.5786 18.66 63.7226 18.2893 63.0986 17.548C62.4746 16.8013 62.1626 15.7267 62.1626 14.324C62.1626 13.0333 62.4453 12.0013 63.0106 11.228C63.576 10.4547 64.4106 10.068 65.5146 10.068C66.0053 10.068 66.4293 10.1453 66.7866 10.3C67.1493 10.4547 67.4453 10.644 67.6746 10.868C67.904 11.0867 68.0693 11.292 68.1706 11.484V6.612H69.8906V18.5H68.6106L68.4186 16.804C68.344 17.044 68.208 17.308 68.0106 17.596C67.8133 17.884 67.5253 18.1347 67.1466 18.348C66.7733 18.556 66.28 18.66 65.6666 18.66ZM65.9946 17.372C66.7626 17.372 67.3173 17.132 67.6586 16.652C68 16.1667 68.1706 15.372 68.1706 14.268C68.16 13.3347 67.9866 12.62 67.6506 12.124C67.32 11.6227 66.776 11.372 66.0186 11.372C65.3893 11.372 64.872 11.6013 64.4666 12.06C64.0666 12.5133 63.8666 13.2493 63.8666 14.268C63.8666 15.2707 64.048 16.0387 64.4106 16.572C64.7786 17.1053 65.3066 17.372 65.9946 17.372ZM73.7469 6.94V8.628H72.0269V6.94H73.7469ZM73.7149 10.228V18.5H72.0669V10.228H73.7149ZM80.2845 11.46H78.4285L78.4365 16.396C78.4365 16.8013 78.5032 17.052 78.6365 17.148C78.7698 17.2387 79.0125 17.284 79.3645 17.284H80.3325V18.396C80.2258 18.4387 80.0658 18.476 79.8525 18.508C79.6392 18.54 79.3698 18.556 79.0445 18.556C78.4312 18.556 77.9538 18.4733 77.6125 18.308C77.2765 18.1427 77.0418 17.9053 76.9085 17.596C76.7805 17.2813 76.7165 16.9027 76.7165 16.46V11.46H75.3725V10.228H76.7645L77.1885 7.796H78.4285V10.22H80.2845V11.46ZM82.9654 14.764C82.96 15.5053 83.144 16.124 83.5174 16.62C83.8907 17.116 84.4454 17.364 85.1814 17.364C85.672 17.364 86.096 17.252 86.4534 17.028C86.816 16.804 87.0534 16.4707 87.1654 16.028H88.7494C88.648 16.5987 88.4214 17.0787 88.0694 17.468C87.7174 17.8573 87.288 18.1533 86.7814 18.356C86.28 18.5587 85.7574 18.66 85.2134 18.66C84.4294 18.66 83.7387 18.492 83.1414 18.156C82.544 17.8147 82.0774 17.3293 81.7414 16.7C81.4107 16.0707 81.2454 15.3213 81.2454 14.452C81.2454 13.5933 81.3974 12.836 81.7014 12.18C82.0054 11.5187 82.4427 11.0013 83.0134 10.628C83.5894 10.2547 84.2854 10.068 85.1014 10.068C86.296 10.068 87.208 10.444 87.8374 11.196C88.472 11.9427 88.7894 12.9427 88.7894 14.196V14.764H82.9654ZM82.9654 13.652H87.1574C87.1574 13.0013 86.9867 12.452 86.6454 12.004C86.3094 11.5507 85.792 11.324 85.0934 11.324C84.6187 11.324 84.224 11.4387 83.9094 11.668C83.5947 11.8973 83.3574 12.1907 83.1974 12.548C83.0427 12.9053 82.9654 13.2733 82.9654 13.652ZM98.2082 18.66C97.1576 18.66 96.2482 18.428 95.4802 17.964C94.7176 17.4947 94.1282 16.82 93.7122 15.94C93.3016 15.0547 93.0962 13.988 93.0962 12.74C93.0962 11.4867 93.3042 10.4147 93.7202 9.524C94.1416 8.63333 94.7336 7.95333 95.4962 7.484C96.2642 7.00933 97.1682 6.772 98.2082 6.772C99.2429 6.772 100.139 7.00667 100.896 7.476C101.659 7.94533 102.246 8.62533 102.656 9.516C103.072 10.4067 103.28 11.4813 103.28 12.74C103.28 13.9827 103.075 15.0467 102.664 15.932C102.254 16.812 101.667 17.4867 100.904 17.956C100.147 18.4253 99.2482 18.66 98.2082 18.66ZM98.2082 17.196C99.2162 17.196 100 16.844 100.56 16.14C101.12 15.4307 101.4 14.3053 101.4 12.764C101.4 11.1907 101.118 10.044 100.552 9.324C99.9869 8.59867 99.2056 8.236 98.2082 8.236C97.2056 8.236 96.4162 8.60133 95.8402 9.332C95.2642 10.0573 94.9762 11.2013 94.9762 12.764C94.9762 14.3053 95.2642 15.4307 95.8402 16.14C96.4162 16.844 97.2056 17.196 98.2082 17.196ZM108.103 10.068C109.031 10.068 109.799 10.3347 110.407 10.868C111.015 11.4013 111.37 12.0973 111.471 12.956H109.991C109.922 12.5507 109.727 12.1933 109.407 11.884C109.087 11.5747 108.655 11.42 108.111 11.42C107.45 11.42 106.911 11.6627 106.495 12.148C106.079 12.6333 105.871 13.3773 105.871 14.38C105.871 15.2973 106.066 16.028 106.455 16.572C106.844 17.116 107.407 17.388 108.143 17.388C108.682 17.388 109.108 17.228 109.423 16.908C109.743 16.588 109.935 16.2387 109.999 15.86H111.455C111.396 16.4147 111.215 16.9027 110.911 17.324C110.612 17.7453 110.22 18.0733 109.735 18.308C109.255 18.5427 108.711 18.66 108.103 18.66C107.351 18.66 106.684 18.4947 106.103 18.164C105.522 17.8333 105.066 17.3507 104.735 16.716C104.41 16.0813 104.247 15.308 104.247 14.396C104.247 13.5373 104.399 12.7827 104.703 12.132C105.007 11.4813 105.447 10.9747 106.023 10.612C106.599 10.2493 107.292 10.068 108.103 10.068ZM114.256 14.764C114.251 15.5053 114.435 16.124 114.808 16.62C115.181 17.116 115.736 17.364 116.472 17.364C116.963 17.364 117.387 17.252 117.744 17.028C118.107 16.804 118.344 16.4707 118.456 16.028H120.04C119.939 16.5987 119.712 17.0787 119.36 17.468C119.008 17.8573 118.579 18.1533 118.072 18.356C117.571 18.5587 117.048 18.66 116.504 18.66C115.72 18.66 115.029 18.492 114.432 18.156C113.835 17.8147 113.368 17.3293 113.032 16.7C112.701 16.0707 112.536 15.3213 112.536 14.452C112.536 13.5933 112.688 12.836 112.992 12.18C113.296 11.5187 113.733 11.0013 114.304 10.628C114.88 10.2547 115.576 10.068 116.392 10.068C117.587 10.068 118.499 10.444 119.128 11.196C119.763 11.9427 120.08 12.9427 120.08 14.196V14.764H114.256ZM114.256 13.652H118.448C118.448 13.0013 118.277 12.452 117.936 12.004C117.6 11.5507 117.083 11.324 116.384 11.324C115.909 11.324 115.515 11.4387 115.2 11.668C114.885 11.8973 114.648 12.1907 114.488 12.548C114.333 12.9053 114.256 13.2733 114.256 13.652ZM123.831 18.612C123.175 18.612 122.687 18.5027 122.367 18.284C122.053 18.0653 121.845 17.7827 121.743 17.436C121.642 17.084 121.591 16.7107 121.591 16.316V6.612H123.279V16.14C123.279 16.908 123.589 17.316 124.207 17.364L124.639 17.38V18.468C124.346 18.564 124.077 18.612 123.831 18.612Z' fill='%231B1B1B'/%3E%3C/svg%3E%0A");
    background-size: cover;
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