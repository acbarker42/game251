window.getLight = function(){
	const background = document.createElement('div');
    background.style.display = "flex";
    background.style.margin = "0%";
    background.style.width = "100%";
    background.style.height = "100%";
    background.style.backgroundColor = 'black';
    background.style.zIndex = '1000';
    document.body.appendChild(background);

    const circleEl = document.createElement('div');   
    background.appendChild(circleEl);


    circleEl.style.position = "fixed";
    circleEl.style.top = "50%";
    circleEl.style.left = "50%";
    circleEl.style.transform = "translate(-50%, -50%)";
    circleEl.style.width = "30px";
    circleEl.style.height = "30px";
    circleEl.style.borderRadius = "50%"
    circleEl.style.transition = "transform 4s ease-in";
    circleEl.style.transformOrigin = "center";
    circleEl.style.background = "white";
    
    circleEl.addEventListener("mouseover", function(){circleEl.style.transform = "scale(100)";})
   
}