const months = [
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь'
];

export const formatDate = (date) => {
    if(!date) {
        return null;
    }

    const dateObject = new Date(date);
    const day = dateObject.getDate();
    const month = months[dateObject.getMonth()].slice(0, 3);
    let hour = dateObject.getHours();
    hour = hour < 10 ? '0' + hour : hour;
    let minutes = dateObject.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${day} ${month}, ${hour}:${minutes}`;
};

export const formatDuration = (duration) => {
    if(!duration) {
        return  null;
    }
    const hours = Math.floor(+duration / 60);
    const minutes = duration - hours * 60;
    return `${hours} ч ${minutes} мин`;
};