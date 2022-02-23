import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {CdkPortal, DomPortalHost} from "@angular/cdk/portal";

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements OnInit, OnDestroy {

  @ViewChild(CdkPortal) portal: CdkPortal | undefined;

  private externalWindow: Window | null | undefined;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector
  ) { }

  ngOnDestroy(): void {
    if (this.externalWindow !== null && this.externalWindow)
      this.externalWindow.close()
    }

  ngOnInit(): void {
    this.externalWindow = window.open('', '', 'width=600,height=400,left=200,top=200');
    if (this.externalWindow !== null){
      const host = new DomPortalHost(
        this.externalWindow.document.body,
        this.componentFactoryResolver,
        this.applicationRef,
        this.injector
      )

      host.attach(this.portal);
    }
  }

}
