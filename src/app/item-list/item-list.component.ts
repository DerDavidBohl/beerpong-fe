import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  @Input() searchProperty: string;

  private _items: any[] = [];
  get items() {return this._items;}
  @Input() set items(items: any[]){
    this._items = items;
    this.filteredItems = this._items;
  }

  @Output() selected: EventEmitter<any> = new EventEmitter<any>();

  filteredItems: any[] = [];

  constructor() { }

  ngOnInit() {
  }

  search(term: string) {
    if (this.items)
      this.filteredItems = this.items.filter(item =>
        item[this.searchProperty].toLowerCase().includes(term.toLowerCase())
      ).sort((a, b) => (a.name > b.name) ? 1: -1);
  }

  select(item) {
    this.selected.emit(item);
  }

}
