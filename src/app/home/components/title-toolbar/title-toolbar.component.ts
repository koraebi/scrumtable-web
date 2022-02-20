import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-title-toolbar',
  templateUrl: './title-toolbar.component.html',
  styleUrls: ['./title-toolbar.component.css'],
})
export class TitleToolbarComponent implements OnInit {
  @Input()
  title: string = '';

  @Input()
  reversed: boolean = false;

  @Output()
  splitScreen = new EventEmitter<void>();

  @Output()
  reverse = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
