  HTMLtarget = document.getElementById('target');
  HTMLscore = document.getElementById('score');
  HTMLtime = document.getElementById('time');

  score = 0;
  fault = 0;
  powerBy = 2;

  // Default Dimensions (width,height) which later change
  let defDimen = 150;

  // To define that blocks count needs to increase every 2 times (after 3 times in the beginning)
  blocksIncrease = 2;
  timer = 750;
  
  // Generate a new shade
  function newShade(){

    multipliColorBy = 2;  // Difficulty

    let a = Math.floor(Math.random() * 100);
    shades = [];

    let x = 0;

    while(x < 2){
      
      let r = Math.floor((255 * a) / 100);  
      let g = Math.floor((255 * (100 - a)) / 100);
      let b = Math.floor((255 * a) / 100);

      a = a + multipliColorBy;

      let finalRGB = `rgb(${r}, ${g}, ${b})`;

      shades.push(finalRGB);

      x++;

    }

  }

  // Time function
  function countDown(){

    let newTime = 15;

    HTMLtime.innerHTML = newTime;

    newInt = setInterval(() => {

      newTime--;

      HTMLtime.innerHTML = newTime;

      if(newTime < 0){

        clearInterval(newInt);

        HTMLtarget.style.display = 'none';

        HTMLtime.innerHTML = 'FINISH!';

      }

    }, timer);

  }

  function decide(id){

    if(id == special){

      clearInterval(newInt);

      if(score == 20){

        console.log('You are a hawk!');

        return;

      }

      score++;
      
      start();

    }

    else fault++;

    HTMLscore.innerHTML = `<h4>Score: ${score}</h4><h4>Fault: ${fault}</h4>`;

  }

  function start(){

    // Timer function
    countDown(); 

    // Increasing amount of blocks
    let blocksCount = Math.pow(powerBy, 2);

    if(score > blocksIncrease && powerBy < 5){

        blocksIncrease = blocksIncrease + 2;
        
        powerBy++;
        console.log("blocksCount: " + blocksCount + "\npowerBy: " + powerBy);
    }

    console.log("blocksIncrease:" + blocksIncrease);

    // Generate a new shade each time the correct shade is clicked
    newShade();

    let arr = [];

    let output = '';

    // Generating special var each round (after clicking listItem / after reloading page)
    special = Math.floor(Math.random() * blocksCount);

    // Filling arr with objects and saving listItems to output
    for(let x=0 ; x<blocksCount ; x++){

      if(x == special)

        arr.push({ id: x, color: shades[0] });

      else

        arr.push({ id: x, color: shades[1] });

      output += `<li>
                  <div class="block" onclick=decide(this.id) id="${x}">
                  ${x+1}
                  </div>
                </li>`;

    }

    switch(blocksCount){

      case 4:
        defDimen = 150;
        break;

      case 9:
        defDimen = 100;
        break;

      case 16:
        defDimen = 80;
        break;

      case 25:
        defDimen = 70;
        break;

    }

    HTMLtarget.innerHTML = output;

    for(let idNum=0 ; idNum<arr.length ; idNum++){
      document.getElementById(idNum).style.width = defDimen + 'px';
      document.getElementById(idNum).style.height = defDimen + 'px';
    }

    // Giving background colors to divs
    for(let y=0 ; y<arr.length ; y++)

      document.getElementById(arr[y].id).style.backgroundColor = arr[y].color;

  }

  window.onload = start;