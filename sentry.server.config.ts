import * as Sentry from '@sentry/nuxt';

if (process.env.NUXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: 'https://18a9cc1560e0b10b5869dbf0c99cce1c@o4508715885002752.ingest.de.sentry.io/4508715887755344',
  });
}