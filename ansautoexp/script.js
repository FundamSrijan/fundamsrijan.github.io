// DOM Elements

// Input stuff , warning and configuration
const uploadBox = document.getElementById("upload-box"),
skinInput = document.getElementById("skin-input"),
ogSkin = document.getElementById("og-skin"),
config = document.getElementById("config"),
invalidWarning = document.getElementById("invalid-warning"),

// Original Skin Canvas and Stuff
ogSkinFace = document.getElementById("og-skin-face"),
ogSkinFaceCtx = ogSkinFace.getContext("2d"),

// Sliders
chooseLeftEye = document.getElementById("choose-left-eye"),
chooseRightEye = document.getElementById("choose-right-eye"),
chooseLeftEyebrow = document.getElementById("choose-left-eyebrow"),
chooseRightEyebrow = document.getElementById("choose-right-eyebrow"),

// Slider Texts
leftEyeInfo = document.getElementById("left-eye-info"),
rightEyeInfo = document.getElementById("right-eye-info"),
leftEyebrowInfo = document.getElementById("left-eyebrow-info"),
rightEyebrowInfo = document.getElementById("right-eyebrow-info"),

// Informations for Slider Texts
eyeInfoContent = [
  "No Eye",
  "1×1 Near Upper",
  "1×1 Near Lower",
  "1×1 Far Upper",
  "1×1 Far Lower",
  "1×2 Upper",
  "1×2 Center",
  "1×2 Middle",
  "2×1 Upper",
  "2×1 Upper-Middle",
  "2×1 Middle",
  "2×1 Lower-Middle",
  "2×1 Lower",
  "2×2 Upper",
  "2×2 Middle",
  "2×2 Lower",
  "3×1 Upper",
  "3×1 Lower",
  "3×1 Upper (Centered Eyes)",
  "3×1 Lower (Centered Eyes)",
  "3×2 Upper",
  "3×2 Middle",
  "3×2 Lower"],
eyebrowInfoContent = [
  "No Eyebrow",
  "Monobrow Upper",
  "Monobrow Upper-Middle",
  "Monobrow Middle",
  "Monobrow Lower-Middle",
  "Monobrow Lower",
  "3×1 Upper",
  "3×1 Upper-Middle",
  "3×1 Middle",
  "3×1 Lower-Middle",
  "3×1 Lower",
  "2×1 Upper",
  "2×1 Upper-Middle",
  "2×1 Middle",
  "2×1 Lower-Middle",
  "2×1 Lower"],


// CheckBoxes
sameEyeCheck = document.getElementById("same-eye-check"),
sameEyebrowCheck = document.getElementById("same-eyebrow-check"),
surpriseLeftCheck = document.getElementById("surprise-left-check"),
surpriseRightCheck = document.getElementById("surprise-right-check"),
cleanupCheck = document.getElementById("cleanup-check"),

// Preview Images
leftEyePreview = document.getElementById("left-eye-preview"),
rightEyePreview = document.getElementById("right-eye-preview"),
leftEyebrowPreview = document.getElementById("left-eyebrow-preview"),
rightEyebrowPreview = document.getElementById("right-eyebrow-preview"),

// Skin Color Options
skinColor = document.getElementById("skin-color"),
moreColors = document.getElementById("more-colors"),

// Final Preview and Download Options
newSkin = document.getElementById("new-skin"),
newSkinCtx = newSkin.getContext("2d"),
forLD = document.getElementById("for-ld"),
forLDCtx = forLD.getContext("2d"),
downloadBtn = document.getElementById("download-btn"),
downloadLink = document.getElementById("download-link");
  
  
// Setting the content of slider accessories
document.getElementById("left-eye-back").innerHTML =
document.getElementById("right-eye-back").innerHTML =
document.getElementById("left-eyebrow-back").innerHTML =
document.getElementById("right-eyebrow-back").innerHTML = "<";
document.getElementById("left-eye-for").innerHTML =
document.getElementById("right-eye-for").innerHTML =
document.getElementById("left-eyebrow-for").innerHTML =
document.getElementById("right-eyebrow-for").innerHTML = ">";

// Necessary Variables
let useSameEye = true,
useSameEyebrow = true,
surpriseLeftEye = true,
surpriseRightEye = true,
doCleanup = true,
imgData = undefined,
skinType = undefined,
div = undefined;

// Pixelatiion Of Canvas Contexts
ogSkinFaceCtx.imageSmoothingEnabled =
ogSkinFaceCtx.webkitImageSmoothingEnabled =
ogSkinFaceCtx.mozImageSmoothingEnabled =
newSkinCtx.imageSmoothingEnabled =
newSkinCtx.webkitImageSmoothingEnabled =
newSkinCtx.mozImageSmoothingEnabled =
forLDCtx.imageSmoothingEnabled =
forLDCtx.webkitImageSmoothingEnabled =
forLDCtx.mozImageSmoothingEnabled = false;







// Functions

// Returns shaded and hue shifted color from a normal color input : TO BE UPDATED

const shaded = (color) => {
  const replacer = "00123456789abcdef";
  const shade = (val,iter) => {
    let newVal = val;
    for (let i = 1; i <= iter; i++) {
      newVal = replacer[replacer.indexOf(newVal,1)-1];
    };
    return newVal;
  };
  let shadedColor = "#" +
  shade(color[1],4) +
  color[2] +
  shade(color[3],4) +
  color[4] +
  shade(color[5],2) +
  color[6];
  return shadedColor;
},

