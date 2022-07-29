import estilos from '../../../css/principal/Nosotros.module.css';
import img1 from '../../../assets/landinPage/agua-naturaleza.jpg';
import img2 from '../../../assets/landinPage/chico-bebiendo.jpg';
import img3 from '../../../assets/landinPage/repartidor-y-clienta.png';
import img4 from '../../../assets/landinPage/botella-acostada.jpg';

export function Nosotros(){
    return (
        <section className={estilos.sectionContainer}>
            <NosotrosCabecera />
            <NosotrosPensamos />
        </section>
    );
}

function NosotrosCabecera(){
    return (
        <article className={estilos.articleCabecera}>
            <div className={estilos.infoCabeceraContainer}>
                <p className={estilos.subtitulo}>
                    Río Jordán
                </p>

                <p className={estilos.parrafo}>
                    Somos tu proveedor de agua purificada y bebida refrescante para tu hogar, oficina o negocio.
                </p>
            </div>
        </article>
    );
}

function NosotrosPensamos(){
    return (
        <article className={estilos.articlePensamos}>
            <div className={estilos.imagenesPensamosContainer}>
                <div className={estilos.divImg1}>
                    <img src={img1} alt='agua naturaleza' className={`${estilos.imagenesPensamos} ${estilos.imagenesPensamos1}`}/>
                </div>
                <div className={estilos.divImg2}>
                    <img src={img2} alt='chico bebiendo' className={`${estilos.imagenesPensamos} ${estilos.imagenesPensamos2}`}/>
                </div>   
                <div className={estilos.divImg3}>
                    <img src={img3} alt='repartidor y clienta' className={`${estilos.imagenesPensamos} ${estilos.imagenesPensamos3}`}/>
                </div>   
                <div className={estilos.divImg4}>
                    <img src={img4} alt='botella acostada' className={`${estilos.imagenesPensamos} ${estilos.imagenesPensamos4}`}/>
                </div>             
            </div>
            <div className={estilos.infoPensamosContainer}>
                <p className={estilos.subtituloPensamos}>
                    ¿Cómo pensamos?
                </p>
                <p className={estilos.parrafoPensamos}>
                    Estamos comprometidos con tu bienestar y el de los tuyos. 
                    Por eso amamos entregarte agua fresca, segura, limpia y de 
                    agradable sabor. Contamos con altos estándares de calidad y 
                    cada gota pasa a través de un riguroso proceso para asegurarnos 
                    de que recibirás productos saludables a bajos costos.
                </p>
            </div>
        </article>
    );
}