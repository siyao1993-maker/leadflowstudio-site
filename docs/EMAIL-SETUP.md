# Leadflow Studio email setup

Current safe setup while Cloudflare Email Routing is being debugged:

- Website form submits through FormSubmit to the private receiving inbox
- Public direct mail links are disabled; visitors use the form
- `info@leadflowstudio.tech` should not be used for live leads until messages are visible in the destination inbox.

Current routing attempt:

- Cloudflare routing rule: `info@leadflowstudio.tech -> siyao1993@hotmail.com`
- User reports Cloudflare marks messages as forwarded, but they are not visible in Hotmail.

Why Gmail fallback is active:

If the destination inbox does not visibly receive forwarded mail, leads can be lost. Keep the public website on a known-working inbox until the branded address is fully verified end-to-end.

Switch-over checklist:

1. Cloudflare Email Routing destination `siyao1993@hotmail.com` is **Verified**.
2. Routing rule exists and is saved: `info@leadflowstudio.tech -> siyao1993@hotmail.com`.
3. Send a normal email from a different mailbox to `info@leadflowstudio.tech`.
4. Confirm it appears in `siyao1993@hotmail.com` inbox/Junk/Other/Archive.
5. Submit the website form after switching to `info@leadflowstudio.tech`.
6. Confirm the FormSubmit activation email in `siyao1993@hotmail.com` if requested.
7. Test the form again after activation.

Only after that checklist passes should the website be changed back to `info@leadflowstudio.tech`.
