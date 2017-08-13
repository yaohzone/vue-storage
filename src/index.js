import VueStorage from './vueStorage'

const [vueLocalStorage,vueSessionStorage] = [new VueStorage(window.localStorage),new VueStorage(window.sessionStorage)];

export default {

    vueLocalStorage,

    vueSessionStorage,

    /**
     * Install 
     *
     * @param {Vue} Vue
     * @param {Object} opts
     */
    install: (Vue, opts = {}) => {

        const [name_ls, name_ss] = [opts.localStorage.name || 'localStorage', opts.sessionStorage.name || 'sessionStorage'];

        Vue[name_ls] = vueLocalStorage;
        Vue[name_ss] = vueSessionStorage;

        Object.defineProperties(Vue.prototype, {
            [`$${name_ls}`] : {
                get(){
                    return vueLocalStorage
                }
            },
            [`$${name_ss}`] : {
                get(){
                    return vueSessionStorage
                }
            },
        });

    }
}