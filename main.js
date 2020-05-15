var varname = require('');

module.exports.loop = function ()
{
  // delete memory of absent creeps
  for(var i in Memory.creeps)
  {
    if(!Game.creeps[i])
    {
      delete Memory.creeps[i];
      console.log('Clearing non-existing creep memory:', i);
    }
  }
} // end module.exports.loop = function ()
