//поиск по реестру сертификатов, Defiant.js
function doSearch(obj, field, value) {

  var val = value;

  var array = [];

  var result;

  result = JSON.search(obj, '//root//*[contains(translate(*, \'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯABCDEFGHIJKLMNOPQRSTUVWXYZ"\', "абвгдеёжзийклмнопрстуфхцчшщъыьэюяabcdefghijklmnopqrstuvwxyz"), "'+value+'")]/..');

  console.log(result);

  if(!result.length){

    return false;
  }

  for (var i=0; i<result.length; i++) {

    array.push(result[i]);

  }

  return {"root":array};

}