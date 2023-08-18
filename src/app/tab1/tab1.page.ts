import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  groceryList: any[] = [];
  newItem: string = '';

  constructor(private dataService: DataService) {}

  ionViewWillEnter() {
    this.loadGroceries();
  }

  async loadGroceries() {
    this.dataService.getGroceries().subscribe(
      (data) => {
        this.groceryList = data;
      },
      (error) => {
        console.error('Error loading groceries:', error);
      }
    );
  }

  async addItem() {
    if (this.newItem.trim() !== '') {
      this.dataService.addGrocery(this.newItem).subscribe(
        (data) => {
          this.groceryList.push(data);
          this.newItem = ''; // Clear the input field
        },
        (error) => {
          console.error('Error adding grocery:', error);
        }
      );
    }
  }

  async editItem(item: any) {
    const updatedItem = { title: item.title, completed: !item.completed };
    this.dataService.updateGrocery(item.id, updatedItem.title, updatedItem.completed).subscribe(
      () => {
        item.completed = !item.completed;
      },
      (error) => {
        console.error('Error updating grocery:', error);
      }
    );
  }

  async removeItem(id: number) {
    this.dataService.deleteGrocery(id).subscribe(
      () => {
        this.groceryList = this.groceryList.filter(item => item.id !== id);
      },
      (error) => {
        console.error('Error deleting grocery:', error);
      }
    );
  }
}
