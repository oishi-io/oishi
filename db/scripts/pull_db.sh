heroku pg:backups:capture --remote heroku
heroku pg:backups:download --remote heroku
pg_restore --verbose --clean --no-acl --no-owner -h localhost -d sumimasen_development latest.dump
rm -f latest.dump
