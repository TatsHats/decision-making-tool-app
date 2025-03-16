class DataStorage {
  constructor(private storage: Storage = localStorage) {}

  public save<T>(key: string, value: T): void {
    try {
      this.storage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Save error:', error);
    }
  }

  public load<T>(
    key: string,
    assertIsValid: (data: unknown) => asserts data is T,
  ): T | undefined {
    try {
      const data = this.storage.getItem(key);
      if (data === null) return undefined;

      const parsed: unknown = JSON.parse(data);
      assertIsValid(parsed);
      return parsed;
    } catch (error) {
      console.error('Load error:', error);
      return undefined;
    }
  }

  public remove(key: string): void {
    this.storage.removeItem(key);
  }

  public clear(): void {
    this.storage.clear();
  }
}

export default DataStorage;
