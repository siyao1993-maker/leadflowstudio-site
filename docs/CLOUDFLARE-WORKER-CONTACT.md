# Private contact endpoint plan

Goal: hide the receiving inbox from public HTML by submitting forms to:

```text
/api/contact
```

instead of a visible FormSubmit recipient URL.

## Current safe state

The site still uses the known-working FormSubmit endpoint directly so leads are not lost.

The Worker endpoint has been added at:

```text
src/worker.js
```

It will forward submissions server-side when this Cloudflare environment variable/secret exists:

```text
CONTACT_FORM_ENDPOINT=https://formsubmit.co/<private receiving inbox>
```

Do not commit the real endpoint value to the repository.

## Activation checklist

1. In Cloudflare, open the Leadflow Studio Worker/application.
2. Go to Settings → Variables and Secrets.
3. Add a secret named:

```text
CONTACT_FORM_ENDPOINT
```

4. Set its value to the private FormSubmit endpoint.
5. Redeploy.
6. Test:

```bash
curl -i -X POST https://leadflowstudio.tech/api/contact \
  -F name='Endpoint Test' \
  -F email='test@example.com' \
  -F website='https://example.com' \
  -F message='Testing private endpoint'
```

7. Only after the test arrives in the inbox, change website forms from the FormSubmit URL to:

```text
/api/contact
```

## Why not switch immediately?

If `CONTACT_FORM_ENDPOINT` is not set in Cloudflare, `/api/contact` returns HTTP 503 by design. That prevents silent lead loss.
