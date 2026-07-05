# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

Use the makeInstall.sh to package up the deployment
1) deploy on the server
2) use the letsencrypt deployment using the 
3) 
```
sudo certbot certonly --standalone --cert-name www.com

Keys are in

const keysPrivateFile = '/etc/letsencrypt/live/www.com/privkey.pem'
const keysPubFile = '/etc/letsencrypt/live/www.com/cert.pem'

```

4) launch the server using tmux as follows
```
tmux new -s myserver
sudo ./startServer.sh
( use ctrl + b , then d to detach)

```
now you can log out

to re-attach, log back in, then
```angular2html
tmux attach -t myserver
```
and you can now kill or make changes just like you never logged off
