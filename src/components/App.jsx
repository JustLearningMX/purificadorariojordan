import { Aside } from "./Aside";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Main } from "./Main";
import {BrowserRouter as Router} from 'react-router-dom';

export function App(){
   return (
      <>
      <Router>
         <Header />
         <Main />         
         <Footer />
         <Aside />
      </Router>
      </>
   );
};