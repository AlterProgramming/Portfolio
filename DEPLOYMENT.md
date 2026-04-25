# jakpakoun.com deployment notes

## Discovered anchors

- Current root domain: `https://jakpakoun.com`
- Current A record for `jakpakoun.com`: `138.197.88.218`
- Missing DNS record: `showdown.jakpakoun.com`
- Existing SSH key: `C:\Users\jeanj\.ssh\VM-SSH\onira`
- Existing SSH target from the old Kitoko deploy script: `jj@138.197.88.218`
- Existing static site directory from the old Kitoko deploy script: `/srv/kitoko_rugs/site`
- Showdown deployment directory: `/srv/kitoko_rugs/showdown`
- Old deploy script: `C:\Users\jeanj\Documents\Programming\CarpetDesign\kitoko_rugs\deploy.sh`

## Local publish artifact

This portfolio now exports statically. Build output lands in `out/`.

The new deploy script stages the old Kitoko static export under `/kitoko/` when this folder exists:

`C:\Users\jeanj\Documents\Programming\CarpetDesign\kitoko_rugs\out`

## Admin gateway hardening (`/admin`)

`deploy/nginx.conf` now enforces HTTP Basic Auth on `/admin` and `/admin/` and writes access attempts to:

- `/var/log/nginx/portfolio_admin_access.log`

Required server file:

- `/etc/nginx/.htpasswd-portfolio-admin`

Example credential creation (replace placeholders):

```bash
sudo sh -c 'printf "%s:%s\n" "portfolio_admin" "$(openssl passwd -apr1 "REPLACE_WITH_STRONG_PASSWORD")" > /etc/nginx/.htpasswd-portfolio-admin'
sudo chmod 640 /etc/nginx/.htpasswd-portfolio-admin
sudo chown root:www-data /etc/nginx/.htpasswd-portfolio-admin
```

Apply config changes:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## Required DNS change

Add a DNS record at Namecheap or wherever the active DNS zone is managed:

```text
Type: A
Host: showdown
Value: 138.197.88.218
TTL: Automatic or 30 minutes
```

If the server uses a tunnel host instead of the droplet IP, use a `CNAME` record for `showdown` pointing at that tunnel host instead.

## Traefik route shape

Use this only after confirming the actual upstream URL for the Pokemon battler UI.

```yaml
http:
  routers:
    showdown:
      rule: Host(`showdown.jakpakoun.com`)
      entryPoints:
        - websecure
      tls:
        certResolver: letsencrypt
      service: showdown-ui

  services:
    showdown-ui:
      loadBalancer:
        servers:
          - url: http://127.0.0.1:8000
```

Replace `http://127.0.0.1:8000` with the external-server-facing URL that serves the Pokemon battler UI.

## Current blocker

SSH to `jj@138.197.88.218` on port `22` times out from this machine, even though the public root site is reachable from an external fetch. Publishing is ready locally, but server access or a working deployment path is needed before the root site and subdomain route can be activated.
