/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  'POST    /register': 'user/register',
  'POST    /createFolder': 'folder/create',
  'POST    /deleteFolder': 'folder/delete',
  'GET    /getFolder': 'folder/read',

  'POST    /createIdea': 'idea/create',
  'POST    /updateIdea': 'idea/update',
  'POST    /deleteIdea': 'idea/delete',
  'GET    /getIdea': 'idea/read',

  'POST    /createTodo': 'todo/create',
  'POST    /updateTodo': 'todo/update',
  'POST    /deleteTodo': 'todo/delete',
  'GET    /getTodo': 'todo/read',

  'POST    /createNote': 'note/create',
  'POST    /updateNote': 'note/update',
  'POST    /deleteNote': 'note/delete',
  'GET    /getNote': 'note/read',

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
