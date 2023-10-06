import React from "react";
import styled from "styled-components";
import { BsChevronLeft, BsChevronRight} from 'react-icons/bs';

interface AddPaginationProps {
    currentPage:number;
    totalPages: number;
    nextPage:any;
}

const Pagination: React.FC<AddPaginationProps> =({currentPage, totalPages, nextPage}) => {

    //Função que valida a paginação para não avançar mais do que a quantidade total de páginas, ou menor que 1.
    const handlePageChange = (newPage: number, totalPages: number) => {
        if((newPage <= totalPages) && (newPage >= 1)){
            nextPage(newPage);
        }
    };

    return(
        <Paginator>
            <PaginatorContent >
                <BsChevronLeft style={{cursor: 'pointer'}} onClick={() => handlePageChange(currentPage - 1, 1)}/>
                <CurrentPaginator>{currentPage}</CurrentPaginator> de {totalPages}
                <BsChevronRight style={{cursor: 'pointer'}} onClick={() => handlePageChange(currentPage + 1, totalPages)}/>
            </PaginatorContent>
        </Paginator>
    )
}

export default Pagination

const Paginator = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    align-self: stretch;
    margin-top: -1%;
`
const PaginatorContent = styled.p`
    display: flex;
    align-items: center;
    gap: 4px;
    align-self: stretch;
    color: #767676
`
const CurrentPaginator = styled.span`
    color: #EF6F2B
`
