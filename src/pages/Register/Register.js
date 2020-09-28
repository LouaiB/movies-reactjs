import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import UserService from '../../services/user.service';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import './Register.sass';
import bgImage from '../../assets/bg.jpg';
import logo from '../../assets/logo.png';

export default function Login() {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { handleSubmit, register, errors } = useForm({mode: 'onBlur', reValidateMode: 'onChange'});
    const history = useHistory();
    
    const onSubmit = values => {
        setIsLoading(true);
        UserService.register(values.username, values.email, values.password).then(response => {
            setIsLoading(false);
            history.push('/login');
        }).catch(err => {
            setIsLoading(false);
            console.error(err);
            if(err.response) setError(err.response.data.message);
            else if(err.request) setError(err.error.message);
        });
    }

    return (
        <div className="register-page" style={{backgroundImage: `url(${bgImage})`}}>
            <div className="content">
                <div className="top">
                    <img src={logo} />
                    <h1>Create Account</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="register-form">
                    <input
                        name="username"
                        placeholder="Username"
                        ref={register({
                            required: "username required",
                            minLength: 3,
                            // pattern: {
                            //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            //     message: "invalid email address"
                            // }
                        })}
                    />
                    {errors.username && errors.username.message && <span className="error">{errors.username.message}</span>}
                    {errors.username && errors.username.type == "minLength" && <span className="error">username must be at least 3 characters</span>}

                    <input
                        name="email"
                        placeholder="Email Address"
                        ref={register({
                            required: "email required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "invalid email address"
                            }
                        })}
                    />
                    {errors.email && errors.email.message && <span className="error">{errors.email.message}</span>}

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        ref={register({
                            required: "password required",
                            minLength: 3,
                            //validate: value => value !== "admin" || "Nice try!"
                        })}
                    />
                    {errors.password && errors.password.message && <span className="error">{errors.password.message}</span>}
                    {errors.password && errors.password.type == "minLength" && <span className="error">password must be at least 3 characters</span>}

                    {isLoading && <FontAwesomeIcon icon={faSpinner} className="spin" />}
                    <button type="submit">CREATE FREE ACCOUNT</button>
                    {error && <span className="error">{error}</span>}
                    <button className="cancel" onClick={() => history.push('/')}>CANCEL</button>
                </form>
                <div className="bottom">
                    <span>Already a member?</span>
                    <button className="cancel" onClick={() => history.push('/login')}>SIGN IN</button>
                </div>
            </div>
        </div>
    )
}
