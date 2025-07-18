
// DOM Elements

const uploadBox = document.getElementById("upload-box");
const skinInput = document.getElementById("skin-input");
const ogSkin = document.getElementById("og-skin");
const config = document.getElementById("config");

const invalidWarning = document.getElementById("invalid-warning");
let skinType;



const ogSkinFace = document.getElementById("og-skin-face");
const ogSkinFaceCtx = ogSkinFace.getContext("2d");
ogSkinFaceCtx.imageSmoothingEnabled = false;
ogSkinFaceCtx.webkitImageSmoothingEnabled = false; // For older WebKit browsers
ogSkinFaceCtx.mozImageSmoothingEnabled = false;



const chooseEyes = document.getElementById("choose-eyes");
const chooseEyebrows = document.getElementById("choose-eyebrows");
const eyePreview = document.getElementById("eye-preview");
const eyebrowPreview = document.getElementById("eyebrow-preview");

const eyeBack = document.getElementById("eye-back");
const eyeFor = document.getElementById("eye-for");
const eyebrowBack = document.getElementById("eyebrow-back");
const eyebrowFor = document.getElementById("eyebrow-for");

eyeBack.content = "<";
eyeFor.content = ">";
eyebrowBack.content = "<";
eyebrowFor.content = ">";

const eyeInfo = document.getElementById("eye-info");
const eyebrowInfo = document.getElementById("eyebrow-info");
const eyeInfoContent = [
  "1×1/1×2 Near Upper",
  "1×1/1×2 Near Lower",
  "1×1/1×2 Far Upper",
  "1×1/1×2 Far Lower",
  "1×2/1×3 Upper",
  "1×2/1×3 Center",
  "1×2/1×3 Middle",
  "2×1/2×2 Upper",
  "2×1/2×2 Upper-Middle",
  "2×1/2×2 Middle",
  "2×1/2×2 Lower-Middle",
  "2×1/2×2 Lower",
  "2×2/2×3 Upper",
  "2×2/2×3 Middle",
  "2×2/2×3 Lower",
  "3×1/3×2 Upper",
  "3×1/3×2 Lower",
  "3×1/3×2 Upper Centered Eyes",
  "3×1/3×2 Lower Centered Eyes",
  "3×2/3×3 Upper",
  "3×2/3×3 Middle",
  "3×2/3×3 Lower"];
eyebrowInfoContent = [
  "Moonbrow Upper",
  "Moonbrow Upper-Middle",
  "Moonbrow Middle",
  "Moonbrow Lower-Middle",
  "Moonbrow Lower",
  "3×1 Upper",
  "3×1 Upper-Middle",
  "3×1 Middle",
  "3×1 Lower-Middle",
  "3×1 Lower",
  "2×1 Upper",
  "2×1 Upper-Middle",
  "2×1 Middle",
  "2×1 Lower-Middle",
  "2×1 Lower"];
    
const downloadBtn = document.getElementById("download-btn");
const downloadLink = document.getElementById("download-link");
  
  
  
const cleanup = document.getElementById("cleanup");
const surprised = document.getElementById("surprised");
const skinColor = document.getElementById("skin-color");
  
  
  
const newSkin = document.getElementById("new-skin");
const newSkinCtx = newSkin.getContext("2d");
let imgData;
newSkinCtx.imageSmoothingEnabled = false;
newSkinCtx.webkitImageSmoothingEnabled = false; // For older WebKit browsers
newSkinCtx.mozImageSmoothingEnabled = false;







// Functions

const shaded = (color) => {
  const replacer = {
    "f":"b",
    "e":"a",
    "d":"9",
    "c":"8",
    "b":"7",
    "a":"6",
    "9":"5",
    "8":"4",
    "7":"3",
    "6":"2",
    "5":"1",
    "4":"0",
    "3":"0",
    "2":"0",
    "1":"0",
    "0":"0",
  };
  let shadedColor = "#";
  let x = replacer[color[1]];
  let y = replacer[color[3]];

  shadedColor = shadedColor + x + color[2] + y + color[4] + color[5] + color [6];
  return shadedColor;
};

