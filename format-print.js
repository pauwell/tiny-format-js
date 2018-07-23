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
  function buildCellFromBlock(block, value, showHidden){
    let col = '|';
    for(let i=0; i<block.length; ++i){ col += block.char; }
    col += '|';
    value = String(value);
    if(showHidden === false && value.length >= block.length){
      value = value.substr(0, block.length - 3) + '..';
    } 
    let startIdx = block.align == 'l' ? 2 : (block.align == 'r' ? block.length - value.length : (col.length / 2) - (value.length / 2));
    let cell = col.substr(0, startIdx) + value + col.substr(startIdx + value.length);
    return cell.slice(0, -1); // -1 to remove the right bounds.
  }

  // Attaches columns together in a single string.
  function buildStringFromColumns(columns, dataArrayLength){  
    let formatted = '';
    for(let i=0; i<dataArrayLength + 1; ++i){
      for(let j=i; j<columns.length; j += dataArrayLength + 1){
        formatted += columns[j];
      }
      formatted += '|\n';
    }
    return formatted;
  }

  function fitCellLengthToData(newLength, dataArray, blockComponents){
    dataArray.forEach(data => {
      let dataValue = String(data[blockComponents.variable]);
      if(dataValue.length > blockComponents.length && dataValue.length > newLength){
        newLength = dataValue.length + 2; // +2 is needed to not overlap the bounds.
      }
    });
    return newLength;
  }

/*
  ___public__________________________________________________________________________
*/
  myself.formatTable = function(formatString, dataArray, showHidden=false){
    // @Todo: Use regex to check if the formatting of the formatString is valid.

    // Get all blocks from the formatString.
    let blocks = formatString.split('|').filter(elem => elem.length > 0);
    let parsedBlocks = [];
    
    // Split the blocks into their components.
    blocks.forEach(block => {      

      let blockComponents = splitBlockComponents(block);
      
      if(showHidden){ // Fit the cells to the biggest value if showHidden is true.
        blockComponents.length = fitCellLengthToData(blockComponents.length, dataArray, blockComponents);
      }

      parsedBlocks.push(blockComponents);
    });

    // Build each column.
    let columns = [];
    parsedBlocks.forEach(block => {
      columns.push(buildCellFromBlock(block, block.label, showHidden)); // Create Label cell.
      dataArray.forEach(data => { // Create data cells.
        columns.push(buildCellFromBlock(block, data[block.variable], showHidden));
      });
    });

    // Attach each column to the final string.
    let finalString = buildStringFromColumns(columns, dataArray.length);

    return finalString; 
  }

  return myself;
}());