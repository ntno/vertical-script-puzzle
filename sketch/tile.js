class ImgTile {
    constructor(xpos, ypos, imgPath, tileTranslation, imgTint) {
        this.x = xpos;
        this.y = ypos;
        this.filePath = imgPath;
        this.img = loadImage(imgPath, () => {
            this.img_width = this.img.width;
            this.img_height = this.img.height;
        });
        this.tileTranslation = tileTranslation;
        this.imgTint = imgTint;
        this.dragging = false; // is the tile being dragged?
        this.rollover = false; // is the mouse over the tile?
    }

    isMouseOver() {
        if (mouseX > this.x && mouseX < this.x + this.img_width && mouseY > this.y && mouseY < this.y + this.img_height) {
            this.rollover = true;
        } else {
            this.rollover = false;
        }
    }

    updateForDrag() {
        if (this.dragging) {
            this.x = mouseX + this.offsetX;
            this.y = mouseY + this.offsetY;
        }
    }

    isMousePressed() {
        if (mouseX > this.x && mouseX < this.x + this.img_width && mouseY > this.y && mouseY < this.y + this.img_height) {
            this.dragging = true;
            //keep track of relative location of click to corner of rectangle
            this.offsetX = this.x - mouseX;
            this.offsetY = this.y - mouseY;
        }
    }

    setDragComplete() {
        if(this.dragging){
            console.log("done drag action for '" + this.getTileTranslation() + "'");
        }
        this.dragging = false;
    }

    getWidth() {
        return this.img_width;
    }

    getHeight() {
        return this.img_height;
    }

    setPos(xpos, ypos) {
        this.setX(xpos);
        this.setY(ypos);
    }

    setX(xpos) {
        this.x = xpos
    }

    setY(ypos) {
        this.y = ypos;
    }

    scroll(offset) {
        this.y = this.y + offset;
    }

    display() {
        tint(this.imgTint);
        image(this.img, this.x, this.y);
        noTint();
    }

    getFilePath() {
        return this.filePath;
    }

    getTileTranslation(){
        return this.tileTranslation;
    }

    resizeTile(newWidth){
        this.img.resize(newWidth, 0);
        this.img_width = this.img.width;
        this.img_height = this.img.height;
    }
    
    debug() {
        console.log(this.getFilePath() + " is " + this.img_width + " by " + str(this.getHeight()));
    }
}