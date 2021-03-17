/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// API stuff
const API = {
    API_Site : `http://api.openweathermap.org/data/2.5/weather?zip=`,
    API_Key : `&appid=af9eb8a327b47166f04ced688668508b&units=metric`
};
 
// just a though

/* I was think to store data in the object by loop over two arrays ,but it doesn't work
 *
 * "requiredElements opject contain all the element we will need for this project ,it's elements come from looping over two arrays using index"
 *let requiredElements = {};
 *let IDs = ["#zip","#feelings","#generate","#temp","#date","#content"];
 *let elementName = ["zipCode","feelings","ClickFunction","temperture","TodayDate","text"];
 *
 * "loop over the above two arrays to store data into the object"
 *for(let i = 0;i<IDs.length;i++) requiredElements[elementName[i]] = document.getElementById(IDs[i]);
 */

 // continue our code

 // requiredElements opject contain all the element we will need for this project by get them by there ids
 
 const requiredElements = {
    zipCode : document.getElementById('zip'),
    feeling : document.getElementById('feelings'),
    generateFunction : document.getElementById('generate'),
    TodayData : document.getElementById('date'),
    temperture : document.getElementById('temp'),
    content : document.getElementById('content')
};



requiredElements.generateFunction.addEventListener('click', ()  =>{
    
    let zipCode = requiredElements.zipCode.value;
    fetchData(API.API_Site,zipCode,API.API_Key)
    .then((data)=>{
        console.log(data.main.temp);
        postData('/postRoute',  { temp : data.main.temp, date: newDate, feelings: requiredElements.feeling.value})
    .then(updateUI(data.main.temp))});
    
});


// here interpreter wait till the user inputs ,then get the data we wanted by the api
const fetchData = async (API_Site,zipCode,API_Key) => {
    const fetchAPI = await fetch(API_Site+zipCode+API_Key);
    try{
        const info = await fetchAPI.json();
        return info;
    }catch(error){
        console.error(`there is an error here in fetchData function and it is : ${error}`) 
        // this to handle the error and determine its place
    }
};


// here a function to post data
const postData = async ( url = ``, data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),       
  });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.error(`here is an error in postData function and it is : ${error}`);
    };
};


// here we update the UI 
const updateUI = async (temperture)=>{
    const response = await fetch('/all');
    try {
        const allData = response.json();
            requiredElements.TodayData.innerHTML = `Today 's Date : ${allData.date}` 
            requiredElements.temperture.innerHTML = `the temperture is : ${allData.temp}`
            requiredElements.content.innerHTML = `I am feeling : ${allData.feelings}`
    }catch(error) {
    console.error(`here is an error in updateUI function and it is : ${error}`);
    };

};

