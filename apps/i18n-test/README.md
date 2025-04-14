## i18n-test

This app is a testing app to test the development of `langnostic` library, which exists at `packages/langnostic`. It's not meant to be deployed anywhere.

## Development

1. Go into `packages/langnostic`, run `pnpm dev`. This watches for any changes in the library and rebuilds when they are
2. In a separate terminal, go to `apps/i18n-test` (this directory)
3. Get a Google Gen AI API key from Yangshun, add it to `.env` as `GOOGLE_GENERATIVE_AI_API_KEY`
4. Run `pnpm i18n` to test the translation process
