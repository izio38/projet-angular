#!/usr/bin/env sh
ng build --prod --base-href /~billotr/info7/
scp -r `pwd`/dist/toh-billot/* billotr@transit.iut2.upmf-grenoble.fr:public_html/info7/
