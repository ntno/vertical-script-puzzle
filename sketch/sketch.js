const INITIAL_WIDTH=200;
const INITIAL_HEIGHT=800;
const INITIAL_FRAME_RATE=30;
const DEFAULT_SCROLL_UNIT = -1;

const TEXT_FONT_SIZE = 13;
const COPYRIGHT_TEXT = "© ntno 2021, All rights reserved";
const ASSETS_INDEX_FILENAME = "meta/assets-apd.json";
const IMAGE_FOLDER = "assets/apothecary-notes-detail/";

let myCanvas;
let debugFlag = false;

let assetsData;
let assetFilenames = [];
let imgTiles = []; 
let imgPadding = 5;
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
        imgTiles.push(new ImgTile(INITIAL_HEIGHT, IMAGE_FOLDER + assetFilenames[i]));
    }
}



function draw() {
    background(255);
    for (let i = 0; i < imgTiles.length; i++) {
        imgTiles[i].display();
        imgTiles[i].scroll(scrollUnit);
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
        print("toggling scroll");
        if(scrollUnit == 0){
            scrollUnit = DEFAULT_SCROLL_UNIT;
        }
        else{
            scrollUnit = 0;
        }
    }
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



function drawCenterlines() {
    stroke(255, 0, 0);
    strokeWeight(1);
    line(0, height / 2, width, height / 2);
    line(width / 2, 0, width / 2, height);
}

function setup() {
    frameRate(INITIAL_FRAME_RATE)
    myCanvas = createCanvas(INITIAL_WIDTH, INITIAL_HEIGHT);
    myCanvas.parent("canvasContainer");
    myCanvas.style("border", "1pt");
    myCanvas.style("border-style", "solid");

    let startingHeight = INITIAL_HEIGHT;
    let totalLengthOfTiles = imgPadding;
    for (let i = 0; i < imgTiles.length; i++) {
        imgTiles[i].debug();
    }
    console.log(imgTiles.length + " tiles");
    for (let i = 1; i < imgTiles.length; i++) {
        totalLengthOfTiles = totalLengthOfTiles + imgTiles[i-1].getHeight() + imgPadding;
        console.log("moving " + imgTiles[i].getFilePath() + " to " + (startingHeight + totalLengthOfTiles));
        imgTiles[i].setHeight(startingHeight + totalLengthOfTiles);
      }

}