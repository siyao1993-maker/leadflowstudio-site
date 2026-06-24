# Leadflow Studio email setup

Current safe setup:

- Website form submits to `https://formsubmit.co/Siyao1993@gmail.com`
- Direct mail links temporarily use `Siyao1993@gmail.com`
- `info@leadflowstudio.tech` should not be used for leads until it is verified to receive mail.

Why:

`info@leadflowstudio.tech` is a brand address, but it must first exist as either:

1. Cloudflare Email Routing: `info@leadflowstudio.tech -> Siyao1993@gmail.com`, or
2. a real mailbox via Zoho/Google Workspace/Proton/Hostinger.

Switch-over checklist:

1. Send a normal email from a different mailbox to `info@leadflowstudio.tech`.
2. Confirm it arrives in `Siyao1993@gmail.com`.
3. Submit the website form if FormSubmit is pointed to `info@leadflowstudio.tech`.
4. Confirm the FormSubmit activation email.
5. Only then change public mail links and/or FormSubmit target to `info@leadflowstudio.tech`.

Until that checklist passes, keep Gmail as the delivery target so leads are not lost.
