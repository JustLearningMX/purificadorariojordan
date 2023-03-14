import estilos from '../../../css/principal/Servicios.module.css';
import { serviciosData } from '../../../data/ServiciosData.js';

export function Servicios(){
    return (
        <section className={estilos.mainContainer}>
            {/* <p className={estilos.servicios__titulo}>
                Nuestros servicios
            </p> */}
            {serviciosData.map((servicio, index) => {
                return (
                    <ServiciosComponente
                        key={index}
                        servicio={servicio}
                    />
                )
            })}
        </section>
    );
}

function ServiciosComponente({servicio}) {
    return (
        <article className={estilos.servicioComponente}>
            <div className={estilos.servicioComponente__container}>
            
                <div className={estilos.servicioComponente__titulo}>
                    <p>
                        {servicio.titulo}
                    </p>
                </div>
                <div className={estilos.servicioComponente__info}>
                    <p>
                        {servicio.contenido}
                    </p>
                </div>
            </div>
        </article>
    )
}