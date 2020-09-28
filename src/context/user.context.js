import React, { Component } from 'react'

const UserContext = React.createContext()

class UserProvider extends Component {
  // Context state
  defaultUser = {
    loggedIn: false,
    email: null,
    username: null,
    userId: null,
    createdOn: null,
    roles: null
  }

  state = {
    user: this.defaultUser
  }

  // Method to update state
  setUser = (user) => {
    this.setState((prevState) => ({ user }));
    console.info('new user set in context');
    console.info(user);
  }

  clearUser = () => {
      this.setState((prevState) => ({ user: this.defaultUser }));
  }

  render() {
    const { children } = this.props;
    const { user } = this.state;
    const { setUser, clearUser } = this;

    return (
      <UserContext.Provider
        value={{
          user,
          setUser,
          clearUser
        }}
      >
        {children}
      </UserContext.Provider>
    )
  }
}

export { UserProvider, UserContext };