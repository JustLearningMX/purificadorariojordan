import estilos from '../../../css/principal/Contacto.module.css';
import { TelephoneForwardFill } from '@styled-icons/bootstrap/';
import { WhatsappSquare } from '@styled-icons/fa-brands/';

export function Contacto(){

    return (
        <section className={estilos.mainContainer}>
            <p className={estilos.contacto__titulo}>
                Medios para contactarnos
            </p>
            <p className={estilos.contacto__subtitulo}>
                Puedes marcarnos por telefono o whatsappearnos
            </p>
            <article className={estilos.iconosContainer}>
                <a 
                    className={estilos.iconosLink}
                    href="tel:+528332517340" 
                >
                    <IconoComponente
                        icono={<TelephoneForwardFill />}
                        color="#007bff"
                    /> 
                </a>
                <a 
                    className={estilos.iconosLink}
                    href="https://api.whatsapp.com/send?phone=528332517340&amp;text=Hola,%20buen%20d%C3%ADa,%20deseo%20m%C3%A1s%20informaci%C3%B3n" 
                    target="_blank" 
                    rel="noreferrer"
                >
                    <IconoComponente
                        icono={<WhatsappSquare />}
                        color="#28a745"
                    />
                </a>
            </article>
            <FormMailTo />

        </section>
    );
}

function IconoComponente({icono, color}) {
    return (
        <figure className={estilos.iconosContainer__icono} style={{color: color}}>
            {icono}
        </figure>
    );
}

function FormMailTo() {
    return (
        <article className={estilos.formComponentContainer}>
            <h2 className={estilos.form__title}>
                Escríbenos.
            </h2>
            
            <p className={estilos.contacto__subtitulo}>
                Danos tu opinión o haz un pedido por correo
            </p>
            <form action="mailto:virtual.liga@gmail.com" method="GET">
                    {/* eunice_aae@hotmail.com */}
                <div className={estilos.form__inputContainer}>
                    <label className={estilos.form__label} htmlFor="subject">Tema: </label>
                    <input 
                        type="text" 
                        className={estilos.form__input} 
                        name="subject" 
                        id="subject" 
                        placeholder='En que te podemos ayudar'
                    />
                </div>
                {/* <div className={estilos.form__inputContainer}>
                    <label className={estilos.form__label} htmlFor="email">Correo Electrónico: </label>
                    <input type="text" className={estilos.form__input} name="email" id="email" />
                </div> */}
                <div className={estilos.form__comentariosContainer}>
                    <label className={estilos.form__label}>Comentarios o pedidos:</label>
                    <textarea className={estilos.form__textArea} name="body" rows="12" cols="35" placeholder='Escribe tus comentarios'></textarea>
                </div>
                <div className={estilos.form__buttonsContainer}>
                    <input className={estilos.submittButtonSend} type="submit" name="submit" value="Enviar" />
                    <input className={estilos.submittButtonClear} type="reset" name="reset" value="Limpiar" />
                </div>
            </form>
        </article>
    );
}