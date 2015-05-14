
angular.module('findText', [])
.filter('findText', function() {
  return function(source, text) {
    
    text = text.toLowerCase();
    var out = [];
    for (var i = 0; i < source.length; i++) {
      if(source[i].name.toLowerCase().indexOf(text) != -1)
         out.push(source[i]);
    }
    return out;
  };
})
