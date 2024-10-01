import axios from "axios";

type reqSignUpData = {
    userName: string,
    email: string,
    mobileNumber: string,
    password: string,
    userRole: string
}


const SignUpService = (userData: reqSignUpData): Promise<any> => {
    const { userName, email, password, mobileNumber, userRole } = userData;
    const requiredData = { userName, email, password, mobileNumber, userRole };
    const apiUserRole = userRole.toLowerCase();
    return axios.post(`http://localhost:4000/${apiUserRole}/signup`, requiredData)
        .then((response) => {
            return { data: response.data, error: null };
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
            return { data: null, error: errorMessage };
        });
}



export default SignUpService;
