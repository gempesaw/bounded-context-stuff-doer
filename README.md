# bounded-context-stuff-doer

This updates the build to the newest version and restarts the service
for you, through HTTP requests to adminUI's web layer.

## usage

Edit `lib/config.js` and fill in the four values: admin ui domain, AD
credentials there, and the `terminus.openstack` url of the appropriate
box. Then IMMEDIATELY prevent yourself from committing that back up to
the repository by doing

    $ git update-index --assume-unchanged lib/config.js

Install deps and use `npm start`:

    $ npm install
    $ npm start # defaults to articles-microsite

If restarting a different context, you'll need to provide the exact
context name as AdminUI expects it; invalid contexts will be rejected.

    $ npm start slideshows-microsite
