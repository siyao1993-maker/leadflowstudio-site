const REQUIRED_FIELDS = ['name', 'email', 'website'];

function wantsHtml(request) {
  const accept = request.headers.get('accept') || '';
  return accept.includes('text/html') || accept.includes('*/*');
}

function sanitizeText(value, maxLength = 2000) {
  return String(value || '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, maxLength);
}

function htmlResponse(message, status = 200) {
  return new Response(`<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Leadflow Studio</title><style>body{font-family:system-ui,sans-serif;background:#0b0f14;color:#edf4ff;display:grid;place-items:center;min-height:100vh;margin:0;padding:24px}.card{max-width:640px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.06);border-radius:24px;padding:28px}a{color:#55e6a5}</style></head><body><main class="card"><h1>${status >= 400 ? 'Aanvraag niet verzonden' : 'Bedankt'}</h1><p>${message}</p><p><a href="/">Terug naar de website</a></p></main></body></html>`, {
    status,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}

async function handleContact(request, env) {
  if (request.method !== 'POST') {
    return htmlResponse('Gebruik het contactformulier op de website.', 405);
  }

  if (!env.CONTACT_FORM_ENDPOINT) {
    return htmlResponse('Het beveiligde contactendpoint is nog niet geactiveerd. Gebruik tijdelijk het bestaande formulier op de homepage.', 503);
  }

  const original = await request.formData();
  const honey = sanitizeText(original.get('_honey'), 200);
  if (honey) {
    // Silent success for simple honeypot spam.
    return Response.redirect(new URL('/bedankt.html', request.url), 303);
  }

  for (const field of REQUIRED_FIELDS) {
    if (!sanitizeText(original.get(field), 400)) {
      return htmlResponse(`Veld ontbreekt: ${field}.`, 400);
    }
  }

  const forwarded = new FormData();
  for (const [key, value] of original.entries()) {
    if (typeof value === 'string') {
      forwarded.set(key, sanitizeText(value, key === 'message' ? 4000 : 600));
    }
  }
  forwarded.set('_captcha', 'false');
  forwarded.set('_template', 'table');
  forwarded.set('_next', new URL('/bedankt.html', request.url).toString());

  const result = await fetch(env.CONTACT_FORM_ENDPOINT, {
    method: 'POST',
    body: forwarded,
    headers: {
      'user-agent': 'LeadflowStudioContactWorker/1.0',
    },
  });

  if (!result.ok && result.status < 300 || result.status >= 400) {
    return htmlResponse('Er ging iets mis bij verzenden. Probeer het later opnieuw.', 502);
  }

  return Response.redirect(new URL('/bedankt.html', request.url), 303);
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === '/api/contact') {
      return handleContact(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};
