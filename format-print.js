"use strict"

let tinyFormat = (function(){

/*
  ___private_________________________________________________________________________
*/
  let myself = {};

  // Read the single components of a block and return them stored in an object.
  function splitBlockComponents(block){
    return { 
      label:  block.split('<')[1].split('>')[0], 
      variable: block.split('<')[2].split('>')[0], 
      align: block.split('>')[2][0], 
      length: block.split(/>./)[2].split('*')[0], 
      char: block.split('*')[1][0]
    };
  }

  // Combine the block and its value to create a formatted cell.
  function buildCellFromBlock(block, value){
    let col = '|';
    for(let i=0; i<block.length; ++i){ col += block.char; }
    col += '|';
    value = String(value);
    let startIdx = block.align == 'l' ? 2 : (block.align == 'r' ? block.length - value.length : (col.length / 2) - (value.length / 2));
    return (col.substr(0, startIdx) + value + col.substr(startIdx + value.length));
  }

  // Attaches columns together in a single string.
  function buildStringFromColumns(columns, dataArrayLength){  
    let formatted = '';
    for(let i=0; i<dataArrayLength + 1; ++i){
      for(let j=i; j<columns.length; j += dataArrayLength + 1){
        formatted += columns[j];
      }
      formatted += '\n';
    }
    return formatted;
  }

/*
  ___public__________________________________________________________________________
*/
  myself.formatTable = function(formatString, dataArray){
    // @Todo: Use regex to check if the formatting of the formatString is valid.
    // @Todo: Check if one of the data values is too long for the specified cell width.

    // Get all blocks from the formatString.
    let blocks = formatString.split('|').filter(elem => elem.length > 0);
    let parsedBlocks = [];
    
    // Split the blocks into their components.
    blocks.forEach(block => {
      parsedBlocks.push(splitBlockComponents(block));
    });

    // Build each column.
    let columns = [];
    parsedBlocks.forEach(block => {
      columns.push(buildCellFromBlock(block, block.label)); // Create Label cell.
      dataArray.forEach(data => { // Create data cells.
        columns.push(buildCellFromBlock(block, data[block.variable]));
      });
    });

    // Attach each column to the final string.
    return buildStringFromColumns(columns, dataArray.length); 
  }

  return myself;
}());