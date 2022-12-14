import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TabsComponent } from '../components/tabs/tabs.component';

@Injectable({
  providedIn: 'root',
})
export class TabsService {
  private tabsComponent$ = new Subject<TabsComponent>();

  public setTabComponent(tabComponent: TabsComponent) {
    this.tabsComponent$.next(tabComponent);
  }

  public getTabComponent(): Observable<TabsComponent> {
    return this.tabsComponent$.asObservable();
  }
}
