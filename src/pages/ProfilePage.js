import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/authContext";
import {Loader} from "../components/Loader";
import {useMessage} from "../hooks/message.hook";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {NavLink} from "react-router-dom";

toast.configure();
export const ProfilePage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [profile, setProfile] = useState(null);
    const [name, setName] = useState(null);
    const [nickname, setNickname] = useState(null);
    const [email, setEmail] = useState(null);
    const [form, setForm] = useState({
        password: '', newPassword: '', repeatPassword: ''
    });
    const [ListDate, setListDate] = useState(null);

    const getLink = useCallback(async () => {
        try {
            const data = await request('api/date_support_measures_list', 'GET', null, {
                Authorization: `${auth.token}`
            });
            setListDate(data);
        } catch (e) {}
    }, [auth.token, request]);

    const notify = (messageText) => toast.info(messageText);

    useEffect(() => {
        getLink();
    }, [getLink]);

    useEffect( () => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeNameHandler = event => {
        setName(event.target.value);
    }
    const changeNicknameHandler = event => {
        setNickname(event.target.value);
    }
    const changeEmailHandler = event => {
        setEmail(event.target.value);
    }
    const changePasswordHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    if (loading) {
        return <Loader />
    }

    const profileHandler = async () => {
        try {
            const data = await request('/api/date_support_measures_list', 'POST', {name, nickname, email}, {
                Authorization: `${auth.token}`
            });

        } catch (e) {}
    }



    const passwordHandler = async () => {
        try {
            const data = await request('/api/user/change_password', 'POST', {...form}, {
                Authorization: `${auth.token}`
            });
            notify(data.message.toString());
        } catch (e) {}
    }

    function routerId(id) {
        return "/company/" + id;
    }

// Компонент UsersList
    function BusinessList(props) {
        // используя метод map() и заполняем данными тег li
        if (!props.props) return;
        const listItems = props.props.map((item, index ) =>
            <NavLink to={routerId(item._id)} key={ index.toString() } className="main__content-allCompany-item">
                <div className="main__content-allCompany-item-img">

                </div>
                <div className="main__content-allCompany-item-bg"/>
                <div className="main__content-allCompany-box">
                    <div className="main__content-allCompany-item-lvl">
                        <p><span>
                            { item.option.option_1 }
                        </span>%</p>
                    </div>
                    <div className="main__content-allCompany-item-name">
                        <p>
                            { item.title }
                        </p>
                    </div>
                </div>
                <div className="main__content-allCompany-item-hover"/>
            </NavLink>
        );
        return (
            <div>
                { listItems }
            </div>
        );
    }

    return (
        <div className="main__content-inner">
            <div className="row justify-content-center justify-content-lg-start">
                { ListDate && <BusinessList props={ListDate} /> }
            </div>
        </div>
    );
};
