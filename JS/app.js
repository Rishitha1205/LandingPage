let ulNavMenu = document.getElementById('navList');

let everySections= document.querySelectorAll('section');


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

let ulNavList =[];

// build the nav
everySections.forEach(obj => {

    
    let Id = obj.getAttribute("id");

    let Data = obj.getAttribute("naviData");

    ulNavList+= `<li class='menu__link ${obj.className}' data-link=${Id}><a href="#${Id}">${Data}</li>`

});
// Adding Navlist by using innerHtml
ulNavMenu.innerHTML = ulNavList; 


let viewportOffSet = (obj) =>{

    return Math.floor(obj.getBoundingClientRect().top);
};

// Removing "your-active-class" Class
let activeClassRemoval = (obj) =>{

    obj.classList.remove("your-active-class");

};

// Adding "your-active-class" Class
let activeClassAddition = (conditional, obj) =>{
    
    if(conditional){
        
        obj.classList.add("your-active-class");
    
    };

};

let activationSection = () =>{

    everySections.forEach(obj => {

        let elementOffset = viewportOffSet(obj);

        inviewport = () => elementOffset <200 && elementOffset >= -200;

        activeClassRemoval(obj);  
        
        activeClassAddition(inviewport(),obj);
    });
};

// Calling sectionOnActivation while scrolling to add or remove "your-active-class"
window.addEventListener('scroll',activationSection); 






// Scroll to respected sections on clicking the navBar items
ulNavMenu.addEventListener('click', event => {

    event.preventDefault();

    let parent = event.target.hasAttribute('data-link') ? event.target : event.target.parentElement;

    let scrollToElement = document.getElementById(parent.dataset.link);

    scrollToElement.scrollIntoView({block: 'end', behavior: 'smooth'});
});




//To make sure which section is being viewed while scrolling through the page.
let makeSectionActive = all => {

  all.forEach(obj => {

    let naviElement = document.querySelector(`.menu__link[data-link='${obj.target.id}']`,);

    let section = document.getElementById(obj.target.id);

    if(!(obj && obj.isIntersecting)){

      if (naviElement.classList.contains('active')) {

        naviElement.classList.remove('active');
      }
    }
    else{

      naviElement.classList.add('active');

      section.classList.add('active');
    };

 
  });
};



let objectChose = {root: null,threshold: 0.8};


//Setting the result with chooseObject, to make the nav links are active
let result = new IntersectionObserver(makeSectionActive, objectChose);

everySections.forEach(obj => {

    result.observe(document.getElementById(obj.id))
});



