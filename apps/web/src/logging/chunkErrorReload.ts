import GreatStorage from '~/greatstorage/GreatStorage';

export function chunkLoadErrorReload(): void {
  const storage = new GreatStorage({
    namespace: 'gfe',
    storage: sessionStorage,
  });

  if (!storage.getItem('chunk-load-error-refresh')) {
    // Set a TTL of 1 minute to prevent infinite reloads in case the chunk still fails to load
    storage.setItem('chunk-load-error-refresh', true, { ttl: 60 });

    // Reload the page to see if the chunk loads successfully
    window.location.reload();
  }
}
