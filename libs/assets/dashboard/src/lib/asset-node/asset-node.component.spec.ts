import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetNodeComponent } from './asset-node.component';

describe('AssetNodeComponent', () => {
    let component: AssetNodeComponent;
    let fixture: ComponentFixture<AssetNodeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AssetNodeComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AssetNodeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
