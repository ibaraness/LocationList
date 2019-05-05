import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { LoadCategories } from './actions/categories.action';
import { DisableHeaderAdd, DisableHeaderEdit, DisableHeaderRemove, EnableHeaderAdd, EnableHeaderEdit, EnableHeaderRemove } from './actions/header.actions';
import { SetPageName } from './actions/app.action';
import { InfoModalComponent } from './shared/components/info-modal/info-modal.component';
import { RootState } from './states/state';
import { CloseInfoModal, CloseConfirmModal, ConfirmModalCancel, ConfirmModalConfirm } from './actions/modal.actions';
import { ConfirmModalComponent } from './shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  backUrl: string;
  private stateChangeSubscription: Subscription;
  private currentUrl: string;
  private hasBack: boolean;
  private modalOpen: boolean;

  constructor(
    private router: Router,
    private store: Store<any>,
    private zone: NgZone,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.initRouterEvents();
    this.store.dispatch(new LoadCategories());
    this.stateChangeSubscription = this.store.subscribe((state: RootState) => {
      if (state.router && this.currentUrl !== state.router.state.url) {
        this.currentUrl = state.router.state.url;
        this.setHeader(this.currentUrl);
      }
      if (state.modal.pendingModal) {
        this.openModal(state.modal.modalInfo);
      }
      if(state.modal.pendingConfirmModal) {
        this.openConfirm(
          state.modal.confirmInfo,
          state.modal.confirmReferer
        );
      }
    });
    this.initDeviceVibration();
  }

  openModal(message?: string) {
    if (!this.modalOpen) {
      const modal = this.modalService.open(InfoModalComponent);
      this.modalOpen = true;
      modal.componentInstance.message = message;
      modal.result.then(() => {
        this.store.dispatch(new CloseInfoModal());
        this.modalOpen = false;
      }).catch(err => {
        this.store.dispatch(new CloseInfoModal());
        this.modalOpen = false;
      });
    }
  }

  openConfirm(message: string, referer: string) {
    if (!this.modalOpen) {
      const modal = this.modalService.open(ConfirmModalComponent);
      this.modalOpen = true;
      modal.componentInstance.message = message;
      modal.componentInstance.referer = referer;
      modal.result.then((res) => {
        this.store.dispatch(new ConfirmModalConfirm());
        this.store.dispatch(new CloseConfirmModal());
        this.modalOpen = false;
      }).catch(err => {
        this.store.dispatch(new ConfirmModalCancel());
        this.store.dispatch(new CloseConfirmModal());
        this.modalOpen = false;
      });
    }
  }

  private initDeviceVibration() {
    this.zone.runOutsideAngular(() => {
      if (window.navigator.vibrate) {
        document.addEventListener('click', () => {
          window.navigator.vibrate(100);
        });
      }
    });
  }

  private setHeader(url: string) {
    if (url === '/locations' || url === '/categories') {
      this.store.dispatch(new EnableHeaderAdd());
      this.store.dispatch(new DisableHeaderRemove());
      this.store.dispatch(new DisableHeaderEdit());
    } else if (url === '/location' || url === '/category') {
      this.store.dispatch(new DisableHeaderAdd());
      this.store.dispatch(new DisableHeaderRemove());
      this.store.dispatch(new DisableHeaderEdit());
    } else if ((/^\/location\/[0-9]+/).test(url) || (/^\/category\/[0-9a-zA-Z]+/).test(url)) {
      this.store.dispatch(new DisableHeaderAdd());
      this.store.dispatch(new EnableHeaderRemove());
      this.store.dispatch(new EnableHeaderEdit());
    }
  }

  private initRouterEvents() {
    this.router.events.subscribe(event => {
      if (event instanceof RoutesRecognized) {
        const pageName = event.state.root.firstChild.data.pageName;
        this.store.dispatch(new SetPageName(pageName));
        const currentNavigation = this.router.getCurrentNavigation();
        this.hasBack = !!currentNavigation.previousNavigation && this.currentUrl !== '/locations';
        this.backUrl = this.hasBack && currentNavigation.previousNavigation.extractedUrl.toString();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.stateChangeSubscription) {
      this.stateChangeSubscription.unsubscribe();
    }
  }
}
