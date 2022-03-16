import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core'
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
// importing commerce as a named import
import { commerce } from '../../../lib/lightyourway';

const steps = ['Shipping address', 'Payment details'];


const Checkout = ({ cart }) => {
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const [activeStep, setActiveStep] = useState(0);
    const classes = useStyles();

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    useEffect(() => {
        if (cart.id) {
          const generateToken = async () => {
            try {
                // generating cart token with commerce api call
              const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });

              console.log(token);
    
              setCheckoutToken(token);
            } catch {

            }
          };
    
          generateToken();
        }
      }, [cart]);


      const next = (data) => {
        setShippingData(data);
    
        nextStep();
      };



    const Confirmation = () => (
        <div>
            Confirmation
        </div>
    );

    // if activestep is 0 then load address form
    const Form = () => activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} nextStep={nextStep}/>
        // else load payment form
        : <PaymentForm shippingData={shippingData}/>

  return (
    <>
        <div className={classes.toolbar} />
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant="h4" align="center">Checkout</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((step) => (
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>                
                    ))}
                </Stepper>
                {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
            </Paper>
        </main>
    </>
  )
}

export default Checkout