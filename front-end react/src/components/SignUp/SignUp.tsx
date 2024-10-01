import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { ErrorMessage } from "./ErrorMsgComponent";
import signUpValidator from "../../common/validators/SignUpValidator";
import SignUpService from "../../services/SignUpService";
import { useNavigate, Link } from "react-router-dom";
import signUpDataType from "../../common/types/signUpData";
import styles from "./SignUp.module.scss";
import Modal from 'react-bootstrap/Modal';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

export const checkEmptyErrorProperties = (obj: Record<string, unknown>) => {
    return Object.values(obj).every((x) => x === "");
};

export default function SignUp() {
    const navigate = useNavigate();
    const [successfullModal, setSuccessfullModal] = React.useState(false);

    const [signUpData, setSignUpData] = useState<signUpDataType>({
        userRole: "",
        email: "",
        userName: "",
        mobileNumber: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        userRole: "",
        email: "",
        userName: "",
        mobileNumber: "",
        password: "",
        confirmPassword: "",
    });

    const [apiError, setApiError] = useState("");
    const [show, setShow] = useState(false);

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const validationErrors = signUpValidator(signUpData);

        if (checkEmptyErrorProperties(validationErrors)) {
            setErrors(validationErrors);
            SignUpService(signUpData).then((response: any) => {
                if (response.error) {
                    setShow(true);
                    setApiError(response.error);
                    console.log("Error received from AuthService: ", response.error);
                } else {
                    setApiError("");
                    setSuccessfullModal(true)
                }
            });
        } else {
            setErrors(validationErrors);
        }
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value: string | number = e.target.value;

        if (e.target.name === "mobileNumber") {
            value = isNaN(parseInt(e.target.value, 10)) ? "" : parseInt(e.target.value, 10);
        }

        if (e.target.name === "userName") {
            value = e.target.value.toLowerCase();
        }

        setSignUpData({
            ...signUpData,
            [e.target.name]: value,
        });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSignUpData({
            ...signUpData,
            [e.target.name]: e.target.value,
        });
    };

    const closeSuccessModal = () => {
        setSuccessfullModal(false)
        navigate("/login")
    }

    return (
        <div className={styles.registerContainer}>
            <div className={styles.inputsContainer}>
                <Form className={`shadow p-4 bg-white rounded ${styles.signupForm}`} data-testid="signup-form" onSubmit={handleSubmit}>
                    <div className="h5 mb-3 text-start">Create your account</div>

                    {show ? (
                        <Alert className="mb-2" variant="danger" onClose={() => setShow(false)} dismissible>
                            {apiError}
                        </Alert>
                    ) : (
                        <div />
                    )}

                    <Form.Select id="userRole" data-testid="userRole" name="userRole" className={styles.userroleDropdown} onChange={handleSelectChange} required>
                        <option value="" hidden>
                            Select Admin/User
                        </option>
                        <option value="ADMIN">Admin</option>
                        <option value="USER">User</option>
                    </Form.Select>
                    <ErrorMessage message={errors.userRole} />

                    <Form.Group className="mb-2" controlId="email">
                        <Form.Control type="email" name="email" className={styles.formInput} placeholder="Enter Email" value={signUpData.email} onChange={handleOnChange} required data-testid="email" />
                    </Form.Group>
                    <ErrorMessage message={errors.email} />

                    <Form.Group className="mb-2" controlId="userName">
                        <Form.Control type="text" name="userName" className={styles.formInput} placeholder="Enter Username" value={signUpData.userName} onChange={handleOnChange} required data-testid="userName" />
                    </Form.Group>
                    <ErrorMessage message={errors.userName} />

                    <Form.Group className="mb-2" controlId="mobileNumber">
                        <Form.Control type="text" name="mobileNumber" className={styles.formInput} placeholder="Enter Mobile Number" value={signUpData.mobileNumber} onChange={handleOnChange} required data-testid="mobileNumber" />
                    </Form.Group>
                    <ErrorMessage message={errors.mobileNumber} />

                    <Form.Group className="mb-2" controlId="password">
                        <Form.Control type="password" name="password" className={styles.formInput} placeholder="Enter Password" value={signUpData.password} onChange={handleOnChange} required data-testid="password" />
                    </Form.Group>
                    <ErrorMessage message={errors.password} />

                    <Form.Group className="mb-4" controlId="confirmPassword">
                        <Form.Control type="password" name="confirmPassword" className={styles.formInput} placeholder="Confirm Password" value={signUpData.confirmPassword} onChange={handleOnChange} required data-testid="confirmPassword" />
                    </Form.Group>
                    <ErrorMessage message={errors.confirmPassword} />
                    <div className={styles.signupFooter}>
                        <Button type="submit" id="submitButton" data-testid="register-button" style={{ marginLeft: 0, width: '100px' }}>
                            Sign up
                        </Button>
                        <label className={styles.signinLink}>
                            Already a user ? <Link to="/login">Login</Link>
                        </label>
                    </div>
                </Form>

                <Modal
                    show={successfullModal}
                    size="sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Body>
                        <h5><CheckCircleOutlineRoundedIcon /> Successfully registered !</h5>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={closeSuccessModal} >Login</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </div>
    );
}
