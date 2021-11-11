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
    
    scroll(offset){
        this.y = this.y + offset;
    }

    display() {
        image(this.img, this.x, this.y);
    }

    debug(){
        console.log(this.filePath + " is " + this.img_width + " by " + this.img_height);
    }
  }