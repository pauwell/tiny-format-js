# Tiny Format Js

## Format Tables

TinyFormatJs is a tiny vanilla javascript library that lets you input some data and 
returns this data formatted as a table or tree. (Right now only tables are supported).
Let's look at an example to see how it works. 
First, we need our set of data:

```js
let worker = [
      { name: 'Hans', age: 55, height: 160, hobbies: 'Golfing, reading the newspaper' },
      { name: 'Hedwig', age: 25, height: 174, hobbies: 'I am a fireworks enthusiast.' },
      { name: 'Anton', age: 35, height: 199, hobbies: 'Playing basketball.' },
];
```

Then we call the <code>formatTableAuto</code> method to parse our worker-set: 

```js
let table = tinyFormat.formatTableAuto(worker);
```

After the parsing is done, our local variable <code>table</code> now contains the following string:

```
+---------+----+--------+-------------------------------------------------------+
| name    | age| height | hobbies                                               |
+---------+----+--------+-------------------------------------------------------+
| Hans    | 55 | 160    | Golfing, reading the newspaper.                       |
+---------+----+--------+-------------------------------------------------------+
| Hedwig  | 25 | 174    | I am a fireworks enthusiast.                          |
+---------+----+--------+-------------------------------------------------------+
| Anton   | 35 | 199    | Playing basketball.                                   |
+---------+----+--------+-------------------------------------------------------+
```
Maybe you noticed the <code>Auto</code> in the name of the method <code>formatTableAuto</code>.
Of course there is also a method that lets you specify the look of the table more specific.
To achieve this we use a custom template string that lets you accurately describe how the 
labels and cells should appear. Let's have a look at it:

```js
let table = tinyFormat.formatTable(
  "|<Name><name>l15* |<Age><age>c6* |<Height><height>c8* |<Hobbies><hobbies>l40* |",
  worker,
  true
);
```

The template consists of blocks. Each of these blocks represent a column. The bounds of each block is marked by a '|'.
A single block is structured like this:

```
|[<label>][<variable>][c,r,l][sz]*[char]|
```

These are the meanings of all the symbols:

```
|       : Delimiter of the block.
label   : Is shown on top of the column as a header.
variable: The name of the property inside the data set.
l,r,c   : Adjust to the (l)eft, (r)ight & (c)enter
sz      : Length of  the cells.
char    : This fills the empty spaces in the block.
```
Examples:
<ul>
    <li><p><code>|&lt;Size in meter&gt;&lt;size_m&gt;c15*.|</code></p>
        <ul type="a">
            <li>Label: "Size in meter"</li>
            <li>Variable: "size_m"</li>
            <li>Adjustment: "(c)enter"</li>
            <li>Cell width: 15</li>
            <li>Fill whitespace with: "."</li>
        </ul>
    </li>
     <li><p><code>|&lt;Price per Hour&gt;&lt;pricePerHour&gt;l10* |</code></p>
        <ul type="a">
            <li>Label: "Price per Hour"</li>
            <li>Variable: "pricePerHour"</li>
            <li>Adjustment: "(l)eft"</li>
            <li>Cell width: 10</li>
            <li>Fill whitespace with: " "</li>
        </ul>
    </li>
</ul>

Of course it is also possible to convert your created tables to html:

```js
let htmlTable = tinyFormat.convertTableToHtml(table);
```

Output:

<table>
    <tr>
        <th> name </th>
        <th> age</th>
        <th> height </th>
        <th> hobbies </th>
    </tr>
    <tr>
        <td> Hans </td>
        <td> 55 </td>
        <td> 160 </td>
        <td> Golfing, reading the newspaper. </td>
    </tr>
    <tr>
        <td> Hedwig </td>
        <td> 25 </td>
        <td> 174 </td>
        <td> I am a fireworks enthusiast. </td>
    </tr>
    <tr>
        <td> Anton </td>
        <td> 35 </td>
        <td> 199 </td>
        <td> Playing basketball. </td>
    </tr>
</table>
