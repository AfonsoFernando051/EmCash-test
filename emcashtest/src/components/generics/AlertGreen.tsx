import React from 'react';
import { Alert, AlertColor } from '@mui/material';
import { BsFillCheckCircleFill } from 'react-icons/bs';

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

export default AlertGreen;