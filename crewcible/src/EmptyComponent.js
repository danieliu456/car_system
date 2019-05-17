import React, { Component } from 'react';
import './App.css';

class EmptyComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentWindow: false
        };
        //EVENT BINDINGS HERE
    }

    componentDidMount = async () => {
        //STEPS BEFORE COMPONENT MOUNTS ITSELF
    }

    //EVENT LISTENERS AND OTHER FUNCTIONS GO HERE

    render() {
        return (
            <div>
                <h1>HTML HERE</h1>
            </div>
        );
    }
}

export default EmptyComponent;