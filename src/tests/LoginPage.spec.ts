import { mount } from '@vue/test-utils'
import LoginPage from '@/pages/Login.vue'
import { describe, it, expect } from 'vitest'
import { createTestingPinia } from '@pinia/testing'

describe('LoginPage.vue', () => {
  it('renders login form', () => {
    const wrapper = mount(LoginPage, {
      global: {
        plugins: [createTestingPinia()],
      },
    })
    expect(wrapper.text()).toContain('Login')
  })
})
