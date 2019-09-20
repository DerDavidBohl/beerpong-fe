import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  OnChanges,
  PipeTransform
} from "@angular/core";
import { ThrowStmt } from "@angular/compiler";

@Component({
  selector: "app-item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.css"]
})
export class ItemListComponent implements OnInit {
  @Input() searchProperty: string = "name";
  @Input() sortProperty: string = "name";
  @Input() matIcon: string;
  @Input() pipe: PipeTransform;
  @Input() pipeArgs: any;
  @Input() searchBarEnabled: boolean = true;
  @Input() sortDescending: boolean = false;

  private _items: any[] = [];
  get items() {
    return this._items;
  }
  @Input() set items(items: any[]) {
    this._items = items;
    this.filteredItems = this._items;
    this.search();
  }

  @Output() selected: EventEmitter<any> = new EventEmitter<any>();

  filteredItems: any[] = [];
  searchTerm: string = "";

  constructor(private changeDetection: ChangeDetectorRef) {}

  ngOnInit() {
    if (!this.sortProperty) {
      this.sortProperty = this.searchProperty;
    }
  }

  public refresh() {
    this.search();
  }

  search() {
    if (this.items)
      this.filteredItems = this.items
        .filter(item =>
          item[this.searchProperty]
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
        )
        .sort((a, b) => {
          if (this.sortDescending)
            return a[this.sortProperty] < b[this.sortProperty] ? 1 : -1;

          return a[this.sortProperty] > b[this.sortProperty] ? 1 : -1;
        });
  }

  select(item) {
    this.selected.emit(item);
  }
}
