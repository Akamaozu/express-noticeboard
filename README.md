express-noticeboard
===

## Simple wrapper that turns [cjs-noticeboard](https://www.npmjs.com/package/cjs-noticeboard "cjs-noticeboard on npm") into express middleware

### Install

```js
npm install express-noticeboard
```

### Use

```js
var express = require('express')(),
    noticeboard = require('express-noticeboard')();

express.use( noticeboard );
```

### Send or watch notices from your routes

```js
express.post( '/user', function( req, res ){
  
  // create user

  req.noticeboard.notify( 'user-created', user );
  res.send( 'account created!' );  
});
```

### Send or watch notices from outside your routes

```js
express.post( '/user', function( req, res ){
  
  // create user
  
  req.noticeboard.notify( 'user-created', user );
  res.send( 'account created!' );
});

noticeboard.watch( 'user-created', 'send-welcome-email', function(){

  // send welcome email to user
});

noticeboard.watch( 'user-created', 'remove-user-from-marketing-funnel', function(){

  // remove user from marketing funnel
});
```