import { getCurrentScope, onScopeDispose, ref } from 'vue';

export function useCurrentDate() {
  const date = ref(new Date());

  const timer = setInterval(() => {
    date.value = new Date();
  }, 100);

  if (getCurrentScope()) {
    onScopeDispose(() => {
      clearInterval(timer);
    });
  }

  return date;
}
