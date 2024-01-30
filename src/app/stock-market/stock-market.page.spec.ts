import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockMarketPage } from './stock-market.page';

describe('StockMarketPage', () => {
  let component: StockMarketPage;
  let fixture: ComponentFixture<StockMarketPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StockMarketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
