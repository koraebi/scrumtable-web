import {Directive, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import interact from "interactjs";

@Directive({
  selector: '[appDroppable]'
})
export class DroppableDirective {

  @Input()
  id: any;

  @Input()
  options: any;

  @Output()
  dropping: EventEmitter<any> = new EventEmitter();

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    interact(this.elementRef.nativeElement)
      .dropzone(Object.assign({}, this.options || {}))
      .on('dropactive', event => event.target.classList.add('can-drop'))
      .on('drapenter', event => {
        const draggableElement = event.relatedTarget;
        const dropzoneElement = event.target;

        dropzoneElement.classList.add('can-catch');
        dropzoneElement.classList.add('drop-me');
      })
      .on('dragleave', event => {
        event.target.classList.remove('can-catch', 'caught-it');
        event.relatedTarget.classList.remove('drop-me');
      })
      .on('drop', event => {
        const model = (window as any).dragData;

        if(typeof (model) === 'object') {
          let res = {
            from: model.from,
            to: this.id,
            issue: model.issue
          }
          this.dropping.emit(res);
        }
        event.target.classList.add('caught-it');

        if ((window as any).document.selection) {
          (window as any).document.selection.empty();
        } else {
          window.getSelection()?.removeAllRanges();
        }
      })
      .on('dropdeactivate', event => {
        event.target.classList.remove('can-drop');
        event.target.classList.remove('can-catch');
      });
  }

}
