//کد های مربوط به وارد کردن اطلاعات به جدول
let medal_box = document.getElementsByClassName('background_medal')
let table = document.getElementById('mytable')

function show_edit() {
    medal_box[1].style.display = 'block';
}

function show_save() {
    medal_box[0].style.display = 'block';
}


function remove_medal() {
    for (let i = 0; i < medal_box.length; i++)
        medal_box[i].style.display = 'none';
}

remove_medal()


let save_button = document.getElementById('save')
save_button.addEventListener('click', add_row)
debugger
let edit_button = document.getElementById('edit_save')


// save_button.addEventListener('click',function (e){
//     debugger
//     console.log(e)
//     console.log(this)
//
// })


let cancel_button = document.getElementsByClassName('cancel')
for (let i = 0; i < cancel_button.length; i++) {
    cancel_button[i].addEventListener('click', remove_medal)
}


let addButton = document.querySelector("#add_icon");
addButton.addEventListener('click', show_save);


function add_row() {
    debugger
    let name;
    let age;
    let city;
    let country;

    //گرفتن مقادیر فرم مدال
    function get_data() {
        medal_box.style.display = 'block';
        name = document.getElementById('name').value
        age = document.getElementById('age').value
        city = document.getElementById('city').value
        country = document.getElementById('country').value
    }

//وارد کردن اطلاعات
    function insert_data() {
        let current_row_number = document.getElementById("mytable").lastElementChild.lastChild.firstElementChild.innerHTML;
        let row = table.insertRow();
        current_row_number++
        for (let i = 0; i < table.rows[0].cells.length; i++) {
            let var_saves = [current_row_number, name, age, city, country]
            let cell = row.insertCell(i);
            cell.innerHTML = var_saves[i]
            if (i === 5) {
                cell.innerHTML = '<i class="bi bi-pencil-square edit"></i> <i class="bi bi-trash delete"></i>'
            }

        }
        remove_medal()
    }

    const runs = new Promise((resolve, reject) => {
        get_data()
        resolve()
    })
    runs.then(() => {
        insert_data()
    })
}

window.onclick = function (event) {
    if (event.target === medal_box) {
        remove_medal()
    }
}

//کد های مربوط به ویرایش جدول
debugger


window.onclick = function (event) {
    debugger
    if (event.target.className == 'bi bi-pencil-square edit') {
        var e_tbl=event
        console.log(event.target)
        show_edit()
        edit(event).next()
        // edit_button.addEventListener('click', insert_editing)
    }
}

function* edit(event) {

    // get_data_tbl
    try{
        let row = event.target.parentElement.parentElement
        row.cells
        let current_row_number = row.cells[0].innerHTML
        let now_name = row.cells[1].innerHTML
        let now_age = row.cells[2].innerHTML
        let now_city = row.cells[3].innerHTML
        let now_country = row.cells[4].innerHTML
        // put_data_tbl
        document.getElementById('edit_name').value = now_name
        document.getElementById('edit_age').value = now_age
        document.getElementById('edit_city').value = now_city
        document.getElementById('edit_country').value = now_country
    }catch (error){
        edit_tbl()
        // remove_medal()
    }
    yield 1

    function* edit_tbl() {

        // inert_data
        let new_name = document.getElementById('edit_name').value
        let new_age = document.getElementById('edit_age').value
        let new_city = document.getElementById('edit_city').value
        let new_country = document.getElementById('edit_country').value
        let arrying = [current_row_number, new_name, new_age, new_city, new_country]
        for (let i = 1; i < 4; i++) {
            row.cells[i].innerHTML = arrying[i]
        }


    }

    yield 2
}

edit_button.addEventListener('click', function (e_tbl) {
    console.log('111111')
    edit(e_tbl).next()
})

