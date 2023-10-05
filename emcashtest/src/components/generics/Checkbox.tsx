import React from 'react';
import { FaCheckSquare, FaRegSquare } from 'react-icons/fa'; // Importe os ícones desejados
import styled from 'styled-components';

type CheckProps = {
  checked: boolean;
  onChange?: (e: Event) => void;
  label: string
};

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

const IconContainer = styled.div<{ checked: boolean;}>`
  width: 24px;
  height: 24px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #007bff; /* Cor da borda do checkbox */
  border-radius: 4px;
  transition: background-color 0.3s ease-in-out;

  svg {
    width: 16px;
    height: 16px;
    fill: transparent;
    visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
  }
`;

const CheckboxLabel = styled.span`
  margin-left: 8px;
`;
 
const Checkbox: React.FC<CheckProps> = ({ checked, onChange, label }) => {
  return (
    <CheckboxContainer>
      <HiddenCheckbox checked={checked} onChange={(e) => onChange} />
      <IconContainer checked={checked}>
        {checked ? <FaCheckSquare /> : <FaRegSquare />}
      </IconContainer>
      <CheckboxLabel>{label}</CheckboxLabel>
    </CheckboxContainer>
  );
};

export default Checkbox;
