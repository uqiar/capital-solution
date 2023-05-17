import React from 'react';
import MyContext from './appContext';
import tokenStorage from '../services/tokenStorage';
import { setAxiosAuthorizationHeader } from '../axiosConfig';

class MyProvider extends React.Component {
    state = {
        user: {},
        dsts:[]
    }
    componentDidMount() {
        this.setState({ user: tokenStorage.getUserInfo() })
        this.setTokensFromLocalStorage(tokenStorage.getToken())
        const dsts=localStorage.getItem("dsts")
        if(dsts){
            const parseDsts=JSON.parse(dsts)
            this.setState({dsts:parseDsts})
        }
    }
   componentWillUpdate(){
     if(this.state.dsts.length){
        const newDst=JSON.stringify(this.state.dsts)
         localStorage.setItem("dsts",newDst)
     }
   }
    setTokensFromLocalStorage =async (token) => {
        if (token) {
            await setAxiosAuthorizationHeader(token);
        }
    }
  
    updateState = (name, value) => {
        this.setState({ ...this.state, [name]: value })
    }
     
    render() {
        return (
            <MyContext.Provider
                value={{
                    state: this.state,
                    updateState: this.updateState,
                    setTokensFromLocalStorage: this.setTokensFromLocalStorage
                }}
            >
                    {this.props.children}
            </MyContext.Provider>
        );

    }
}

export default MyProvider