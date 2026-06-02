import { describe, it, expect } from 'vitest';
import { greetDomain } from '@domain/index';
import { greetUi } from '@ui/index';

describe('Tooling assembly', () => {
    it('verifies the vitest test runner works with tsconfig path aliases', () => {
        expect(greetDomain()).toBe('Hello from Domain');
        expect(greetUi()).toBe('Hello from UI');
    });
});
