import React, { useState } from 'react';
import { firebase } from '../../firebase';

import FormField from '../ui/formFields';
import { validate } from '../ui/misc';

const Signin = () => {
    const [state, setState] = useState({
        formError: false,
        formSuccess:'',
        formdata:{
            email:{
                element:'input',
                value:'',
                config:{
                    name:'email_input',
                    type:'email',
                    placeholder:'Enter your email'
                },
                validation:{
                    required:true,
                    email:true
                },
                valid:false,
                validationMessage:''
            },
            password:{
                element:'input',
                value:'',
                config:{
                    name:'password_input',
                    type:'password',
                    placeholder:'Enter your password'
                },
                validation:{
                    required:true
                },
                valid:false,
                validationMessage:''
            }
        }
    })

    const  submitForm = (event) => {

        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for(let key in state.formdata){
            dataToSubmit[key] = state.formdata[key].value;
            formIsValid = state.formdata[key].valid && formIsValid;
        }

        if (formIsValid) {
            
            firebase.auth()
            .signInWithEmailAndPassword(
                dataToSubmit.email,
                dataToSubmit.password
            ).then(()=>{
               this.props.history.push('/dashboard');
            }).catch(error =>{
                setState({
                    ...state,
                    formError:true
                })
            })

        } else {
           setState({
               ...state,
               formError: true
           })
        }
        
    }
    const updateForm = (element) => {
        const newFormdata = {...state.formdata}
        const newElement = {...newFormdata[element.id]}

        newElement.value = element.event.target.value;

        let valiData = validate(newElement);
        newElement.valid = valiData[0];
        newElement.validationMessage = valiData[1];

        newFormdata[element.id] = newElement;

        setState({
            ...state,
            formError:false,
            formdata: newFormdata
        })
        
    }
    return (
        <div className="container">
            <div className="signin_wrapper" style={{margin:'100px'}}>

                <form onSubmit={(event)=> submitForm(event)}>

                    <h2>Please Login</h2>

                    <FormField 
                            id={'email'}
                            formdata={state.formdata.email}
                            change={(element)=> updateForm(element)}
                        
                        />

                         <FormField 
                            id={'password'}
                            formdata={state.formdata.password}
                            change={(element)=> updateForm(element)}
                        
                        />
                        { state.formError ? <div className="error_label">Something is wrong, Try again</div> :null}

                        <button onClick={(event)=> submitForm(event)}>Log in</button>

                </form>

            </div>
        </div>
    );
}

export default Signin;
