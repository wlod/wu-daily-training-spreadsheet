# wu-daily-training-spreadsheet

Experimental google docs/drive and vuejs

Demo:
- https://wu-daily-training-sheet.wlodi.net
- https://wu-daily-training-sheet.wlodi.net/index.html?devopt=no-image (without images from google drive)

Why is it so great?!
1. Free 'CMS'.
2. Just simple frontend app - without js dependencies.
3. Publication/editingis provide by external sources google-docs - 'CMS' clients are available for browser and mobile, free, provide tools to manage access for users (by link or gmail account), parallel data management.
4. Developer can switch beetwen 'prod' and 'dev' data by change a link to another gdocs with limited privileges.
5. Free tools to check traffic from google.

Above points it's not glorification google - I jut describe idea - for some simple/free solution to provide cheaper solutions and more available for user and developers - 'Excel' as a CMS. In this type of solutions - I think the biggest challenge is the parallel access to resources and user roles (and their management) - in my example you've it for free.

## Dependencies

JS Libraries:

- Vue.js
- Google API
- Views (https://github.com/adrianklimek/views)
- lazysizes (https://github.com/aFarkas/lazysizes)

CSS:

- Material Icons (https://material.io/tools/icons/?style=baseline)
- Font from Google (https://fonts.google.com/specimen/Roboto)

DEV:

- http-server (https://github.com/indexzero/http-server)

## Developer notes

Website URL contains [devopt] parameter - it can be used for developers to skip following operations:

- no-image - skip call for images from external resource
- no-data - skip call for all data from external resource

You can use any delimiter in query (order is no matter) - excluding RFC standard (&, ? etc.), for example:

```sh
(...)?devopt=no-image||no-data
(...)?devopt=no-image_no-data
(...)?devopt=no-data_no-image
(...)?devopt=no-datano-image
```

## Google

### Install on AppEngine

1. Create Google project

2. Hosting a static website on Google App Engine
 
Use instruction on website "Hosting a static website on Google App Engine":
- https://cloud.google.com/appengine/docs/standard/python/getting-started/hosting-a-static-website

Example commands on Ubuntu or Windows Ubuntu Bash:

Create an environment variable for the correct distribution
```sh
export CLOUD_SDK_REPO="cloud-sdk-$(lsb_release -c -s)"
```

Add the Cloud SDK distribution URI as a package source
```sh
echo "deb http://packages.cloud.google.com/apt $CLOUD_SDK_REPO main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
```

Import the Google Cloud public key
```sh
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
```
Update and install the Cloud SDK:
```sh
sudo apt-get update && sudo apt-get install google-cloud-sdk
```
Init gcloud - run in project
```sh
gcloud init
```

Deploy app or deploy with other path XXX.yaml
```sh
gcloud app deploy
gcloud app deploy XXX.yaml
```

Link to web browser
```sh
gcloud app browse
```

3. Copy Spreadsheet from https://docs.google.com/spreadsheets/d/1W2lIqTBXORVBdAM1AaGQIY4KzDRYCqTDN8NUYEm4jt8/edit#gid=1777293991 (for this example it should be public)  

4. Clone code by Git or [Download ZIP](https://github.com/wlod/wu-daily-training-spreadsheet/archive/master.zip)

5. Change settings in js/gdocs/GApiConf.js, below values should be change: 

- CLIENT_ID
- API_KEY
- SPREADSHEET_ID


### Google Drive - check limits:

 - Go to: https://console.developers.google.com/cloud-resource-manager
 - Choose your project
 - Choose [Limits] from left menu
