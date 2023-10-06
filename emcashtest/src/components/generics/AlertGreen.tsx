import React from 'react';
import { Alert, AlertColor, Button } from '@mui/material';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import styled from 'styled-components';

interface AddAlertProps {
    message: string;
    onClick : any;
    severity: AlertColor;
}

const AlertGreen: React.FC<AddAlertProps> = ({severity, message, onClick}) => {

    return(
        <Alert icon={<BsFillCheckCircleFill fontSize="inherit" />} severity={severity} onClick={() => {return false}}>{message}</Alert>
    )
}

const AlertRed: React.FC<AddAlertProps> = ({message, onClick}) => {

    return(
        <Alert severity="error">This is an error alert — check it out!</Alert>
    )
}



export {AlertGreen, AlertRed};