const weatherAPIKEY = "9d693b6ed43b10ad6645d10d4360ae23";
const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric`


//nav-menu opening and closing.
function menuhandler(){
    document.querySelector("#open-nav-menu").addEventListener("click", function(){
        document.querySelector("header nav .wrapper").classList.add("nav-open");
    });
    
    document.querySelector("#close-nav-menu").addEventListener("click", function(){
        document.querySelector("header nav .wrapper").classList.remove("nav-open");
    });
}

//temp conversion function
function celciusToFarh(val){
    let farh = (val * 9/5) + 32;
    return farh;
    };
    
//greeting work
function greetingHandler(){
    let greetingText;


    let currentHour = new Date().getHours();
   

    if(currentHour >= 4 && currentHour <12){
        greetingText = "Good Morning";
    
    }else if(currentHour >= 12 && currentHour < 17){
        greetingText = "Good noon";
    }else if(currentHour >= 17 && currentHour < 21){
        greetingText = "Good evening!";
    }else if((currentHour >= 21 && currentHour<0) || (currentHour >= 0 && currentHour < 4)){
        greetingText = "Fun night";
    }
    document.querySelector("#greeting").innerHTML = greetingText;
}
//weather Handler
function weatherHandler(){
    navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position);
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let url = weatherAPI.replace("{lat}",latitude).replace("{lon}",longitude).replace("{API key}",weatherAPIKEY);
        fetch(url)
        .then(response => response.json())
        .then(data => { console.log(data);
            const condition = data.weather[0].description;
            const location = data.name;
            let temperature = data.main.temp;
            console.log(condition,location,temperature);
    
            let celciusText = `The weather is ${condition} in ${location} and it's ${temperature.toFixed(1)} outside`;
    
    let farhText = `The weather is ${condition} in ${location} and it's ${celciusToFarh(temperature.toFixed(1))} outside`;
    
    
    document.querySelector("p#weather").innerHTML = celciusText;
    
    document.querySelector(".weather-group").addEventListener("click",function(e){
        if(e.target.id == "celsius"){
            document.querySelector("p#weather").innerHTML = celciusText;
        } else if(e.target.id == "fahr"){
            document.querySelector("p#weather").innerHTML = farhText;
        }
     console.log(e.target.id);
    });
    
        });
    
       
    });
}
//Date - Time

function dateTimeHandler(){
    setInterval(function(){
        let localTime = new Date();
        document.querySelector("span[data-time=hours]").textContent = localTime.getHours().toString().padStart(2,"0");
        document.querySelector("span[data-time=minutes]").textContent = localTime.getMinutes().toString().padStart(2,"0");
        document.querySelector("span[data-time=seconds]").textContent = localTime.getSeconds().toString().padStart(2,"0");
    
    },1000);
}

//Image Gallery
function galleryHandler(){
    const galleryImages = [
        {
            src : "./assets/gallery/image1.jpg",
            alt : "Thumbnail Image 1"
        },
        {
            src : "./assets/gallery/image2.jpg",
            alt : "Thumbnail Image 2"
        }, {
            src : "./assets/gallery/image3.jpg",
            alt : "Thumbnail Image 3"
        },
    ];
    
    let mainImage = document.querySelector("#gallery > img");
    mainImage.src = galleryImages[0].src;
    mainImage.alt = galleryImages[0].alt;
    
    
    let thumbnails = document.querySelector("#gallery  .thumbnails");
    
    
    {/* <img src="./assets/gallery/image1.jpg" alt="Thumbnail Image 1" data-array-index="0" data-selected="true"> */}
    
    galleryImages.forEach(function(image,index){
    
        let thumb = document.createElement("img");
        thumb.src = image.src;
        thumb.alt = image.alt;
        thumb.dataset.arrayIndex = index;
        thumb.dataset.selected= index===0? true : false;
    
        thumb.addEventListener("click", function(e){
        let selectedIndex =  e.target.dataset.arrayIndex;
        let selectedImage = galleryImages[selectedIndex];
    
        mainImage.src = selectedImage.src;
        mainImage.alt = selectedImage.alt;
    
        thumbnails.querySelectorAll("img").forEach(function(img){
            img.dataset.selected = false;
        });
    
        e.target.dataset.selected = true;
    
        });
    
        thumbnails.appendChild(thumb);
    });
}


