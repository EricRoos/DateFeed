// Entry point for the build script in your package.json
import * as Turbo from "@hotwired/turbo"

if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register("/app-service-worker.js")
    .then(function (reg) {
    }).catch( (e) => {
      console.error(e);
    });
}

window.onerror = function (msg, url, lineNo, columnNo, error) {
  const csrfTokenElement = document.querySelector('meta[name=csrf-token]')
  let csrfToken = '';
  if(!!csrfTokenElement){
    csrfToken = csrfTokenElement.getAttribute('content');
  }
  const data = {msg, url, lineNo, columnNo, error};
  fetch(`/javascript_errors`, {
    method: 'POST',
    headers:  {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'X-CSRF-Token': csrfToken
    },
    body: JSON.stringify(data)
  })
}
import './components';
