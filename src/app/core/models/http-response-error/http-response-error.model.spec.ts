import { HttpResponseError } from './http-response-error.model';

describe('HttpErrorResponse', () => {
  it('should create an instance', () => {
    expect(new HttpResponseError()).toBeTruthy();
  });
});
