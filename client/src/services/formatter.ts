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

export const formatDate: (date: string) => string = (date) => {
    if(!date) {
        return '';
    }

    const dateObject = new Date(date);
    const day = dateObject.getDate();
    const month = months[dateObject.getMonth()].slice(0, 3);
    const hourInt = dateObject.getHours();
    const hour: string = hourInt < 10 ? '0' + hourInt : hourInt.toString();
    const minutesInt = dateObject.getMinutes();
    const minutes: string = minutesInt < 10 ? '0' + minutesInt : minutesInt.toString();
    return `${day} ${month}, ${hour}:${minutes}`;
};

export const formatDuration: (d: string|number) => string = (duration) => {
    if(!duration) {
        return  '';
    }
    const hours = Math.floor(+duration / 60);
    const minutes = +duration - hours * 60;
    return `${hours} ч ${minutes} мин`;
};