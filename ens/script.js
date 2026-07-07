// DOM Elements

const [
// Input
	upload,
	skinInput,
	ogSkin,
	ogSkinFace,
	config,
	warn,
// Sliders
	chooseLeftEye,
	chooseRightEye,
	chooseLeftEyebrow,
	chooseRightEyebrow,
// Sliders Info
	leftEyeInfo,
	rightEyeInfo,
	leftEyebrowInfo,
	rightEyebrowInfo,
// Checkboxes
	sameEyeCheck,
	sameEyebrowCheck,
	surpriseLeftCheck,
	surpriseRightCheck,
	cleanupCheck,
// Preview Images
	eyePreview,
	eyebrowPreview,
	leftEyePreview,
	rightEyePreview,
	leftEyebrowPreview,
	rightEyebrowPreview,
// Skin Color
	skinColor,
	moreColors,
	moreColorsToggle,
// Edited
	newSkin,
	forLD,
// Donwload
	downloadBtn,
	downloadLink
] = [
// Upload
	"upload",
	"skin-input",
	"og-skin",
	"og-skin-face",
	"config",
	"warn",
// Sliders
	"choose-left-eye",
	"choose-right-eye",
	"choose-left-eyebrow",
	"choose-right-eyebrow",
// Sliders Info
	"left-eye-info",
	"right-eye-info",
	"left-eyebrow-info",
	"right-eyebrow-info",
// Checkboxes
	"same-eye-check",
	"same-eyebrow-check",
	"surprise-left-check",
	"surprise-right-check",
	"cleanup-check",
// Preview Images
	"eye-preview",
	"eyebrow-preview",
	"left-eye-preview",
	"right-eye-preview",
	"right-eyebrow-preview",
	"left-eyebrow-preview",
// Skin Color
	"skin-color",
	"more-colors",
	"more-colors-toggle",
// Edited
	"new-skin",
	"for-ld",
// Download
	"download-btn",
	"download-link"
].map(id => document.getElementById(id)),

// Setting Contexts
ogSkinFaceCtx = ogSkinFace.getContext("2d"),
newSkinCtx = newSkin.getContext("2d"),
forLDCtx = forLD.getContext("2d"),

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


