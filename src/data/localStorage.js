export const localStorageObj = {
    usuarioLogueado: (userToken)=>{
        window.localStorage.setItem(
            "usuarioLogueadoPurificadora", JSON.stringify(userToken)
        );
    },
    usuario: (Usuario)=>{
        window.localStorage.setItem(
            "UsuarioPurificadora", JSON.stringify(Usuario)
        );
    },
};