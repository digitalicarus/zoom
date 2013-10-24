var canvas   = document.getElementsByTagName('canvas')[0]
,   ctx      = canvas.getContext('2d')
,   i        = 0 // gen purpose iterator
,   j        = 0 // ""
,   k        = 0 // ""
,   cWidth   = 320
,   cHeight  = 240
,   vPrefix  = ['-ms', '-o', '-moz', '-webkit']
,   styles   = {
		background:            '#b0b0ff',
		display:               'block',
		position:              'absolute',
		top:                   '50%',
		left:                  '50%',
		margin:                '-' + cHeight/2 + 'px auto auto -' + cWidth/2 + 'px',
		vendorTransformOrigin: '50% 50%' 
	}
,   roadImgSrc     = 'outrun-road.png'
,   roadImg        = document.createElement('img')
,   roadImgDarkSrc = 'outrun-road-dark.png'
,   roadImgDark    = document.createElement('img')
,   texPtr         = 0
,   c              = {}
,   vel            = 1
;

String.prototype.capitalize = function() {
	return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

function applyStyles (ele, styles) {
	for (i in styles) {
		if(!styles.hasOwnProperty(i)) {
			continue;
		}
		ele.style[i] = styles[i];

		if (/^vendor/.test(styles[i])) {
			for (j = 0; j < vPrefix.length; j++) {
				ele.style[vPrefix[j] + i.capitalize()] = styles[i];
			}
		}
	}
}

function resize(e) {
	var w = window.innerWidth
	,   h = window.innerHeight
	,   s = (w < h) ? w / canvas.width : h / canvas.height
	;

	canvas.style.webkitTransform = 'scale(' + s + ')';
}

window.addEventListener('resize', resize);

canvas.width  = 320;
canvas.height = 240;
applyStyles(canvas, styles);
resize();

function gameLoop () {
	var canvasline = canvas.height
	,   currTex    = roadImg
	,   dy         = 2
	,   ddy        = 2
	;

	ctx.clearRect(0,0,canvas.width, canvas.height);

	i = roadImg.height;

	while (i > 9) {
		ctx.drawImage(
			currTex,
			0,
			i,
			roadImg.width,
			1,
			0,
			canvasline--,
			canvas.width,
			1
		);
		dy += 5;
		ddy += dy;
		if (dy > 30) {
			dy = 0;
			ddy = 0;
			currTex = (currTex === roadImg) ? roadImgDark : roadImg;
		}
		i-=3;
	}

	c.texpos += vel;

	window.requestAnimationFrame(gameLoop);
}

roadImgDark.addEventListener('load', function (e) {
	window.requestAnimationFrame(gameLoop);
});
roadImg.addEventListener('load', function (e) {
	roadImgDark.src = roadImgDarkSrc;
	console.log(roadImg.width);
});
roadImg.src = roadImgSrc;


