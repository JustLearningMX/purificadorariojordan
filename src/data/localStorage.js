export const localStorageObj = {
    usuarioLogueado: (userToken)=>{
        window.localStorage.setItem(
            "usuarioLogueadoPurificadora", JSON.stringify(userToken)
        );
    },
};