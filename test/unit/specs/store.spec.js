import store from '@/store';

describe('store.js', () => {
  it('should provide a vuex store object', () => {
    expect(!!store).to.equal(true);
    expect(!!store.state).to.equal(true);
  });
});
