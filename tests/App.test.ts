import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import App from '../src/App.vue';

describe('App.vue', () => {
  it('mounts successfully', () => {
    const wrapper = mount(App);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('#vue-app-root').exists()).toBe(true);
  });
});