class ImgTile {
    constructor(ypos, imgPath) {
        this.y = ypos;
        this.filePath = imgPath;
        this.img = loadImage(imgPath, () => {
            this.img_width = this.img.width;
            this.img_height = this.img.height;
            this.x = INITIAL_WIDTH/2-this.img.width/2;
            }   
        );
    }

    getHeight(){
        return this.img_height;
    }

    setHeight(ypos){
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