import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import UserService from '../../services/user.service';
import TokenStorageHelper from '../../storage/token.storage';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/user.context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './Login.sass';
import bgImage from '../../assets/bg.jpg';
import logo from '../../assets/logo.png';

export default function Login() {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { user, setUser } = useContext(UserContext);

    const { handleSubmit, register, errors } = useForm({mode: 'onBlur', reValidateMode: 'onChange'});
    const history = useHistory();
    
    const onSubmit = values => {
        setIsLoading(true);
        UserService.login(values.username, values.password).then(response => {
            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;

            TokenStorageHelper.setAccessToken(accessToken);
            TokenStorageHelper.setRefreshToken(refreshToken);

            UserService.getUserData().then(userData => {
                setUser({
                    loggedIn: true,
                    ... userData.data
                });
    
                setIsLoading(false);
                history.push('/');
            }).catch(err2 => {
                setIsLoading(false);
                console.error(err2);
                setError(err2.error.message);
            });
        }).catch(err => {
            setIsLoading(false);
            console.error(err);
            if(err.response) setError(err.response.data.message);
            else if(err.request) setError(err.error.message);
        });
    }

    return (
        <div className="login-page" style={{backgroundImage: `url(${bgImage})`}}>
            <div className="content">
                <div className="top">
                    <img src={logo} />
                    <h1>Sign In</h1>
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
                    <button type="submit">SIGN IN</button>
                    {error && <span className="error">{error}</span>}
                    <button className="cancel" onClick={() => history.push('/')}>CANCEL</button>
                </form>
                <div className="bottom">
                    <span>New to movies.tv?</span>
                    <button className="cancel" onClick={() => history.push('/register')}>CREATE FREE ACCOUNT</button>
                </div>
            </div>
        </div>
    )
}
