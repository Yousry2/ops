import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectionResultComponent } from './selection-result.component';

describe('SelectionResultComponent', () => {
    let component: SelectionResultComponent;
    let fixture: ComponentFixture<SelectionResultComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SelectionResultComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SelectionResultComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
