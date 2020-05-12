var items = [
    {
        user: 'Pesho',
        age: 23,
        gender: 'male',
        height: 173
    },
    {
        user: 'Gosho',
        age: 56,
        gender: 'male',
        height: 172
    },
    {
        user: 'Ivan',
        age: 34,
        gender: 'male',
        height: 178
    },
    {
        user: 'Penka',
        age: 30,
        gender: 'female',
        height: 177
    },
    {
        user: 'Ivan',
        age: 24,
        gender: 'male',
        height: 180
    }
];

function sortItemsBy(items, sortBy, isDescending) {
    return items.sort(function(a, b) {
        if (a[sortBy] < b[sortBy]) {
            return isDescending ? 1 : -1;
        }
        
        if (a[sortBy] > b[sortBy]) {
            return isDescending ? -1 : 1;
        }

        return 0;
    });
}

function drawHead(items) {
    var firstItem = items[0];

    var thead = document.createElement('thead');
    
    var tr = document.createElement('tr');

    for (var key in firstItem) {
        var th = document.createElement('th');

        th.textContent = key;
        th.setAttribute('data-sort-by', key);
        th.setAttribute('data-sort-direction', 'asc');

        tr.appendChild(th);
    }

    var th = document.createElement('th');
    th.textContent = 'Action';
    tr.appendChild(th);


    thead.appendChild(tr);

    table.appendChild(thead);
}

function drawBody(items) {
    var tbody = document.createElement('tbody');

    for (var i = 0; i < items.length; i++) {
        var item = items[i];

        var tr = document.createElement('tr');
        tr.setAttribute('data-id', i);
        for (var key in item) {
            var td = document.createElement('td');

            td.textContent = item[key];

            tr.appendChild(td);
        }
        
        var td = document.createElement('td');

        var editButton = document.createElement('button');
        var deleteButton = document.createElement('button');

        editButton.textContent = 'Edit';
        editButton.className = 'js-edit';

        deleteButton.textContent = 'Delete';
        deleteButton.className = 'js-delete';

        td.appendChild(editButton);
        td.appendChild(deleteButton);
        tr.appendChild(td);

        tbody.appendChild(tr);
    }

    table.appendChild(tbody);
}

function drawTable(items) {
    drawHead(items);
    drawBody(items);
}

var userInput = document.querySelector('.user');
var ageInput = document.querySelector('.age');
var genderInput = document.querySelector('.selectGender');
var addButton = document.querySelector('.addButton');

addButton.addEventListener('click', function(event){
    if (userInput.value !== '' && ageInput.value !== '' && genderInput.value !== ''){
        items.push({
            user: userInput.value, 
            age: ageInput.value, 
            gender: genderInput.value,
            height: 000
        });

        var tbody = table.querySelector('tbody');
    
        table.removeChild(tbody);

        drawBody(items);
    }
})

var sortInput = document.querySelector('.sortInput');
var sortButton = document.querySelector('.sortButton');

sortInput.addEventListener('keyup', function(event) {
    var filteredItems = items.filter(function(item) {
        for (var key in item) {
            if (String(item[key]).indexOf(event.target.value) > -1) {
                return true;
            }
        }
    });

    var tbody = table.querySelector('tbody');

    table.removeChild(tbody);

    drawBody(filteredItems);
});

var table = document.querySelector('table');

drawTable(items);

table.addEventListener('click', function(event) {
    var clickedElement = event.target;

    if (clickedElement.tagName.toLowerCase() === 'th') {
        var sortBy = clickedElement.getAttribute('data-sort-by');
        var sortDirection = clickedElement.getAttribute('data-sort-direction');
        var isDescending = sortDirection === 'desc';
        var sortedItems = sortItemsBy(items, sortBy, isDescending);

        clickedElement.setAttribute('data-sort-direction', !isDescending ? 'desc' : 'asc');

        var tbody = table.querySelector('tbody');

        table.removeChild(tbody);

        drawBody(sortedItems);
    } else if (clickedElement.className === 'js-edit') {
        clickedElement.textContent = 'Save';
        clickedElement.className = 'js-save';

        var rowElements = clickedElement.parentNode.parentNode.children;

        for (var td = 0; td < rowElements.length - 1; td++) {
            var input = document.createElement('input');
            input.value = rowElements[td].textContent;
            rowElements[td].textContent = '';
            rowElements[td].appendChild(input);
        }
    } else if (clickedElement.className === 'js-save') {
        clickedElement.textContent = 'Edit';
        clickedElement.className = 'js-edit';

        var row = clickedElement.parentNode.parentNode;
        var rowId = row.getAttribute('data-id');
        var rowElements = row.children;

        for (var td = 0; td < rowElements.length - 1; td++) {
            var inputValue = rowElements[td].querySelector('input').value;

            rowElements[td].innerHTML = inputValue;

            items[rowId][Object.keys(items[rowId])[td]] = inputValue;
        }
    } else if (clickedElement.className === 'js-delete') {
        var row = clickedElement.parentNode.parentNode;
        var rowId = Number(row.getAttribute('data-id'));
        
        row.parentNode.removeChild(row);

        items.splice(rowId, 1);
    }
});
