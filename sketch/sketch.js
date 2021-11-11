const INITIAL_WIDTH=200;
const INITIAL_HEIGHT=800;
const TEXT_FONT_SIZE = 13;
//60 - for gage selector reference images
const COPYRIGHT_TEXT = "© ntno 2021, All rights reserved";
const COPYRIGHT_TEXT_WITH_LINE_BREAK = "© ntno 2021,\nAll rights reserved";
const ASSETS_INDEX_FILENAME = "meta/assets-apd.json";
const IMAGE_FOLDER = "assets/apothecary-notes-detail/";

let myCanvas;
let debugFlag = false;
let verticalFlag = false;
let wrapFlag = false;

let assetsData;
let assetFilenames = [];
let currentImageName;
let currentImage;
let currentImageIndex = 0;
let stampText = "";

let imgTiles = []; 

function preload() {
    assetsData = loadJSON(ASSETS_INDEX_FILENAME, callback = initializeData);
}

function initializeData() {
    assetFilenames = Object.values(assetsData);
    for (let i = 0; i < assetFilenames.length; i++) {
        imgTiles.push(new ImgTile(random(INITIAL_WIDTH), random(INITIAL_HEIGHT), IMAGE_FOLDER + assetFilenames[i]));
      }
}



function draw() {
    background(255);

for (let i = 0; i < imgTiles.length; i++) {
        imgTiles[i].display();
        imgTiles[i].debug();

      }
    if (debugFlag) {
        drawCenterlines();
    }

}

function keyTyped() {
    if (key === "d") {
        print("toggling debug");
        debugFlag = !debugFlag;
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
    myCanvas = createCanvas(INITIAL_WIDTH, INITIAL_HEIGHT);
    myCanvas.parent("canvasContainer");
    myCanvas.style("border", "1pt");
    myCanvas.style("border-style", "solid");
}