import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppServiceService } from './app-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('AppServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpClientTestingModule],
      providers: [AppServiceService]
    });
  });
  it('should be created', inject([AppServiceService], (service: AppServiceService) => {
    expect(service).toBeTruthy();
  }));

});
