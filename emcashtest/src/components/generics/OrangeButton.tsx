import React, {ReactNode} from "react";
import styled, { CSSObject } from "styled-components";

type ButtonProps = {
    children: ReactNode;
    size?: 'small' | 'medium'|'large';
    customStyles?: CSSObject | undefined;
    type?: 'submit' | 'button';
    onClick?: () => void;
};

const getButtonSize = (size: 'small' | 'medium' | 'large'): CSSObject => {
    switch (size) {
      case 'small':
        return {
          width: '15%',
        };
      case 'medium':
        return {
            width: '27%',
        };
      case 'large':
      default:
        return {
            width: '55%',
        };
    }
  };

const StyledOrangeButton = styled.button<{ size: 'small' | 'medium' |'large'; customStyles?: CSSObject | undefined}>`
  ${(props) => getButtonSize(props.size)};
  ${(props) => props.customStyles};
  padding: 15px 16px; 
  color: #fff;
  background: var(--primary-500, #EF6F2B);
  border: 8px;
  border-radius: 4px;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  line-height: 19.5px; /* 139.286% */
  letter-spacing: -0.2px;
  
  &:hover{
      background-color: #eb6105;
      color: #fff;  
  }
`


const OrangeButton: React.FC<ButtonProps> = ({ children, size = 'large', customStyles, onClick, type = 'button' }) => {
    return (
        <>
            <StyledOrangeButton size={size} customStyles={customStyles} onClick={onClick} type={type}>
                {children}
            </StyledOrangeButton>
        </>
      );
}

export default OrangeButton;