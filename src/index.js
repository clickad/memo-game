import _ from 'lodash';
import './css/style.css';
import Main from './js/main.js';
import Data from './js/data.js';
import Start from './js/start.js';
import Result from './js/result.js';

$(window).on("load", ()=>{
  let data = new Data();
  $.when(data.getData()).then((data)=> {
    let main = new Main(data);
    let start = new Start();
    let result = new Result;
    main.$level.prop('selectedIndex',0); 
    main.$level.prop("disabled","true");
    main.$resultBoxes.sortable({
      placeholder: "highlight",
      cursor: "move"
    });
    main.$resultBoxes.disableSelection();
    main.$level.on('change', ()=>{main.levelChange()});
    main.$start.on('click', (event, level)=>{start.startGame(data, level)});
    main.$submit.on('click', ()=>{result.checkResult()});
  })
})