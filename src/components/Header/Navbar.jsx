import { arrayMenu } from '../../data/arrayMenu.js';

export function Navbar(props) {
    return(
        <nav className={props.className}>
            <ul>
                {arrayMenu.principal.map((opcion, i)=>{
                    return <li key={i}>
                        {opcion}
                    </li>
                })}
            </ul>            
        </nav>
    );
    
}