import React, { Component } from 'react';
import './errorBoundary.sass';

export default class ErrorBoundary extends Component {

    constructor(props){
        super(props);

        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true
        }
    }

    render() {
        if(this.state.hasError) {
            return (
                <div className="error-boundary">
                    <h1>Something went wrong with this section</h1>
                    <span>Please report this issue</span>
                </div>
            )
        }
        return this.props.children
    }


}
