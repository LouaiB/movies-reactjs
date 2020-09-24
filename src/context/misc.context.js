import React, { Component } from 'react';

const MiscContext = React.createContext();

class MiscProvider extends Component {
  // Context state
  defaultMisc = {
    sidebarOpen: false,
    overlayed: false
  }

  state = {
    misc: this.defaultMisc
  }

  // Methods to update state
  toggleSidebar = () => {
      this.setState((prevState) => ({ ...prevState, misc: { ...prevState.misc, sidebarOpen: !prevState.misc.sidebarOpen }}));
  }
  openSidebar = () => {
      this.setState((prevState) => ({ ...prevState, misc: { ...prevState.misc, sidebarOpen: true }}));
  }
  closeSidebar = () => {
      this.setState((prevState) => ({ ...prevState, misc: { ...prevState.misc, sidebarOpen: false }}));
  }

  toggleOverlay = () => {
    this.setState((prevState) => ({ ...prevState, misc: { ...prevState.misc, overlayed: !prevState.misc.overlayed }}));
  }
  openOverlay = () => {
    this.setState((prevState) => ({ ...prevState, misc: { ...prevState.misc, overlayed: true }}));
  }
  closeOverlay = () => {
    this.setState((prevState) => ({ ...prevState, misc: { ...prevState.misc, overlayed: false }}));
  }

  render() {
    const { children } = this.props;
    const { misc } = this.state;
    const { 
      toggleSidebar,
      openSidebar,
      closeSidebar,
      toggleOverlay,
      openOverlay,
      closeOverlay 
    } = this;

    return (
      <MiscContext.Provider
        value={{
            misc,
            toggleSidebar,
            openSidebar,
            closeSidebar,
            toggleOverlay,
            openOverlay,
            closeOverlay
        }}
      >
        {children}
      </MiscContext.Provider>
    )
  }
}

export { MiscProvider, MiscContext };