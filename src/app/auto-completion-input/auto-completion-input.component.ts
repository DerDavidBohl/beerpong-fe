import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-auto-completion-input',
  templateUrl: './auto-completion-input.component.html',
  styleUrls: ['./auto-completion-input.component.css']
})
export class AutoCompletionInputComponent implements OnInit {
  myControl = new FormControl();
  @Input() options: any[] = [];
  @Input() property: string = 'name';
  @Input() placeHolder: string = 'Options';
  @Input() value: any = null;
  @Output() valueChanged: EventEmitter<any> = new EventEmitter<any>();

  filteredOptions: Observable<any[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value[this.property]),
        map(name => name ? this._filter(name) : this.options.slice())
      );

      
  }

  displayFn(input?: any): string | undefined {
    return input ? input[this.property] : undefined;
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option[this.property].toLowerCase().indexOf(filterValue) === 0);
  }

}