//Populate Products

//Products handler

//  <div class="product-item">
//             <img src="./assets/products/img6.png" alt="AstroFiction">
//             <div class="product-details">
//                <h3 class="product-title">AstroFiction</h3>
//                <p class="product-author">John Doe</p>
//                <p class="price-title">Price</p>
//                <p class="product-price">$ 49.90</p>
//             </div>
//          </div> 
function populateProducts(productList){
    let productsSection = document.querySelector(".products-area");
     productsSection.textContent = "";

    productList.forEach(function(product){
        let productElm = document.createElement("div");
        productElm.classList.add("product-item");
    //  console.log(product);
     //creating product-image.
        let productImage = document.createElement("img");
        productImage.src = product.image;
        productImage.alt = "Image for " + product.title;
   
        //creating product-details
        let  productDetails = document.createElement("div");
        productDetails.classList.add("product-details");
   
              //creating product title, author, pricetitle and price
              //product-title
              let productTitle = document.createElement("h3");
              productTitle.classList.add("product-title");
              productTitle.textContent = product.title;
              //add product title to productDetials
              productDetails.append(productTitle);
   
              //product-author
              let productAuthor = document.createElement("p");
              productAuthor.classList.add("product-author");
              productAuthor.textContent = product.author;
              //add product title to productDetials
              productDetails.append(productAuthor);
   
              //price-title
              let priceTitle = document.createElement("p");
              priceTitle.classList.add("price-title");
              priceTitle.textContent = "Price";
              //add price title to productDetials
              productDetails.append(priceTitle);
              
              //price
              let productPrice = document.createElement("p");
              productPrice.classList.add("product-price");
              productPrice.textContent =product.price>0 ?"Rs "+ product.price.toFixed(2) : "Free";
              //add product title to productDetials
              productDetails.append(productPrice);
   
        productElm.append(productImage);
        productElm.append(productDetails);
   
productsSection.append(productElm);
   });
}

function productsHandler(){
    const productsArr = [
        
            {
              title: "AstroFiction",
              author: "John Doe",
              price: 49.9,
              image: "./assets/products/img6.png"
            },
            {
              title: "Space Odissey",
              author: "Marie Anne",
              price: 35,
              image: "./assets/products/img1.png"
            },
            {
              title: "Doomed City",
              author: "Jason Cobert",
              price: 0,
              image: "./assets/products/img2.png"
            },
            {
              title: "Black Dog",
              author: "John Doe",
              price: 85.35,
              image: "./assets/products/img3.png"
            },
            {
              title: "My Little Robot",
              author: "Pedro Paulo",
              price: 0,
              image: "./assets/products/img5.png"
            },
            {
              title: "Garden Girl",
              author: "Ankit Patel",
              price: 45,
              image: "./assets/products/img4.png"
            }
          
    ];

    let freeProducts = productsArr.filter((items)=>!items.price || items.price <=0);
    let paidProducts = productsArr.filter((items)=> items.price >0);

populateProducts(productsArr);

let totalProducts = productsArr.length;
let freeProductsLength = freeProducts.length;
let paidProductsLength = paidProducts.length;

document.querySelector(".products-filter label[for=all]").textContent = totalProducts;
document.querySelector(".products-filter label[for=free]").textContent = freeProductsLength;
document.querySelector(".products-filter label[for=paid]").textContent = paidProductsLength;


let productsFilter = document.querySelector(".products-filter");
    productsFilter.addEventListener("click", function(e){
        // console.log(e.target.id);
        if(e.target.id === "paid"){
        
            populateProducts(paidProducts);
        }else if(e.target.id === "free"){
            populateProducts(freeProducts);
        }else {
            populateProducts(productsArr);
        } 
    });
};

function footerHandler(){
    let currentYear = new Date().getFullYear();
    document.querySelector("footer").textContent = `©${currentYear} - All rights reserved.`;
}


menuhandler();
greetingHandler();
dateTimeHandler();
galleryHandler();
productsHandler();
footerHandler();
weatherHandler();