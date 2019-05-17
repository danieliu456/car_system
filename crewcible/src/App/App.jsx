import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import {PrivateRoute} from '../_components';
import {HomePage} from '../HomePage';
import {LoginPage} from '../LoginPage';
import {LanguageContext} from '../LanguageContext'

class App extends Component {
    render() {
        var languageCode = localStorage.getItem("languageCode")
        if(null === languageCode){
            languageCode = "en"
        }

        return(
            <LanguageContext.Provider value={languageCode}> 
                <Router>
                    <div>
                        <PrivateRoute exact path="/" component={HomePage}/>
                        <Route path="/login" component={LoginPage}/>
                    </div>
                </Router>
            </LanguageContext.Provider>
        );
    }
}

export {App}