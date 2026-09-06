#!/usr/bin/env bash
# Push committed work on master to both remotes and deploy to Vercel.
#
#   scripts/deploy.sh
#
# What it does:
#   1. This script never stages or commits anything for you -- it only
#      pushes whatever is already committed on master. Commit your work
#      first (a plain `git commit`, reviewed by hand or via /code-review).
#   2. Shows the commit about to go out, plus any dirty/untracked files
#      that will NOT be included, so a push is never silent about scope.
#   3. Pushes master to `origin` (Aman241104/amee-patel-portfolio).
#   4. Pushes master to `mehta` (mehtatechteam/amee-patel-portfolio) using
#      a dedicated GIT_ASKPASS helper, since the default credential helper
#      authenticates as the wrong GitHub account for that repo. This push
#      is what triggers the live Vercel build via the repo's Git
#      integration -- `vercel deploy --prod` does NOT work for this
#      project (see reference_vercel_deploy_blocked memory).
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

if [[ "$(git rev-parse --abbrev-ref HEAD)" != "master" ]]; then
  echo "Not on master (on $(git rev-parse --abbrev-ref HEAD)). Aborting." >&2
  exit 1
fi

echo "==> About to push this commit:"
git log -1 --stat HEAD
dirty="$(git status --porcelain)"
if [[ -n "$dirty" ]]; then
  echo
  echo "==> Working tree has changes NOT included in this push (left alone):"
  echo "$dirty" | sed 's/^/  /'
fi
echo

echo "==> Pushing master to origin (Aman241104/amee-patel-portfolio)"
git push origin master

echo "==> Pushing master to mehta (mehtatechteam/amee-patel-portfolio) -- triggers Vercel build"
GIT_ASKPASS="$(pwd)/scripts/mehta-askpass.sh" \
  git -c credential.helper= -c core.askpass="$(pwd)/scripts/mehta-askpass.sh" \
  push https://github.com/mehtatechteam/amee-patel-portfolio.git master:master

echo "==> Done. Vercel build should now be running for mehtatechteam-2877s-projects/amee-patel-portfolio."
