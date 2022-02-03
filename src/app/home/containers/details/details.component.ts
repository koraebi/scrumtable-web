import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Issue} from "../../model/issue.model";
import {CdkDragDrop} from "@angular/cdk/drag-drop";
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  issue: Issue;
}
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Input()
  detailsList: Issue[] = [];


  @Output()
  drop = new EventEmitter<{from: string, to: string, index: number}>();

  tiles: Tile[] = [];
  constructor() { }


  ngOnInit(): void {
  }

  ngOnChanges(): void{
    this.createTiles();
  }

  createTiles() {
    this.tiles = [];
    this.detailsList.forEach(issue => {
      let tile: Tile = {
        issue : issue,
        text: 'Description de l\'issue '+ issue.name,
        cols: 1,
        rows: 1,
        color: '#616A6B'
      }
      this.tiles.push(tile);
    });
  }



  onDrop(event: CdkDragDrop<Issue[]>) {
    this.drop.emit({
      from: event.previousContainer.id,
      to: event.container.id,
      index: event.previousIndex
    });
  }
}
