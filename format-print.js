"use strict"

let FORMAT_PRINT = (function(){

  let myself = {};
  
  function imprivate(){
    console.log("Private function executed!");
  }

  

}());

let table_print = (formatString, dataArray) => {
  // @Todo: Use regex to check if the formatting of the formatString is valid.

  // Get all blocks from the formatString.
  let blocks = formatString.split('|').filter(elem => elem.length > 0);
  let parsedBlocks = [];
  console.log(blocks);
  
  blocks.forEach(block => {
    
    // Layout: |<label><variable>[align][length]*[char]| 
    let label = block.split('<')[1].split('>')[0];
    let variable = block.split('<')[2].split('>')[0];
    let align = block.split('>')[2][0];
    let length = block.split(/>./)[2].split('*')[0];
    let char = block.split('*')[1][0];

    parsedBlocks.push({ 
      label:  label, 
      variable: variable, 
      align: align, 
      length: length, 
      char: char 
    });

    console.log("label: " + label);
    console.log("variable: " + variable);
    console.log("align: " + align);
    console.log("length: " + length);
    console.log("char: " + char);
  });

  // Build each column.
  let columns = [];
  parsedBlocks.forEach(block => {

    // Build label.
    let col = '|';
    for(let i=0; i<block.length; ++i){ col += block.char; }
    col += '|';
    let value = block.label;
    let startIdx = (col.length / 2) - (value.length / 2);
    columns.push(col.substr(0, startIdx) + value + col.substr(startIdx + value.length));


    dataArray.forEach(data => {
      console.log(data[block.variable]);

      // Build raw.
      let col = '|';
      for(let i=0; i<block.length; ++i){ col += block.char; }
      col += '|';

      // Fill in the data.
      let value = String(data[block.variable]);
      let startIdx = (col.length / 2) - (value.length / 2);
      columns.push(col.substr(0, startIdx) + value + col.substr(startIdx + value.length));
      });
  });
  console.log(columns);

  // Attach each column to the final string.
  let formatted = '';
  for(let i=0; i<dataArray.length + 1; ++i){
    for(let j=i; j<columns.length; j += dataArray.length + 1){
      formatted += columns[j];
    }
    formatted += '\n';
  }
  console.log(formatted);

  return formatted;
}