///فرمول غلطش که باید اصلاج کنی
// window.onclick = function (event) {
//     debugger
//     if (event.target.className == 'bi bi-pencil-square edit') {
//         console.log(event.target)
//         show_edit()
//         let row = event.target.parentElement.parentElement
//         row.cells
//         let current_row_number = row.cells[0].innerHTML
//         let now_name = row.cells[1].innerHTML
//         let now_age = row.cells[2].innerHTML
//         let now_city = row.cells[3].innerHTML
//         let now_country = row.cells[4].innerHTML
//       document.getElementById('name').value = now_name
//       document.getElementById('age').value = now_age
//       document.getElementById('city').value = now_city
//        document.getElementById('country').value = now_country
//         function insert_editing(){
//             debugger
//             let new_name  =document.getElementById('name').value
//             let new_age = document.getElementById('age').value
//             let new_city = document.getElementById('city').value
//             let new_country= document.getElementById('country').value
//             let arrying=[current_row_number,new_name,new_age,new_city,new_country]
//             for (let i=1;i<4;i++){
//                 row.cells[i].innerHTML=arrying[i]
//             }
//
//         }
//
//         // edit_button.addEventListener('click', insert_editing)
//     }
// }
//paging

function Pager(tableName, itemsPerPage) {
    'use strict';

    this.tableName = tableName;
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.pages = 0;
    this.inited = false;

    this.showRecords = function (from, to) {
        let rows = document.getElementById(tableName).rows;

        // i starts from 1 to skip table header row
        for (let i = 1; i < rows.length; i++) {
            if (i < from || i > to) {
                rows[i].style.display = 'none';
            } else {
                rows[i].style.display = '';
            }
        }
    };

    this.showPage = function (pageNumber) {
        if (!this.inited) {
            // Not initialized
            return;
        }

        let oldPageAnchor = document.getElementById('pg' + this.currentPage);
        oldPageAnchor.className = 'pg-normal';

        this.currentPage = pageNumber;
        let newPageAnchor = document.getElementById('pg' + this.currentPage);
        newPageAnchor.className = 'pg-selected';

        let from = (pageNumber - 1) * itemsPerPage + 1;
        let to = from + itemsPerPage - 1;
        this.showRecords(from, to);

        let pgNext = document.querySelector('.pg-next'),
            pgPrev = document.querySelector('.pg-prev');

        if (this.currentPage == this.pages) {
            pgNext.style.display = 'none';
        } else {
            pgNext.style.display = '';
        }

        if (this.currentPage === 1) {
            pgPrev.style.display = 'inline-block';
        } else {
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
        let rows = document.getElementById(tableName).rows;
        let records = (rows.length - 1);

        this.pages = Math.ceil(records / itemsPerPage);
        this.inited = true;
    };

    this.showPageNav = function (pagerName, positionId) {
        if (!this.inited) {
            // Not initialized
            return;
        }

        let element = document.getElementById(positionId),
            pagerHtml = '<span onclick="' + pagerName + '.prev();" class="pg-normal pg-prev">&#171;</span>';

        for (let page = 1; page <= this.pages; page++) {
            pagerHtml += '<span id="pg' + page + '" class="pg-normal pg-next" onclick="' + pagerName + '.showPage(' + page + ');">' + page + '</span>';
        }

        pagerHtml += '<span onclick="' + pagerName + '.next();" class="pg-normal">&#187;</span>';

        element.innerHTML = pagerHtml;
    };
}

let pager = new Pager('mytable', 3);

pager.init();
pager.showPageNav('pager', 'pageNavPosition');
pager.showPage(1);

let pageNav = document.getElementById('pageNavPosition')
// pageNav.addEventListener('click',pager)
// table.addEventListener('change',pager)


// searchbox


function searchActive() {
    let input = document.getElementById('myInput');
    let tr = document.getElementsByTagName('tr');
    let filter = input.value.toUpperCase();

    for (let i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName('td')[0];
        if (td) {
            let txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}


// Sort

function sortTable(n) {
    let switchcount = 0;
    let switching = true;
    let dir = "asc";
    while (switching) {
        switching = false;
        let rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            var shouldSwitch = false;
            var x = rows[i].getElementsByTagName("td")[n];
            var y = rows[i + 1].getElementsByTagName("td")[n];
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
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
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}