import { mount } from '@vue/test-utils';
import BasicConfigurator from '../src/components/BasicConfigurator.vue';

describe('BasicConfigurator', () => {
  it('submits form, validates, and generates C++ output', async () => {
    const wrapper = mount(BasicConfigurator);
    
    await wrapper.find('[data-test="sel-a0"]').setValue('TEMP');
    await wrapper.find('[data-test="sel-d2"]').setValue('DHT');
    await wrapper.find('[data-test="chk-bmi088"]').setValue(true);
    
    await wrapper.find('[data-test="input-app-eui"]').setValue('0123456789ABCDEF');
    await wrapper.find('[data-test="input-dev-eui"]').setValue('0123456789ABCDEF');
    await wrapper.find('[data-test="input-app-key"]').setValue('0123456789ABCDEF0123456789ABCDEF');
    
    await wrapper.find('form').trigger('submit.prevent');
    
    const output = wrapper.find('[data-test="cpp-output"]');
    expect(output.exists()).toBe(true);
    expect(output.text()).toContain('BMI088 bmi088;');
    expect(output.text()).toContain('0123456789ABCDEF');
  });

  it('shows error if validation fails', async () => {
    const wrapper = mount(BasicConfigurator);
    
    await wrapper.find('[data-test="input-app-eui"]').setValue('123');
    await wrapper.find('form').trigger('submit.prevent');
    
    const errorMsg = wrapper.find('[data-test="error-message"]');
    expect(errorMsg.exists()).toBe(true);
    // Since Zod error includes "expected string to have >=16 characters", we just match substring
    expect(errorMsg.text()).toContain('expected string to have >=16 characters');
  });
});
