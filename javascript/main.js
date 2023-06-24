//// scroll  ////
onscroll=function(){

    if (scrollY > 300) {
        btnScroll.style.display="block";
    }
    else if(scrollY<300)
    {
        btnScroll.style.display="none";
    }
 }

 btnScroll.onclick=function(){
    scroll(0,0);
 }
 ////////////////////////////////////////////////  start /////////////////////////////////////////////////////
let mode ='create';
let tmp;
// getTotal
function getTotal(){
    if (price.value != '') {
        let result=(+price.value + +taxes.value + +ads.value)
        - +discount.value;
        total.innerHTML = result;
        total.style.background="#040"
    }
    else
    {
        total.innerHTML ='';
        total.style.backgroundColor="#a00d02"
    }
}

// create product

let dataPro;
if ( localStorage.product != null) {
    dataPro=JSON.parse(localStorage.product)
}else {
     dataPro=[];
}

submit.onclick=function(){
    let newPro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        catagory:catagory.value.toLowerCase(),
    }
    
    if (title.value != '' 
    && catagory.value!=''
    && price.value!=''
    && newPro.count <= 100  ) {
        if (mode === 'create') {
            if (newPro.count >1 ) {
                for (let i = 0; i <newPro.count; i++) {
                    dataPro.push(newPro)
                }
            } else {
                dataPro.push(newPro)
            }
        }else{
                dataPro [tmp]=newPro;
                mode="create"
                submit.innerHTML='Create';
                count.style.display="block";
        }
        clearData()
    }

    // save localstorage
    localStorage.setItem('product',JSON.stringify(dataPro))
    // console.log(dataPro);
   
    showData()
}

// clear input 

function clearData()
{
    title.value='' ;
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    catagory.value='';
}

// Read data (on table)
function showData(){

    getTotal();
    let table='';
    for (let i = 0; i < dataPro.length; i++) {
    
        table +=
        `
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].catagory}</td>
        <td><button onclick="updataproData(${i})" id="updata">Updata</button></td>
        <td><button onclick="DeletProData( ${i} )" id="delete">Delete</button></td>
        
    </tr>
        `
    }
    tbody.innerHTML=table;

    // count 
    if(dataPro.length > 0)
    {
        DeleteAll.innerHTML=
        `<button onclick="deleteAll()" >Delete All (${dataPro.length})</button>`
        DeleteAll.style.margin="20px 0";
    }
    else {
        DeleteAll.innerHTML=''
    }
}

showData()

// delete product

function DeletProData(i){
dataPro.splice(i,1) // to remove only one 
localStorage.product= JSON.stringify(dataPro)
showData();
}

/// delete All products 

function deleteAll(){
    dataPro.splice(0); // to remove all 
    localStorage.clear();
    showData();
}

/// updata data 

function updataproData(i){
   title.value=dataPro[i].title;
   price.value=dataPro[i].price;
   taxes.value=dataPro[i].taxes;
   ads.value=dataPro[i].ads;
   discount.value=dataPro[i].discount;
   getTotal();
   count.style.display="none";
   catagory.value=dataPro[i].catagory;

   submit.innerHTML='updata';
   mode="update"
   tmp=i;
   scroll({
    top:0
   })
}



///// search 

let searchMode='title'
function getSearchMode(id){
    if (id == "searchTitle") {
        searchMode='title'
        search.placeholder='Search By Title'
    }else
    {
        searchMode='catagory'
        search.placeholder='Search By Catagory'
    }
    search.focus();
    search.value='';
    showData();
}


function SearchData(value){


    let table= '';
if (searchMode == "title") {
    for (let i = 0; i < dataPro.length; i++) 
    {

        if (dataPro[i].title.includes(value.toLowerCase())) {
           
            table +=
            `
        <tr>

            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].catagory}</td>
            <td><button onclick="updataproData(${i})" id="updata">Updata</button></td>
            <td><button onclick="DeletProData( ${i} )" id="delete">Delete</button></td>
            
        </tr>
            `

        }

    }
} 
else
{
    for (let i = 0; i < dataPro.length; i++) {

        if (dataPro[i].catagory.includes(value.toLowerCase())) {
           
            table +=
            `
        <tr>

            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].catagory}</td>
            <td><button onclick="updataproData(${i})" id="updata">Updata</button></td>
            <td><button onclick="DeletProData( ${i} )" id="delete">Delete</button></td>
            
        </tr>
            `

        }

        } 
}
tbody.innerHTML=table;
}