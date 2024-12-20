import { Injectable } from '@angular/core';
import { BaseService } from '../../utils/service/base.service';
import { ITest } from '../interface/test.interface';
import { HttpClient } from '@angular/common/http';
import { ENVIRONMENT } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class TestService extends BaseService<ITest> {
  constructor(http: HttpClient) {
    super(`${ENVIRONMENT.apiUrl}/test`, http);
  }
}
