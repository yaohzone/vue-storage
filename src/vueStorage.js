
export default class VueStorage {

    constructor (storage) {
        this.storage = storage;

        this._prefix_ = `$_VueStorage_${window.location.host.replace(':','_')}`;

        try{
            this._pros = JSON.parse(this.storage[this._prefix_]||'{}');
        }catch(e){
            this._pros = {};
        }

    }

    /**
     * 获取
     *
     * @param {String} key
     * @param {any} defaultValue
     * @returns {any}
     */
    get (key, defaultValue = null) {

        let [value,desc] = [this.storage[`${this._prefix_}_${key}`],this._pros[key]];
        if (value !== undefined) {
            return (desc && desc.type) ? this._process(desc.type, value) : value;
        }
        return defaultValue;
    }

    /**
     * 设置
     *
     * @param {String} key
     * @param {any} value
     */
    set (key, value) {
        const type = this._getType(value);
        this._pros[key] = { type };
        this.storage[this._prefix_] = JSON.stringify(this._pros);
        this.storage[`${this._prefix_}_${key}`] = ['object','array'].includes(type) ? JSON.stringify(value) : value;
    }

    /**
     * 删除
     *
     * @param {String} key
     */
    remove (key) {
        delete this.storage[`${this._prefix_}_${key}`]
    }

    /**
     * 清除
     */
    clear () {
        this.storage.clear()
    }

    /**
     * 内部方法 —— 获取类型
     * 
     * @param {any} value 
     * @returns {String}
     */
    _getType (value) {
        return Object.prototype.toString.call(value).slice(8,-1).toLowerCase();    
    }

    /**
     * 内部方法 —— 类型数据处理
     *
     * @param {String} type
     * @param {any} value
     * @returns {any}
     * @private
     */
    _process (type, value) {
        switch (type) {
            case 'null':
                return null;
            case 'undefined':
                return undefined;
            case 'boolean':
                return value === 'true'
            case 'number':
                return parseInt(value, 10)
            case 'array':
                try {
                    const array = JSON.parse(value)
                    return Array.isArray(array) ? array : []
                } catch (e) {
                    return []
                }
            case 'object':
                try {
                    return JSON.parse(value)
                } catch (e) {
                    return {}
                }
            case 'string':
            default:
                return value
        }
    }
}