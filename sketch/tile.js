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


    display() {
        image(this.img, this.x, this.y);
    }

    debug(){
        console.log(this.filePath + " is " + this.img_width + " by " + this.img_height);
    }
  }