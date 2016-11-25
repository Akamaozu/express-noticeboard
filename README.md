express-noticeboard
===

Simple wrapper that turns cjs-noticeboard into an express middleware.

```js
var express = require('express')(),
    noticeboard = require('express-noticeboard')();

express.use( noticeboard );
```

Send or watch notices from your routes.

```js
express.post( '/user', function( req, res ){
  
  // create user

  req.noticeboard.notify( 'user-created', user );
  res.send( 'account created!' );  
});

express.get( '/user/:id', function( req, res ){  
  
  req.noticeboard.once( 'get-user', {
    id: req.param.id,
    callback: function( error, user ){

      if( error ) res.sendStatus( 500 );
      else res.sendJson( user );
    }
  });  
});
```

Send or watch notices from outside your routes.

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