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

  // Create a cell that works as a horizontal boundary.
  function buildBoundaryCell(length){
    let cell = '+';
    for(let i=0; i<length - 1; ++i){ cell += '-'; }
    return cell;
  } 

  // Attache columns together in a single string and add horizontal boundaries.
  function buildStringFromColumns(columns, dataArrayLength){  
    let formatted = '';
    for(let j=dataArrayLength; j<columns.length; j += dataArrayLength){
      formatted += buildBoundaryCell(columns[j].length);
    }
    formatted += '+\n';
    for(let i=0; i<dataArrayLength + 1; ++i){   
      for(let j=i; j<columns.length; j += dataArrayLength + 1){
        formatted += columns[j];
      }
      formatted += '|\n';
      for(let j=dataArrayLength; j<columns.length; j += dataArrayLength){
        formatted += buildBoundaryCell(columns[j].length);
      }
      formatted += '+\n';
    }
    return formatted; 
  }

  // Expand the length of a cell if any data member is too big.
  function fitCellLengthToData(newLength, dataArray, blockComponents){
    dataArray.forEach(data => {
      let dataValue = String(data[blockComponents.variable]);
      if(dataValue.length > blockComponents.length && dataValue.length > newLength){
        newLength = dataValue.length + 2; // +2 is needed to not overlap the bounds.
      }
    });
    // If the label is longer than the values.
    if(String(blockComponents.label).length > newLength){
      newLength = String(blockComponents.label).length + 2;
    }
    return newLength;
  }

/*
  ___public__________________________________________________________________________
*/
  // Create a table from a set of data with a string that determines the format of the cells.
  // If showHidden is set to true, the cells expand to fit their data if their content is too big.
  myself.formatTable = function(formatString, dataArray, showHidden=true){

    // Get all blocks from the formatString.
    let blocks = formatString.split('|').filter(elem => elem.length > 0);
    let parsedBlocks = [];

    // Checks for (e.g.): <Label><variable>c20*_
    let validBlockFormatRegex = /<(.*)><(.*)>(c|r|l)(.*)\*./;

    // Split the blocks into their components after checking their format.
    blocks.forEach(block => {
      if(validBlockFormatRegex.test(block) === false){
        console.error(`Error in block "${block}"! A block should look like this: |<Label><variable>c20*_|. For more information, please read the documentation.`);
        return 'Failed!';
      }

      let blockComponents = splitBlockComponents(block);

      if(showHidden){ // Fit the cells to the biggest value if showHidden is true.
        blockComponents.length = fitCellLengthToData(blockComponents.length, dataArray, blockComponents);
      }

      parsedBlocks.push(blockComponents);
    });
    console.log(parsedBlocks);

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

  // Create a table without specifying the format and the labels.
  myself.formatTableAuto = function(dataArray, showHidden=true){

    let formatString = '';
    for(let key in dataArray[0]){
      if(dataArray[0].hasOwnProperty(key)){
        formatString += `|<${key}><${key}>l1* `;
      }
    }
    formatString += '|';

    return this.formatTable(formatString, dataArray, showHidden);
  }

  // Take a finished table and convert it to a html representation.
  myself.convertTableToHtml = function(table){
    let htmlTable = '<table>';
    
    // Get a list of the width of each column.
    let cellSizes = table.split('\n')[0].split('+').filter((e) => e.length != 0).map((e) => e.length)
    console.log(cellSizes);

    // Go through each row that has content.
    table.split('\n').filter((e, idx, arr) => idx % 2 !== 0).forEach((tableRow, index, array) => {
      htmlTable += '<tr>';
      let atLength = 1;
      cellSizes.forEach((cellSize, idx, arr) => {
        let cell = tableRow.substr(atLength, cellSize);
        atLength += cellSize + 1;
        htmlTable += index === 0 ? `<th>${cell}</th>` : `<td>${cell}</td>`;
      });
      htmlTable += '</tr>';
      console.log(tableRow);
    });

    htmlTable += '</table>';
    console.log(htmlTable);
    return htmlTable;
  }

  return myself;
}());