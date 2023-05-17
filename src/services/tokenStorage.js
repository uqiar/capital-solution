const tokenStorage = (function () {

    function getToken() {
        let userInfo = JSON.parse(localStorage.getItem('__set'));
        if(userInfo&&userInfo.token){
            return userInfo.token
        }
        else
        return false
    }


    function getUserInfo() {
        try {
            let userInfo = JSON.parse(localStorage.getItem('__set'));
            return userInfo;
            
        } catch (error) {
            return null;
        }
    
    }

    return {
        getToken,
        getUserInfo,
    }
    
})();

export default tokenStorage;