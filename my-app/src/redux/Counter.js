import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement,ResetCount,isLogged } from './actions/action';

export const Counter = () => {
    
const counter = useSelector((state:any) => state.counterReducer.count);
const loginState = useSelector((state:any) => state.loginReducer.login);
let sign_status = "";
if(loginState)
sign_status = "SIGN OUT"
else
sign_status = "SIGN IN"


const dispatch = useDispatch();

const handleIncrement = () => {
    dispatch(increment(1));
  };

  const handleDecrement = () => {
    dispatch(decrement(1));
  };
  const RESETApp = () => {
    dispatch(ResetCount());
  };

  const SignIN = () => {
    dispatch(isLogged());
  };
    return (
        <div>
            <h1>Counter {counter} </h1>
            <button className='btnStyle' onClick={()=>handleIncrement()}>+</button>
            <button className='btnStyle' onClick={()=>handleDecrement()}>-</button>
            <button className='btnStyle1' onClick={()=>RESETApp()}>RESET</button>
            <button className='btnStyle1' onClick={()=>SignIN()}>{sign_status}</button>
{loginState}
            <p> {loginState ? <p>login Success</p>:<p>please login </p>}</p>

        </div>
    );
};