class ImgTile {
    constructor(xpos, ypos, imgPath) {
        this.x = xpos;
        this.y = ypos;
        this.filePath = imgPath;
        this.img = loadImage(imgPath, () => {
            this.img_width = this.img.width;
            this.img_height = this.img.height;
            }   
        );
    }

    getWidth(){
        return this.img_width;
    }

    getHeight(){
        return this.img_height;
    }

    setPos(xpos, ypos){
        this.setX(xpos);
        this.setY(ypos);
    }
    
    setX(xpos){
        this.x = xpos
    }
    
    setY(ypos){
        this.y = ypos;
    }

    scroll(offset){
        this.y = this.y + offset;
    }

    display() {
        image(this.img, this.x, this.y);
    }

    getFilePath(){
        return this.filePath;
    }
    
    debug(){
        console.log(this.getFilePath() + " is " + this.img_width + " by " + str(this.getHeight()));
    }
  }