import React, { useEffect, useContext } from 'react';
import UserService from '../../services/user.service';
import { UserContext } from '../../context/user.context';
import { useHistory } from 'react-router-dom';
import TokenStorageHelper from '../../storage/token.storage';

export default function Logout() {

    const { clearUser } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        UserService.logout().then(response => {
            clearUser();
            TokenStorageHelper.clear();
            history.push('/login');
        }).catch(err => {
            console.error(err);
        });

    }, []);

    return (
        <div>
            logging out...
        </div>
    )
}
