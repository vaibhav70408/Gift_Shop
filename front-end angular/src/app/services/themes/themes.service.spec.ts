import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ThemesService } from './themes.service';
import ThemesData from '../../common/types/themesData';

describe('ThemesService', () => {
  let service: ThemesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ThemesService]
    });

    service = TestBed.inject(ThemesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve themes data from API via GET', () => {
    const dummyData: ThemesData[] = [];
    service.getThemesData().subscribe((data: ThemesData[]) => {
      expect(data.length).toBe(dummyData.length);
      expect(data).toEqual(dummyData);
    });

    const request = httpMock.expectOne('http://localhost:4000/user/getallThemes/');
    expect(request.request.method).toBe('GET');
    request.flush(dummyData);
  });

});