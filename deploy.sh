#!/usr/bin/env bash
set -euo pipefail

VM_USER="${VM_USER:-jj}"
VM_HOST="${VM_HOST:-138.197.88.218}"
REMOTE_DIR="${REMOTE_DIR:-/srv/kitoko_rugs/site}"
SSH_KEY="${SSH_KEY:-/c/Users/jeanj/.ssh/VM-SSH/onira}"
KITOKO_OUT="${KITOKO_OUT:-/c/Users/jeanj/Documents/Programming/CarpetDesign/kitoko_rugs/out}"

if command -v npm >/dev/null 2>&1; then
  NPM_CMD=(npm)
elif [ -x "/c/Program Files/nodejs/npm.cmd" ]; then
  NPM_CMD=("/c/Program Files/nodejs/npm.cmd")
else
  echo "npm was not found. Set NPM_CMD or add Node.js to PATH." >&2
  exit 1
fi

SSH_OPTS=(-i "$SSH_KEY" -o BatchMode=yes -o StrictHostKeyChecking=accept-new -o ConnectTimeout=20)

echo "Building project hub..."
"${NPM_CMD[@]}" ci
"${NPM_CMD[@]}" run build

if [ -d "$KITOKO_OUT" ]; then
  echo "Staging Kitoko archive at /kitoko/..."
  rm -rf out/kitoko
  mkdir -p out/kitoko
  cp -R "$KITOKO_OUT"/. out/kitoko/
fi

echo "Uploading hub to ${VM_USER}@${VM_HOST}:${REMOTE_DIR}..."
ssh "${SSH_OPTS[@]}" "$VM_USER@$VM_HOST" "mkdir -p '$REMOTE_DIR'"
scp "${SSH_OPTS[@]}" -r out/. "$VM_USER@$VM_HOST:$REMOTE_DIR/"

echo "Published https://jakpakoun.com"
echo "Showdown route expected at https://showdown.jakpakoun.com after DNS/proxy routing is active."
