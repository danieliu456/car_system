import React, { Component } from 'react';
import './App.css';
import '../Styles/language.css';
import en from '../img/gb.png';
import lt from '../img/lt.png';
import { userService } from '../_services';

import {strings, setLanguage} from '../_helpers/localization';
import {LanguageContext} from '../LanguageContext'

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            submited: false,
            loading: false,
            error: '',
            lang:"",
        };

        this.submitLogin = this.submitLogin.bind(this)
        this.change = this.change.bind(this)
        this.submitLanguage = this.submitLanguage.bind(this);
    }


    submitLogin(e) {
        e.preventDefault();
        console.log(this.state.username + "  " + this.state.password);
        this.setState({ submited: true });

        const { username, password, returnUrl } = this.state;

        if (!(username && password)) {
            return;
        }

        this.setState({ loading: true });
        userService.login(username, password)
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from);
                },
                error => this.setState({ error, loading: false })
            )

    }

    submitLanguage(code) {
        console.log(code);
        this.setState({
            lang: code
        })
    }

    change(event) {
        const { value, name } = event.target
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <HtmlLogin
                submitLogin={this.submitLogin}
                change={this.change}
                data={this.state}
                submitLanguage={this.submitLanguage}
                lang={this.state.lang}/>
        );
    }
}

export { LoginPage };

class HtmlLogin extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    static contextType = LanguageContext
    render() {
        setLanguage(this.context);
        return (
            <div>
            <div className="root-container">
                <div className="box-container">
                    <div className="inner-container">
                        <div className="header">{strings.login}</div>
                        <div className="box">
                            <div className="input-group">
                                <label htmlFor="username">{strings.user}</label>
                                <input type="text"
                                    name="username"
                                    value={this.props.data.username}
                                    className="login-input"
                                    placeholder={strings.user}
                                    onChange={this.props.change} />
                            </div>

                            <div className="input-group">

                                <label htmlFor="password">{strings.password}</label>
                                <input type="password"
                                    name="password"
                                    value={this.props.data.password}
                                    className="login-input"
                                    placeholder={strings.password}
                                    onChange={this.props.change}
                                />

                            </div>
                            <button type="button" className="login-btn" onClick={this.props.submitLogin}>{strings.login}</button>
                        </div>
                    </div>
                </div>
            </div>,

            <div className ="center">
                <img className='pic' src={en} alt="my_img" onClick={() => this.changeLanguage("en")}/>
                <img className='pic' src={lt} alt="my_img" onClick={() => this.changeLanguage("lt")}/>  
            </div>
        </div>
        );
    }

    changeLanguage(code){
        localStorage.setItem("languageCode",code)
        window.location.reload();
    }
}