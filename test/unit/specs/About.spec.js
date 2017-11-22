import Vue from 'vue';
import About from '@/components/About';

describe('About.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(About);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('h1').textContent)
      .to.equal('gli-2012');
  });
});