// Set-ups the final preview
newSkinPreview = () => {
  newSkinCtx.clearRect(0,0,128,128);
  newSkinCtx.drawImage(ogSkin,0,0,128,128);
  imgData = newSkinCtx.getImageData(16,16,16,16);
  newSkinCtx.putImageData(imgData,0,0);
  newSkinCtx.putImageData(imgData,48,0);
  
  // Set-up for eyes in the order for optimization: blink -> pupil -> cleanup -> surprised cleanup -> surprised blink -> sclera -> surprised sclera
  
  newSkinCtx.fillStyle = shaded(skinColor.value);
  if (chooseLeftEye.value==="1") {
    newSkinCtx.fillRect(4,8,2,2);
    newSkinCtx.putImageData(newSkinCtx.getImageData(20,24,2,2),84,32);
    doCleanup ? newSkinCtx.clearRect(84,24,2,2) : {};
    doCleanup && surpriseLeftEye ? newSkinCtx.clearRect(84,22,2,2) : {};
    surpriseLeftEye ? newSkinCtx.fillRect(4,6,2,2) : {};
    
    newSkinCtx.fillStyle = "#ffffffff";
    newSkinCtx.fillRect(52,8,2,2);
    surpriseLeftEye ? newSkinCtx.fillRect(52,6,2,2) : {};
  } else if (chooseLeftEye.value==="2") {
    newSkinCtx.fillRect(4,10,2,2);
    newSkinCtx.putImageData(newSkinCtx.getImageData(20,26,2,2),84,34);
    doCleanup ? newSkinCtx.clearRect(84,26,2,2) : {};
    doCleanup && surpriseLeftEye ? newSkinCtx.clearRect(84,24,2,2) : {};
    surpriseLeftEye ? newSkinCtx.fillRect(4,8,2,2) : {};
    
    newSkinCtx.fillStyle = "#ffffffff";
    newSkinCtx.fillRect(52,10,2,2);
    surpriseLeftEye ? newSkinCtx.fillRect(52,8,2,2) : {};
  } else if (chooseLeftEye.value==="3") {
    newSkinCtx.fillRect(2,8,2,2);
    newSkinCtx.putImageData(newSkinCtx.getImageData(18,24,2,2),84,36);
    doCleanup ? newSkinCtx.clearRect(82,24,2,2) : {};
    doCleanup && surpriseLeftEye ? newSkinCtx.clearRect(82,22,2,2) : {};
    surpriseLeftEye ? newSkinCtx.fillRect(2,6,2,2) : {};
    
    newSkinCtx.fillStyle = "#ffffffff";
    newSkinCtx.fillRect(50,8,2,2);
    surpriseLeftEye ? newSkinCtx.fillRect(50,6,2,2) : {};
  } else if (chooseLeftEye.value==="4") {
    newSkinCtx.fillRect(2,10,2,2);
    newSkinCtx.putImageData(newSkinCtx.getImageData(18,26,2,2),84,38);
    doCleanup ? newSkinCtx.clearRect(82,26,2,2) : {};
    doCleanup && surpriseLeftEye ? newSkinCtx.clearRect(82,24,2,2) : {};
    surpriseLeftEye ? newSkinCtx.fillRect(2,8,2,2) : {};
    
    newSkinCtx.fillStyle = "#ffffffff";
    newSkinCtx.fillRect(50,10,2,2);
    surpriseLeftEye ? newSkinCtx.fillRect(50,8,2,2) : {};
  } else if (chooseLeftEye.value==="5") {
    newSkinCtx.fillRect(2,6,2,4);
    newSkinCtx.putImageData(newSkinCtx.getImageData(18,22,2,4),4,36);
    doCleanup ? newSkinCtx.clearRect(82,22,2,4) : {};
    doCleanup && surpriseLeftEye ? newSkinCtx.clearRect(82,20,2,2) : {};
    surpriseLeftEye ? newSkinCtx.fillRect(2,4,2,2) : {};
    
    newSkinCtx.fillStyle = "#ffffffff";
    newSkinCtx.fillRect(50,6,2,4);
    surpriseLeftEye ? newSkinCtx.fillRect(50,4,2,2) : {};
  } else if (chooseLeftEye.value==="6") {
    newSkinCtx.fillRect(2,8,2,4);
    newSkinCtx.putImageData(newSkinCtx.getImageData(18,24,2,4),104,32);
    doCleanup ? newSkinCtx.clearRect(82,24,2,4) : {};
    doCleanup && surpriseLeftEye ? newSkinCtx.clearRect(82,22,2,2) : {};
    surpriseLeftEye ? newSkinCtx.fillRect(2,6,2,2) : {};
    
    newSkinCtx.fillStyle = "#ffffffff";
    newSkinCtx.fillRect(50,8,2,4);
    surpriseLeftEye ? newSkinCtx.fillRect(50,6,2,2) : {};
  } else if (chooseLeftEye.value==="7") {
    newSkinCtx.fillRect(2,10,2,4);
    newSkinCtx.putImageData(newSkinCtx.getImageData(18,26,2,4),108,32);
    doCleanup ? newSkinCtx.clearRect(82,26,2,4) : {};
    doCleanup && surpriseLeftEye ? newSkinCtx.clearRect(82,24,2,2) : {};
    surpriseLeftEye ? newSkinCtx.fillRect(2,8,2,2) : {};
    
    newSkinCtx.fillStyle = "#ffffffff";
    newSkinCtx.fillRect(50,10,2,4);
    surpriseLeftEye ? newSkinCtx.fillRect(50,8,2,2) : {};
  } else if (chooseLeftEye.value==="8") {
    newSkinCtx.fillRect(2,4,4,2);
    newSkinCtx.putImageData(newSkinCtx.getImageData(20,20,2,2),36,64);
    doCleanup ? newSkinCtx.clearRect(84,20,4,2) : {};
    doCleanup && surpriseLeftEye ? newSkinCtx.clearRect(84,18,4,2) : {};
    surpriseLeftEye ? newSkinCtx.fillRect(2,2,4,2) : {};
    
    imgData = newSkinCtx.getImageData(18,20,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(50,4,4,2);
    surpriseLeftEye ? newSkinCtx.fillRect(50,2,4,2) : {};
  } else if (chooseLeftEye.value==="9") {
    newSkinCtx.fillRect(2,6,4,2);
    newSkinCtx.putImageData(newSkinCtx.getImageData(20,22,2,2),36,66);
    doCleanup ? newSkinCtx.clearRect(84,22,4,2) : {};
    doCleanup && surpriseLeftEye ? newSkinCtx.clearRect(84,20,4,2) : {};
    surpriseLeftEye ? newSkinCtx.fillRect(2,4,4,2) : {};
    
    imgData = newSkinCtx.getImageData(18,22,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(50,6,4,2);
    surpriseLeftEye ? newSkinCtx.fillRect(50,4,4,2) : {};
  } else if (chooseLeftEye.value==="10") {
    newSkinCtx.fillRect(2,8,4,2);
    newSkinCtx.putImageData(newSkinCtx.getImageData(20,24,2,2),32,70);
    doCleanup ? newSkinCtx.clearRect(84,24,4,2) : {};
    doCleanup && surpriseLeftEye ? newSkinCtx.clearRect(84,22,4,2) : {};
    surpriseLeftEye ? newSkinCtx.fillRect(2,6,4,2) : {};
    
    imgData = newSkinCtx.getImageData(18,24,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(50,8,4,2);
    surpriseLeftEye ? newSkinCtx.fillRect(50,6,4,2) : {};
  } else if (chooseLeftEye.value==="11") {
    newSkinCtx.fillRect(2,10,4,2);
    newSkinCtx.putImageData(newSkinCtx.getImageData(20,26,2,2),36,70);
    doCleanup ? newSkinCtx.clearRect(84,26,4,2) : {};
    doCleanup && surpriseLeftEye ? newSkinCtx.clearRect(84,24,4,2) : {};
    surpriseLeftEye ? newSkinCtx.fillRect(2,8,4,2) : {};
    
    imgData = newSkinCtx.getImageData(18,26,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(50,10,4,2);
    surpriseLeftEye ? newSkinCtx.fillRect(50,8,4,2) : {};
  } else if (chooseLeftEye.value==="12") {
    newSkinCtx.fillRect(2,12,4,2);
    newSkinCtx.putImageData(newSkinCtx.getImageData(20,28,2,2),80,64);
    doCleanup ? newSkinCtx.clearRect(84,28,4,2) : {};
    doCleanup && surpriseLeftEye ? newSkinCtx.clearRect(84,26,4,2) : {};
    surpriseLeftEye ? newSkinCtx.fillRect(2,10,4,2) : {};
    
    imgData = newSkinCtx.getImageData(18,28,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(50,12,4,2);
    surpriseLeftEye ? newSkinCtx.fillRect(50,10,4,2) : {};
  } else if (chooseLeftEye.value==="13") {
    newSkinCtx.fillRect(2,6,4,4);
    newSkinCtx.putImageData(newSkinCtx.getImageData(20,22,2,4),0,32);
    doCleanup ? newSkinCtx.clearRect(82,22,4,4) : {};
    doCleanup && surpriseLeftEye ? newSkinCtx.clearRect(82,20,4,2) : {};
    surpriseLeftEye ? newSkinCtx.fillRect(2,4,4,2) : {};
    
    imgData = newSkinCtx.getImageData(18,24,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(50,8,4,2);
    imgData = newSkinCtx.getImageData(18,22,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(50,6,4,2);
    surpriseLeftEye ? newSkinCtx.fillRect(50,4,4,2) : {};
  } else if (chooseLeftEye.value==="14") {
    newSkinCtx.fillRect(2,8,4,4);
    newSkinCtx.putImageData(newSkinCtx.getImageData(20,24,2,4),0,36);
    doCleanup ? newSkinCtx.clearRect(82,24,4,4) : {};
    doCleanup && surpriseLeftEye ? newSkinCtx.clearRect(82,22,4,2) : {};
    surpriseLeftEye ? newSkinCtx.fillRect(2,6,4,2) : {};
    
    imgData = newSkinCtx.getImageData(18,26,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(50,10,4,2);
    imgData = newSkinCtx.getImageData(18,24,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(50,8,4,2);
    surpriseLeftEye ? newSkinCtx.fillRect(50,6,4,2) : {};
  } else if (chooseLeftEye.value==="15") {
    newSkinCtx.fillRect(2,10,4,4);
    newSkinCtx.putImageData(newSkinCtx.getImageData(20,26,2,4),4,32);
    doCleanup ? newSkinCtx.clearRect(82,26,4,4) : {};
    doCleanup && surpriseLeftEye ? newSkinCtx.clearRect(82,24,4,2) : {};
    surpriseLeftEye ? newSkinCtx.fillRect(2,8,4,2) : {};
    
    imgData = newSkinCtx.getImageData(18,28,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(50,12,4,2);
    imgData = newSkinCtx.getImageData(18,26,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(50,10,4,2);
    surpriseLeftEye ? newSkinCtx.fillRect(50,8,4,2) : {};
  } else if (chooseLeftEye.value==="16") {
    newSkinCtx.fillRect(0,8,6,2);
    newSkinCtx.putImageData(newSkinCtx.getImageData(20,24,2,2),36,32);
    doCleanup ? newSkinCtx.clearRect(80,24,6,2) : {};
    doCleanup && surpriseLeftEye ? newSkinCtx.clearRect(80,22,6,2) : {};
    surpriseLeftEye ? newSkinCtx.fillRect(0,6,6,2) : {};
    
    imgData = newSkinCtx.getImageData(16,24,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(48,8,2,2);
    surpriseLeftEye ? newSkinCtx.fillRect(48,6,2,2) : {};
    imgData = newSkinCtx.getImageData(18,24,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(50,8,4,2);
    surpriseLeftEye ? newSkinCtx.fillRect(50,6,4,2) : {};
  } else if (chooseLeftEye.value==="17") {
    newSkinCtx.fillRect(0,10,6,2);
    newSkinCtx.putImageData(newSkinCtx.getImageData(20,26,2,2),36,34);
    doCleanup ? newSkinCtx.clearRect(80,26,6,2) : {};
    doCleanup && surpriseLeftEye ? newSkinCtx.clearRect(80,24,6,2) : {};
    surpriseLeftEye ? newSkinCtx.fillRect(0,8,6,2) : {};
    
    imgData = newSkinCtx.getImageData(16,26,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(48,10,2,2);
    surpriseLeftEye ? newSkinCtx.fillRect(48,8,2,2) : {};
    imgData = newSkinCtx.getImageData(18,26,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(50,10,4,2);
    surpriseLeftEye ? newSkinCtx.fillRect(50,8,4,2) : {};
  } else if (chooseLeftEye.value==="18") {
    newSkinCtx.fillRect(0,8,6,2);
    newSkinCtx.putImageData(newSkinCtx.getImageData(18,24,2,2),36,36);
    doCleanup ? newSkinCtx.clearRect(80,24,6,2) : {};
    doCleanup && surpriseLeftEye ? newSkinCtx.clearRect(80,22,6,2) : {};
    surpriseLeftEye ? newSkinCtx.fillRect(0,6,6,2) : {};
    
    imgData = newSkinCtx.getImageData(16,24,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(48,8,4,2);
    surpriseLeftEye ? newSkinCtx.fillRect(48,6,4,2) : {};
    imgData = newSkinCtx.getImageData(20,24,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(52,8,2,2);
    surpriseLeftEye ? newSkinCtx.fillRect(52,6,2,2) : {};
  } else if (chooseLeftEye.value==="19") {
    newSkinCtx.fillRect(0,10,6,2);
    newSkinCtx.putImageData(newSkinCtx.getImageData(18,26,2,2),36,38);
    doCleanup ? newSkinCtx.clearRect(80,26,6,2) : {};
    doCleanup && surpriseLeftEye ? newSkinCtx.clearRect(80,24,6,2) : {};
    surpriseLeftEye ? newSkinCtx.fillRect(0,8,6,2) : {};
    
    imgData = newSkinCtx.getImageData(16,26,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(48,10,4,2);
    surpriseLeftEye ? newSkinCtx.fillRect(48,8,4,2) : {};
    imgData = newSkinCtx.getImageData(20,26,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(52,10,2,2);
    surpriseLeftEye ? newSkinCtx.fillRect(52,8,2,2) : {};
  } else if (chooseLeftEye.value==="20") {
    newSkinCtx.fillRect(0,6,6,4);
    newSkinCtx.putImageData(newSkinCtx.getImageData(18,22,4,4),0,64);
    doCleanup ? newSkinCtx.clearRect(80,22,6,4) : {};
    doCleanup && surpriseLeftEye ? newSkinCtx.clearRect(80,20,6,2) : {};
    surpriseLeftEye ? newSkinCtx.fillRect(0,4,6,2) : {};
    
    imgData = newSkinCtx.getImageData(16,22,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(48,6,6,2);
    surpriseLeftEye ? newSkinCtx.fillRect(48,4,6,2) : {};
    imgData = newSkinCtx.getImageData(16,24,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(48,8,6,2);
  } else if (chooseLeftEye.value==="21") {
    newSkinCtx.fillRect(0,8,6,4);
    newSkinCtx.putImageData(newSkinCtx.getImageData(18,24,4,4),0,68);
    doCleanup ? newSkinCtx.clearRect(80,24,6,4) : {};
    doCleanup && surpriseLeftEye ? newSkinCtx.clearRect(80,22,6,2) : {};
    surpriseLeftEye ? newSkinCtx.fillRect(0,6,6,2) : {};
    
    imgData = newSkinCtx.getImageData(16,24,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(48,8,6,2);
    surpriseLeftEye ? newSkinCtx.fillRect(48,6,6,2) : {};
    imgData = newSkinCtx.getImageData(16,26,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(48,10,6,2);
  } else if (chooseLeftEye.value==="22") {
    newSkinCtx.fillRect(0,10,6,4);
    newSkinCtx.putImageData(newSkinCtx.getImageData(18,26,4,4),72,64);
    doCleanup ? newSkinCtx.clearRect(80,26,6,4) : {};
    doCleanup && surpriseLeftEye ? newSkinCtx.clearRect(80,24,6,2) : {};
    surpriseLeftEye ? newSkinCtx.fillRect(0,8,6,2) : {};
    
    imgData = newSkinCtx.getImageData(16,26,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(48,10,6,2);
    surpriseLeftEye ? newSkinCtx.fillRect(48,8,6,2) : {};
    imgData = newSkinCtx.getImageData(16,28,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(48,12,6,2);
  };
  
  newSkinCtx.fillStyle = shaded(skinColor.value);
  if (chooseRightEye.value==="1") {
    newSkinCtx.fillRect(10,8,2,2);
    newSkinCtx.putImageData(newSkinCtx.getImageData(26,24,2,2),86,32);
    doCleanup ? newSkinCtx.clearRect(90,24,2,2) : {};
    doCleanup && surpriseRightEye ? newSkinCtx.clearRect(90,22,2,2) : {};
    surpriseRightEye ? newSkinCtx.fillRect(10,6,2,2) : {};
    
    newSkinCtx.fillStyle = "#ffffffff";
    newSkinCtx.fillRect(58,8,2,2);
    surpriseRightEye ? newSkinCtx.fillRect(58,6,2,2) : {};
  } else if (chooseRightEye.value==="2") {
    newSkinCtx.fillRect(10,10,2,2);
    newSkinCtx.putImageData(newSkinCtx.getImageData(26,26,2,2),86,34);
    doCleanup ? newSkinCtx.clearRect(90,26,2,2) : {};
    doCleanup && surpriseRightEye ? newSkinCtx.clearRect(90,24,2,2) : {};
    surpriseRightEye ? newSkinCtx.fillRect(10,8,2,2) : {};
    
    newSkinCtx.fillStyle = "#ffffffff";
    newSkinCtx.fillRect(58,10,2,2);
    surpriseRightEye ? newSkinCtx.fillRect(58,8,2,2) : {};
  } else if (chooseRightEye.value==="3") {
    newSkinCtx.fillRect(12,8,2,2);
    newSkinCtx.putImageData(newSkinCtx.getImageData(28,24,2,2),86,36);
    doCleanup ? newSkinCtx.clearRect(92,24,2,2) : {};
    doCleanup && surpriseRightEye ? newSkinCtx.clearRect(92,22,2,2) : {};
    surpriseRightEye ? newSkinCtx.fillRect(12,6,2,2) : {};
    
    newSkinCtx.fillStyle = "#ffffffff";
    newSkinCtx.fillRect(60,8,2,2);
    surpriseRightEye ? newSkinCtx.fillRect(60,6,2,2) : {};
  } else if (chooseRightEye.value==="4") {
    newSkinCtx.fillRect(12,10,2,2);
    newSkinCtx.putImageData(newSkinCtx.getImageData(28,26,2,2),86,38);
    doCleanup ? newSkinCtx.clearRect(92,26,2,2) : {};
    doCleanup && surpriseRightEye ? newSkinCtx.clearRect(92,24,2,2) : {};
    surpriseRightEye ? newSkinCtx.fillRect(12,8,2,2) : {};
    
    newSkinCtx.fillStyle = "#ffffffff";
    newSkinCtx.fillRect(60,10,2,2);
    surpriseRightEye ? newSkinCtx.fillRect(60,8,2,2) : {};
  } else if (chooseRightEye.value==="5") {
    newSkinCtx.fillRect(12,6,2,4);
    newSkinCtx.putImageData(newSkinCtx.getImageData(28,22,2,4),6,36);
    doCleanup ? newSkinCtx.clearRect(92,22,2,4) : {};
    doCleanup && surpriseRightEye ? newSkinCtx.clearRect(92,20,2,2) : {};
    surpriseRightEye ? newSkinCtx.fillRect(12,4,2,2) : {};
    
    newSkinCtx.fillStyle = "#ffffffff";
    newSkinCtx.fillRect(60,6,2,4);
    surpriseRightEye ? newSkinCtx.fillRect(60,4,2,2) : {};
  } else if (chooseRightEye.value==="6") {
    newSkinCtx.fillRect(12,8,2,4);
    newSkinCtx.putImageData(newSkinCtx.getImageData(28,24,2,4),106,32);
    doCleanup ? newSkinCtx.clearRect(92,24,2,4) : {};
    doCleanup && surpriseRightEye ? newSkinCtx.clearRect(92,22,2,2) : {};
    surpriseRightEye ? newSkinCtx.fillRect(12,6,2,2) : {};
    
    newSkinCtx.fillStyle = "#ffffffff";
    newSkinCtx.fillRect(60,8,2,4);
    surpriseRightEye ? newSkinCtx.fillRect(60,6,2,2) : {};
  } else if (chooseRightEye.value==="7") {
    newSkinCtx.fillRect(12,10,2,4);
    newSkinCtx.putImageData(newSkinCtx.getImageData(28,26,2,4),110,32);
    doCleanup ? newSkinCtx.clearRect(92,26,2,4) : {};
    doCleanup && surpriseRightEye ? newSkinCtx.clearRect(92,24,2,2) : {};
    surpriseRightEye ? newSkinCtx.fillRect(12,8,2,2) : {};
    
    newSkinCtx.fillStyle = "#ffffffff";
    newSkinCtx.fillRect(60,10,2,4);
    surpriseRightEye ? newSkinCtx.fillRect(60,8,2,2) : {};
  } else if (chooseRightEye.value==="8") {
    newSkinCtx.fillRect(10,4,4,2);
    newSkinCtx.putImageData(newSkinCtx.getImageData(26,20,2,2),38,64);
    doCleanup ? newSkinCtx.clearRect(90,20,4,2) : {};
    doCleanup && surpriseRightEye ? newSkinCtx.clearRect(90,18,4,2) : {};
    surpriseRightEye ? newSkinCtx.fillRect(10,2,4,2) : {};
    
    imgData = newSkinCtx.getImageData(28,20,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(58,4,4,2);
    surpriseRightEye ? newSkinCtx.fillRect(58,2,4,2) : {};
  } else if (chooseRightEye.value==="9") {
    newSkinCtx.fillRect(10,6,4,2);
    newSkinCtx.putImageData(newSkinCtx.getImageData(26,22,2,2),38,66);
    doCleanup ? newSkinCtx.clearRect(90,22,4,2) : {};
    doCleanup && surpriseRightEye ? newSkinCtx.clearRect(90,20,4,2) : {};
    surpriseRightEye ? newSkinCtx.fillRect(10,4,4,2) : {};
    
    imgData = newSkinCtx.getImageData(28,22,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(58,6,4,2);
    surpriseRightEye ? newSkinCtx.fillRect(58,4,4,2) : {};
  } else if (chooseRightEye.value==="10") {
    newSkinCtx.fillRect(10,8,4,2);
    newSkinCtx.putImageData(newSkinCtx.getImageData(26,24,2,2),34,70);
    doCleanup ? newSkinCtx.clearRect(90,24,4,2) : {};
    doCleanup && surpriseRightEye ? newSkinCtx.clearRect(90,22,4,2) : {};
    surpriseRightEye ? newSkinCtx.fillRect(10,6,4,2) : {};
    
    imgData = newSkinCtx.getImageData(28,24,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(58,8,4,2);
    surpriseRightEye ? newSkinCtx.fillRect(58,6,4,2) : {};
  } else if (chooseRightEye.value==="11") {
    newSkinCtx.fillRect(10,10,4,2);
    newSkinCtx.putImageData(newSkinCtx.getImageData(26,26,2,2),38,70);
    doCleanup ? newSkinCtx.clearRect(90,26,4,2) : {};
    doCleanup && surpriseRightEye ? newSkinCtx.clearRect(90,24,4,2) : {};
    surpriseRightEye ? newSkinCtx.fillRect(10,8,4,2) : {};
    
    imgData = newSkinCtx.getImageData(28,26,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(58,10,4,2);
    surpriseRightEye ? newSkinCtx.fillRect(58,8,4,2) : {};
  } else if (chooseRightEye.value==="12") {
    newSkinCtx.fillRect(10,12,4,2);
    newSkinCtx.putImageData(newSkinCtx.getImageData(26,28,2,2),82,64);
    doCleanup ? newSkinCtx.clearRect(90,28,4,2) : {};
    doCleanup && surpriseRightEye ? newSkinCtx.clearRect(90,26,4,2) : {};
    surpriseRightEye ? newSkinCtx.fillRect(10,10,4,2) : {};
    
    imgData = newSkinCtx.getImageData(28,28,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(58,12,4,2);
    surpriseRightEye ? newSkinCtx.fillRect(58,10,4,2) : {};
  } else if (chooseRightEye.value==="13") {
    newSkinCtx.fillRect(10,6,4,4);
    newSkinCtx.putImageData(newSkinCtx.getImageData(26,22,2,4),2,32);
    doCleanup ? newSkinCtx.clearRect(90,22,4,4) : {};
    doCleanup && surpriseRightEye ? newSkinCtx.clearRect(90,20,4,2) : {};
    surpriseRightEye ? newSkinCtx.fillRect(10,4,4,2) : {};
    
    imgData = newSkinCtx.getImageData(28,24,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(58,8,4,2);
    imgData = newSkinCtx.getImageData(28,22,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(58,6,4,2);
    surpriseRightEye ? newSkinCtx.fillRect(58,4,4,2) : {};
  } else if (chooseRightEye.value==="14") {
    newSkinCtx.fillRect(10,8,4,4);
    newSkinCtx.putImageData(newSkinCtx.getImageData(26,24,2,4),2,36);
    doCleanup ? newSkinCtx.clearRect(90,24,4,4) : {};
    doCleanup && surpriseRightEye ? newSkinCtx.clearRect(90,22,4,2) : {};
    surpriseRightEye ? newSkinCtx.fillRect(10,6,4,2) : {};
    
    imgData = newSkinCtx.getImageData(28,26,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(58,10,4,2);
    imgData = newSkinCtx.getImageData(28,24,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(58,8,4,2);
    surpriseRightEye ? newSkinCtx.fillRect(58,6,4,2) : {};
  } else if (chooseRightEye.value==="15") {
    newSkinCtx.fillRect(10,10,4,4);
    newSkinCtx.putImageData(newSkinCtx.getImageData(26,26,2,4),6,32);
    doCleanup ? newSkinCtx.clearRect(90,26,4,4) : {};
    doCleanup && surpriseRightEye ? newSkinCtx.clearRect(90,24,4,2) : {};
    surpriseRightEye ? newSkinCtx.fillRect(10,8,4,2) : {};
    
    imgData = newSkinCtx.getImageData(28,28,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(58,12,4,2);
    imgData = newSkinCtx.getImageData(28,26,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(58,10,4,2);
    surpriseRightEye ? newSkinCtx.fillRect(58,8,4,2) : {};
  } else if (chooseRightEye.value==="16") {
    newSkinCtx.fillRect(10,8,6,2);
    newSkinCtx.putImageData(newSkinCtx.getImageData(26,24,2,2),38,32);
    doCleanup ? newSkinCtx.clearRect(90,24,6,2) : {};
    doCleanup && surpriseRightEye ? newSkinCtx.clearRect(90,22,6,2) : {};
    surpriseRightEye ? newSkinCtx.fillRect(10,6,6,2) : {};
    
    imgData = newSkinCtx.getImageData(30,24,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(62,8,2,2);
    surpriseRightEye ? newSkinCtx.fillRect(62,6,2,2) : {};
    imgData = newSkinCtx.getImageData(28,24,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(58,8,4,2);
    surpriseRightEye ? newSkinCtx.fillRect(58,6,4,2) : {};
  } else if (chooseRightEye.value==="17") {
    newSkinCtx.fillRect(10,10,6,2);
    newSkinCtx.putImageData(newSkinCtx.getImageData(26,26,2,2),38,34);
    doCleanup ? newSkinCtx.clearRect(90,26,6,2) : {};
    doCleanup && surpriseRightEye ? newSkinCtx.clearRect(90,24,6,2) : {};
    surpriseRightEye ? newSkinCtx.fillRect(10,8,6,2) : {};
    
    imgData = newSkinCtx.getImageData(30,26,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(62,10,2,2);
    surpriseRightEye ? newSkinCtx.fillRect(62,8,2,2) : {};
    imgData = newSkinCtx.getImageData(28,26,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(58,10,4,2);
    surpriseRightEye ? newSkinCtx.fillRect(58,8,4,2) : {};
  } else if (chooseRightEye.value==="18") {
    newSkinCtx.fillRect(10,8,6,2);
    newSkinCtx.putImageData(newSkinCtx.getImageData(28,24,2,2),38,36);
    doCleanup ? newSkinCtx.clearRect(90,24,6,2) : {};
    doCleanup && surpriseRightEye ? newSkinCtx.clearRect(90,22,6,2) : {};
    surpriseRightEye ? newSkinCtx.fillRect(10,6,6,2) : {};
    
    imgData = newSkinCtx.getImageData(30,24,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(60,8,4,2);
    surpriseRightEye ? newSkinCtx.fillRect(60,6,4,2) : {};
    imgData = newSkinCtx.getImageData(26,24,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(58,8,2,2);
    surpriseRightEye ? newSkinCtx.fillRect(58,6,2,2) : {};
  } else if (chooseRightEye.value==="19") {
    newSkinCtx.fillRect(10,10,6,2);
    newSkinCtx.putImageData(newSkinCtx.getImageData(28,26,2,2),38,38);
    doCleanup ? newSkinCtx.clearRect(90,26,6,2) : {};
    doCleanup && surpriseRightEye ? newSkinCtx.clearRect(90,24,6,2) : {};
    surpriseRightEye ? newSkinCtx.fillRect(10,8,6,2) : {};
    
    imgData = newSkinCtx.getImageData(30,26,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(60,10,4,2);
    surpriseRightEye ? newSkinCtx.fillRect(60,8,4,2) : {};
    imgData = newSkinCtx.getImageData(26,26,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(58,10,2,2);
    surpriseRightEye ? newSkinCtx.fillRect(58,8,2,2) : {};
  } else if (chooseRightEye.value==="20") {
    newSkinCtx.fillRect(10,6,6,4);
    newSkinCtx.putImageData(newSkinCtx.getImageData(26,22,4,4),4,64);
    doCleanup ? newSkinCtx.clearRect(90,22,6,4) : {};
    doCleanup && surpriseRightEye ? newSkinCtx.clearRect(90,20,6,2) : {};
    surpriseRightEye ? newSkinCtx.fillRect(10,4,6,2) : {};
    
    imgData = newSkinCtx.getImageData(30,22,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(58,6,6,2);
    surpriseRightEye ? newSkinCtx.fillRect(58,4,6,2) : {};
    imgData = newSkinCtx.getImageData(30,24,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(58,8,6,2);
  } else if (chooseRightEye.value==="21") {
    newSkinCtx.fillRect(10,8,6,4);
    newSkinCtx.putImageData(newSkinCtx.getImageData(26,24,4,4),4,68);
    doCleanup ? newSkinCtx.clearRect(90,24,6,4) : {};
    doCleanup && surpriseRightEye ? newSkinCtx.clearRect(90,22,6,2) : {};
    surpriseRightEye ? newSkinCtx.fillRect(10,6,6,2) : {};
    
    imgData = newSkinCtx.getImageData(30,24,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(58,8,6,2);
    surpriseRightEye ? newSkinCtx.fillRect(58,6,6,2) : {};
    imgData = newSkinCtx.getImageData(30,26,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(58,10,6,2);
  } else if (chooseRightEye.value==="22") {
    newSkinCtx.fillRect(10,10,6,4);
    newSkinCtx.putImageData(newSkinCtx.getImageData(26,26,4,4),76,64);
    doCleanup ? newSkinCtx.clearRect(90,26,6,4) : {};
    doCleanup && surpriseRightEye ? newSkinCtx.clearRect(90,24,6,2) : {};
    surpriseRightEye ? newSkinCtx.fillRect(10,8,6,2) : {};
    
    imgData = newSkinCtx.getImageData(30,26,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(58,10,6,2);
    surpriseRightEye ? newSkinCtx.fillRect(58,8,6,2) : {};
    imgData = newSkinCtx.getImageData(30,28,1,1);
    newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
    newSkinCtx.fillRect(58,12,6,2);
  };
  
  if (chooseLeftEyebrow.value==="1") {
    newSkinCtx.putImageData(newSkinCtx.getImageData(18,18,6,2),24,32);
    doCleanup ? newSkinCtx.clearRect(82,18,6,2) : {};
  } else if (chooseLeftEyebrow.value==="2") {
    newSkinCtx.putImageData(newSkinCtx.getImageData(18,20,6,2),24,34);
    doCleanup ? newSkinCtx.clearRect(82,20,6,2) : {};
  } else if (chooseLeftEyebrow.value==="3") {
    newSkinCtx.putImageData(newSkinCtx.getImageData(18,22,6,2),24,36);
    doCleanup ? newSkinCtx.clearRect(82,22,6,2) : {};
  } else if (chooseLeftEyebrow.value==="4") {
    newSkinCtx.putImageData(newSkinCtx.getImageData(18,24,6,2),24,38);
    doCleanup ? newSkinCtx.clearRect(82,24,6,2) : {};
  } else if (chooseLeftEyebrow.value==="5") {
    newSkinCtx.putImageData(newSkinCtx.getImageData(18,26,6,2),72,32);
    doCleanup ? newSkinCtx.clearRect(82,26,6,2) : {};
  } else if (chooseLeftEyebrow.value==="6") {
    newSkinCtx.putImageData(newSkinCtx.getImageData(16,18,6,2),72,34);
    doCleanup ? newSkinCtx.clearRect(80,18,6,2) : {};
  } else if (chooseLeftEyebrow.value==="7") {
    newSkinCtx.putImageData(newSkinCtx.getImageData(16,20,6,2),72,36);
    doCleanup ? newSkinCtx.clearRect(80,20,6,2) : {};
  } else if (chooseLeftEyebrow.value==="8") {
    newSkinCtx.putImageData(newSkinCtx.getImageData(16,22,6,2),72,38);
    doCleanup ? newSkinCtx.clearRect(80,22,6,2) : {};
  } else if (chooseLeftEyebrow.value==="9") {
    newSkinCtx.putImageData(newSkinCtx.getImageData(16,24,6,2),24,64);
    doCleanup ? newSkinCtx.clearRect(80,24,6,2) : {};
  } else if (chooseLeftEyebrow.value==="10") {
    newSkinCtx.putImageData(newSkinCtx.getImageData(16,26,6,2),24,66);
    doCleanup ? newSkinCtx.clearRect(80,26,6,2) : {};
  } else if (chooseLeftEyebrow.value==="11") {
    newSkinCtx.putImageData(newSkinCtx.getImageData(18,18,4,2),104,36);
    doCleanup ? newSkinCtx.clearRect(82,18,4,2) : {};
  } else if (chooseLeftEyebrow.value==="12") {
    newSkinCtx.putImageData(newSkinCtx.getImageData(18,20,4,2),104,38);
    doCleanup ? newSkinCtx.clearRect(82,20,4,2) : {};
  } else if (chooseLeftEyebrow.value==="13") {
    newSkinCtx.putImageData(newSkinCtx.getImageData(18,22,4,2),24,68);
    doCleanup ? newSkinCtx.clearRect(82,22,4,2) : {};
  } else if (chooseLeftEyebrow.value==="14") {
    newSkinCtx.putImageData(newSkinCtx.getImageData(18,24,4,2),24,70);
    doCleanup ? newSkinCtx.clearRect(82,24,4,2) : {};
  } else if (chooseLeftEyebrow.value==="15") {
    newSkinCtx.putImageData(newSkinCtx.getImageData(18,26,4,2),32,38);
    doCleanup ? newSkinCtx.clearRect(82,26,4,2) : {};
  };
  
  if (chooseRightEyebrow.value==="1") {
    newSkinCtx.putImageData(newSkinCtx.getImageData(24,18,6,2),30,32);
    doCleanup ? newSkinCtx.clearRect(88,18,6,2) : {};
  } else if (chooseRightEyebrow.value==="2") {
    newSkinCtx.putImageData(newSkinCtx.getImageData(24,20,6,2),30,34);
    doCleanup ? newSkinCtx.clearRect(88,20,6,2) : {};
  } else if (chooseRightEyebrow.value==="3") {
    newSkinCtx.putImageData(newSkinCtx.getImageData(24,22,6,2),30,36);
    doCleanup ? newSkinCtx.clearRect(88,22,6,2) : {};
  } else if (chooseRightEyebrow.value==="4") {
    newSkinCtx.putImageData(newSkinCtx.getImageData(22,24,6,2),30,38);
    doCleanup ? newSkinCtx.clearRect(88,24,6,2) : {};
  } else if (chooseRightEyebrow.value==="5") {
    newSkinCtx.putImageData(newSkinCtx.getImageData(24,26,6,2),78,32);
    doCleanup ? newSkinCtx.clearRect(88,26,6,2) : {};
  } else if (chooseRightEyebrow.value==="6") {
    newSkinCtx.putImageData(newSkinCtx.getImageData(26,18,6,2),78,34);
    doCleanup ? newSkinCtx.clearRect(88,18,6,2) : {};
  } else if (chooseRightEyebrow.value==="7") {
    newSkinCtx.putImageData(newSkinCtx.getImageData(26,20,6,2),78,36);
    doCleanup ? newSkinCtx.clearRect(88,20,6,2) : {};
  } else if (chooseRightEyebrow.value==="8") {
    newSkinCtx.putImageData(newSkinCtx.getImageData(26,22,6,2),78,38);
    doCleanup ? newSkinCtx.clearRect(88,22,6,2) : {};
  } else if (chooseRightEyebrow.value==="9") {
    newSkinCtx.putImageData(newSkinCtx.getImageData(26,24,6,2),30,64);
    doCleanup ? newSkinCtx.clearRect(88,24,6,2) : {};
  } else if (chooseRightEyebrow.value==="10") {
    newSkinCtx.putImageData(newSkinCtx.getImageData(26,26,6,2),30,66);
    doCleanup ? newSkinCtx.clearRect(88,26,6,2) : {};
  } else if (chooseRightEyebrow.value==="11") {
    newSkinCtx.putImageData(newSkinCtx.getImageData(26,18,4,2),108,36);
    doCleanup ? newSkinCtx.clearRect(88,18,4,2) : {};
  } else if (chooseRightEyebrow.value==="12") {
    newSkinCtx.putImageData(newSkinCtx.getImageData(26,20,4,2),108,38);
    doCleanup ? newSkinCtx.clearRect(88,20,4,2) : {};
  } else if (chooseRightEyebrow.value==="13") {
    newSkinCtx.putImageData(newSkinCtx.getImageData(26,22,4,2),28,68);
    doCleanup ? newSkinCtx.clearRect(88,22,4,2) : {};
  } else if (chooseRightEyebrow.value==="14") {
    newSkinCtx.putImageData(newSkinCtx.getImageData(26,24,4,2),28,70);
    doCleanup ? newSkinCtx.clearRect(88,24,4,2) : {};
  } else if (chooseRightEyebrow.value==="15") {
    newSkinCtx.putImageData(newSkinCtx.getImageData(26,26,4,2),36,38);
    doCleanup ? newSkinCtx.clearRect(88,26,4,2) : {};
  };
  
},

// Load the eye and eyebrow preview masks
eyeMaskLoad = () => {
  if (surpriseLeftEye===true) {
    leftEyePreview.style.maskImage = 'url("leftEyesRaised/' + String(chooseLeftEye.value) + '.png")';
  } else if (surpriseLeftEye===false) {
    leftEyePreview.style.maskImage = 'url("leftEyes/' + String(chooseLeftEye.value) + '.png")';
  };
  if (surpriseRightEye===true) {
    rightEyePreview.style.maskImage = 'url("rightEyesRaised/' + String(chooseRightEye.value) + '.png")';
  } else if (surpriseRightEye===false) {
    rightEyePreview.style.maskImage = 'url("rightEyes/' + String(chooseRightEye.value) + '.png")';
  };
  leftEyeInfo.innerHTML = eyeInfoContent[chooseLeftEye.value];
  rightEyeInfo.innerHTML = eyeInfoContent[chooseRightEye.value];
  newSkinPreview();
},
eyebrowMaskLoad = () => {
  leftEyebrowPreview.style.maskImage = 'url("leftEyebrows/' + String(chooseLeftEyebrow.value) + '.png")';
  rightEyebrowPreview.style.maskImage = 'url("rightEyebrows/' + String(chooseRightEyebrow.value) + '.png")';
  leftEyebrowInfo.innerHTML = eyebrowInfoContent[chooseLeftEyebrow.value];
  newSkinPreview();
  rightEyebrowInfo.innerHTML = eyebrowInfoContent[chooseRightEyebrow.value];
  newSkinPreview();
};







// Event Listeners

// Clicks skin input when upload box is clicked
uploadBox.addEventListener("click", () => {
  skinInput.click();
});
// Gets the original time every time a new skin is selected
skinInput.addEventListener("change", (e) => {
  ogSkin.src = URL.createObjectURL(e.target.files[0]);
});
// Set-ups the original face , reveals or hides or sets configuration section and warnings and initializes masks
ogSkin.addEventListener("load", () => {

  leftEyePreview.style.maskImage =
  rightEyePreview.style.maskImage = 'url("rightEyes/0.png")';
  leftEyebrowPreview.style.maskImage =
  rightEyebrowPreview.style.maskImage = 'url("rightEyebrows/0.png")';
  moreColors.innerHTML = "";
  
  if (ogSkin.naturalWidth===64 && ogSkin.naturalHeight===64) {
    skinType = "LD";
    ogSkinFaceCtx.drawImage(ogSkin , 8 , 8 , 8 , 8 , 0 , 0 , 16 , 16);
    config.style.display = "block";
    invalidWarning.style.display = "none";
    leftEyePreview.src =
    rightEyePreview.src =
    leftEyebrowPreview.src =
    rightEyebrowPreview.src = ogSkinFace.toDataURL();
    moreColors.style.gridTemplateColumns = "repeat(8 , 35px)";
    for (let j = 0; j < 16; j += 2) {
      for (let i = 0; i < 16; i += 2) {
        div = document.createElement("div");
        div.classList.add("colors");
        imgData = ogSkinFaceCtx.getImageData(i,j,1,1);
        div.style.backgroundColor = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
        div.style.width = div.style.height = "35px";
        moreColors.append(div);
      };
    };
  } else if (ogSkin.naturalWidth===128 && ogSkin.naturalHeight===128) {
    skinType = "HD";
    ogSkinFaceCtx.drawImage(ogSkin , 16 , 16 , 16 , 16 , 0 , 0 , 16 , 16);
    config.style.display =
    invalidWarning.style.display = "block";
    invalidWarning.style.color =
    invalidWarning.style.webkitTextFillColor = "yellow";
    invalidWarning.innerHTML = "Warning : HD Skins aren't Currently Supported for Actions & Stuff expressions";
    leftEyePreview.src =
    rightEyePreview.src =
    leftEyebrowPreview.src =
    rightEyebrowPreview.src = ogSkinFace.toDataURL();
    moreColors.style.gridTemplateColumns = "repeat(16 , 15px)";
    for (let j = 0; j < 16; j += 1) {
      for (let i = 0; i < 16; i += 1) {
        div = document.createElement("div");
        div.classList.add("colors");
        imgData = ogSkinFaceCtx.getImageData(i,j,1,1);
        div.style.backgroundColor = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
        div.style.width = div.style.height = "15px";
        moreColors.append(div);
      };
    };
  } else {
    config.style.display = "none";
    invalidWarning.style.display = "block";
    invalidWarning.style.color =
    invalidWarning.style.webkitTextFillColor = "red";
    invalidWarning.innerHTML = "Invalid Skin Uploaded";
  };
  newSkinPreview();
});

// Event Delegation
config.addEventListener("click", (e) => {
  if (e.target.closest("#same-eye")!==null) {
    if (useSameEye===true) {
      useSameEye = false;
      sameEyeCheck.style.visibility = "hidden";
    } else if (useSameEye===false) {
      useSameEye = true;
      sameEyeCheck.style.visibility = "visible";
      chooseRightEye.value = chooseLeftEye.value;
      surpriseRightEye = surpriseLeftEye;
      surpriseRightCheck.style.visibility = surpriseLeftCheck.style.visibility;
    };
    eyeMaskLoad();
  } else if (e.target.closest("#same-eyebrow")!==null) {
    if (useSameEyebrow===true) {
      useSameEyebrow = false;
      sameEyebrowCheck.style.visibility = "hidden";
    } else if (useSameEyebrow===false) {
      useSameEyebrow = true;
      sameEyebrowCheck.style.visibility = "visible";
      chooseRightEyebrow.value = chooseLeftEyebrow.value;
    };
    eyebrowMaskLoad();
  } else if (e.target.closest("#surprise-left")!==null) {
    if (surpriseLeftEye===true) {
       surpriseLeftEye = false ;
       surpriseLeftCheck.style.visibility = "hidden";
    } else if (surpriseLeftEye===false) {
       surpriseLeftEye = true ;
       surpriseLeftCheck.style.visibility = "visible";
    };
    if (useSameEye===true) {
      surpriseRightEye = surpriseLeftEye;
      surpriseRightCheck.style.visibility = surpriseLeftCheck.style.visibility;
    };
    eyeMaskLoad();
  } else if (e.target.closest("#surprise-right")!==null) {
    if (surpriseRightEye===true) {
       surpriseRightEye = false ;
       surpriseRightCheck.style.visibility = "hidden";
    } else if (surpriseRightEye===false) {
       surpriseRightEye = true ;
       surpriseRightCheck.style.visibility = "visible";
    };
    if (useSameEye===true) {
      surpriseLeftEye = surpriseRightEye;
      surpriseLeftCheck.style.visibility = surpriseRightCheck.style.visibility;
    };
    eyeMaskLoad();
  } else if (e.target.closest("#cleanup")!==null) {
    if (doCleanup===true) {
       doCleanup = false ;
       cleanupCheck.style.visibility = "hidden";
    } else if (doCleanup===false) {
       doCleanup = true ;
       cleanupCheck.style.visibility = "visible";
    };
    newSkinPreview();
  } else if (e.target.closest("#left-eye-back")!==null) {
    --chooseLeftEye.value;
    if (useSameEye===true) {
      chooseRightEye.value = chooseLeftEye.value;
    };
    eyeMaskLoad();
  } else if (e.target.closest("#right-eye-back")!==null) {
    --chooseRightEye.value;
    if (useSameEye===true) {
      chooseLeftEye.value = chooseRightEye.value;
    };
    eyeMaskLoad();
  } else if (e.target.closest("#left-eye-for")!==null) {
    ++chooseLeftEye.value;
    if (useSameEye===true) {
      chooseRightEye.value = chooseLeftEye.value;
    };
    eyeMaskLoad();
  } else if (e.target.closest("#right-eye-for")!==null) {
    ++chooseRightEye.value;
    if (useSameEye===true) {
      chooseLeftEye.value = chooseRightEye.value;
    };
    eyeMaskLoad();
  } else if (e.target.closest("#left-eyebrow-back")!==null) {
    --chooseLeftEyebrow.value;
    if (useSameEyebrow===true) {
      chooseRightEyebrow.value = chooseLeftEyebrow.value;
    };
    eyebrowMaskLoad();
  } else if (e.target.closest("#right-eyebrow-back")!==null) {
    --chooseRightEyebrow.value;
    if (useSameEyebrow===true) {
      chooseLeftEyebrow.value = chooseRightEyebrow.value;
    };
    eyebrowMaskLoad();
  } else if (e.target.closest("#left-eyebrow-for")!==null) {
    ++chooseLeftEyebrow.value;
    if (useSameEyebrow===true) {
      chooseRightEyebrow.value = chooseLeftEyebrow.value;
    };
    eyebrowMaskLoad();
  } else if (e.target.closest("#right-eyebrow-for")!==null) {
    ++chooseRightEyebrow.value;
    if (useSameEyebrow===true) {
      chooseLeftEyebrow.value = chooseRightEyebrow.value;
    };
    eyebrowMaskLoad();
  } else if (e.target.closest("#more-colors-toggle")!==null) {
    if (moreColors.style.display==="grid") {
      moreColors.style.display = "none";
      document.getElementById("more-colors-toggle").innerHTML = "Show More Colors";
    } else if (moreColors.style.display==="none" || moreColors.style.display==="") {
      moreColors.style.display = "grid";
      document.getElementById("more-colors-toggle").innerHTML = "Hide More Colors";
    };
  } else if (e.target.classList.contains("colors")) {
    moreColors.style.display = "none";
    skinColor.value = "#" + e.target.style.backgroundColor.slice(4,-1).split(",").map((n)=>{
      let b = parseInt(n).toString(16);
      return b.length===1 ? "0" + b : b ;
    }).join("");
    document.getElementById("more-colors-toggle").innerHTML = "Show More Colors";
    newSkinPreview();
  } else if (e.target.closest("#download-btn")!==null) {
    if (skinType==="LD") {
      forLDCtx.drawImage(newSkin,0,0,64,64);
      downloadLink.href = forLD.toDataURL();
    } else if (skinType==="HD") {
      downloadLink.href = newSkin.toDataURL();
    };
    downloadLink.download = "expressive";
    downloadLink.click();
    newSkinPreview();
  };
});

config.addEventListener("change", (e) => {
  if (e.target.closest("#choose-left-eye")!==null) {
    useSameEye ? chooseRightEye.value = chooseLeftEye.value : {};
    eyeMaskLoad();
  } else if (e.target.closest("#choose-right-eye")!==null) {
    useSameEye ? chooseLeftEye.value = chooseRightEye.value : {};
    eyeMaskLoad();
  } else if (e.target.closest("#choose-left-eyebrow")!==null) {
    useSameEyebrow ? chooseRightEyebrow.value = chooseLeftEyebrow.value : {};
    eyebrowMaskLoad();
  } else if (e.target.closest("#choose-right-eyebrow")!==null) {
    useSameEyebrow ? chooseLeftEyebrow.value = chooseRightEyebrow.value : {};
    eyebrowMaskLoad();
  };
  if (e.target.closest("#skin-color")!==null) {newSkinPreview();};
});