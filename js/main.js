var token = config.MY_API_TOKEN;
var key = config.SECRET_API_KEY; //didnt end up needing this

//i am on risky branch how did I do?
//declare empty data variable

let catData 

//fetch the data
//https://api.thecatapi.com/v1/images/search?breed_ids={breed-id}
// https://api.thecatapi.com/v1/breeds
const BREEDS_URL = `https://api.thecatapi.com/v1/breeds?${key}` //breeds api //has all info like temperament
const select = document.querySelector('.breeds') //grabbing breed name

fetch(BREEDS_URL)
    .then(res => res.json())
    .then(data => {
        //  then assign the data
        catData = data
        console.log(catData)
        
      
        return catData //next then is receiving that cat data
        
    })
    .then(res => {
        //  then inject the options into the dropdown
        for(let i = 0; i < res.length; i++){
           //since three names do not have image url remove them from dropdown
                if((res[i].name === 'Persian' || res[i].name === 'European Burmese' || res[i].name === 'Malayan')){
                    console.log('found')
                    continue
                }
             
   
          
            let option = document.createElement('option') 
            option.value = res[i].name
            option.innerText = res[i].name
            select.appendChild(option) //put breeds in drop down
            
        }
    })


//add event listener to dropdown

select.addEventListener('change', event => { //on click of breed name from select



    let clearIt = document.querySelectorAll('.clear') 
    console.log(clearIt)
    if(clearIt.length > 0){
    [...clearIt].forEach(node => node.remove())
    }
    // let temperamentElem = document.querySelector('h3')
    let breed = event.target.value
    let description = ''
    let catImgUrl = ''
    let temperament = ''
    let shedding = ''
    let energy = ''
    let affection= ''
    let intelligence = ''
    let social = ''
    let wiki = ''

    // temperamentElem.classList.toggle('hidden')



    for(let i = 0; i < catData.length; i++){ //interate through the catData
        breedName = catData[i].name //grabbing the name for my template literal

     
        if(catData[i].name === breed){ //array item name === breed that was clicked on catData[i].name
            description = catData[i].description
            catImgUrl = catData[i].image.url //  grab img endpoint and show image
            
            temperament = catData[i].temperament  //  grab temperament from data variable 
            wiki = catData[i].wikipedia_url
            console.log(wiki)
            affection = catData[i].affection_level //need to somehow get these 5 injected into table 
            energy = catData[i].energy_level
            shedding = catData[i].shedding_level
            intelligence = catData[i].intelligence
            social = catData[i].social_needs
//i need to take these 5 data points and inject them in order into the new cells i created
            let newArr = [affection, energy, shedding, intelligence, social]
            console.log(newArr)
            let table = document.querySelector('table')
            // generateTable(table)
            
            // function generateTable(table, data){
                    let row = table.insertRow() //create a new row 
                
                    for(let j = 0; j < newArr.length; j++){
                        let cell = row.insertCell() //within that row place a cell 5 times
                        row.classList.add('traitCells', 'clear') //add these classes
                         let text = innerText = newArr[j] //add the array data to text
                         cell.append(text) // add that text to each new cell created
                    }
           // }
            let tempList = temperament.split(',') //making temperament into array
            console.log(tempList)
            for(let i = 0; i < tempList.length; i++){ //for each trait
                console.log(i)
                const li = document.createElement('li') //create li
                li.classList.add('clear')
                li.innerText = tempList[i] //display the trait here
                document.querySelector('ul').appendChild(li)//append the li to ul
            }
            

        }   
    
    }
    // let parentLink = document.querySelector('.alink')
    // let a = document.createElement('a');
    // a.href = "#"
    // // a.textContent="Click here"
    // parentLink.appendChild(a);
  
    document.querySelector('.wikInfo').innerText = 'For more information about this breed please visit:'
    document.querySelector('.aLink').innerHTML = `<a href="${wiki}" target="_blank">${wiki}</a>`
    document.querySelector('p').innerText= description
    document.querySelector('img').src = catImgUrl
})