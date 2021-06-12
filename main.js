
function viewerInit(dataURL, canvas) {
   let skinViewer = new skinview3d.SkinViewer({
		canvas: canvas,
		width: 300,
		height: 400,
		skin: dataURL
	});

   const background = new THREE.TextureLoader().load( "img/bg.jpg" );
   skinViewer.scene.background = background;

   skinViewer.scene.rotateX(0.1); 
   skinViewer.scene.rotateY(Math.PI/6);
   skinViewer.scene.rotateZ(0);

   return skinViewer;
}

let skinInput = document.querySelector('.skin-input');
    viewerArr = [];

skinInput.addEventListener('change', (e) => {

   console.log(skinInput.files)

   Array.from(skinInput.files).forEach((currentValue) => {
      let reader = new FileReader();
   
      reader.readAsDataURL(currentValue);
   
      reader.onload = function() {
         
         let canvas = document.createElement('canvas');
             canvas.classList.add('.skin-canvas');
             container = document.querySelector('.skin-container');
             canvas = container.appendChild(canvas);

         let skinViewer = viewerInit(reader.result, canvas);

         viewerArr.push(skinViewer);

         
      }
   });

   console.log(viewerArr);

})


let downloadBtn = document.querySelector('.download-btn');

downloadBtn.addEventListener('click', () => {

   let zip = new JSZip();

   viewerArr.forEach((currentValue, index)=>{
      let img = new Image();
      currentValue.renderer.render(currentValue.scene, currentValue.camera);
      img.src = currentValue.renderer.domElement.toDataURL("image/jpeg");

      let url = currentValue.renderer.domElement.toDataURL("image/jpeg");
          b64 = url.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");

      zip.file(index+'.jpg', b64, {base64: true});
   })

   zip.generateAsync({type:"blob"})
   .then(function(content) {
      saveAs(content, "dick.zip");
   })
})



