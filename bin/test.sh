
set -u -e

  pattern=renote:* command=del rescan
  redis-cli del renote:req:q
  redis-cli del renote:busy:q
  redis-cli del renote:1:req:h
  redis-cli hset renote:1:req:h text 'another test message'
  redis-cli lpush renote:req:q 1
  redis-cli lpush renote:req:q exit
  #slackUrl=http://localhost:8031 npm start
  slackUrl=$SLACK_URL slackUsername=SqueakyMonkeyBot npm start
  scanCount=1000 format=terse pattern=renote:* format=key rescan
  scanCount=1000 format=terse pattern=renote:*:q command=llen rescan
  scanCount=1000 format=terse pattern=renote:*:h command=hgetall rescan
