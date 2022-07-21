### Table of contents: <!-- omit in toc -->

- [Chapter 7: Using Closures](#chapter-7-using-closures)
    - [See the Closure](#see-the-closure)
      - [Pointed Closure](#pointed-closure)
      - [Adding Up Closures](#adding-up-closures)

# Chapter 7: Using Closures

Closure builds on this approach: for variables we need to use over time, instead of placing them in larger outer scopes, we can encapsulate (more narrowly scope) them but still preserve access from inside functions, for broader use

Functions re- member these referenced scoped variables via closure.

If you’ve ever written a callback that accesses variables outside its own scope... guess what!? That’s closure.

Closure is one of the most important language characteristics ever invented in programming—it underlies major program- ming paradigms, including Functional Programming (FP), modules, and even a bit of class-oriented design.

### See the Closure

Closure is originally a mathematical concept, from lambda calculus.

Closure is a behavior of functions and only functions. 

For closure to be observed, a function must be invoked, and specifically it must be invoked in a different branch of the scope chain from where it was originally defined.

Let’s look at some code, annotated with its relevant scope bubble colors (see Chapter 2):

```Js
// outer/global scope: RED(1)
function lookupStudent(studentID) { 
    // function scope: BLUE(2)
    var students = [
        { id: 14, name: "Kyle" }, 
        { id: 73, name: "Suzy" }, 
        { id: 112, name: "Frank" }, 
        { id: 6, name: "Sarah" }
    ];
    return function greetStudent(greeting){
        // function scope: GREEN(3)
        var student = students.find(
            student => student.id == studentID
        );
        return `${ greeting }, ${ student.name }!`; 
    };
}

var chosenStudents = [ 
    lookupStudent(6), 
    lookupStudent(112)
];

// accessing the function's name:
chosenStudents[0].name;
// greetStudent
chosenStudents[0]("Hello");
// Hello, Sarah!
chosenStudents[1]("Howdy");
// Howdy, Frank!
```

Closure allows greetStudent(..) to continue to access those outer variables even after the outer scope is finished (when each call to lookupStudent(..) completes).

Instead of the instances of students and studentID being GC’d (Garbage collector), they stay around in memory. 

At a later time when either instance of the greetStudent(..) function is invoked, those variables are still there, holding their current values.

The fact that the execution of chosenStudents[0]("Hello") works and returns us the message “Hello, Sarah!”, means it was still able to access the students and studentID variables.

This is a direct observation of closure!

#### Pointed Closure

Because of how terse the syntax for => arrow functions is, it’s easy to forget that they still create a scope (as asserted in “Arrow Functions” in Chapter 3).

The student => stu- dent.id == studentID arrow function is creating another scope bubble inside the greetStudent(..) function scope.

if we were creating a colored diagram for this code, there’s a fourth scope at this innermost nesting level, so we’d need a fourth color; perhaps we’d pick ORANGE(4) for that scope:

```Js
var student = students.find(
        student =>
            // function scope: ORANGE(4)
            student.id == studentID
);
```

The BLUE(2) studentID reference is actually inside the OR- ANGE(4) scope rather than the GREEN(3) scope of greet- Student(..); also, the student parameter of the arrow function is ORANGE(4), **shadowing** the GREEN(3) student.

The consequence here is that this arrow function passed as a callback to the array’s find(..) method has to hold the closure over studentID, rather than greetStudent(..) holding that closure.

It’s just important not to skip over the fact that even tiny arrow functions can get in on the closure party.

#### Adding Up Closures

Let’s examine one of the canonical examples often cited for closure:

```Js
function adder(num1) {
    return function addTo(num2){
        return num1 + num2; 
    };
}
var add10To = adder(10);
var add42To = adder(42); 

add10To(15); // 25
add42To(9);     // 51
```