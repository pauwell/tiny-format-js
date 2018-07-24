# Tiny Format Js

## Format Tables

This is our set of data:

```js
let worker = [
      { name: 'Hans', age: 55, height: 160, hobbies: 'Golfing, reading the newspaper' },
      { name: 'Hedwig', age: 25, height: 174, hobbies: 'I am a fireworks enthusiast.' },
      { name: 'Anton', age: 35, height: 199, hobbies: 'Playing basketball.' },
    ];
];
```

Our output looks like this:

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

And the statement we used to create it, looks like this:

```js
let table = tinyFormat.formatTableAuto(worker);
```

It is also possible to specify the labels and cells more accurate. To achieve this, we use
a string template that might look weird at first but is actually really simple and explicit:

```js
let table = tinyFormat.formatTable(
  "|<Name><name>l15* |<Age><age>c6* |<Height><height>c8* |<Hobbies><hobbies>l40* |",
  worker,
  true
);
```

The template consists of blocks that represent a column. The bounds of each block is marked by a '|'.
A single block looks like this:

```
|[<label>][<variable>][c,r,l][sz]*[char]|
```

These are the meanings of all the symbols:

```
|       : Delimiter
label   : Is shown on top of the column
variable: The name of the property inside the data set.
c,r,l   : Adjust to the (l)eft, (r)ight & (c)enter
sz      : Length of  the cells.
char    : This char gets filled in the empty spaces in the block.
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

It is also possible to convert your created tables to html:

```js
let htmlTable = tinyFormat.convertTableToHtml(table2);
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
