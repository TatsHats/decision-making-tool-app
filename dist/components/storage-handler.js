class DataStorage {
    constructor(storage = localStorage) {
        this.storage = storage;
    }
    save(key, value) {
        try {
            this.storage.setItem(key, JSON.stringify(value));
        }
        catch (error) {
            console.error('Save error:', error);
        }
    }
    load(key, assertIsValid) {
        try {
            const data = this.storage.getItem(key);
            if (data === null)
                return;
            const parsed = JSON.parse(data);
            assertIsValid(parsed);
            return parsed;
        }
        catch (error) {
            console.error('Load error:', error);
            return;
        }
    }
    remove(key) {
        this.storage.removeItem(key);
    }
    clear() {
        this.storage.clear();
    }
}
export default DataStorage;
