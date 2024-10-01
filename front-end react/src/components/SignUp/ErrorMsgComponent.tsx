import React from 'react';
type ErrorMessageProps = {
    message: string;
};

const ErrorStyles = {
    color: "red",
    fontSize: "small",
    marginBottom: "1rem"
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    if (!message) {
        return null;
    }
    return <p style={ErrorStyles}>{message}</p>;
};