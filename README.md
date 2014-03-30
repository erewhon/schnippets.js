# Quickstart

   git clone git@github.com:erewhon/schnippets.js.gito
   cd schnippets.js
   edit config/config.json
   mysql -u root < tables.sql
   npm install
   node server.js
   open http://localhost/

   ./scripts/push-via-rsync somehost:/some/dir    <optional if you want to deploy it>

# Knobs

- Frequency: daily, weekly
- Data store: Mongo
- Reminder delivery: send email
- Schnippet response: read email, web form


# Things to be done

- better configuration

base_url
mail config
frequency

# References

http://www.betakit.com/thinkfuses-status-report-app-inspired-by-google-internal-feature/

http://blogoscoped.com/archive/2008-03-12-n39.html  The Tools Google Uses Internally

http://blog.idonethis.com/post/16736314554/silicon-valleys-productivity-secret  Silicon Valley's Productivity Secret

https://github.com/kushal/snippets  Snippets implementation using Python and Google App Engine

# Things to look at

http://blog.modulus.io/nodejs-and-express-sessions

http://webapplog.com/todo-app-with-express-jsnode-js-and-mongodb/

http://ericleads.com/2013/05/getting-started-with-node-and-express/




@@ email_reminder
%p Your daily email email reminder

@@ email
%p Your daily email

