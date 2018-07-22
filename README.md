# Tiny Format Js


## Table print     

This is our set of data:

```js
let data = [
    {id: 0, name: "Sebastian", age: 99},
    {id: 1, name: "Bob", age: 5},
    {id: 2, name: "Peter", age: 45}
];
```
Our goal is to create a table that looks like this:

```
+-----+--------------+-------+
| ID  | Name         | Age   |
+-----+--------------+-------+
|  0  | Sebastian    |  99   |
+-----+--------------+-------+
|  1  | Bob          |  25   |
+-----+--------------+-------+
|  2  | Anna         |  45   |
+-----+--------------+-------+
```
Every print-statement consists of a block and a delimiter.

Delimiters are used as boundaries for the inner blocks.
The following is a set of blocks with delimiters.
(Delimiter: '|', Block: 'XXXX'):

```
  ID (name)  (age)
|XXXX|XXXXXXX|XXXXXXX|
```

Delimiters are always(!) one character in length. They can be a space
but no newlines for example. Every delimiter knows its distance from
the last one. The length of the block between the delimiters subtracted
from their distance is needed to calculate the necessary number of filler
characters.
Furthermore the user can design wether to align the content of the block 
left, right or centered between the delimiters.



## The following is unfinished:

Idea for syntax:
To print the following:
```
| 99  |..........Sebastian.|
```
You just need to write:
```js
tablePrint("|age%c5* |name%r20*.|");
```
Lets have a look at the the meaning of all that mess.
```
|    : Delimiter
age  : Identifier
%    : Starts modifier section
c,r,l: Adjust to the (l)eft, (r)ight & (c)enter
5*_  : Sets the field-width and fills it with the character '_'.

|<label><variable>[c,r,l][sz]*[char]|
```