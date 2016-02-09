SXSW Party Guide
==============================

The front end to our SXSW party guide.

## Setting up

* use `package.json` and `npm install`
* use `bower.json` and `bower install`
* You need the `.ftppass` and `.slack` files described below.
* Run the default grunt task.

### Public folder
The `public` folder holds the published files:
	* assets: images and other accces
	* dist: where js and css is compiled
	* fonts: for font-awesome
	* includes: files for metrics, advertising and other includes

### Src folder
The `src` folder is for components that are used by grunt tasks and copied into the `public/dist` folder:
* js: for project specific files. `main.js` will get minified into the dist folder.
* less: for less css source files, based on [bootstrap](http://getbootstrap.com/getting-started/).

## Configurations

### ftpush

The path is in `Gruntfile.js`. Add the username/password into a file called `.ftppass` as per [ftpush docs](https://www.npmjs.com/package/grunt-ftpush). Make sure that file is in the .gitignore.


```
{
  "key": {
    "username": "username",
    "password": "password"
  }
}
```

### slack msg

The `grunt-slack-hook` plugin let's us publish finished url to slack as part of ftpush. Needs a .slack file with the Webhook URL from Slack configurations. Just a single line with that url and no return.
