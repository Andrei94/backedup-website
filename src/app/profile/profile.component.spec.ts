import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileComponent} from './profile.component';
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";
import {AmplifyService} from "aws-amplify-angular";

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ProfileComponent],
      providers: [
        ProfileComponent,
        {provide: AmplifyService, useClass: AmplifyService},
        {provide: Router, useClass: Router}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
