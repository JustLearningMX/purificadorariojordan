export function Welcome() {
    const userToken = JSON.parse(window.localStorage.getItem("usuarioLogueadoPurificadora"));

    return (
        <section style={{height: "calc(100vh - 140px)"}}>
            <h2>Bienvenido {userToken.telefono}</h2>

        </section>
    );
}