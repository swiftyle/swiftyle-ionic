import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import Fuse from 'fuse.js';  // Install Fuse.js: npm install fuse.js

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private _storage: Storage | null = null;
  private historyKey = 'search_history';
  private products: any[] = [];  // Replace with actual product data source

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async getSearchHistory(): Promise<string[]> {
    return (await this._storage?.get(this.historyKey)) || [];
  }

  async addSearchHistory(term: string): Promise<void> {
    let history = await this.getSearchHistory();
    history = [term, ...history.filter(item => item !== term)];
    await this._storage?.set(this.historyKey, history);
  }

  async clearSearchHistory(): Promise<void> {
    await this._storage?.remove(this.historyKey);
  }

  searchProducts(term: string): any[] {
    const fuse = new Fuse(this.products, {
      keys: ['name'],
      threshold: 0.3,  // Adjust threshold for typo tolerance
    });
    return fuse.search(term).map(result => result.item);
  }
}
