#!/bin/sh

if [ -n "$COMMAND_API" ]; then
  sed -i "s/localhost:3000/$COMMAND_API/g" /usr/share/nginx/html/assets/env.js
fi

if [ -n "$QUERY_API" ]; then
  sed -i "s/localhost:3001/$QUERY_API/g" /usr/share/nginx/html/assets/env.js
fi

if [ -n "$SOCKET_API" ]; then
  sed -i "s/localhost:3004/$SOCKET_API/g" /usr/share/nginx/html/assets/env.js
fi

if [ -n "$AUTH_API" ]; then
  sed -i "s/localhost:3005/$AUTH_API/g" /usr/share/nginx/html/assets/env.js
fi

nginx -g 'daemon off;'
