import { WithDefaultValuesPipe } from './with-default-values.pipe';

describe('WithDefaultValuesPipe', () => {
  it('create an instance', () => {
    const pipe = new WithDefaultValuesPipe();
    expect(pipe).toBeTruthy();
  });
});
