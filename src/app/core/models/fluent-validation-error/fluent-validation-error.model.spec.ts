import { FluentValidationError } from './fluent-validation-error.model';

describe('ValidationErrorResponse', () => {
  it('should create an instance', () => {
    expect(new FluentValidationError()).toBeTruthy();
  });
});
