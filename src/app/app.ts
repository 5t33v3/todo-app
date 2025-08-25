import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from './item/item_interface';
import { ItemComponent } from './item/item';
import { TodoService } from './item/todo.service';


@Component({
  selector: 'app-root',
  imports: [CommonModule, ItemComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
  
})


export class AppComponent {
  title = "My Todo App";
  isDarkMode = false;
  filter: "all" | "active" | "done" = "all";

  constructor(public todoService: TodoService) {

    const savedMode = localStorage.getItem('darkMode');
    this.isDarkMode = savedMode === 'true';
    this.applyTheme();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    this.applyTheme();
  }

  private applyTheme() {
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');  
    }
  }

  addItem(description: string) {
    this.todoService.addItem(description);
  }

  get items() {
    if (this.filter === "all") {
      return this.todoService.items;
    }
    return this.todoService.items.filter(item =>
      this.filter === "done" ? item.done : !item.done
    );
  }

  remove(item: Item) {
    this.todoService.removeItem(item);
  }
}
  

