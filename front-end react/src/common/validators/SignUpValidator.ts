import signUpDataType from "../types/signUpData"

const userNameRegex = /^(?=.*[0-9])(?=.*[a-z])[a-z0-9]+$/i;
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[\w!@#$%^&*]+$/;

const signUpValidator = (values: signUpDataType) => {
    let errors = {
        userRole: "",
        email: "",
        userName: "",
        mobileNumber: "",
        password: "",
        confirmPassword: ""
    };

    if (!values.userRole || values.userRole.trim() === "") {
        errors.userRole = "Admin / User needs to be selected";
    }

    if (!values.userName) {
        errors.userName = "Username is required";
    } else if (values.userName.length < 5 || values.userName.length > 20) {
        errors.userName = "Username must be between 5 and 20 characters long.";
    } else if (!userNameRegex.test(values.userName)) {
        errors.userName = "Username must contain at least one digit and one letter.";
    }

    if (!values.email) {
        errors.email = "Email is required";
    } else if (!values.email.match(emailRegex)) {
        errors.email = "Enter a valid email address";
    }

    if (!values.password || values.password.trim() === "") {
        errors.password = "Password is required";
    } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters long.";
    } else if (!passwordRegex.test(values.password)) {
        errors.password = "Password needs mixed-case letters, digits, and special characters.";
    }

    if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Password and Confirm Password must be same";
    }

    if (!values.mobileNumber || typeof values.mobileNumber !== 'number') {
        errors.mobileNumber = "Mobile Number is required";
    } else if (values.mobileNumber < 6000000000 || values.mobileNumber > 9999999999) {
        errors.mobileNumber = "Enter a valid mobile number.";
    }

    return errors;
}

export default signUpValidator;