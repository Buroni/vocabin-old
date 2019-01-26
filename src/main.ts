import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Enable production mode unless running locally
if (!/localhost/.test(document.location.host)) { enableProdMode(); }

// Google analytics
document.write(`
<script async src="https://www.googletagmanager.com/gtag/js?id=${environment.gaTrackingId}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', '${environment.gaTrackingId}');
  </script>
`)

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

