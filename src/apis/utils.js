import router from '../Routes.js';

export const to404Page = () => {
    router.replace({
        name: 'Error'
    })
}