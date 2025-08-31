import moment from "moment";

export const formatDate = (value) => {
    const newDate = new Date(value);
    return newDate.toLocaleString();
}

export const toIso08601 = (value) => {
    const date = moment(value);
    return date.format();
}