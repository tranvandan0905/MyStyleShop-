import instance from './customize-axios';

const postLogin = (userData) => {
    return instance.post("/api/login", userData);
};
const postLogout = () => {
    return instance.post("/api/logout");
};

const postSignup  = (userData) => {
    return instance.post("/api/signup", userData);
};
export { postLogin, postLogout,postSignup };
