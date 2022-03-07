import React from 'react';
import validator from 'validator';
import { Link } from 'react-router-dom';
import { useForm } from '../../custom-hooks/useForm';

export const RegisterScreen = () => {

    const [formValues, handleInputChange] = useForm({
      name:'Jesus',
      email:'jesus@gmail.com',
      password:'123456',
      password2:'123456'
    })

    const {name, email, password, password2} = formValues;

    const handleRegister = (e) => {
      e.preventDefault();
      
      if(isFormValid()){
        console.log('Formulario Correcto');
      }
    }

    const isFormValid = () => {
      if( name.trim().length === 0){
        console.log('Name is required');
        return false;
      }else if ( !validator.isEmail(email) ){
        console.log('Email ins not valid');
        return false;
      }else if (password !== password2 || password.length < 6){
        console.log('Password should be at least 6 characters and match each other');
        return false;
      }

      return true;
    }
    return (
        <>
      <h3 className="auth__title">Register</h3>

      <div className='auth__alert-error'>
        Hola Mundo
      </div>
      <form onSubmit={handleRegister}>

      <input 
          type="text" 
          placeholder="Name" 
          name="name" 
          autoComplete='off'
          className="auth__input" 
          value={name}
          onChange={handleInputChange}
        />

        <input 
          type="text" 
          placeholder="Email" 
          name="email" 
          autoComplete='off'
          className="auth__input"
          value={email} 
          onChange={handleInputChange}
        />

        <input 
          type="password" 
          placeholder="Password" 
          name="password" 
          autoComplete='off'
          className="auth__input" 
          value={password}
          onChange={handleInputChange}
        />
        <input 
          type="password" 
          placeholder="Confirm" 
          name="password2" 
          autoComplete='off'
          className="auth__input" 
          value={password2}
          onChange={handleInputChange}
        />


        <button 
          type="submit"
          className="btn btn-primary btn-block mb-5"
          //disabled= {true}
        >
          Register
        </button>

        <Link 
          to="/auth/login"
          className="link"
        >
            Already registered?
        </Link>
      </form>
    </>
    
    )
};
