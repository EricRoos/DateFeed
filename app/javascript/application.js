// Entry point for the build script in your package.json
import * as Turbo from "@hotwired/turbo"

if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register("app-service-worker.js")
    .then(function (reg) {
      console.log("[Companion]", "Service worker registered!");
      console.log(reg);
    }).catch( (e) => {
      console.log(e);
    });
}

import './components';
