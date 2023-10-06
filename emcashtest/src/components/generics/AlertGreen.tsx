import React from 'react';
import { Alert, AlertColor } from '@mui/material';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import {GrFormClose} from 'react-icons/gr'
import styled from 'styled-components';

interface AddAlertProps {
    message: string;
    onClick : any;
    severity: AlertColor;
}

const AlertGreen: React.FC<AddAlertProps> = ({severity, message, onClick}) => {

    return(
        <Alert style={{width: '521px'}} icon={<BsFillCheckCircleFill fontSize="inherit" />} severity={severity} >
            {message} <CloseIcon onClick={() => {return false}}><GrFormClose/></CloseIcon>
        </Alert>
    )
}

const CloseIcon = styled.button`
    POSITION: ABSOLUTE;
    left: 94%;
    border: none;
    background-color: inherit;
    cursor: pointer;
`

export default AlertGreen;