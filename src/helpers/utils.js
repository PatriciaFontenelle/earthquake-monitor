export const formatDate = (value) => {
  const newDate = new Date(value);
  return newDate.toLocaleString();
};

export const toIso08601 = (value) => {
  const date = new Date(value);
  const offset = date.getTimezoneOffset() / 60;

  const formattedOffset = offset.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  });

  const ISODate = date.toISOString().split(".", 1)[0];

  return `${ISODate}${offset < 0 ? formattedOffset : "+" + formattedOffset}:00`;
};

export const toIso08601NoTZ = (value) => {
    const date = toLocalZone(new Date(value));
    const formattedDate = date.toISOString().split(".", 1)[0];


    return removeDateSeconds(formattedDate);
}

export const subtractDaysFromDate = (date, nOfDays) => {
  const dateCopy = new Date(date.getTime());
  const newDate = dateCopy.setDate(dateCopy.getDate() - nOfDays);

  return newDate;
};

const toLocalZone = (date) => {
    const formattedDate = new Date(date);

    const milSecOffset = formattedDate.getTimezoneOffset() * 60000;

    return new Date(formattedDate.getTime() - milSecOffset);
}

const removeDateSeconds = (value) => {
    return value.split(":").slice(0,2).join(":");
}
