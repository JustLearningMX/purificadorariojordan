export function Menu(props){
    return (
        <ul>
            {props.opcionesMenu.map((opcion, i)=>{
                return <li key={i} className={props.classMenuItems}>
                    <a className={props.classNavLink} href="#" >
                        {opcion}
                    </a> 
                </li>
            })}
        </ul> 
    )
}