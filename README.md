express-noticeboard
===

## Simple wrapper that turns [cjs-noticeboard](https://www.npmjs.com/package/cjs-noticeboard "cjs-noticeboard on npm") into express middleware

### Install

```js
npm install express-noticeboard
```

### Create Noticeboard

```js
var express = require('express')(),
    noticeboard = require('express-noticeboard')( noticeboard_configs );

express.use( noticeboard );
```

### Use Existing Noticeboard

```js
var express = require('express')(),
    Noticeboard = require('cjs-noticeboard'),
    noticeboard = new Noticeboard( noticeboard_configs );

express.use( require('express-noticeboard')({ noticeboard: noticeboard }) );
```

### Send or watch notices from inside your routes

```js
express.post( '/user', function( req, res ){
  
  // after creating user
  req.noticeboard.notify( 'user-created', user );  
});
```

### Send or watch notices from outside your routes

```js
var express = require('express')(),
    noticeboard = require('express-noticeboard')( noticeboard_configs );

express.use( noticeboard );

noticeboard.watch( 'user-created', 'send-welcome-email', function(){

  // send welcome email to user
});

noticeboard.watch( 'user-created', 'remove-user-from-marketing-funnel', function(){

  // remove user from marketing funnel
});
```