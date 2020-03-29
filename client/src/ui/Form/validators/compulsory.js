export default (value) => {
    return value !== null && typeof value !== 'undefined' && value.toString().length > 0
}