const newSkinPreview = () => {
  newSkinCtx.clearRect(0,0,256,256);
  if (skinType==="LD") {
    
    newSkin.width = 64;
    newSkin.height = 64;
    newSkinCtx.drawImage(ogSkin , 0 , 0 , 64 , 64 , 0 , 0 , 64 , 64);
    
    imgData = newSkinCtx.getImageData(8,8,8,8);
    newSkinCtx.putImageData(imgData,0,0);
    newSkinCtx.putImageData(imgData,24,0);
    
    if (chooseEyes.value==="1") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(2,4,1,1);
      newSkinCtx.fillRect(5,4,1,1);
      
      imgData = newSkinCtx.getImageData(10,12,1,1);
      newSkinCtx.putImageData(imgData,42,16);
      imgData = newSkinCtx.getImageData(13,12,1,1);
      newSkinCtx.putImageData(imgData,43,16);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(42,12,1,1);
        newSkinCtx.clearRect(45,12,1,1);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(42,11,1,1);
          newSkinCtx.clearRect(45,11,1,1);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(26,4,1,1);
      newSkinCtx.fillRect(29,4,1,1);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(26,3,1,1);
        newSkinCtx.fillRect(29,3,1,1);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(2,3,1,1);
        newSkinCtx.fillRect(5,3,1,1);
      };
    } else if (chooseEyes.value==="2") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(2,5,1,1);
      newSkinCtx.fillRect(5,5,1,1);
      
      imgData = newSkinCtx.getImageData(10,13,1,1);
      newSkinCtx.putImageData(imgData,42,17);
      imgData = newSkinCtx.getImageData(13,13,1,1);
      newSkinCtx.putImageData(imgData,43,17);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(42,13,1,1);
        newSkinCtx.clearRect(45,13,1,1);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(42,12,1,1);
          newSkinCtx.clearRect(45,12,1,1);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(26,5,1,1);
      newSkinCtx.fillRect(29,5,1,1);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(26,4,1,1);
        newSkinCtx.fillRect(29,4,1,1);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(2,4,1,1);
        newSkinCtx.fillRect(5,4,1,1);
      };
    } else if (chooseEyes.value==="3") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(1,4,1,1);
      newSkinCtx.fillRect(6,4,1,1);
      
      imgData = newSkinCtx.getImageData(9,12,1,1);
      newSkinCtx.putImageData(imgData,42,18);
      imgData = newSkinCtx.getImageData(14,12,1,1);
      newSkinCtx.putImageData(imgData,43,18);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(41,12,1,1);
        newSkinCtx.clearRect(46,12,1,1);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(41,11,1,1);
          newSkinCtx.clearRect(46,11,1,1);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(25,4,1,1);
      newSkinCtx.fillRect(30,4,1,1);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(25,3,1,1);
        newSkinCtx.fillRect(30,3,1,1);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(1,3,1,1);
        newSkinCtx.fillRect(6,3,1,1);
      };
    } else if (chooseEyes.value==="4") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(1,5,1,1);
      newSkinCtx.fillRect(6,5,1,1);
      
      imgData = newSkinCtx.getImageData(9,13,1,1);
      newSkinCtx.putImageData(imgData,42,19);
      imgData = newSkinCtx.getImageData(14,13,1,1);
      newSkinCtx.putImageData(imgData,43,19);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(41,13,1,1);
        newSkinCtx.clearRect(46,13,1,1);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(41,12,1,1);
          newSkinCtx.clearRect(46,12,1,1);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(25,5,1,1);
      newSkinCtx.fillRect(30,5,1,1);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(25,4,1,1);
        newSkinCtx.fillRect(30,4,1,1);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(1,4,1,1);
        newSkinCtx.fillRect(6,4,1,1);
      };
    } else if (chooseEyes.value==="5") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(1,3,1,2);
      newSkinCtx.fillRect(6,3,1,2);
      
      imgData = newSkinCtx.getImageData(9,11,1,2);
      newSkinCtx.putImageData(imgData,2,18);
      imgData = newSkinCtx.getImageData(14,11,1,2);
      newSkinCtx.putImageData(imgData,3,18);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(41,11,1,2);
        newSkinCtx.clearRect(46,11,1,2);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(41,10,1,1);
          newSkinCtx.clearRect(46,10,1,1);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(25,3,1,2);
      newSkinCtx.fillRect(30,3,1,2);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(25,2,1,1);
        newSkinCtx.fillRect(30,2,1,1);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(1,2,1,1);
        newSkinCtx.fillRect(6,2,1,1);
      };
    } else if (chooseEyes.value==="6") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(1,4,1,2);
      newSkinCtx.fillRect(6,4,1,2);
      
      imgData = newSkinCtx.getImageData(9,12,1,2);
      newSkinCtx.putImageData(imgData,52,16);
      imgData = newSkinCtx.getImageData(14,12,1,2);
      newSkinCtx.putImageData(imgData,53,16);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(41,12,1,2);
        newSkinCtx.clearRect(46,12,1,2);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(41,11,1,1);
          newSkinCtx.clearRect(46,11,1,1);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(25,4,1,2);
      newSkinCtx.fillRect(30,4,1,2);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(25,3,1,1);
        newSkinCtx.fillRect(30,3,1,1);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(1,3,1,1);
        newSkinCtx.fillRect(6,3,1,1);
      };
    } else if (chooseEyes.value==="7") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(1,5,1,2);
      newSkinCtx.fillRect(6,5,1,2);
      
      imgData = newSkinCtx.getImageData(9,13,1,2);
      newSkinCtx.putImageData(imgData,54,16);
      imgData = newSkinCtx.getImageData(14,13,1,2);
      newSkinCtx.putImageData(imgData,55,16);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(41,13,1,2);
        newSkinCtx.clearRect(46,13,1,2);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(41,12,1,1);
          newSkinCtx.clearRect(46,12,1,1);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(25,5,1,2);
      newSkinCtx.fillRect(30,5,1,2);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(25,4,1,1);
        newSkinCtx.fillRect(30,4,1,1);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(1,4,1,1);
        newSkinCtx.fillRect(6,4,1,1);
      };
    } else if (chooseEyes.value==="8") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(1,2,2,1);
      newSkinCtx.fillRect(5,2,2,1);
      
      imgData = newSkinCtx.getImageData(10,10,1,1);
      newSkinCtx.putImageData(imgData,18,32);
      imgData = newSkinCtx.getImageData(13,10,1,1);
      newSkinCtx.putImageData(imgData,19,32);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(41,10,2,1);
        newSkinCtx.clearRect(45,10,2,1);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(41,9,2,1);
          newSkinCtx.clearRect(45,9,2,1);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(25,2,2,1);
      newSkinCtx.fillRect(29,2,2,1);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(25,1,2,1);
        newSkinCtx.fillRect(29,1,2,1);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(1,1,2,1);
        newSkinCtx.fillRect(5,1,2,1);
      };
    } else if (chooseEyes.value==="9") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(1,3,2,1);
      newSkinCtx.fillRect(5,3,2,1);
      
      imgData = newSkinCtx.getImageData(10,11,1,1);
      newSkinCtx.putImageData(imgData,18,33);
      imgData = newSkinCtx.getImageData(13,11,1,1);
      newSkinCtx.putImageData(imgData,19,33);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(41,11,2,1);
        newSkinCtx.clearRect(45,11,2,1);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(41,10,2,1);
          newSkinCtx.clearRect(45,10,2,1);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(25,3,2,1);
      newSkinCtx.fillRect(29,3,2,1);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(25,2,2,1);
        newSkinCtx.fillRect(29,2,2,1);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(1,2,2,1);
        newSkinCtx.fillRect(5,2,2,1);
      };
    } else if (chooseEyes.value==="10") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(1,4,2,1);
      newSkinCtx.fillRect(5,4,2,1);
      
      imgData = newSkinCtx.getImageData(10,12,1,1);
      newSkinCtx.putImageData(imgData,16,35);
      imgData = newSkinCtx.getImageData(13,12,1,1);
      newSkinCtx.putImageData(imgData,17,35);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(41,12,2,1);
        newSkinCtx.clearRect(45,12,2,1);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(41,11,2,1);
          newSkinCtx.clearRect(45,11,2,1);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(25,4,2,1);
      newSkinCtx.fillRect(29,4,2,1);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(25,3,2,1);
        newSkinCtx.fillRect(29,3,2,1);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(1,3,2,1);
        newSkinCtx.fillRect(5,3,2,1);
      };
    } else if (chooseEyes.value==="11") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(1,5,2,1);
      newSkinCtx.fillRect(5,5,2,1);
      
      imgData = newSkinCtx.getImageData(10,13,1,1);
      newSkinCtx.putImageData(imgData,18,35);
      imgData = newSkinCtx.getImageData(13,13,1,1);
      newSkinCtx.putImageData(imgData,19,35);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(41,13,2,1);
        newSkinCtx.clearRect(45,13,2,1);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(41,12,2,1);
          newSkinCtx.clearRect(45,12,2,1);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(25,5,2,1);
      newSkinCtx.fillRect(29,5,2,1);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(25,4,2,1);
        newSkinCtx.fillRect(29,4,2,1);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(1,4,2,1);
        newSkinCtx.fillRect(5,4,2,1);
      };
    } else if (chooseEyes.value==="12") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(1,6,2,1);
      newSkinCtx.fillRect(5,6,2,1);
      
      imgData = newSkinCtx.getImageData(10,14,1,1);
      newSkinCtx.putImageData(imgData,40,32);
      imgData = newSkinCtx.getImageData(13,14,1,1);
      newSkinCtx.putImageData(imgData,41,32);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(41,14,2,1);
        newSkinCtx.clearRect(45,14,2,1);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(41,13,2,1);
          newSkinCtx.clearRect(45,13,2,1);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(25,6,2,1);
      newSkinCtx.fillRect(29,6,2,1);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(25,5,2,1);
        newSkinCtx.fillRect(29,5,2,1);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(1,5,2,1);
        newSkinCtx.fillRect(5,5,2,1);
      };
    } else if (chooseEyes.value==="13") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(1,3,2,2);
      newSkinCtx.fillRect(5,3,2,2);
      
      imgData = newSkinCtx.getImageData(10,11,1,2);
      newSkinCtx.putImageData(imgData,0,16);
      imgData = newSkinCtx.getImageData(13,11,1,2);
      newSkinCtx.putImageData(imgData,1,16);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(41,11,2,2);
        newSkinCtx.clearRect(45,11,2,2);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(41,10,2,1);
          newSkinCtx.clearRect(45,10,2,1);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(25,3,2,2);
      newSkinCtx.fillRect(29,3,2,2);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(25,2,2,1);
        newSkinCtx.fillRect(29,2,2,1);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(1,2,2,1);
        newSkinCtx.fillRect(5,2,2,1);
      };
    } else if (chooseEyes.value==="14") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(1,4,2,2);
      newSkinCtx.fillRect(5,4,2,2);
      
      imgData = newSkinCtx.getImageData(10,12,1,2);
      newSkinCtx.putImageData(imgData,0,18);
      imgData = newSkinCtx.getImageData(13,12,1,2);
      newSkinCtx.putImageData(imgData,1,18);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(41,12,2,2);
        newSkinCtx.clearRect(45,12,2,2);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(41,11,2,1);
          newSkinCtx.clearRect(45,11,2,1);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(25,4,2,2);
      newSkinCtx.fillRect(29,4,2,2);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(25,3,2,1);
        newSkinCtx.fillRect(29,3,2,1);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(1,3,2,1);
        newSkinCtx.fillRect(5,3,2,1);
      };
    } else if (chooseEyes.value==="15") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(1,5,2,2);
      newSkinCtx.fillRect(5,5,2,2);
      
      imgData = newSkinCtx.getImageData(10,13,1,2);
      newSkinCtx.putImageData(imgData,2,16);
      imgData = newSkinCtx.getImageData(13,13,1,2);
      newSkinCtx.putImageData(imgData,3,16);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(41,13,2,2);
        newSkinCtx.clearRect(45,13,2,2);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(41,12,2,1);
          newSkinCtx.clearRect(45,12,2,1);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(25,5,2,2);
      newSkinCtx.fillRect(29,5,2,2);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(25,4,2,1);
        newSkinCtx.fillRect(29,4,2,1);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(1,4,2,1);
        newSkinCtx.fillRect(5,4,2,1);
      };
    } else if (chooseEyes.value==="16") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(0,4,3,1);
      newSkinCtx.fillRect(5,4,3,1);
      
      imgData = newSkinCtx.getImageData(10,12,1,1);
      newSkinCtx.putImageData(imgData,18,16);
      imgData = newSkinCtx.getImageData(13,12,1,1);
      newSkinCtx.putImageData(imgData,19,16);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(40,12,3,1);
        newSkinCtx.clearRect(45,12,3,1);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(40,11,3,1);
          newSkinCtx.clearRect(45,11,3,1);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(24,4,3,1);
      newSkinCtx.fillRect(29,4,3,1);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(24,3,3,1);
        newSkinCtx.fillRect(29,3,3,1);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(0,3,3,1);
        newSkinCtx.fillRect(5,3,3,1);
      };
    } else if (chooseEyes.value==="17") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(0,5,3,1);
      newSkinCtx.fillRect(5,5,3,1);
      
      imgData = newSkinCtx.getImageData(10,13,1,1);
      newSkinCtx.putImageData(imgData,18,17);
      imgData = newSkinCtx.getImageData(13,13,1,1);
      newSkinCtx.putImageData(imgData,19,17);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(40,13,3,1);
        newSkinCtx.clearRect(45,13,3,1);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(40,12,3,1);
          newSkinCtx.clearRect(45,12,3,1);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(24,5,3,1);
      newSkinCtx.fillRect(29,5,3,1);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(24,4,3,1);
        newSkinCtx.fillRect(29,4,3,1);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(0,4,3,1);
        newSkinCtx.fillRect(5,4,3,1);
      };
    } else if (chooseEyes.value==="18") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(0,4,3,1);
      newSkinCtx.fillRect(5,4,3,1);
      
      imgData = newSkinCtx.getImageData(9,12,1,1);
      newSkinCtx.putImageData(imgData,18,18);
      imgData = newSkinCtx.getImageData(14,12,1,1);
      newSkinCtx.putImageData(imgData,19,18);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(40,12,3,1);
        newSkinCtx.clearRect(45,12,3,1);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(40,11,3,1);
          newSkinCtx.clearRect(45,11,3,1);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(24,4,3,1);
      newSkinCtx.fillRect(29,4,3,1);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(24,3,3,1);
        newSkinCtx.fillRect(29,3,3,1);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(0,3,3,1);
        newSkinCtx.fillRect(5,3,3,1);
      };
    } else if (chooseEyes.value==="19") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(0,5,3,1);
      newSkinCtx.fillRect(5,5,3,1);
      
      imgData = newSkinCtx.getImageData(9,13,1,1);
      newSkinCtx.putImageData(imgData,18,19);
      imgData = newSkinCtx.getImageData(14,13,1,1);
      newSkinCtx.putImageData(imgData,19,19);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(40,13,3,1);
        newSkinCtx.clearRect(45,13,3,1);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(40,12,3,1);
          newSkinCtx.clearRect(45,12,3,1);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(24,5,3,1);
      newSkinCtx.fillRect(29,5,3,1);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(24,4,3,1);
        newSkinCtx.fillRect(29,4,3,1);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(0,4,3,1);
        newSkinCtx.fillRect(5,4,3,1);
      };
    } else if (chooseEyes.value==="20") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(0,3,3,2);
      newSkinCtx.fillRect(5,3,3,2);
      
      imgData = newSkinCtx.getImageData(9,11,2,2);
      newSkinCtx.putImageData(imgData,0,32);
      imgData = newSkinCtx.getImageData(13,11,2,2);
      newSkinCtx.putImageData(imgData,2,32);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(40,11,3,2);
        newSkinCtx.clearRect(45,11,3,2);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(40,10,3,1);
          newSkinCtx.clearRect(45,10,3,1);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(24,3,3,2);
      newSkinCtx.fillRect(29,3,3,2);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(24,2,3,1);
        newSkinCtx.fillRect(29,2,3,1);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(0,2,3,1);
        newSkinCtx.fillRect(5,2,3,1);
      };
    } else if (chooseEyes.value==="21") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(0,4,3,2);
      newSkinCtx.fillRect(5,4,3,2);
      
      imgData = newSkinCtx.getImageData(9,12,2,2);
      newSkinCtx.putImageData(imgData,0,34);
      imgData = newSkinCtx.getImageData(13,12,2,2);
      newSkinCtx.putImageData(imgData,2,34);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(40,12,3,2);
        newSkinCtx.clearRect(45,12,3,2);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(40,11,3,1);
          newSkinCtx.clearRect(45,11,3,1);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(24,4,3,2);
      newSkinCtx.fillRect(29,4,3,2);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(24,3,3,1);
        newSkinCtx.fillRect(29,3,3,1);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(0,3,3,1);
        newSkinCtx.fillRect(5,3,3,1);
      };
    } else if (chooseEyes.value==="22") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(0,5,3,2);
      newSkinCtx.fillRect(5,5,3,2);
      
      imgData = newSkinCtx.getImageData(9,13,2,2);
      newSkinCtx.putImageData(imgData,36,32);
      imgData = newSkinCtx.getImageData(13,13,2,2);
      newSkinCtx.putImageData(imgData,38,32);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(40,13,3,2);
        newSkinCtx.clearRect(45,13,3,2);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(40,12,3,1);
          newSkinCtx.clearRect(45,12,3,1);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(24,5,3,2);
      newSkinCtx.fillRect(29,5,3,2);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(24,4,3,1);
        newSkinCtx.fillRect(29,4,3,1);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(0,4,3,1);
        newSkinCtx.fillRect(5,4,3,1);
      };
    };
    
    
    if (chooseEyebrows.value==="1") {
      imgData = newSkinCtx.getImageData(9,9,6,1);
      newSkinCtx.putImageData(imgData,12,16);
      newSkinCtx.putImageData(imgData,1,1);
      // imgData = newSkinCtx.getImageData(,,,);
      // newSkinCtx.putImageData(imgData,,);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(41,9,6,1);
        // newSkinCtx.clearRect(,,,);
      };
    } else if (chooseEyebrows.value==="2") {
      imgData = newSkinCtx.getImageData(9,10,6,1);
      newSkinCtx.putImageData(imgData,12,17)
      newSkinCtx.putImageData(imgData,1,2);
      // imgData = newSkinCtx.getImageData(,,,);
      // newSkinCtx.putImageData(imgData,,);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(41,10,6,1);
        // newSkinCtx.clearRect(,,,);
      };
    } else if (chooseEyebrows.value==="3") {
      imgData = newSkinCtx.getImageData(9,11,6,1);
      newSkinCtx.putImageData(imgData,12,18);
      newSkinCtx.putImageData(imgData,1,3);
      // imgData = newSkinCtx.getImageData(,,,);
      // newSkinCtx.putImageData(imgData,,);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(41,11,6,1);
        // newSkinCtx.clearRect(,,,);
      };
    } else if (chooseEyebrows.value==="4") {
      imgData = newSkinCtx.getImageData(9,12,6,1);
      newSkinCtx.putImageData(imgData,12,19);
      newSkinCtx.putImageData(imgData,1,4);
      // imgData = newSkinCtx.getImageData(,,,);
      // newSkinCtx.putImageData(imgData,,);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(41,12,6,1);
        // newSkinCtx.clearRect(,,,);
      };
    } else if (chooseEyebrows.value==="5") {
      imgData = newSkinCtx.getImageData(9,13,6,1);
      newSkinCtx.putImageData(imgData,36,16);
      newSkinCtx.putImageData(imgData,1,5);
      // imgData = newSkinCtx.getImageData(,,,);
      // newSkinCtx.putImageData(imgData,,);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(41,13,6,1);
        // newSkinCtx.clearRect(,,,);
      };
    } else if (chooseEyebrows.value==="6") {
      imgData = newSkinCtx.getImageData(8,9,3,1);
      newSkinCtx.putImageData(imgData,36,17);
      newSkinCtx.putImageData(imgData,0,1);
      imgData = newSkinCtx.getImageData(13,9,3,1);
      newSkinCtx.putImageData(imgData,39,17);
      newSkinCtx.putImageData(imgData,5,1);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(40,9,3,1);
        newSkinCtx.clearRect(45,9,3,1);
      };
    } else if (chooseEyebrows.value==="7") {
      imgData = newSkinCtx.getImageData(8,10,3,1);
      newSkinCtx.putImageData(imgData,36,18);
      newSkinCtx.putImageData(imgData,0,2);
      imgData = newSkinCtx.getImageData(13,10,3,1);
      newSkinCtx.putImageData(imgData,39,18);
      newSkinCtx.putImageData(imgData,5,2);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(40,10,3,1);
        newSkinCtx.clearRect(45,10,3,1);
      };
    } else if (chooseEyebrows.value==="8") {
      imgData = newSkinCtx.getImageData(8,11,3,1);
      newSkinCtx.putImageData(imgData,36,19);
      newSkinCtx.putImageData(imgData,0,3);
      imgData = newSkinCtx.getImageData(13,11,3,1);
      newSkinCtx.putImageData(imgData,39,19);
      newSkinCtx.putImageData(imgData,5,3);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(40,11,3,1);
        newSkinCtx.clearRect(45,11,3,1);
      };
    } else if (chooseEyebrows.value==="9") {
      imgData = newSkinCtx.getImageData(8,12,3,1);
      newSkinCtx.putImageData(imgData,12,32);
      newSkinCtx.putImageData(imgData,0,4);
      imgData = newSkinCtx.getImageData(13,12,3,1);
      newSkinCtx.putImageData(imgData,15,32);
      newSkinCtx.putImageData(imgData,5,4);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(40,12,3,1);
        newSkinCtx.clearRect(45,12,3,1);
      };
    } else if (chooseEyebrows.value==="10") {
      imgData = newSkinCtx.getImageData(8,13,3,1);
      newSkinCtx.putImageData(imgData,12,33);
      newSkinCtx.putImageData(imgData,0,5);
      imgData = newSkinCtx.getImageData(13,13,3,1);
      newSkinCtx.putImageData(imgData,15,33);
      newSkinCtx.putImageData(imgData,5,5);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(40,13,3,1);
        newSkinCtx.clearRect(45,13,3,1);
      };
    } else if (chooseEyebrows.value==="11") {
      imgData = newSkinCtx.getImageData(9,9,2,1);
      newSkinCtx.putImageData(imgData,52,18);
      newSkinCtx.putImageData(imgData,1,1);
      imgData = newSkinCtx.getImageData(13,9,2,1);
      newSkinCtx.putImageData(imgData,54,18);
      newSkinCtx.putImageData(imgData,5,1);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(41,9,2,1);
        newSkinCtx.clearRect(45,9,2,1);
      };
    } else if (chooseEyebrows.value==="12") {
      imgData = newSkinCtx.getImageData(9,10,2,1);
      newSkinCtx.putImageData(imgData,52,19);
      newSkinCtx.putImageData(imgData,1,2);
      imgData = newSkinCtx.getImageData(13,10,2,1);
      newSkinCtx.putImageData(imgData,54,19);
      newSkinCtx.putImageData(imgData,5,2);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(41,10,2,1);
        newSkinCtx.clearRect(45,10,2,1);
      };
    } else if (chooseEyebrows.value==="13") {
      imgData = newSkinCtx.getImageData(9,11,2,1);
      newSkinCtx.putImageData(imgData,12,34);
      newSkinCtx.putImageData(imgData,1,3);
      imgData = newSkinCtx.getImageData(13,11,2,1);
      newSkinCtx.putImageData(imgData,14,34);
      newSkinCtx.putImageData(imgData,5,3);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(41,11,2,1);
        newSkinCtx.clearRect(45,11,2,1);
      };
    } else if (chooseEyebrows.value==="14") {
      imgData = newSkinCtx.getImageData(9,12,2,1);
      newSkinCtx.putImageData(imgData,12,35);
      newSkinCtx.putImageData(imgData,1,4);
      imgData = newSkinCtx.getImageData(13,12,2,1);
      newSkinCtx.putImageData(imgData,14,35);
      newSkinCtx.putImageData(imgData,5,4);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(41,12,2,1);
        newSkinCtx.clearRect(45,12,2,1);
      };
    } else if (chooseEyebrows.value==="15") {
      imgData = newSkinCtx.getImageData(9,13,2,1);
      newSkinCtx.putImageData(imgData,16,34);
      newSkinCtx.putImageData(imgData,1,5);
      imgData = newSkinCtx.getImageData(13,13,2,1);
      newSkinCtx.putImageData(imgData,18,34);
      newSkinCtx.putImageData(imgData,5,5);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(41,13,2,1);
        newSkinCtx.clearRect(45,13,2,1);
      };
    };
    
  } else if (skinType==="HD") {
    
    newSkin.width = 128;
    newSkin.height = 128;
    newSkinCtx.drawImage(ogSkin , 0 , 0 , 128 , 128 , 0 , 0 , 128 , 128);
    
    imgData = newSkinCtx.getImageData(16,16,16,16);
    newSkinCtx.putImageData(imgData,0,0);
    newSkinCtx.putImageData(imgData,48,0);
    
    if (chooseEyes.value==="1") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(4,8,2,2);
      newSkinCtx.fillRect(10,8,2,2);
      
      imgData = newSkinCtx.getImageData(20,24,2,2);
      newSkinCtx.putImageData(imgData,84,32);
      imgData = newSkinCtx.getImageData(26,24,2,2);
      newSkinCtx.putImageData(imgData,86,32);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(84,24,2,2);
        newSkinCtx.clearRect(90,24,2,2);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(84,22,2,2);
          newSkinCtx.clearRect(90,22,2,2);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(52,8,2,2);
      newSkinCtx.fillRect(58,8,2,2);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(52,6,2,2);
        newSkinCtx.fillRect(58,6,2,2);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(4,6,2,2);
        newSkinCtx.fillRect(10,6,2,2);
      };
    } else if (chooseEyes.value==="2") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(4,10,2,2);
      newSkinCtx.fillRect(10,10,2,2);
      
      imgData = newSkinCtx.getImageData(20,26,2,2);
      newSkinCtx.putImageData(imgData,84,34);
      imgData = newSkinCtx.getImageData(26,26,2,2);
      newSkinCtx.putImageData(imgData,86,34);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(84,26,2,2);
        newSkinCtx.clearRect(90,26,2,2);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(84,24,2,2);
          newSkinCtx.clearRect(90,24,2,2);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(52,10,2,2);
      newSkinCtx.fillRect(58,10,2,2);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(52,8,2,2);
        newSkinCtx.fillRect(58,8,2,2);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(4,8,2,2);
        newSkinCtx.fillRect(10,8,2,2);
      };
    } else if (chooseEyes.value==="3") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(2,8,2,2);
      newSkinCtx.fillRect(12,8,2,2);
      
      imgData = newSkinCtx.getImageData(18,24,2,2);
      newSkinCtx.putImageData(imgData,84,36);
      imgData = newSkinCtx.getImageData(28,24,2,2);
      newSkinCtx.putImageData(imgData,86,36);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(82,24,2,2);
        newSkinCtx.clearRect(92,24,2,2);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(82,22,2,2);
          newSkinCtx.clearRect(92,22,2,2);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(50,8,2,2);
      newSkinCtx.fillRect(60,8,2,2);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(50,6,2,2);
        newSkinCtx.fillRect(60,6,2,2);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(2,6,2,2);
        newSkinCtx.fillRect(12,6,2,2);
      };
    } else if (chooseEyes.value==="4") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(2,10,2,2);
      newSkinCtx.fillRect(12,10,2,2);
      
      imgData = newSkinCtx.getImageData(18,26,2,2);
      newSkinCtx.putImageData(imgData,84,38);
      imgData = newSkinCtx.getImageData(28,26,2,2);
      newSkinCtx.putImageData(imgData,86,38);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(82,26,2,2);
        newSkinCtx.clearRect(92,26,2,2);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(82,24,2,2);
          newSkinCtx.clearRect(92,24,2,2);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(50,10,2,2);
      newSkinCtx.fillRect(60,10,2,2);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(50,8,2,2);
        newSkinCtx.fillRect(60,8,2,2);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(2,8,2,2);
        newSkinCtx.fillRect(12,8,2,2);
      };
    } else if (chooseEyes.value==="5") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(2,6,2,4);
      newSkinCtx.fillRect(12,6,2,4);
      
      imgData = newSkinCtx.getImageData(18,22,2,4);
      newSkinCtx.putImageData(imgData,4,36);
      imgData = newSkinCtx.getImageData(28,22,2,4);
      newSkinCtx.putImageData(imgData,6,36);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(82,22,2,4);
        newSkinCtx.clearRect(92,22,2,4);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(82,20,2,2);
          newSkinCtx.clearRect(92,20,2,2);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(50,6,2,4);
      newSkinCtx.fillRect(60,6,2,4);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(50,4,2,2);
        newSkinCtx.fillRect(60,4,2,2);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(2,4,2,2);
        newSkinCtx.fillRect(12,4,2,2);
      };
    } else if (chooseEyes.value==="6") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(2,8,2,4);
      newSkinCtx.fillRect(12,8,2,4);
      
      imgData = newSkinCtx.getImageData(18,24,2,4);
      newSkinCtx.putImageData(imgData,104,32);
      imgData = newSkinCtx.getImageData(28,24,2,4);
      newSkinCtx.putImageData(imgData,106,32);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(82,24,2,4);
        newSkinCtx.clearRect(92,24,2,4);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(82,22,2,2);
          newSkinCtx.clearRect(92,22,2,2);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(50,8,2,4);
      newSkinCtx.fillRect(60,8,2,4);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(50,6,2,2);
        newSkinCtx.fillRect(60,6,2,2);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(2,6,2,2);
        newSkinCtx.fillRect(12,6,2,2);
      };
    } else if (chooseEyes.value==="7") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(2,10,2,4);
      newSkinCtx.fillRect(12,10,2,4);
      
      imgData = newSkinCtx.getImageData(18,26,2,4);
      newSkinCtx.putImageData(imgData,108,32);
      imgData = newSkinCtx.getImageData(28,26,2,4);
      newSkinCtx.putImageData(imgData,110,32);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(82,26,2,4);
        newSkinCtx.clearRect(92,26,2,4);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(82,24,2,2);
          newSkinCtx.clearRect(92,24,2,2);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(50,10,2,4);
      newSkinCtx.fillRect(60,10,2,4);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(50,8,2,2);
        newSkinCtx.fillRect(60,8,2,2);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(2,8,2,2);
        newSkinCtx.fillRect(12,8,2,2);
      };
    } else if (chooseEyes.value==="8") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(2,4,4,2);
      newSkinCtx.fillRect(10,4,4,2);
      
      imgData = newSkinCtx.getImageData(20,20,2,2);
      newSkinCtx.putImageData(imgData,36,64);
      imgData = newSkinCtx.getImageData(26,20,2,2);
      newSkinCtx.putImageData(imgData,38,64);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(82,20,4,2);
        newSkinCtx.clearRect(90,20,4,2);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(82,18,4,2);
          newSkinCtx.clearRect(90,18,4,2);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(50,4,4,2);
      newSkinCtx.fillRect(58,4,4,2);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(50,2,4,2);
        newSkinCtx.fillRect(58,2,4,2);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(2,2,4,2);
        newSkinCtx.fillRect(10,2,4,2);
      };
    } else if (chooseEyes.value==="9") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(2,6,4,2);
      newSkinCtx.fillRect(10,6,4,2);
      
      imgData = newSkinCtx.getImageData(20,22,2,2);
      newSkinCtx.putImageData(imgData,36,66);
      imgData = newSkinCtx.getImageData(26,22,2,2);
      newSkinCtx.putImageData(imgData,38,66);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(82,22,4,2);
        newSkinCtx.clearRect(90,22,4,2);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(82,20,4,2);
          newSkinCtx.clearRect(90,20,4,2);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(50,6,4,2);
      newSkinCtx.fillRect(58,6,4,2);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(50,4,4,2);
        newSkinCtx.fillRect(58,4,4,2);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(2,4,4,2);
        newSkinCtx.fillRect(10,4,4,2);
      };
    } else if (chooseEyes.value==="10") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(2,8,4,2);
      newSkinCtx.fillRect(10,8,4,2);
      
      imgData = newSkinCtx.getImageData(20,24,2,2);
      newSkinCtx.putImageData(imgData,32,70);
      imgData = newSkinCtx.getImageData(26,24,2,2);
      newSkinCtx.putImageData(imgData,34,70);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(82,24,4,2);
        newSkinCtx.clearRect(90,24,4,2);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(82,22,4,2);
          newSkinCtx.clearRect(90,22,4,2);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(50,8,4,2);
      newSkinCtx.fillRect(58,8,4,2);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(50,6,4,2);
        newSkinCtx.fillRect(58,6,4,2);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(2,6,4,2);
        newSkinCtx.fillRect(10,6,4,2);
      };
    } else if (chooseEyes.value==="11") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(2,10,4,2);
      newSkinCtx.fillRect(10,10,4,2);
      
      imgData = newSkinCtx.getImageData(20,26,2,2);
      newSkinCtx.putImageData(imgData,36,70);
      imgData = newSkinCtx.getImageData(26,26,2,2);
      newSkinCtx.putImageData(imgData,38,70);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(82,26,4,2);
        newSkinCtx.clearRect(90,26,4,2);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(82,24,4,2);
          newSkinCtx.clearRect(90,24,4,2);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(50,10,4,2);
      newSkinCtx.fillRect(58,10,4,2);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(50,8,4,2);
        newSkinCtx.fillRect(58,8,4,2);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(2,8,4,2);
        newSkinCtx.fillRect(10,8,4,2);
      };
    } else if (chooseEyes.value==="12") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(2,12,4,2);
      newSkinCtx.fillRect(10,12,4,2);
      
      imgData = newSkinCtx.getImageData(20,28,2,2);
      newSkinCtx.putImageData(imgData,80,64);
      imgData = newSkinCtx.getImageData(26,28,2,2);
      newSkinCtx.putImageData(imgData,82,64);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(82,28,4,2);
        newSkinCtx.clearRect(90,28,4,2);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(82,26,4,2);
          newSkinCtx.clearRect(90,26,4,2);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(50,12,4,2);
      newSkinCtx.fillRect(58,12,4,2);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(50,10,4,2);
        newSkinCtx.fillRect(58,10,4,2);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(2,10,4,2);
        newSkinCtx.fillRect(10,10,4,2);
      };
    } else if (chooseEyes.value==="13") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(2,6,4,4);
      newSkinCtx.fillRect(10,6,4,4);
      
      imgData = newSkinCtx.getImageData(20,22,2,4);
      newSkinCtx.putImageData(imgData,0,32);
      imgData = newSkinCtx.getImageData(26,22,2,4);
      newSkinCtx.putImageData(imgData,2,32);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(82,22,4,4);
        newSkinCtx.clearRect(90,22,4,4);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(82,20,4,2);
          newSkinCtx.clearRect(90,20,4,2);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(50,6,4,4);
      newSkinCtx.fillRect(58,6,4,4);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(50,4,4,2);
        newSkinCtx.fillRect(58,4,4,2);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(2,4,4,2);
        newSkinCtx.fillRect(10,4,4,2);
      };
    } else if (chooseEyes.value==="14") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(2,8,4,4);
      newSkinCtx.fillRect(10,8,4,4);
      
      imgData = newSkinCtx.getImageData(20,24,2,4);
      newSkinCtx.putImageData(imgData,0,36);
      imgData = newSkinCtx.getImageData(26,24,2,4);
      newSkinCtx.putImageData(imgData,2,36);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(82,24,4,4);
        newSkinCtx.clearRect(90,24,4,4);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(82,22,4,2);
          newSkinCtx.clearRect(90,22,4,2);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(50,8,4,4);
      newSkinCtx.fillRect(58,8,4,4);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(50,6,4,2);
        newSkinCtx.fillRect(58,6,4,2);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(2,6,4,2);
        newSkinCtx.fillRect(10,6,4,2);
      };
    } else if (chooseEyes.value==="15") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(2,10,4,4);
      newSkinCtx.fillRect(10,10,4,4);
      
      imgData = newSkinCtx.getImageData(20,26,2,4);
      newSkinCtx.putImageData(imgData,4,32);
      imgData = newSkinCtx.getImageData(26,26,2,4);
      newSkinCtx.putImageData(imgData,6,32);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(82,26,4,4);
        newSkinCtx.clearRect(90,26,4,4);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(82,24,4,2);
          newSkinCtx.clearRect(90,24,4,2);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(50,10,4,4);
      newSkinCtx.fillRect(58,10,4,4);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(50,8,4,2);
        newSkinCtx.fillRect(58,8,4,2);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(2,8,4,2);
        newSkinCtx.fillRect(10,8,4,2);
      };
    } else if (chooseEyes.value==="16") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(0,8,6,2);
      newSkinCtx.fillRect(10,8,6,2);
      
      imgData = newSkinCtx.getImageData(20,24,2,2);
      newSkinCtx.putImageData(imgData,36,32);
      imgData = newSkinCtx.getImageData(26,24,2,2);
      newSkinCtx.putImageData(imgData,38,32);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(80,24,6,2);
        newSkinCtx.clearRect(90,24,6,2);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(80,22,6,2);
          newSkinCtx.clearRect(90,22,6,2);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(48,8,6,2);
      newSkinCtx.fillRect(58,8,6,2);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(48,6,6,2);
        newSkinCtx.fillRect(58,6,6,2);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(0,6,6,2);
        newSkinCtx.fillRect(10,6,6,2);
      };
    } else if (chooseEyes.value==="17") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(0,10,6,2);
      newSkinCtx.fillRect(10,10,6,2);
      
      imgData = newSkinCtx.getImageData(20,26,2,2);
      newSkinCtx.putImageData(imgData,36,34);
      imgData = newSkinCtx.getImageData(26,26,2,2);
      newSkinCtx.putImageData(imgData,38,34);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(80,26,6,2);
        newSkinCtx.clearRect(90,26,6,2);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(80,24,6,2);
          newSkinCtx.clearRect(90,24,6,2);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(48,10,6,2);
      newSkinCtx.fillRect(58,10,6,2);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(48,8,6,2);
        newSkinCtx.fillRect(58,8,6,2);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(0,8,6,2);
        newSkinCtx.fillRect(10,8,6,2);
      };
    } else if (chooseEyes.value==="18") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(0,8,6,2);
      newSkinCtx.fillRect(10,8,6,2);
      
      imgData = newSkinCtx.getImageData(18,24,2,2);
      newSkinCtx.putImageData(imgData,36,36);
      imgData = newSkinCtx.getImageData(28,24,2,2);
      newSkinCtx.putImageData(imgData,38,36);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(80,24,6,2);
        newSkinCtx.clearRect(90,24,6,2);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(80,22,6,2);
          newSkinCtx.clearRect(90,22,6,2);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(48,8,6,2);
      newSkinCtx.fillRect(58,8,6,2);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(48,6,6,2);
        newSkinCtx.fillRect(58,6,6,2);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(0,6,6,2);
        newSkinCtx.fillRect(10,6,6,2);
      };
    } else if (chooseEyes.value==="19") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(0,10,6,2);
      newSkinCtx.fillRect(10,10,6,2);
      
      imgData = newSkinCtx.getImageData(18,26,2,2);
      newSkinCtx.putImageData(imgData,36,38);
      imgData = newSkinCtx.getImageData(28,26,2,2);
      newSkinCtx.putImageData(imgData,38,38);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(80,26,6,2);
        newSkinCtx.clearRect(90,26,6,2);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(80,24,6,2);
          newSkinCtx.clearRect(90,24,6,2);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(48,10,6,2);
      newSkinCtx.fillRect(58,10,6,2);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(48,8,6,2);
        newSkinCtx.fillRect(58,8,6,2);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(0,8,6,2);
        newSkinCtx.fillRect(10,8,6,2);
      };
    } else if (chooseEyes.value==="20") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(0,6,6,4);
      newSkinCtx.fillRect(10,6,6,4);
      
      imgData = newSkinCtx.getImageData(18,22,4,4);
      newSkinCtx.putImageData(imgData,0,64);
      imgData = newSkinCtx.getImageData(26,22,4,4);
      newSkinCtx.putImageData(imgData,4,64);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(80,22,6,4);
        newSkinCtx.clearRect(90,22,6,4);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(80,20,6,2);
          newSkinCtx.clearRect(90,20,6,2);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(48,6,6,4);
      newSkinCtx.fillRect(58,6,6,4);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(48,4,6,2);
        newSkinCtx.fillRect(58,4,6,2);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(0,4,6,2);
        newSkinCtx.fillRect(10,4,6,2);
      };
    } else if (chooseEyes.value==="21") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(0,8,6,4);
      newSkinCtx.fillRect(10,8,6,4);
      
      imgData = newSkinCtx.getImageData(18,24,4,4);
      newSkinCtx.putImageData(imgData,0,68);
      imgData = newSkinCtx.getImageData(26,24,4,4);
      newSkinCtx.putImageData(imgData,4,68);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(80,24,6,4);
        newSkinCtx.clearRect(90,24,6,4);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(80,22,6,2);
          newSkinCtx.clearRect(90,22,6,2);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(48,8,6,4);
      newSkinCtx.fillRect(58,8,6,4);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(48,6,6,2);
        newSkinCtx.fillRect(58,6,6,2);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(0,6,6,2);
        newSkinCtx.fillRect(10,6,6,2);
      };
    } else if (chooseEyes.value==="22") {
      newSkinCtx.fillStyle = shaded(skinColor.value);
      newSkinCtx.fillRect(0,10,6,4);
      newSkinCtx.fillRect(10,10,6,4);
      
      imgData = newSkinCtx.getImageData(18,26,4,4);
      newSkinCtx.putImageData(imgData,72,64);
      imgData = newSkinCtx.getImageData(26,26,4,4);
      newSkinCtx.putImageData(imgData,76,64);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(80,26,6,4);
        newSkinCtx.clearRect(90,26,6,4);
        
        if (surprised.checked===true) {
          newSkinCtx.clearRect(80,24,6,2);
          newSkinCtx.clearRect(90,24,6,2);
        };
      };
      
      
      newSkinCtx.fillStyle = "#ffffffff";
      newSkinCtx.fillRect(48,10,6,4);
      newSkinCtx.fillRect(58,10,6,4);
      
      if (surprised.checked===true) {
        newSkinCtx.fillRect(48,8,6,2);
        newSkinCtx.fillRect(58,8,6,2);
        
        newSkinCtx.fillStyle = shaded(skinColor.value);
        newSkinCtx.fillRect(0,8,6,2);
        newSkinCtx.fillRect(10,8,6,2);
      };
    };
    
    
    if (chooseEyebrows.value==="1") {
      imgData = newSkinCtx.getImageData(18,18,12,2);
      newSkinCtx.putImageData(imgData,24,32);
      newSkinCtx.putImageData(imgData,2,2);
      // imgData = newSkinCtx.getImageData(,,,);
      // newSkinCtx.putImageData(imgData,,);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(82,18,12,2);
        // newSkinCtx.clearRect(,,,);
      };
    } else if (chooseEyebrows.value==="2") {
      imgData = newSkinCtx.getImageData(18,20,12,2);
      newSkinCtx.putImageData(imgData,24,34);
      newSkinCtx.putImageData(imgData,2,4);
      // imgData = newSkinCtx.getImageData(,,,);
      // newSkinCtx.putImageData(imgData,,);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(82,20,12,2);
        // newSkinCtx.clearRect(,,,);
      };
    } else if (chooseEyebrows.value==="3") {
      imgData = newSkinCtx.getImageData(18,22,12,2);
      newSkinCtx.putImageData(imgData,24,36);
      newSkinCtx.putImageData(imgData,2,6);
      // imgData = newSkinCtx.getImageData(,,,);
      // newSkinCtx.putImageData(imgData,,);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(82,22,12,2);
        // newSkinCtx.clearRect(,,,);
      };
    } else if (chooseEyebrows.value==="4") {
      imgData = newSkinCtx.getImageData(18,24,12,2);
      newSkinCtx.putImageData(imgData,24,38);
      newSkinCtx.putImageData(imgData,2,8);
      // imgData = newSkinCtx.getImageData(,,,);
      // newSkinCtx.putImageData(imgData,,);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(82,24,12,2);
        // newSkinCtx.clearRect(,,,);
      };
    } else if (chooseEyebrows.value==="5") {
      imgData = newSkinCtx.getImageData(18,26,12,2);
      newSkinCtx.putImageData(imgData,72,32);
      newSkinCtx.putImageData(imgData,2,10);
      // imgData = newSkinCtx.getImageData(,,,);
      // newSkinCtx.putImageData(imgData,,);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(82,26,12,2);
        // newSkinCtx.clearRect(,,,);
      };
    } else if (chooseEyebrows.value==="6") {
      imgData = newSkinCtx.getImageData(16,18,6,2);
      newSkinCtx.putImageData(imgData,72,34);
      newSkinCtx.putImageData(imgData,0,2);
      imgData = newSkinCtx.getImageData(26,18,6,2);
      newSkinCtx.putImageData(imgData,78,34);
      newSkinCtx.putImageData(imgData,10,2);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(80,18,6,2);
        newSkinCtx.clearRect(90,18,6,2);
      };
    } else if (chooseEyebrows.value==="7") {
      imgData = newSkinCtx.getImageData(16,20,6,2);
      newSkinCtx.putImageData(imgData,72,36);
      newSkinCtx.putImageData(imgData,0,4);
      imgData = newSkinCtx.getImageData(26,20,6,2);
      newSkinCtx.putImageData(imgData,78,36);
      newSkinCtx.putImageData(imgData,10,4);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(80,20,6,2);
        newSkinCtx.clearRect(90,20,6,2);
      };
    } else if (chooseEyebrows.value==="8") {
      imgData = newSkinCtx.getImageData(16,22,6,2);
      newSkinCtx.putImageData(imgData,72,38);
      newSkinCtx.putImageData(imgData,0,6);
      imgData = newSkinCtx.getImageData(26,22,6,2);
      newSkinCtx.putImageData(imgData,78,38);
      newSkinCtx.putImageData(imgData,10,6);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(80,22,6,2);
        newSkinCtx.clearRect(90,22,6,2);
      };
    } else if (chooseEyebrows.value==="9") {
      imgData = newSkinCtx.getImageData(16,24,6,2);
      newSkinCtx.putImageData(imgData,24,64);
      newSkinCtx.putImageData(imgData,0,8);
      imgData = newSkinCtx.getImageData(26,24,6,2);
      newSkinCtx.putImageData(imgData,30,64);
      newSkinCtx.putImageData(imgData,10,8);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(80,24,6,2);
        newSkinCtx.clearRect(90,24,6,2);
      };
    } else if (chooseEyebrows.value==="10") {
      imgData = newSkinCtx.getImageData(16,26,6,2);
      newSkinCtx.putImageData(imgData,24,66);
      newSkinCtx.putImageData(imgData,0,10);
      imgData = newSkinCtx.getImageData(26,26,6,2);
      newSkinCtx.putImageData(imgData,30,66);
      newSkinCtx.putImageData(imgData,10,10);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(80,26,6,2);
        newSkinCtx.clearRect(90,26,6,2);
      };
    } else if (chooseEyebrows.value==="11") {
      imgData = newSkinCtx.getImageData(18,18,4,2);
      newSkinCtx.putImageData(imgData,104,36);
      newSkinCtx.putImageData(imgData,2,2);
      imgData = newSkinCtx.getImageData(26,18,4,2);
      newSkinCtx.putImageData(imgData,108,36);
      newSkinCtx.putImageData(imgData,10,2);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(82,18,4,2);
        newSkinCtx.clearRect(90,18,4,2);
      };
    } else if (chooseEyebrows.value==="12") {
      imgData = newSkinCtx.getImageData(18,20,4,2);
      newSkinCtx.putImageData(imgData,104,38);
      newSkinCtx.putImageData(imgData,2,4);
      imgData = newSkinCtx.getImageData(26,20,4,2);
      newSkinCtx.putImageData(imgData,108,38);
      newSkinCtx.putImageData(imgData,10,4);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(82,20,4,2);
        newSkinCtx.clearRect(90,20,4,2);
      };
    } else if (chooseEyebrows.value==="13") {
      imgData = newSkinCtx.getImageData(18,22,4,2);
      newSkinCtx.putImageData(imgData,24,68);
      newSkinCtx.putImageData(imgData,2,6);
      imgData = newSkinCtx.getImageData(26,22,4,2);
      newSkinCtx.putImageData(imgData,28,68);
      newSkinCtx.putImageData(imgData,10,6);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(82,22,4,2);
        newSkinCtx.clearRect(90,22,4,2);
      };
    } else if (chooseEyebrows.value==="14") {
      imgData = newSkinCtx.getImageData(18,24,4,2);
      newSkinCtx.putImageData(imgData,24,70);
      newSkinCtx.putImageData(imgData,2,8);
      imgData = newSkinCtx.getImageData(26,24,4,2);
      newSkinCtx.putImageData(imgData,28,70);
      newSkinCtx.putImageData(imgData,10,8);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(82,24,4,2);
        newSkinCtx.clearRect(90,24,4,2);
      };
    } else if (chooseEyebrows.value==="15") {
      imgData = newSkinCtx.getImageData(18,26,4,2);
      newSkinCtx.putImageData(imgData,32,68);
      newSkinCtx.putImageData(imgData,2,10);
      imgData = newSkinCtx.getImageData(26,26,4,2);
      newSkinCtx.putImageData(imgData,36,68);
      newSkinCtx.putImageData(imgData,10,10);
      
      if (cleanup.checked===true) {
        newSkinCtx.clearRect(82,26,4,2);
        newSkinCtx.clearRect(90,26,4,2);
      };
    };
    
  };
};

