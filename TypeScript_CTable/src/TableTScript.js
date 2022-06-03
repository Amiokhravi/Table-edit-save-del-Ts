var medal_box = document.getElementsByClassName('background_medal');
var table = document.getElementById('mytable');
function show_edit() {
    medal_box[1].style.display = 'block';
}
function show_save() {
    medal_box[0].style.display = 'block';
}
function remove_medal() {
    for (var i = 0; i < medal_box.length; i++)
        medal_box[i].style.display = 'none';
}
remove_medal();
var save_button = document.getElementById('save');
save_button.addEventListener('click', add_row);
debugger;
var edit_button = document.getElementById('edit_save');
var cancel_button = document.getElementsByClassName('cancel');
for (var i = 0; i < cancel_button.length; i++) {
    cancel_button[i].addEventListener('click', remove_medal);
}
var addButton = document.querySelector("#add_icon");
addButton.addEventListener('click', show_save);
function add_row() {
    debugger;
    var name;
    var age;
    var city;
    var country;
    //گرفتن مقادیر فرم مدال
    function get_data() {
        medal_box[0].style.display = 'block';
        name = document.getElementById('name').value;
        age = document.getElementById('age').value;
        city = document.getElementById('city').value;
        country = document.getElementById('country').value;
    }
    //وارد کردن اطلاعات
    function insert_data() {
        var current_row_number = document.getElementById("mytable").lastElementChild.lastElementChild.firstElementChild.innerHTML;
        var row = table.insertRow();
        current_row_number++;
        for (var i = 0; i < table.rows[1].cells.length; i++) {
            var var_saves = [current_row_number, name, age, city, country];
            var cell = row.insertCell(i);
            cell.innerHTML = var_saves[i];
            if (i === 5) {
                cell.innerHTML = '<i class="bi bi-pencil-square edit"></i> <i class="bi bi-trash delete"></i>';
            }
        }
        remove_medal();
    }
    // @ts-ignore
    var runs = new Promise(function (resolve, reject) {
        get_data();
        resolve();
    });
    runs.then(function () {
        insert_data();
    });
}
window.onclick = function (event) {
    if (event.target === medal_box) {
        remove_medal();
    }
};
//کد های مربوط به ویرایش جدول
window.onclick = function (event) {
    debugger;
    if (event.target.className == 'bi bi-pencil-square edit') {
        console.log(event.target);
        show_edit();
        edit(event);
        // edit_button.addEventListener('click', insert_editing)
    }
    else if (event.target.className == 'bi bi-trash delete') {
        debugger;
        delete_row(event);
    }
};
var c_row;
function edit(event) {
    // get_data_tbl
    debugger;
    var row = event.target.parentElement.parentElement;
    row.cells;
    var current_row_number = row.cells[0].innerHTML
    var now_name = row.cells[1].innerHTML;
    var now_age = row.cells[2].innerHTML;
    var now_city = row.cells[3].innerHTML;
    var now_country;
    now_country = row.cells[4].innerHTML;
    (document.getElementById('edit_name')).value = now_name;
    (document.getElementById('edit_age')).value = now_age;
    (document.getElementById('edit_city')).value = now_city;
    (document.getElementById('edit_country')).value = now_country;
    // remove_medal()
    return c_row = row.cells;
}
function edit_tbl() {
    var current_row_number = c_row[0].innerHTML;
    // inert_data
    var new_name = document.getElementById('edit_name').value;
    var new_age = document.getElementById('edit_age').value;
    var new_city = document.getElementById('edit_city').value;
    var new_country = document.getElementById('edit_country').value;
    var arrying = [current_row_number, new_name, new_age, new_city, new_country];
    for (var i = 1; i <= 4; i++) {
        c_row[i].innerHTML = arrying[i];
    }
    remove_medal();
}
edit_button.addEventListener('click', function (e_tbl) {
    console.log('111111');
    debugger;
    edit_tbl();
});
//delete
function delete_row(event) {
    var row_index;
    // @ts-ignore
    row_index = event.target.parentElement.parentElement.sectionRowIndex + 2
    document.getElementById("mytable").deleteRow(row_index);
}
//paging
function Pager(tableName, itemsPerPage) {
    'use strict';
    this.tableName = tableName;
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.pages = 0;
    this.inited = false;
    this.showRecords = function (from, to) {
        var rows = document.getElementById(tableName).rows;
        // i starts from 1 to skip table header row
        for (var i = 1; i < rows.length; i++) {
            if (i < from || i > to) {
                rows[i].style.display = 'none';
            }
            else {
                rows[i].style.display = '';
            }
        }
    };
    this.showPage = function (pageNumber) {
        if (!this.inited) {
            return;
        }
        var oldPageAnchor = document.getElementById('pg' + this.currentPage);
        oldPageAnchor.className = 'pg-normal';
        this.currentPage = pageNumber;
        var newPageAnchor = document.getElementById('pg' + this.currentPage);
        newPageAnchor.className = 'pg-selected';
        var from = (pageNumber - 1) * itemsPerPage + 1;
        var to = from + itemsPerPage - 1;
        this.showRecords(from, to);
        var pgNext = document.querySelector('.pg-next');
        var pgPrev = document.querySelector('.pg-prev');
        if (this.currentPage == this.pages) {
            pgNext.style.display = 'none';
        }
        else {
            pgNext.style.display = '';
        }
        if (this.currentPage === 1) {
            pgPrev.style.display = 'inline-block';
        }
        else {
            pgPrev.style.display = '';
        }
    };
    this.prev = function () {
        if (this.currentPage > 1) {
            this.showPage(this.currentPage - 1);
        }
    };
    this.next = function () {
        if (this.currentPage < this.pages) {
            this.showPage(this.currentPage + 1);
        }
    };
    this.init = function () {
        var rows = document.getElementById(tableName).rows;
        var records = (rows.length - 1);
        this.pages = Math.ceil(records / itemsPerPage);
        this.inited = true;
    };
    this.showPageNav = function (pagerName, positionId) {
        if (!this.inited) {
            return;
        }
        var element = document.getElementById(positionId), pagerHtml = '<span onclick="' + pagerName + '.prev();" class="pg-normal pg-prev">&#171;</span>';
        for (var page = 1; page <= this.pages; page++) {
            pagerHtml += '<span id="pg' + page + '" class="pg-normal pg-next" onclick="' + pagerName + '.showPage(' + page + ');">' + page + '</span>';
        }
        pagerHtml += '<span onclick="' + pagerName + '.next();" class="pg-normal">&#187;</span>';
        element.innerHTML = pagerHtml;
    };
}
var pager = new Pager('mytable', 3);
pager.init();
pager.showPageNav('pager', 'pageNavPosition');
pager.showPage(1);
var pageNav = document.getElementById('pageNavPosition');
// searchbox
function search() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("Search");
    filter = input.value.toUpperCase();
    table = document.getElementById("mytable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            }
            else {
                tr[i].style.display = "none";
            }
        }
    }
}
var searchbox = document.getElementById('Search');
searchbox.addEventListener('keyup', search);
// Sort
function sortTable(n) {
    debugger;
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("mytable");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 2; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("td")[n];
            y = rows[i + 1].getElementsByTagName("td")[n];
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
            else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        }
        else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
