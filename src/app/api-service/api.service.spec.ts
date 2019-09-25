import {ApiService} from './api.service';

// Http testing module and mocking controller
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

// Other imports
import {TestBed} from "@angular/core/testing";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Country} from "./country";

describe('ApiServiceTest', () => {
  // setup of the service-under-test
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking service
      imports: [HttpClientTestingModule],
      // Provide the service-under-test and its dependencies
      providers: [
        ApiService,
        // TODO: create a service to manage the error
        //  HttpErrorHandler
      ]
    });
    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests
    httpTestingController.verify();
  })

  /// ApiService method tests begin ///
  //
  describe('#getCountries', () => {
    let exceptedCountries: Country[];
    beforeEach(() => {
      apiService = TestBed.get(ApiService);
      console.log('i am here 1');
      exceptedCountries = [
        {name: '', alpha2Code: ''}
      ] as Country[];
    });

    it('should return countries (called once)', () => {
      // Make an HTTP GET request through getCountries() of ApiService
      apiService.getCountries().subscribe(
        countries => expect(countries).toEqual(exceptedCountries, 'should return excepted countries'),
        fail
      );

      //ApiService should have made on request to GET countries from excepted URL
      const req = httpTestingController.expectOne(apiService.countryUrl);
      expect(req.request.method).toEqual('GET');

      // Request with the mock countries
      req.flush(exceptedCountries);
    })

    it('should be ok returning no countries', () => {
      // Make an HTTP GET request through getCountries() of ApiService
      apiService.getCountries().subscribe(
        countries => expect(countries.length).toEqual(0, 'should have an empty countries array'),
        fail
      );

      const req = httpTestingController.expectOne(apiService.countryUrl);
      // Response with no country
      req.flush([]);
    })

    // This service reports an error but finds a way to let app keep going
    it('should turn 404 into an empty countries result', () => {
      // Make an HTTP GET request through getCountries() of ApiService
      apiService.getCountries().subscribe(
        countries => expect(countries.length).toEqual(0, 'should return empty countries array'),
        fail
      );
      const req = httpTestingController.expectOne(apiService.countryUrl);

      //respond with 404 and the error message in the body
      const msg = 'deliberate 404 error';
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });

    it('should return excepted countries (called multiple times)', () => {
      // Make an HTTP GET request through getCountries() of ApiService for three times
      apiService.getCountries().subscribe();
      apiService.getCountries().subscribe();
      apiService.getCountries().subscribe(
        countries => expect(countries).toEqual(exceptedCountries, 'should return excepted countries'),
        fail
      );

      const req = httpTestingController.match(apiService.countryUrl);
      expect(req.length).toEqual(3, 'calls to getCountries()');


      req[0].flush([]);
      req[1].flush([{name:'Italy', alpha2Code: 'IT'}]);
      req[2].flush(exceptedCountries);
    })
  })
  // expect(service).toBeTruthy();


})
;