const eyeMaskLoad = () => {
  if (surprised.checked===true) {
    eyePreview.style.maskImage = 'url("eyesRaised/' + String(chooseEyes.value) + '.png")';
  } else {
    eyePreview.style.maskImage = 'url("eyes/' + String(chooseEyes.value) + '.png")';
  };
  eyeInfo.content = eyeInfoContent[chooseEyes.value - 1];
  newSkinPreview();
};

const eyebrowMaskLoad = () => {
  eyebrowPreview.style.maskImage = 'url("eyebrows/' + String(chooseEyebrows.value) + '.png")';
  eyebrowInfo.content = eyebrowInfoContent[chooseEyebrows.value - 1];
  newSkinPreview();
};







// Event Listeners

uploadBox.addEventListener("click",() => {
  skinInput.click();
});

skinInput.addEventListener("change",(e) =>{
  ogSkin.src = URL.createObjectURL(e.target.files[0]);
});

ogSkin.addEventListener("load",() =>{
  
  if (ogSkin.naturalWidth===64 && ogSkin.naturalHeight===64) {
    
    skinType = "LD";
    ogSkinFaceCtx.drawImage(ogSkin , 8 , 8 , 8 , 8 , 0 , 0 , 16 , 16);
    
    config.style.display = "block";
    invalidWarning.style.display = "none";
    
    eyePreview.src = ogSkinFace.toDataURL();
    eyebrowPreview.src = ogSkinFace.toDataURL();
    
  eyePreview.style.maskImage = 'url("eyes/' + String(chooseEyes.value) + '.png")';
  eyebrowPreview.style.maskImage = 'url("eyebrows/' + String(chooseEyebrows.value) + '.png")';

  } else if (ogSkin.naturalWidth===128 && ogSkin.naturalHeight===128) {
    
    skinType = "HD";
    ogSkinFaceCtx.drawImage(ogSkin , 16 , 16 , 16 , 16 , 0 , 0 , 16 , 16);
    
    config.style.display = "block";
    invalidWarning.style.display = "block";
    invalidWarning.style.color = "yellow";
    invalidWarning.content = "Warning : HD Skins aren't Currently Supported for Actions & Stuff expressions";
    
    
    eyePreview.src = ogSkinFace.toDataURL();
    eyebrowPreview.src = ogSkinFace.toDataURL();
    
  eyePreview.style.maskImage = 'url("eyes/' + String(chooseEyes.value) + '.png")';
  eyebrowPreview.style.maskImage = 'url("eyebrows/' + String(chooseEyebrows.value) + '.png")';
    
  } else {
    
    config.style.display = "none";
    invalidWarning.style.display = "block";
    invalidWarning.style.color = "red";
    invalidWarning.content = "Invalid Skin Uploaded";
    
  };
  newSkinPreview();
});

chooseEyes.addEventListener("change",eyeMaskLoad);
chooseEyebrows.addEventListener("change",eyebrowMaskLoad);

eyeBack.addEventListener("click", () => {
  --chooseEyes.value;
  eyeMaskLoad();
});
eyeFor.addEventListener("click", () => {
  ++chooseEyes.value;
  eyeMaskLoad();
});
eyebrowBack.addEventListener("click", () => {
  --chooseEyebrows.value;
  eyebrowMaskLoad();
});
eyebrowFor.addEventListener("click", () => {
  ++chooseEyebrows.value;
  eyebrowMaskLoad();
});

cleanup.addEventListener("change",newSkinPreview);
surprised.addEventListener("change",eyeMaskLoad);
skinColor.addEventListener("change",newSkinPreview);

downloadBtn.addEventListener("click", () => {
  downloadLink.href = newSkin.toDataURL();
  downloadLink.download = "expressive";
  downloadLink.click();
});
