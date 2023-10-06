import React from 'react';
import { Alert, Button } from '@mui/material';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import styled from 'styled-components';

interface AddAlertProps {
    message: string;
    onClick : any;
}

const AlertGreen: React.FC<AddAlertProps> = ({message, onClick}) => {

    return(
        <Alert icon={<BsFillCheckCircleFill fontSize="inherit" />} onClick={(onClose) => {return true}} onClose={(onClose) => {}}>{message}</Alert>
    )
}

export default AlertGreen;