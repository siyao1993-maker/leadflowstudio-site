# Leadflow Studio email setup

Current branded setup:

- Website form submits to `https://formsubmit.co/info@leadflowstudio.tech`
- Public direct mail links use `info@leadflowstudio.tech`
- Cloudflare Email Routing should forward `info@leadflowstudio.tech` to `siyao1993@hotmail.com`

Important:

FormSubmit may need one-time activation for `info@leadflowstudio.tech`. The activation email should arrive through Cloudflare Email Routing at `siyao1993@hotmail.com`.

Verification checklist:

1. Cloudflare Email Routing destination `siyao1993@hotmail.com` is **Verified**.
2. Routing rule exists: `info@leadflowstudio.tech -> siyao1993@hotmail.com`.
3. Send a normal email from a different mailbox to `info@leadflowstudio.tech`.
4. Confirm it arrives in `siyao1993@hotmail.com`.
5. Submit the website form.
6. Confirm the FormSubmit activation email in `siyao1993@hotmail.com` if requested.
7. Test the form again after activation.

Fallback:

If mails do not arrive at Hotmail, temporarily switch the form back to `https://formsubmit.co/Siyao1993@gmail.com` so leads are not lost while email routing is debugged.
