import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {

    let fixture: ComponentFixture<LoginComponent>;
    let app : LoginComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule, 
        FormsModule
      ],
      declarations: [
        LoginComponent
      ],
    }).compileComponents().then(() => {
        fixture = TestBed.createComponent(LoginComponent);
        app = fixture.componentInstance;
    }) ;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have empty error message'`, () => {
    expect(app.errorMessage).toEqual('');
  });

  it('should have header of form as Login', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Login');
  });
});
