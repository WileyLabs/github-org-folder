# GitHub Org Folder

This little utility matches folder names in a local directory with remote
organization or user-owned repositories. It only works on public repositories
at the moment.

Results look something like this:
```
$ github-org-folder
 L  R
❌ ✅ remote-only-repo
✅ ✅ local-dir-with-matching-remote-repo-name
✅ ❌ need-to-push-to-github-soon
```

Yep. That's it.

It can be useful when trying to make sure you've pushed all your recent
experiments or pulled down your old code to run analysis on.

# License

MIT
