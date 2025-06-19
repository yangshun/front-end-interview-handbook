import { getCurrentScope, onScopeDispose, ref } from 'vue';

export function useCurrentDate() {
  const date = ref(new Date());

  const timer = window.setInterval(() => {
    date.value = new Date();
  }, 100);

  if (getCurrentScope()) {
    onScopeDispose(() => {
      window.clearInterval(timer);
    });
  }

  return date;
}
