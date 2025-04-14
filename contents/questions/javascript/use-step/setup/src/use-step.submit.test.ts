import { act, renderHook } from '@testing-library/react';

import useStep from './use-step';

describe('useStep', () => {
  test('return values', () => {
    const { result } = renderHook(() => useStep(1));

    expect(typeof result.current.step).toBe('number');
    expect(typeof result.current.next).toBe('function');
    expect(typeof result.current.previous).toBe('function');
    expect(typeof result.current.setStep).toBe('function');
    expect(typeof result.current.reset).toBe('function');
    expect(typeof result.current.hasNext).toBe('boolean');
    expect(typeof result.current.hasPrevious).toBe('boolean');
  });

  test('initial value', () => {
    const { result } = renderHook(() => useStep(5));

    expect(result.current.step).toBe(1);
  });

  test('next step', () => {
    const { result } = renderHook(() => useStep(5));

    act(() => result.current.next());

    expect(result.current.step).toBe(2);
  });

  test('previous step', () => {
    const { result } = renderHook(() => useStep(5));

    act(() => result.current.setStep(3));
    act(() => result.current.previous());

    expect(result.current.step).toBe(2);
  });

  test('set step', () => {
    const { result } = renderHook(() => useStep(5));

    act(() => result.current.setStep(3));

    expect(result.current.step).toBe(3);
  });

  test('reset step', () => {
    const { result } = renderHook(() => useStep(5));

    act(() => result.current.setStep(3));
    act(() => result.current.reset());

    expect(result.current.step).toBe(1);
  });

  test('has next if step is first', () => {
    const { result } = renderHook(() => useStep(5));

    expect(result.current.hasNext).toBe(true);
  });

  test('not has previous if step is first', () => {
    const { result } = renderHook(() => useStep(5));

    expect(result.current.hasPrevious).toBe(false);
  });

  test('not has next if step is last', () => {
    const { result } = renderHook(() => useStep(5));

    act(() => result.current.setStep(5));

    expect(result.current.hasNext).toBe(false);
  });

  test('has previous if step is last', () => {
    const { result } = renderHook(() => useStep(5));

    act(() => result.current.setStep(5));

    expect(result.current.hasPrevious).toBe(true);
  });

  test('has next and has previous if step is not first or last', () => {
    const { result } = renderHook(() => useStep(5));

    act(() => result.current.setStep(3));

    expect(result.current.hasNext).toBe(true);
    expect(result.current.hasPrevious).toBe(true);
  });

  test("next doesn't go beyond max step", () => {
    const { result } = renderHook(() => useStep(5));

    act(() => result.current.setStep(5));
    act(() => result.current.next());

    expect(result.current.step).toBe(5);
  });

  test("previous doesn't go beyond min step", () => {
    const { result } = renderHook(() => useStep(5));

    act(() => result.current.setStep(1));
    act(() => result.current.previous());

    expect(result.current.step).toBe(1);
  });

  test("setStep doesn't go beyond max step", () => {
    const { result } = renderHook(() => useStep(5));

    act(() => result.current.setStep(6));

    expect(result.current.step).toBe(1);
  });

  test("setStep doesn't go beyond min step", () => {
    const { result } = renderHook(() => useStep(5));

    act(() => result.current.setStep(0));

    expect(result.current.step).toBe(1);
  });

  test('setStep works with an updater function', () => {
    const { result } = renderHook(() => useStep(5));

    act(() => result.current.setStep((step) => step + 2));

    expect(result.current.step).toBe(3);
  });
});
