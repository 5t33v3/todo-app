import { Component, Input,Output, EventEmitter } from '@angular/core';
import { Item } from './item_interface';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-item',
  imports: [],
  templateUrl: './item.html',
  styleUrl: './item.css'
})
export class ItemComponent {
  editable = false;
  @Input() item!: Item;
  @Output() remove = new EventEmitter<Item>();

  constructor(private todoService: TodoService) {}

  toggleDone() {
    this.todoService.toggleDone(this.item);
  }
  saveItem(description: string) {
    if (!description) return;
    this.editable = false;
    this.item.description = description;
    this.todoService.save(); // Persist changes
  }
}
