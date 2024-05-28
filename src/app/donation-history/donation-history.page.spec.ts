import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DonationHistoryPage } from './donation-history.page';

describe('DonationHistoryPage', () => {
  let component: DonationHistoryPage;
  let fixture: ComponentFixture<DonationHistoryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DonationHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
