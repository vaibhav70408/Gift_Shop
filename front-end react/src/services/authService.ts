import axios from "axios";
import loginDataType from "../common/types/loginType";

const AuthLoginService = (userData: loginDataType): Promise<any> => {
  return axios
    .post(`http://localhost:4000/user/login`, userData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      let errorMessage;
      if (error.response) {
        errorMessage = error.response.data.message;
      } else if (error.request) {
        errorMessage = error.request;
      } else {
        errorMessage = error.message;
      }
      return { error: errorMessage };
    });
};
export default AuthLoginService;
