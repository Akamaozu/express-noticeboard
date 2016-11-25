module.exports = function( config ){

  if( !config || Object.prototype.toString.call( config ) !== '[object Object]' ) config = {};
  
  var Noticeboard = require('cjs-noticeboard'),
      noticeboard = new Noticeboard( config ),
      middleware = middleware_wrapper;

  for( var prop in noticeboard ){

    if( typeof noticeboard[ prop ] === 'function' ){

      if( prop === 'constructor' ){

        middleware.constructor = noticeboard.constructor;
        continue;
      }

      middleware[ prop ] = function( prop ){

        return function(){

          noticeboard[ prop ].apply( noticeboard, arguments ) 
        }
        
      }( prop );
    }

    else switch( Object.prototype.toString.call( noticeboard[ prop ] ) ){

      case '[object Object]':

        middleware[ prop ] = noticeboard[ prop ];

      break;
    }
  }

  return middleware;

  function middleware_wrapper( req, res, next){

    req.noticeboard = noticeboard;
    next();
  }
}