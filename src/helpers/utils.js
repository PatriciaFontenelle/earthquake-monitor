export const formatDate = (value) => {
    const newDate = new Date(value);
    return newDate.toLocaleString();
}