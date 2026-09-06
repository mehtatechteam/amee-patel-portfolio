#!/usr/bin/env bash
# GIT_ASKPASS helper for pushing to the mehtatechteam/amee-patel-portfolio
# repo. The stored credential helper authenticates as Aman241104, which has
# no write access there, so git needs the mehtatechteam PAT fed directly.
# See ~/.claude/projects/*/memory/reference_vercel_deploy_blocked.md.
case "$1" in
  Username*) echo "mehtatechteam" ;;
  Password*) cat ~/.config/mehta-github-token ;;
esac
