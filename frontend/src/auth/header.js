export default {
    header: {
        authorization : localStorage.getItem('token')? localStorage.getItem('token') : null
    },
};