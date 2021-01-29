Uses Twitter archive data to find all users in a given group chat
and their most recent post date, for group chat admins to know who
they can safely kick.

Scripts are messy because I mostly did this interactively in the REPL.
Check each script for details. Run them in this order.

* format-data.js
* ids-to-usernames.js > usernames-map.txt
* read-map.js
* ids-by-date.js
* combine-maps.js
* sort-final-by-date.js
