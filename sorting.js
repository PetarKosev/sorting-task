function sortByName(a, b){
    if(a.user < b.user){
        return -1;
    }else if(a.user > b.user){
        return 1;
    }else{
        return 0;
    }
}

function sortByNameDescending(a, b){
    if(a.user < b.user){
        return 1;
    }else if(a.user > b.user){
        return -1;
    }else{
        return 0;
    }
}

function sortByAge(a, b){
    if(a.age < b.age){
        return -1;
    }else if(a.age > b.age){
        return 1;
    }else{
        return 0;
    }
}

function sortByAgeDescending(a, b){
    if(a.age < b.age){
        return 1;
    }else if(a.age > b.age){
        return -1;
    }else{
        return 0;
    }
}

function sortByGender(a, b){
    if(a.gender < b.gender){
        return -1;
    }else if(a.gender > b.gender){
        return 1;
    }else{
        return 0;
    }
}

function sortByGenderDescending(a, b){
    if(a.gender < b.gender){
        return 1;
    }else if(a.gender > b.gender){
        return -1;
    }else{
        return 0;
    }
}

function drawTable(){

    var tableHeadUser = document.createElement('th');
    tableHeadUser.textContent = 'User';
    var tableHeadAge = document.createElement('th');
    tableHeadAge.textContent = 'Age';
    var tableHeadSex = document.createElement('th');
    tableHeadSex.textContent = 'Gender';       
    var tableHead = document.createElement('thead');
    tableHead.appendChild(tableHeadUser);
    tableHead.appendChild(tableHeadAge);
    tableHead.appendChild(tableHeadSex);
    table.appendChild(tableHead);

    for (var i = 0; i < items.length; i++) {

        var tr = document.createElement('tr');
        var tdUser = document.createElement('td')
        var tdAge = document.createElement('td')
        var tdSex = document.createElement('td')
        tdUser.textContent = (items[i].user);
        tdAge.textContent = (items[i].age);
        tdSex.textContent = (items[i].gender);
        tr.appendChild(tdUser);
        tr.appendChild(tdAge);
        tr.appendChild(tdSex);
        table.appendChild(tr);
    }
}

var itemsInitial = [
    {
        user: 'Pesho',
        age: 23,
        gender: 'male'
    },
    {
        user: 'Gosho',
        age: 56,
        gender: 'male'
    },
    {
        user: 'Ivan',
        age: 34,
        gender: 'male'
    },
    {
        user: 'Penka',
        age: 30,
        gender: 'female'
    },
    {
        user: 'Ivan',
        age: 24,
        gender: 'male'
    }
];

var items = itemsInitial;
var filteredItems = [];

var userInput = document.querySelector('.user');
var ageInput = document.querySelector('.age');
var genderInput = document.querySelector('.gender');

var addButton = document.querySelector('.addButton');
addButton.addEventListener('click', function(event){
    if (userInput.value !== '' && ageInput.value !== '' && genderInput.value !== ''){
        itemsInitial.push({user: userInput.value, age: ageInput.value, gender: genderInput.value})
        items = itemsInitial;
        table.innerHTML = '';
        drawTable();
    }
})

var sortInput = document.querySelector('.sortInput');
var sortButton = document.querySelector('.sortButton');
sortButton.addEventListener('click', function(event){
    filteredItems = items.filter((n) => (n.user === sortInput.value));
    if (sortInput.value === '') {
        items = itemsInitial;
    } else if (filteredItems != []) {
        items = filteredItems;
    }
    table.innerHTML = '';
    drawTable();
})

flagUserName = true;
flagAge = true;
flagGender = true;

var table = document.querySelector('table');

drawTable();

table.addEventListener('click', function(event) {
    var clickedElement = event.target;

    if (clickedElement.tagName.toLowerCase() === 'th' && clickedElement.textContent === 'User' && flagUserName) {
        items.sort(sortByName);
        table.innerHTML = '';
        drawTable();
        flagUserName = false;
    } else if (clickedElement.tagName.toLowerCase() === 'th' && clickedElement.textContent === 'User' && !flagUserName) {
        items.sort(sortByNameDescending);
        table.innerHTML = '';
        drawTable();
        flagUserName = true;
    } else if (clickedElement.tagName.toLowerCase() === 'th' && clickedElement.textContent === 'Age' && flagAge) {
        items.sort(sortByAge);
        table.innerHTML = '';
        drawTable(); 
        flagAge = false;
    } else if (clickedElement.tagName.toLowerCase() === 'th' && clickedElement.textContent === 'Age' && !flagAge) {
        items.sort(sortByAgeDescending);
        table.innerHTML = '';
        drawTable();
        flagAge = true;       
    }else if (clickedElement.tagName.toLowerCase() === 'th' && clickedElement.textContent === 'Gender' && flagGender) {
        items.sort(sortByGender);
        table.innerHTML = '';
        drawTable();
        flagGender = false;
    } else if (clickedElement.tagName.toLowerCase() === 'th' && clickedElement.textContent === 'Gender' && !flagGender) {
        items.sort(sortByGenderDescending);
        table.innerHTML = '';
        drawTable();
        flagGender = true;
    }
})
