'use strict';

class Blocks {
  constructor(blocksCount){
    this.arr = [];
    this.blocksCount = blocksCount;
    this.special = Math.floor(Math.random() * this.blocksCount);
    this.output = '';
    this.target = document.getElementById('target');
  }

  load(){
    for(let x=0 ; x<this.blocksCount ; x++){
      if(x == this.special)
        this.arr.push({ id: x, color: "blue" });
      else
        this.arr.push({ id: x, color: "red" });

      this.output += `
      <li>
        <div id="${x}">
        ${x+1}
        </div>
      </li>`;
    }
  }

  view(){
    return this.target.innerHTML = this.output;
  }

  compareit(){
    
  }

  style(){
    for(let y=0 ; y<this.arr.length ; y++){
      document.getElementById(this.arr[y].id).style.backgroundColor = this.arr[y].color;
      document.getElementById(y).addEventListener('click', this.compareit());
    }
  }

  decide(){
    alert("Hello");
  }

}

let b = new Blocks(5);
b.load();
b.view();
b.style();
