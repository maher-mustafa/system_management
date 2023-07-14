//--------------inputs
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let creat = document.getElementById("submit");
//*****************outputs

let searchTitle = document.getElementById("searchTitle");
let searchCategory = document.getElementById("searchCategory");
let state = "create";
let index;
let table = document.getElementById("tbody");

// get total

function getTotal() {
    if (price.value != '') {
        let subTotal = (+price.value+ +taxes.value + +ads.value )- (+discount.value);
        total.innerHTML = subTotal;
        total.style.cssText = `background:#040;`;
    }
    else {
        total.innerHTML = '';
         total.style.cssText = `background:#a00d02;`;

    }
    
}
// creat product
let dataPro = JSON.parse(localStorage.getItem("products"))?JSON.parse(localStorage.getItem("products")):[];
creat.addEventListener('click', () => {
    let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        category:category.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        
    }
    if (state === "create") {
          
        if (+newPro.count > 1)
            for (i = 0; i < +newPro.count; i++) {
                dataPro.push(newPro);
            }
        else dataPro.push(newPro);
    } else {
        dataPro[index] = newPro;
        creat.innerHTML = `create`;
        creat.style.cssText = `background:rgb(142, 216, 31);`;
        state = 'create';
         count.style.display = `inline`;
    }
    // save in localstorage
    localStorage.setItem("products", JSON.stringify(dataPro));

    clearData();
    shoeData();
})

//clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    count.value = '';
    category.value = '';
    discount.value = '';
    total.innerHTML = '';
    
}
//read

function shoeData() {
    getTotal();
    let product = "";
    for (var i = 0; i < dataPro.length; i++) {
         product += `<tr>
                            <td>${i + 1}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button id="update" onclick="updateProduct(${i})">Update</button></td>
                            <td><button id="delete" onclick="deletProduct(${i})">Delete</button></td>

                        </tr>
                        `;
        
        
    }
        
    table.innerHTML = product;
    let deletAll = document.getElementById("deletAll");
    if (dataPro.length > 0) {
        deletAll.innerHTML = `<button onclick="deletAll()">DeletAll (${dataPro.length})</button>`;
    }
    else {
        deletAll.innerHTML = ``;
    }
}
shoeData();
// count

// delet
function deletProduct(i) {
    dataPro.splice(i, 1);
    localStorage.products = JSON.stringify(dataPro);
    shoeData();
}
function deletAll() {
    dataPro = [];
    localStorage.clear();
    shoeData();
}
//update
function updateProduct(i) {
    title.value = dataPro[i].title;
    taxes.value = dataPro[i].taxes;
    count.style.display = `none`;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    price.value = dataPro[i].price;
    category.value = dataPro[i].category;
    creat.innerHTML = `update`;
    creat.style.cssText = `background:blue;`;
    getTotal();
    state = "update";
    index = i;
    scroll({
        top: 0,
        behavior: 'smooth',// smooth or auto
    });
}
//search
let searchMode = "title";
function getSearch(id) {
    let search = document.getElementById("search");

    if (id == 'searchTitle') {
        searchMode = 'title';
        search.placeholder = 'search by title';
    }
    else {
        searchMode = 'category';
        search.placeholder ='search by categoty';
    }
    search.focus();
    // search.setAttribute("placeholder", `${id}`);
    // console.log(searchMode);
    search.value = '';
    shoeData();
}
function searchData(value) {
    value = value.toLowerCase();
    let product = '';
    if (searchMode == 'title') {
        for (var i = 0; i < dataPro.length; i++) {
            // var proName = dataPro[i]['title'].toLowerCase().trim();
            // value = value.toLowerCase().trim();
            if (dataPro[i].title.toLowerCase().includes(value)) {
                product += `<tr>
                            <td>${i + 1}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button id="update" onclick="updateProduct(${i})">Update</button></td>
                            <td><button id="delete" onclick="deletProduct(${i})">Delete</button></td>

                        </tr>
                        `;
        
            }
            table.innerHTML = product;
        }
    }
    else {
        for (var j = 0; j < dataPro.length; j++) {
            if (dataPro[j].category.toLowerCase().includes(value)) {
                product += `<tr>
                            <td>${j + 1}</td>
                            <td>${dataPro[j].title}</td>
                            <td>${dataPro[j].price}</td>
                            <td>${dataPro[j].taxes}</td>
                            <td>${dataPro[j].ads}</td>
                            <td>${dataPro[j].discount}</td>
                            <td>${dataPro[j].total}</td>
                            <td>${dataPro[j].category}</td>
                            <td><button id="update" onclick="updateProduct(${i})">Update</button></td>
                            <td><button id="delete" onclick="deletProduct(${i})">Delete</button></td>

                        </tr>
                        `;
        
            }
            table.innerHTML = product;
        }
    }

}


//clean data
