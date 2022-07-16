import styled from "styled-components";

export function Icono(props) {

    const color = props.color ? props.color : 'var(--second-a-text-color)';
    const width = props.width ? props.width : '100%';
    const height = props.height ? props.height : '100%';
    const objFit = props.objFit ? props.objFit : 'cover';
    console.log(props);
    const handleClick = props.function ? props.function : null;

    const IconStyled = styled(props.icon)`
        color: ${color};
        width: ${width};
        height: ${height};
        object-fit:  ${objFit};
        cursor:  ${props.cursor ? 'pointer' : 'none'};
    `

    return(
            <IconStyled onClick={handleClick} />
    );
}