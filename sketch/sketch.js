const INITIAL_WIDTH=900;
const INITIAL_HEIGHT=800;
const INITIAL_SCROLL_WIDTH=90;
const INITIAL_FRAME_RATE=45;
const DEFAULT_SCROLL_UNIT = -2;

const TEXT_FONT_SIZE = 13;
const COPYRIGHT_TEXT = "© ntno 2021, All rights reserved";
const ASSETS_INDEX_FILENAME = "meta/assets-apd.json";
const IMAGE_FOLDER = "assets/apothecary-notes-detail/";
// const ASSETS_INDEX_FILENAME = "meta/assets-mld.json";
// const IMAGE_FOLDER = "assets/manor-letter-detail/";

let myCanvas;
let debugFlag = false;

let assetsData;
let assetFilenames = [];
let scrollingTiles = []; 
let placedTiles = [];
let scrollPadding = 0;
let scrollUnit = DEFAULT_SCROLL_UNIT;

//load file names
function preload() {
    assetsData = loadJSON(ASSETS_INDEX_FILENAME, callback = initializeData);
}

//create tiles 
//update starting position 
function initializeData() {
    assetFilenames = Object.values(assetsData);
    for (let i = 0; i < assetFilenames.length; i++) {
        scrollingTiles.push(new ImgTile(random(INITIAL_WIDTH), INITIAL_HEIGHT, IMAGE_FOLDER + assetFilenames[i]));
        placedTiles.push(new ImgTile(random(INITIAL_WIDTH), random(INITIAL_HEIGHT), IMAGE_FOLDER + assetFilenames[i]));
    }
}

function draw() {
    background(255);
    for (let i = 0; i < scrollingTiles.length; i++) {
        scrollingTiles[i].display();
        scrollingTiles[i].scroll(scrollUnit);
      }
      
      for (let i = 0; i < placedTiles.length; i++) {
        placedTiles[i].display();
      }

    if (debugFlag) {
        drawCenterlines();
    }

}

//interactive controls
function keyTyped() {
    if (key === "d") {
        print("toggling debug");
        debugFlag = !debugFlag;
    }
    if (key === "s"){
        print("toggling scroll stop");
        if(scrollUnit == 0){
            scrollUnit = DEFAULT_SCROLL_UNIT;
        }
        else{
            scrollUnit = 0;
        }
    }
}

function drawCenterlines() {
    stroke(255, 0, 0);
    strokeWeight(1);
    line(0, height / 2, width, height / 2);
    line(width / 2, 0, width / 2, height);
}

function repositionTiles(){
    let startingHeight = INITIAL_HEIGHT;
    let totalLengthOfTiles = scrollPadding;
    scrollingTiles[0].setX(INITIAL_SCROLL_WIDTH/2 - scrollingTiles[0].getWidth()/2);
    scrollingTiles[0].setY(startingHeight + totalLengthOfTiles);

    for (let i = 1; i < scrollingTiles.length; i++) {
        totalLengthOfTiles = totalLengthOfTiles + scrollingTiles[i-1].getHeight() + scrollPadding;
        console.log("moving " + scrollingTiles[i].getFilePath() + " to " + (startingHeight + totalLengthOfTiles));
        scrollingTiles[i].setX(INITIAL_SCROLL_WIDTH/2 - scrollingTiles[i].getWidth()/2);
        scrollingTiles[i].setY(startingHeight + totalLengthOfTiles);
    }
}

function setup() {
    frameRate(INITIAL_FRAME_RATE)
    myCanvas = createCanvas(INITIAL_WIDTH, INITIAL_HEIGHT);
    myCanvas.parent("canvasContainer");
    myCanvas.style("border", "1pt");
    myCanvas.style("border-style", "solid");

    for (let i = 0; i < scrollingTiles.length; i++) {
        scrollingTiles[i].debug();
    }
    repositionTiles();
}


// function stampVerticalText(textString, textXOffset, textFontSize) {
//     let textTopToBottomLength = height / 2;
//     let textAreaWidth = textFontSize * 2.5;

//     textWrap(WORD);
//     textAlign(CENTER);
//     textSize(textFontSize);
//     stroke("black");
//     strokeWeight(0);

//     push();
//     let vertAngle = radians(270);
//     translate(textXOffset, height / 2);
//     rotate(vertAngle);
//     if (debugFlag) {
//         stroke(255, 0, 0);
//         strokeWeight(1);
//         line(-textTopToBottomLength / 2, 0, textTopToBottomLength / 2, 0);
//     }

//     text(textString, -textTopToBottomLength / 2, 0, textTopToBottomLength, textAreaWidth);
//     pop();
// }

// function stampHorizontalText(textString, textFontSize) {
//     let textLength = width / 2;
//     let textAreaHeight = textFontSize * 2.5;

//     textWrap(WORD);
//     textAlign(LEFT);
//     textSize(textFontSize);
//     stroke("black");
//     strokeWeight(0);

//     if (debugFlag) {
//         stroke(255, 0, 0);
//         strokeWeight(1);
//         line(mouseX, mouseY, mouseX + textLength, mouseY);
//     }

//     text(textString, mouseX, mouseY, mouseX + textLength, textAreaHeight);
// }


