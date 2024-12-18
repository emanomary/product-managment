//get variales of inputs
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let tableBody = document.getElementById('tableBody');
let deleteAll = document.getElementById('deleteAll');
let productArray;
let mood = 'create';
let tmp;
let searchMood = 'title';

//get total price
const getTotal = () => {
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }else{
        total.innerHTML = '';
        total.style.background = '#851111';
    }
}

//to check id there are data in storage to add data to it 
if(localStorage.products != null){
    productArray = JSON.parse(localStorage.products);
}else{
    productArray = [];
}

//create product
const createProduct = () => {
    //create new object
    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    //ckeck the number of count that we must create products
    if(title.value != '' && price.value != '' && category.value != '' && newProduct.count < 100){
        if(mood === 'create'){
            if(newProduct.count > 1){
                for(let i = 0; i < newProduct.count; i++){
                    //add new object to array
                    productArray.push(newProduct);
                }
            }else{
                productArray.push(newProduct);
            }
        }else{
            productArray[tmp] = newProduct;
            submit.innerHTML = 'إنشاء';
            mood = 'create';
            count.style.display = 'block';
        }
        //call clear data from inputs
        clearData();
    }
    
    
    //add data of array to local storage with name products
    localStorage.products = JSON.stringify(productArray);
    
    //show data after create new product
    showProduct();
}

//clear data
const clearData = () => {
    //clear data from inputs
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
    total.style.background = '#851111';
}

//show data in table
const showProduct = () => {
    let tableShow = '';
    for(let i = 0; i < productArray.length; i++){
        tableShow += `
        <tr>
            <td>${i+1}</td>
            <td>${productArray[i].title}</td>
            <td>${productArray[i].price}</td>
            <td>${productArray[i].taxes}</td>
            <td>${productArray[i].ads}</td>
            <td>${productArray[i].discount}</td>
            <td>${productArray[i].total}</td>
            <td>${productArray[i].category}</td>
            <td><button onclick="updateProduct(${i})" id="update">تعديل</button></td>
            <td><button onclick="deleteProduct(${i})" id="delete">حذف</button></td>
        </tr>
        `;
    }
    //put table in body of table
    tableBody.innerHTML = tableShow;
    //show delete all product button if there are data in table
    if(productArray.length > 0){
        let deleteAllProducts = `<button onclick="deleteAllProducts()" id="deleteAll">مسح الكل (${productArray.length})</button>`;
        deleteAll.innerHTML =deleteAllProducts;
    }else{
        deleteAll.innerHTML = '';
    }
}
//call function after declaration
showProduct();

//delete one record from table
const deleteProduct = (i) => {
    //delete product from array
    productArray.splice(i,1);
    //put array after delete product in local storage
    localStorage.products = JSON.stringify(productArray);
    //show data
    showProduct();
}

//delete all records from table
const deleteAllProducts = () => {
    //delete product from array
    productArray.splice(0);
    //put array after delete product in local storage
    localStorage.clear();
    //show data
    showProduct();
}

//update record from table
const updateProduct = (i) => {
    title.value = productArray[i].title;
    price.value = productArray[i].price;
    taxes.value = productArray[i].taxes;
    ads.value = productArray[i].ads;
    discount.value = productArray[i].discount;
    total.innerHTML = productArray[i].total;
    count.style.display = 'none';
    category.value = productArray[i].category;
    submit.innerHTML = 'تعديل';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    });
}

//search function to get search mood
const getSearchMood = (i) => {
    let search = document.getElementById('search');
    if(i == 'searchTitle'){
        searchMood = 'العنوان';
    }else{
        searchMood = 'التصنيف';
    }
    search.placeholder = 'البحث ب' +searchMood;
    search.focus();
    search.value = '';
    showProduct();
}

const searchData = (value) =>{
    let tableShow = '';
    for(let i = 0; i < productArray.length; i++){
        if(searchMood == 'title'){
            if(productArray[i].title.includes(value.toLowerCase())){
                tableShow += 
                `<tr>
                    <td>${i+1}</td>
                    <td>${productArray[i].title}</td>
                    <td>${productArray[i].price}</td>
                    <td>${productArray[i].taxes}</td>
                    <td>${productArray[i].ads}</td>
                    <td>${productArray[i].discount}</td>
                    <td>${productArray[i].total}</td>
                    <td>${productArray[i].category}</td>
                    <td><button onclick="updateProduct(${i})" id="update">تعديل</button></td>
                    <td><button onclick="deleteProduct(${i})" id="delete">حذف</button></td>
                </tr>`
                ;
            }
        }else{
            if(productArray[i].category.includes(value.toLowerCase())){
                tableShow += 
                `<tr>
                    <td>${i+1}</td>
                    <td>${productArray[i].title}</td>
                    <td>${productArray[i].price}</td>
                    <td>${productArray[i].taxes}</td>
                    <td>${productArray[i].ads}</td>
                    <td>${productArray[i].discount}</td>
                    <td>${productArray[i].total}</td>
                    <td>${productArray[i].category}</td>
                    <td><button onclick="updateProduct(${i})" id="update">تعديل</button></td>
                    <td><button onclick="deleteProduct(${i})" id="delete">حذف</button></td>
                </tr>`
                ;
            }
        }  
    }
    tableBody.innerHTML = tableShow;
}