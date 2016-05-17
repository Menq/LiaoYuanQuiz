var Keys = require('../Model/Keys');

module.exports.IsUrl =  function learnRegExp(s) {
      var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
      return regexp.test(s);
}

module.exports.generateKeys = function generateKeys(keyNumber) {
  Keys.count({},function(err, count){
    if (count == keyNumber) {
    }else{
      for (var j = 0; j < keyNumber; i++){
       var keys =  ["a" , "b" , "c" , "d" , "e" , "f" , "g" , "h" ,
       "i" , "j" , "k" , "l" , "m" , "n" , "o" , "p" , "q" , "r" , "s" , "t" ,
       "u" , "v" , "w" , "x" , "y" , "z" , "0" , "1" , "2" , "3" , "4" , "5" ,
       "6" , "7" , "8" , "9" , "A" , "B" , "C" , "D" , "E" , "F" , "G" , "H" ,
       "I" , "J" , "K" , "L" , "M" , "N" , "O" , "P" , "Q" , "R" , "S" , "T" ,
       "U" , "V" , "W" , "X" , "Y" , "Z"];
        var newArray = [];
        for (var i = 61; i >= 0; i--) {
          var number = getRandomizer(0,i);
          newArray.push(new String(keys[number]));
          keys.splice(number, 1);
        }
        Keys.create({'index': j, 'keys': newArray}, function(err, model){
          console.log(model);
        });
      }
    }
  });
}

function getRandomizer(bottom, top) {
    return function() {
        return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
    }
}
