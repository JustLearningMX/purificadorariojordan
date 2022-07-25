/**
 * Componente que protege rutas y redirecciona
 * según sea el caso
 */

import { Navigate, Route } from 'react-router-dom';
import { LOGIN } from '../../config/router/paths';
// import useAuthContext from '../../hooks/useauthContext';

export function PrivateRoute(props){
    // const [isAuthenticated] = useAuthContent();
    const isAuthenticated = false;

    if(!isAuthenticated) {
        return <Navigate to={LOGIN} replace/>
    }

    return <Route {...props} />
}

/**OTRA FORMA DE HACER EL RETURN DE UNO U OTRO COMPONENT:
 * 
 * return (
        <Route
            {...rest}
            render={props => (isAuthenticated ? <Component {...props} /> : <Redirect to={LOGIN} />)}
        />
    );
 */