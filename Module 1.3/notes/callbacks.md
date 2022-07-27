# Callbacks

Is simply a function that is invoked or called after something else happens.

this is achieved in JS by passing a function into another function and then the function that is passed is called back excuted after something else has ocurred.

This is possible because javascript supports Higher order functions

```Js
let logCall= function() {
    console.log("locCall was called back.");
}; //Here the funtion is stored as an expression

setTimeout(logCall,3000); //Here logCall is the calback
//logCall will be called after the time out ends.
```

Another way:

```Js
setTimeout(function() {
    console.log("The function was called back.");
}, 3000); //Here is passed as an annonymus function directly in the parameter.
```
Callbacks are normaly used in event listeners:

```Js
let btn = document.querySelector("#item1");

btn.addEventListener("click",function(e) {
    console.log("The button was clicked.");
});
```

A bigger example:

```Js
let students=[{name:"Mary",score:90,school:"East"},
{name:"James",score:100,school:"East"},
{name:"Steve",score:40,school:"East"},
{name:"Gabe",score:90,school:"West"},
{name:"Rachel",score:85,school:"East"},
{name:"Rochelle",score:95,school:"West"},
{name:"Lynette",score:75,school:"East"}];

let processStudents=function(data,callback){
    for(leti=0;i<data.length;i++){
        if (data[i].school.toLowerCase()==="east"){
            if(typeof callback ==="function"){
                callback(data[i]);
            }
        }
   }
}
           
processStudents(students,function(obj) {
    if(obj.score>60){
        console.log(obj.name+"passed.");
   }
})
```

Problems with callbacks:

#### Callback Hell

A bunch of nested callbacks

#### Difficult to Reason About

This goes with callback hell, when you have lots of callbacks it's hard to read.

#### Inversion of Control

You turn control of your program over to something.