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

const StyledGrayButton = styled.button<{ size: 'small' | 'medium' |'large'; customStyles?: CSSObject | undefined}>`
    ${(props) => getButtonSize(props.size)};
    ${(props) => props.customStyles};
    padding: 15px 16px; 
    background: #F3F3F3;
    color: var(--primary-500, #EF6F2B);
    border: 20px;
    border-radius: 4px;
    font-size: 13px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    line-height: 19.5px; /* 139.286% */
    line-height: 19.5px; /* 150% */
    text-align: center;
    font-weight: 600;
    font-style: normal;

    &:hover{
        background-color: #BABABA;
        color: #fff;  
    }
`

const GrayButton: React.FC<ButtonProps> = ({ children, size = 'large', customStyles, onClick, type = 'button' }) => {
    return (
        <>
            <StyledGrayButton size={size} customStyles={customStyles} onClick={onClick} type={type}>
                {children}
            </StyledGrayButton>
        </>
      );
}

export default GrayButton;