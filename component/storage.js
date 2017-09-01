class DoStorage {
    constructor(name) {
        this.storage = window.localStorage;
        this.storageName = name;
        let oldValue = this.storage.getItem(this.storageName) || '{}';
        this.storage.setItem(this.storageName, oldValue);
    }

    getValueByKey(key) {
        return JSON.parse(this.storage.getItem(this.storageName))[key];
    }
    deleteAll() {
        this.storage.setItem(this.storageName,'{}');
    }
    setValueWithKey(key, value) {
        var item = JSON.parse(this.storage.getItem(this.storageName));
        item[key] = value;
        this.storage.setItem(this.storageName, JSON.stringify(item));
    }

}

export { DoStorage as Storage };