class DoStorage {
    constructor() {
        this.storage = window.localStorage;
    }

    getValueByKey(key) {
        return this.storage.getItem(key);
    }
    deleteAll() {
        this.storage.clear();
    }
    deleteKey(key) {
        this.storage.removeItem(name);
    }
    setValueWithKey(key, value) {
        this.storage.setItem(key, "<!--"+new Date().toString()+"-->"+value);
    }

}

export { DoStorage as Storage };
