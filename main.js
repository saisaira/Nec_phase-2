var request;
var result;
var tx;
var store;
var indexedDB = window.indexedDB || window.webkitIndexedDB ||
window.msIndexedDB || window.mozIndexedDB ;
request = indexedDB.open("mydb",1);
request.onerror=function(e){
  console.log("error"+e)
}
request.onupgradeneeded = function(e){
  result = e.target.result;
  store = result.createObjectStore("resume", {keyPath:"name"});
}
request.onsuccess = function(e){
result = e.target.result;
function getdata(callback){
tx = result.transaction("resume",IDBTransaction.READ_ONLY);
store = tx.objectStore("resume");
data =[];
tx.oncomplete = function(e){
  callback(result);
  console.log(result);
}
var cursor = store.openCursor();

cursor.onerror = function(e){
  console.log("error"+e);
}

cursor.onsuccess = function(e){
  var rc=e.target.result;
  if (rc) {
    data.push(rc.value);
    rc.continue();
  }
}
}
  var parent=document.querySelector(".parent");
  getdata(function(d) {
console.log(d);
for (var i in data) {
  var child =document.createElement("div");
  child.classList.add("child");
  parent.append(child);

  var img = document.createElement("img");
  img.src="images.png";
  img.alt=data[i].name;
  child.append(img);

  var name = document.createElement("h2");
  name.textContent=data[i].name;
  child.append(name);

  var email = document.createElement("p");
  email.textContent=data[i].email;
  child.append(email);

  var button = document.createElement("a");
  button.textContent="View profile";
  button.href="resume.html?name="+data[i].name;
  child.append(button);
}
  })
}
