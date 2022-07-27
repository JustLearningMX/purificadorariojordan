import { Button } from 'semantic-ui-react';
import { useState } from 'react';

export const BotonLoading = ({texto, className, type, variant})=>{

    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    
    const handleClick = ()=>{
        setIsLoading(!isLoading);
        // setIsDisabled(!isDisabled);
        console.log('Boton Loading')
    }

    return (
        <div>
            <Button 
                // disabled={isDisabled} 
                className={className}
                type={type}
                onClick={handleClick}
                loading={isLoading}
            >
                {texto}
            </Button>
        </div>
    );

}