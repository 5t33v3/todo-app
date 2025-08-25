import { Injectable } from '@angular/core';
import { Item } from './item_interface';

@Injectable({ providedIn: 'root' })

export class TodoService {

  private storageKey = 'todo-items';

  private _items: Item[] = [
    { description: "eat", done: true },
    { description: "sleep", done: false },
    { description: "play", done: false },
    { description: "laugh", done: false }
  ];

  constructor() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      this._items = JSON.parse(saved);
    }
  }

  get items(): Item[] {
    return this._items;
  }

  addItem(description: string) {
    if (!description) return;
    this._items.unshift({ description, done: false });
    this.save();
  }

  removeItem(item: Item) {
    this._items.splice(this._items.indexOf(item), 1);
    this.save();
  }
    toggleDone(item: Item) {
        item.done = !item.done;
        this.save();
    }

  save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this._items));
  }
}