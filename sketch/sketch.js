const INITIAL_WIDTH=1300;
const INITIAL_HEIGHT=800;
const INITIAL_SCROLL_WIDTH=90;
const INITIAL_FRAME_RATE=45;
const DEFAULT_SCROLL_UNIT = -2;

const COPYRIGHT_TEXT = "© ntno 2021, All rights reserved";
const APOTHECARY_INDEX_FILENAME = "meta/assets-apd.json";
const APOTHECARY_IMAGE_FOLDER = "assets/apothecary-notes-detail/";
const MANOR_INDEX_FILENAME = "meta/assets-mld.json";
const MANOR_IMAGE_FOLDER = "assets/manor-letter-detail/";

let myCanvas;
let debugFlag = false;

let apothecaryAssetDetails;
let apothecaryImageFilenames = [];
let apothecaryScrollingTiles = []; 
let apothecaryPlacedTiles = [];

let scrollPadding = 0;
let scrollUnit = DEFAULT_SCROLL_UNIT;

//load file names
function preload() {
    apothecaryAssetDetails = loadJSON(APOTHECARY_INDEX_FILENAME, callback = initializeData);
}

//create tiles 
//update starting position 
function initializeData() {
    apothecaryImageFilenames = Object.keys(apothecaryAssetDetails);
    let apothecaryScrollTint = color(200, 255);
    let apothecaryPlacedTint = color(255, 204, 0, 150);
    for (let i = 0; i < apothecaryImageFilenames.length; i++) {
        apothecaryScrollingTiles.push(new ImgTile(random(INITIAL_WIDTH), INITIAL_HEIGHT, APOTHECARY_IMAGE_FOLDER + apothecaryImageFilenames[i], apothecaryAssetDetails[apothecaryImageFilenames[i]], apothecaryScrollTint));
        apothecaryPlacedTiles.push(new ImgTile(random(INITIAL_WIDTH-50), random(INITIAL_HEIGHT-50), APOTHECARY_IMAGE_FOLDER + apothecaryImageFilenames[i], apothecaryAssetDetails[apothecaryImageFilenames[i]], apothecaryPlacedTint));
    }
}

function draw() {
    background(255);
    for (let i = 0; i < apothecaryScrollingTiles.length; i++) {
        apothecaryScrollingTiles[i].display();
        apothecaryScrollingTiles[i].scroll(scrollUnit);
      }
      
      for (let i = 0; i < apothecaryPlacedTiles.length; i++) {
        apothecaryPlacedTiles[i].updateForDrag();
        apothecaryPlacedTiles[i].display();
      }

    if (debugFlag) {
        drawCenterlines();
    }
  }
  
  function mousePressed() {
    for (let i = 0; i < apothecaryPlacedTiles.length; i++) {
        apothecaryPlacedTiles[i].isMousePressed();
      }
  }
  
  function mouseReleased() {
    for (let i = 0; i < apothecaryPlacedTiles.length; i++) {
        apothecaryPlacedTiles[i].setDragComplete();
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
    apothecaryScrollingTiles[0].setX(INITIAL_SCROLL_WIDTH/2 - apothecaryScrollingTiles[0].getWidth()/2);
    apothecaryScrollingTiles[0].setY(startingHeight + totalLengthOfTiles);

    for (let i = 1; i < apothecaryScrollingTiles.length; i++) {
        totalLengthOfTiles = totalLengthOfTiles + apothecaryScrollingTiles[i-1].getHeight() + scrollPadding;
        console.log("moving " + apothecaryScrollingTiles[i].getFilePath() + " to " + (startingHeight + totalLengthOfTiles));
        apothecaryScrollingTiles[i].setX(INITIAL_SCROLL_WIDTH/2 - apothecaryScrollingTiles[i].getWidth()/2);
        apothecaryScrollingTiles[i].setY(startingHeight + totalLengthOfTiles);
    }
}

function setup() {
    colorMode(RGB, 100);
    frameRate(INITIAL_FRAME_RATE)
    myCanvas = createCanvas(INITIAL_WIDTH, INITIAL_HEIGHT);
    myCanvas.parent("canvasContainer");
    myCanvas.style("border", "1pt");
    myCanvas.style("border-style", "solid");

    for (let i = 0; i < apothecaryScrollingTiles.length; i++) {
        apothecaryScrollingTiles[i].debug();
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


