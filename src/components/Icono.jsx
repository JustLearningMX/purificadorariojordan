import styled from "styled-components";

export function Icono(props) {

    const color = props.color ? props.color : 'var(--second-a-text-color)';
    const width = props.width ? props.width : '100%';
    const height = props.height ? props.height : '100%';
    const objFit = props.objFit ? props.objFit : 'cover';
    
    const handleClick = props.function ? props.function : null;

    const IconStyled = styled(props.icon)`
        color: ${color};
        width: ${width};
        height: ${height};
        object-fit:  ${objFit};
        cursor:  ${props.cursor ? 'pointer' : 'none'};
        
        /* Tabletas y Laptops*/
        @media screen and (min-width: 600px) {
            height: 70%;
        }

        /* Laptops*/
        @media screen and (min-width: 1024px) {
            height: 80%;
        }

    `

    return(
            <IconStyled 
                onClick={handleClick}
            />
    );
}