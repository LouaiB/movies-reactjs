import React, { Component } from 'react';

const ModalsContext = React.createContext();

class ModalsProvider extends Component {

    modals = {
        INCLUDE_TAGS:      { code: 1 },
        EXCLUDE_TAGS:      { code: 2 },
        SEARCH_SORT:       { code: 3 },
    }

    // Context state
    defaultModal = {
        isOpen: false,
        selectedModal: this.modals.INCLUDE_TAGS
    }

    state = {
        modal: this.defaultModal
    }

    // Methods to update state
    openModal = () => {
        this.setState((prevState) => ({ ...prevState, modal: { ...prevState.modal, isOpen: true }}));
    }
    closeModal = () => {
        this.setState((prevState) => ({ ...prevState, modal: { ...prevState.modal, isOpen: false }}));
    }

    setModal = (modal) => {
        this.setState((prevState) => ({ ...prevState, modal: { ...prevState.modal, selectedModal: modal }}));
    }

    render() {
        const { children } = this.props;
        const { modal } = this.state;
        const { 
            openModal,
            closeModal,
            setModal,
            modals,
        } = this;

        return (
            <ModalsContext.Provider
                value={{
                    modal,
                    openModal,
                    closeModal,
                    setModal,
                    modals,
                }}
            >
                {children}
            </ModalsContext.Provider>
        )
    }
}

export { ModalsContext, ModalsProvider };