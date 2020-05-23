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

export const formatDate: (date: string, locale?: string) => string = (date, locale) => {
    if(!date) {
        return '';
    }

    const dateObject = new Date(date);
    return new Intl.DateTimeFormat(locale, {day: '2-digit', month: 'short', year: 'numeric'}).format(dateObject);
};

export const formatDuration: (d: string|number, locale?: string) => {hours: number, minutes: number} | false = (duration) => {
    if(!duration) {
        return  false;
    }
    const hours = Math.floor(+duration / 60);
    const minutes = +duration - hours * 60;
    return {hours, minutes};
};