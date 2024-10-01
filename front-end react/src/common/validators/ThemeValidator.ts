export const validateNumber = (value: string): boolean => {
    return /^\d*\.?\d*$/.test(value);
};
