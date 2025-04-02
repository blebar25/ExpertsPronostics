#!/bin/bash

# Configuration
HOSTINGER_USER="votre_user_ftp"
HOSTINGER_HOST="votre_host_ftp"
REMOTE_PATH="/public_html"

# Build le projet
echo "Building project..."
npm run build

# Upload les fichiers
echo "Uploading files..."
lftp -u $HOSTINGER_USER -e "
  set ssl:verify-certificate no;
  mirror -R .next $REMOTE_PATH/.next;
  mirror -R public $REMOTE_PATH/public;
  put package.json -o $REMOTE_PATH/package.json;
  put package-lock.json -o $REMOTE_PATH/package-lock.json;
  put next.config.js -o $REMOTE_PATH/next.config.js;
  put server.js -o $REMOTE_PATH/server.js;
  bye" $HOSTINGER_HOST

echo "Deployment complete!"
