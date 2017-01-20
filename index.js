module.exports = function( config ){

  var middleware = middleware_wrapper,
      noticeboard;

  if( !config || Object.prototype.toString.call( config ) !== '[object Object]' ) config = {};

  // use created noticeboard
  if( config.hasOwnProperty( 'noticeboard' ) ) {

    noticeboard = config.noticeboard;
  }

  // create new noticeboard instance
  else {

    var Noticeboard = require('cjs-noticeboard');    
    noticeboard = new Noticeboard( config );    
  }
  
  // shim middleware with noticeboard methods and properties

  // - sometimes watching or publishing outside routes is needed
  // - this glues noticeboard methods and props to middleware
  // - that way it feels and acts like a real noticeboard. kinda.
  
  for( var prop in noticeboard ){

    // shim functions
    if( typeof noticeboard[ prop ] === 'function' ){

      if( prop === 'constructor' ){
        middleware.constructor = noticeboard.constructor;
        continue;
      }

      middleware[ prop ] = function( prop ){

        return function(){
          noticeboard[ prop ].apply( noticeboard, arguments );
        }

      }( prop );
    }

    else switch( Object.prototype.toString.call( noticeboard[ prop ] ) ){

      // shim objects
      case '[object Object]':

        middleware[ prop ] = noticeboard[ prop ];
      break;
    }
  }

  return middleware;

  function middleware_wrapper( req, res, next ){

    req.noticeboard = noticeboard;
    next();
  }
}