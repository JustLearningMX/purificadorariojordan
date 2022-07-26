import { Aside } from "./Aside";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Main } from "./Main";
import {BrowserRouter as Router} from 'react-router-dom';
import { AuthContextProvider } from '../context/authContext'

export function App(){
   return (
      <AuthContextProvider>
      <Router>
         <Header />
         <Main />         
         <Footer />
         <Aside />
      </Router>
      </AuthContextProvider>
   );
};