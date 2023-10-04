import React, {ReactNode} from "react";
import styled, { CSSObject } from "styled-components";

type ButtonProps = {
    children: ReactNode;
    size?: 'small' | 'large';
    onClick?: () => void;
};

const StyledOrangeButton = styled.button<{ size: 'small' | 'large'}>`
    font-size: ${(props) => (props.size === 'small' ? '12px' : '16px')};

`

const OrangeButton: React.FC<ButtonProps> = ({ children, size = 'large', onClick }) => {
    return (
        <>
            <StyledOrangeButton size={size} onClick={onClick}>
                {children}
            </StyledOrangeButton>
        </>
      );
}

export default OrangeButton;