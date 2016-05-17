var Keys = require('../Model/Keys');

var globalKeysArray = [];

module.exports.isUrl =  function learnRegExp(s) {
      var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
      return regexp.test(s);
}

module.exports.generateKeys = function generateKeys(keyNumber) {
  Keys.count({},function(err, count){
    if (count == keyNumber) {
      Keys.find({},function(err, keys) {
        globalKeysArray = keys;
      });
    }else{
      for (var j = 0; j < keyNumber; j++){
       var keys =  ["a" , "b" , "c" , "d" , "e" , "f" , "g" , "h" ,
       "i" , "j" , "k" , "l" , "m" , "n" , "o" , "p" , "q" , "r" , "s" , "t" ,
       "u" , "v" , "w" , "x" , "y" , "z" , "0" , "1" , "2" , "3" , "4" , "5" ,
       "6" , "7" , "8" , "9" , "A" , "B" , "C" , "D" , "E" , "F" , "G" , "H" ,
       "I" , "J" , "K" , "L" , "M" , "N" , "O" , "P" , "Q" , "R" , "S" , "T" ,
       "U" , "V" , "W" , "X" , "Y" , "Z"];
        var newArray = [];
        for (var i = 61; i >= 0; i--) {
          var number = getRandomizer(0,i)();
          newArray.push(clone(keys[number]));
          keys.splice(number, 1);
        }
        Keys.create({'index': j, 'keys': newArray}, function(err, model){
          // console.log(model);
          globalKeysArray.push(model);
        });
      }
    }
  });
}


module.exports.generateShortUrl = function(index){
  var shortUrl = "";
  for(var i = 0; i < globalKeysArray.length; i++){
    var number = index % 62;
    index = Math.floor(index / 62);
    var keys = findKeysOfIndex(i);
    if (keys) {
      shortUrl += keys[number];
    }else{
      return null;
    }
  }
  return shortUrl;
}

function findKeysOfIndex (index){
  for (var i = 0; i < globalKeysArray.length; i++) {
    var model = globalKeysArray[i];
    if (model.index == index) {
      return model.keys;
    }
  }
  return null;
}


function getRandomizer(bottom, top) {
    return function() {
        return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
    }
}

function clone(obj)
{
	var o,i,j,k;
	if(typeof(obj)!="object" || obj===null)return obj;
	if(obj instanceof(Array))
	{
		o=[];
		i=0;j=obj.length;
		for(;i<j;i++)
		{
			if(typeof(obj[i])=="object" && obj[i]!=null)
			{
				o[i]=arguments.callee(obj[i]);
			}
			else
			{
				o[i]=obj[i];
			}
		}
	}
	else
	{
		o={};
		for(i in obj)
		{
			if(typeof(obj[i])=="object" && obj[i]!=null)
			{
				o[i]=arguments.callee(obj[i]);
			}
			else
			{
				o[i]=obj[i];
			}
		}
	}

	return o;
}