geo = Object.fromEntries(Object.entries({
/*
🛑 Geometry data here 🛑

Pixel count as if skin is LD
Distances are from the top middle of the face ,
Positions are for the pasted actions and stuff elements .
Eye and pupil properties have 22 options for now
Eyebrows have 15 options for now.
Empty variants are not included here .
*/

    eyeScaleX: [1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3],
    eyeScaleY: [1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2],
    eyeDisX: [1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    eyeDisY: [4, 5, 4, 5, 3, 4, 5, 2, 3, 4, 5, 6, 3, 4, 5, 4, 5, 4, 5, 3, 4, 5],

	pupilScaleX: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2],
	pupilScaleY: [1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2],
	pupilDisX: [1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1],
	pupilDisY: [4, 5, 4, 5, 3, 4, 5, 2, 3, 4, 5, 6, 3, 4, 5, 4, 5, 4, 5, 3, 4, 5],
	pupilPosX: [43, 43, 43, 43, 3, 53, 55, 19, 19, 17, 19, 41, 1, 1, 3, 19, 19, 19, 19, 2, 2, 38],
	pupilPosY: [16, 17, 18, 19, 18, 16, 16, 32, 33, 35, 35, 32, 16, 18, 16, 16, 17, 18, 19, 32, 34, 32],

	eyebrowScaleX: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2],
	eyebrowScaleY: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    eyebrowDisX: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    eyebrowDisY: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5],
	eyebrowPosX: [15, 15, 15, 15, 39, 39, 39, 39, 15, 15, 54, 54, 14, 14, 18],
	eyebrowPosY: [16, 17, 18, 19, 16, 17, 18, 19, 32, 33, 18, 19, 34, 35, 34]

}).map(([key, arr]) => [key, arr.map(num => num*2)]));



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
let useSameEye =
useSameEyebrow =
surpriseLeftEye =
surpriseRightEye =
doCleanup = true,
imgData =
skinType =
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
// Edit (1 year later) : I forgot what was to be updated
const shaded = (color) => {
	const replacer = "00123456789abcdef";
	const shade = (val,iter) => {
		let newVal = val;
		for (let i = 1; i <= iter; i++) newVal = replacer[replacer.indexOf(newVal,1)-1];
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

// Load the eye and eyebrow preview masks
loadEye = () => {
	leftEyePreview.style.maskImage = 'url("leftEyes' + (surpriseLeftEye ? 'Raised' : "") + '/' + String(chooseLeftEye.value) + '.png")';
	rightEyePreview.style.maskImage = 'url("rightEyes' + (surpriseRightEye ? 'Raised' : "") + '/' + String(chooseRightEye.value) + '.png")';
	leftEyeInfo.innerHTML = eyeInfoContent[chooseLeftEye.value];
	rightEyeInfo.innerHTML = eyeInfoContent[chooseRightEye.value];
},
loadEyebrow = () => {
	leftEyebrowPreview.style.maskImage = 'url("leftEyebrows/' + String(chooseLeftEyebrow.value) + '.png")';
	rightEyebrowPreview.style.maskImage = 'url("rightEyebrows/' + String(chooseRightEyebrow.value) + '.png")';
	leftEyebrowInfo.innerHTML = eyebrowInfoContent[chooseLeftEyebrow.value];
	rightEyebrowInfo.innerHTML = eyebrowInfoContent[chooseRightEyebrow.value];
},

// Set-ups the final preview
/* 
🛑 ALL black magic happens here 🛑
DO NOt TOUCH !!!
Only 1 person knows how this works and that's me , but not for very long . Do you know how it works ???
*/
editSkin = () => {
	loadEye();
	loadEyebrow();
	newSkinCtx.clearRect(0,0,128,128);
	newSkinCtx.drawImage(ogSkin,0,0,128,128);
	imgData = newSkinCtx.getImageData(16,16,16,16);
	newSkinCtx.putImageData(imgData,0,0);
	newSkinCtx.putImageData(imgData,48,0);

// Left Eye
	let i = parseInt(chooseLeftEye.value) - 1;
	if (i !== -1) {
	// Blink
		newSkinCtx.fillStyle = shaded(skinColor.value);
		newSkinCtx.fillRect(
			(8 - geo.eyeDisX[i] - geo.eyeScaleX[i]),
			(geo.eyeDisY[i] - (surpriseLeftEye ? 2 : 0)),
			(geo.eyeScaleX[i]),
			(geo.eyeScaleY[i] + (surpriseLeftEye ? 2 : 0))
		);
	// Sclera
		if ((geo.eyeScaleX[i] === geo.pupilScaleX[i]) && (geo.eyeScaleY[i] === geo.pupilScaleY[i])) {
			newSkinCtx.fillStyle = "#ffffffff";
			newSkinCtx.fillRect(
				(56 - geo.eyeDisX[i] - geo.eyeScaleX[i]),
				(geo.eyeDisY[i] - (surpriseLeftEye ? 2 : 0)),
				(geo.eyeScaleX[i]),
				(geo.eyeScaleY[i] + (surpriseLeftEye ? 2 : 0))
			);
		} else {
			for (let j = 0; j < geo.eyeScaleY[i]; j+=2) {
				imgData = newSkinCtx.getImageData(
					(24 - geo.eyeDisX[i] - geo.eyeScaleX[i]),
					(16 + geo.eyeDisY[i] + j),
					1,1);
				newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
				newSkinCtx.fillRect(
					(56 - geo.eyeDisX[i] - geo.eyeScaleX[i]),
					(geo.eyeDisY[i] + j),
					(geo.eyeScaleX[i]),
					2);
				(j === 0 && surpriseLeftEye) ? newSkinCtx.fillRect(
					(56 - geo.eyeDisX[i] - geo.eyeScaleX[i]),
					(geo.eyeDisY[i] - 2),
					(geo.eyeScaleX[i]),
					2) : {};
			}
		}
	// Cleanup
		doCleanup ? newSkinCtx.clearRect(
			(88 - geo.eyeDisX[i] - geo.eyeScaleX[i]),
			(16 + geo.eyeDisY[i] - (surpriseLeftEye ? 2 : 0)),
			(geo.eyeScaleX[i]),
			(geo.eyeScaleY[i] + (surpriseLeftEye ? 2 : 0))
		) : {};
	// Pupil
		newSkinCtx.putImageData(
			newSkinCtx.getImageData(
				(24 - geo.pupilDisX[i] - geo.pupilScaleX[i]),
				(16 + geo.pupilDisY[i]),
				(geo.pupilScaleX[i]),
				(geo.pupilScaleY[i])
			),
			(geo.pupilPosX[i] - geo.pupilScaleX[i]),
			(geo.pupilPosY[i])
		);
	}

// Right Eye
	i = parseInt(chooseRightEye.value) - 1;
	if (i !== -1) {
	// Blink
		newSkinCtx.fillStyle = shaded(skinColor.value);
		newSkinCtx.fillRect(
			(8 + geo.eyeDisX[i]),
			(geo.eyeDisY[i] - (surpriseRightEye ? 2 : 0)),
			(geo.eyeScaleX[i]),
			(geo.eyeScaleY[i] + (surpriseRightEye ? 2 : 0))
		);
	// Sclera
		if ((geo.eyeScaleX[i] === geo.pupilScaleX[i]) && (geo.eyeScaleY[i] === geo.pupilScaleY[i])) {
			newSkinCtx.fillStyle = "#ffffffff";
			newSkinCtx.fillRect(
				(56 + geo.eyeDisX[i]),
				(geo.eyeDisY[i] - (surpriseRightEye ? 2 : 0)),
				(geo.eyeScaleX[i]),
				(geo.eyeScaleY[i] + (surpriseRightEye ? 2 : 0))
			);
		} else {
			for (let j = 0; j < geo.eyeScaleY[i]; j+=2) {
				imgData = newSkinCtx.getImageData(
					(24 + geo.eyeDisX[i] + geo.eyeScaleX[i] - 1),
					(16 + geo.eyeDisY[i] + j),
					1,1);
				newSkinCtx.fillStyle = "rgb("+imgData.data[0]+","+imgData.data[1]+","+imgData.data[2]+")";
				newSkinCtx.fillRect(
					(56 + geo.eyeDisX[i]),
					(geo.eyeDisY[i] + j),
					(geo.eyeScaleX[i]),
					2);
				(j === 0 && surpriseRightEye) ? newSkinCtx.fillRect(
					(56 + geo.eyeDisX[i]),
					(geo.eyeDisY[i] - 2),
					(geo.eyeScaleX[i]),
					2) : {};
			}
		}
	// Cleanup
		doCleanup ? newSkinCtx.clearRect(
			(88 + geo.eyeDisX[i]),
			(16 + geo.eyeDisY[i] - (surpriseRightEye ? 2 : 0)),
			(geo.eyeScaleX[i]),
			(geo.eyeScaleY[i] + (surpriseRightEye ? 2 : 0))
		) : {};
	// Pupil
		newSkinCtx.putImageData(
			newSkinCtx.getImageData(
				(24 + geo.pupilDisX[i]),
				(16 + geo.pupilDisY[i]),
				(geo.pupilScaleX[i]),
				(geo.pupilScaleY[i])
			),
			(geo.pupilPosX[i]),
			(geo.pupilPosY[i])
		);
	}

// Left Eyebrow
	i = parseInt(chooseLeftEyebrow.value) - 1;
	if (i !== -1) {
	// Cleanup
		doCleanup ? newSkinCtx.clearRect(
			(88 - geo.eyebrowDisX[i] - geo.eyebrowScaleX[i]),
			(16 + geo.eyebrowDisY[i]),
			(geo.eyebrowScaleX[i]),
			(geo.eyebrowScaleY[i])
		) : {};
	// Eyebrow
		newSkinCtx.putImageData(
			newSkinCtx.getImageData(
				(24 - geo.eyebrowDisX[i] - geo.eyebrowScaleX[i]),
				(16 + geo.eyebrowDisY[i]),
				(geo.eyebrowScaleX[i]),
				(geo.eyebrowScaleY[i])
			),
			(geo.eyebrowPosX[i] - geo.eyebrowScaleX[i]),
			(geo.eyebrowPosY[i])
		);
	}

// Right Eyebrow
	i = parseInt(chooseRightEyebrow.value) - 1;
	if (i !== -1) {
	// Cleanup
		doCleanup ? newSkinCtx.clearRect(
			(88 + geo.eyebrowDisX[i]),
			(16 + geo.eyebrowDisY[i]),
			(geo.eyebrowScaleX[i]),
			(geo.eyebrowScaleY[i])
		) : {};
	// Eyebrow
		newSkinCtx.putImageData(
			newSkinCtx.getImageData(
				(24 + geo.eyebrowDisX[i]),
				(16 + geo.eyebrowDisY[i]),
				(geo.eyebrowScaleX[i]),
				(geo.eyebrowScaleY[i])
			),
			(geo.eyebrowPosX[i]),
			(geo.eyebrowPosY[i])
		);
	}
};



// Event Listeners
ogSkin.addEventListener("load", () => {
	leftEyePreview.style.maskImage =
	rightEyePreview.style.maskImage = 'url("rightEyes/0.png")';
	leftEyebrowPreview.style.maskImage =
	rightEyebrowPreview.style.maskImage = 'url("rightEyebrows/0.png")';
	moreColors.innerHTML = "";
	
	if (ogSkin.naturalWidth===64 && ogSkin.naturalHeight===64) {
		skinType = "LD";
		ogSkinFaceCtx.drawImage(ogSkin, 8, 8, 8, 8, 0, 0, 16, 16);
		ogSkinFaceCtx.drawImage(ogSkin, 40, 8, 8, 8, 0, 0, 16, 16);
		config.style.display = "grid";
		ogSkinFace.style.display = "block";
		warn.style.display = "none";
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
		ogSkinFaceCtx.drawImage(ogSkin, 16, 16, 16, 16, 0, 0, 16, 16);
		ogSkinFaceCtx.drawImage(ogSkin, 80, 16, 16, 16, 0, 0, 16, 16);
		config.style.display = "grid";
		ogSkinFace.style.display =
		warn.style.display = "block";
		warn.style.color =
		warn.style.webkitTextFillColor = "yellow";
		warn.innerHTML = "Warning : HD Skins aren't Currently Supported for Actions & Stuff expressions";
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
		config.style.display =
		ogSkinFace.style.display = "none";
		warn.style.display = "block";
		warn.style.color =
		warn.style.webkitTextFillColor = "red";
		warn.innerHTML = "Invalid Skin Uploaded";
	};
	editSkin();
});

document.addEventListener("click", (e) => {
// Forwarding upload click
	if (e.target.closest("#upload")!==null) {
		skinInput.click();

// Preview Backgrounds
	} else if (e.target.closest("#eye-preview")!==null) {
		eyePreview.style.background = "oklch(" +
			Math.random() + " " +
			Math.random()*0.5 + " " +
			Math.random()*360 + " / " +
			Math.random() + ")";
	} else if (e.target.closest("#eyebrow-preview")!==null) {
		eyebrowPreview.style.background = "oklch(" +
			Math.random() + " " +
			Math.random()*0.5 + " " +
			Math.random()*360 + " / " +
			Math.random() + ")";

// Checkboxes
	} else if (e.target.closest("#same-eye")!==null) {
		useSameEye = !useSameEye;
		sameEyeCheck.style.visibility = (useSameEye ? "visible" : "hidden");
		if (useSameEye) {
			chooseRightEye.value = chooseLeftEye.value;
			surpriseRightEye = surpriseLeftEye;
			surpriseRightCheck.style.visibility = surpriseLeftCheck.style.visibility;
		};
	} else if (e.target.closest("#same-eyebrow")!==null) {
		useSameEyebrow = !useSameEyebrow;
		sameEyebrowCheck.style.visibility = (useSameEyebrow ? "visible" : "hidden");
		useSameEyebrow ? chooseRightEyebrow.value = chooseLeftEyebrow.value : {};
	} else if (e.target.closest("#surprise-left")!==null) {
		surpriseLeftEye = !surpriseLeftEye;
		surpriseLeftCheck.style.visibility = (surpriseLeftEye ? "visible" : "hidden");
		if (useSameEye===true) {
			surpriseRightEye = surpriseLeftEye;
			surpriseRightCheck.style.visibility = surpriseLeftCheck.style.visibility;
		};
	} else if (e.target.closest("#surprise-right")!==null) {
		surpriseRightEye = !surpriseRightEye;
		surpriseRightCheck.style.visibility = (surpriseRightEye ? "visible" : "hidden");
		if (useSameEye===true) {
			surpriseLeftEye = surpriseRightEye;
			surpriseLeftCheck.style.visibility = surpriseRightCheck.style.visibility;
		};
	} else if (e.target.closest("#cleanup")!==null) {
		cleanupCheck.style.visibility = (doCleanup ? "hidden" : "visible");
		doCleanup = !doCleanup;

// Slider Buttons
	} else if (e.target.closest("#left-eye-back")!==null) {
		--chooseLeftEye.value;
		useSameEye===true ? chooseRightEye.value = chooseLeftEye.value : {};
	} else if (e.target.closest("#right-eye-back")!==null) {
		--chooseRightEye.value;
		useSameEye===true ? chooseLeftEye.value = chooseRightEye.value : {};
	} else if (e.target.closest("#left-eye-for")!==null) {
		++chooseLeftEye.value;
		useSameEye===true ? chooseRightEye.value = chooseLeftEye.value : {};
	} else if (e.target.closest("#right-eye-for")!==null) {
		++chooseRightEye.value;
		useSameEye===true ? chooseLeftEye.value = chooseRightEye.value : {};
	} else if (e.target.closest("#left-eyebrow-back")!==null) {
		--chooseLeftEyebrow.value;
		useSameEyebrow===true ? chooseRightEyebrow.value = chooseLeftEyebrow.value : {};
	} else if (e.target.closest("#right-eyebrow-back")!==null) {
		--chooseRightEyebrow.value;
		useSameEyebrow===true ? chooseLeftEyebrow.value = chooseRightEyebrow.value : {};
	} else if (e.target.closest("#left-eyebrow-for")!==null) {
		++chooseLeftEyebrow.value;
		useSameEyebrow===true ? chooseRightEyebrow.value = chooseLeftEyebrow.value : {};
	} else if (e.target.closest("#right-eyebrow-for")!==null) {
		++chooseRightEyebrow.value;
		useSameEyebrow===true ? chooseLeftEyebrow.value = chooseRightEyebrow.value : {};

// More Colors Button
	} else if (e.target.closest("#more-colors-toggle")!==null) {
		if (moreColors.style.display==="grid") {
			moreColors.style.display = "none";
			moreColorsToggle.innerHTML = "Show More Colors ↓";
		} else if (moreColors.style.display==="none" || moreColors.style.display==="") {
			moreColors.style.display = "grid";
			moreColorsToggle.innerHTML = "Hide More Colors ↑";
		};

// Preset Colors
	} else if (e.target.classList.contains("colors")) {
		moreColors.style.display = "none";
		skinColor.value = "#" + e.target.style.backgroundColor.slice(4,-1).split(",").map((n)=>{
			let b = parseInt(n).toString(16);
			return b.length===1 ? "0" + b : b ;
		}).join("");
		moreColorsToggle.innerHTML = "Show More Colors ↓";

// Download
	} else if (e.target.closest("#download-btn")!==null) {
		if (skinType==="LD") {
			forLDCtx.drawImage(newSkin,0,0,64,64);
			downloadLink.href = forLD.toDataURL();
		} else if (skinType==="HD") {
			downloadLink.href = newSkin.toDataURL();
		};
		downloadLink.download = "expressive";
		downloadLink.click();
	}

	editSkin();
})

document.addEventListener("change", (e) => {

	(e.target.closest("#skin-input")!==null) ?
	(ogSkin.src = URL.createObjectURL(e.target.files[0])) : {};
	(useSameEye) ? (
		(e.target.closest("#choose-left-eye")!==null) ?
		(chooseRightEye.value = chooseLeftEye.value) :
		(e.target.closest("#choose-right-eye")!==null) ?
		(chooseLeftEye.value = chooseRightEye.value) :
		{}
	) : {};
	(useSameEyebrow) ? (
		(e.target.closest("#choose-left-eyebrow")!==null) ?
		(chooseRightEyebrow.value = chooseLeftEyebrow.value) :
		(e.target.closest("#choose-right-eyebrow")!==null) ?
		(chooseLeftEyebrow.value = chooseRightEyebrow.value) :
		{}
	) : {};

	editSkin();
})
