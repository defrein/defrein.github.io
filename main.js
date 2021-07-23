// sidebar navigation
let navLinks = document.getElementById("navLinks");

function showMenu() {
    navLinks.style.right = "0";
}

function hideMenu() {
    navLinks.style.right = "-200px";
}

//comment system
let add = () => {
    let name = document.querySelector('.container-comment #name');
    let comment = document.querySelector('.container-comment #comment');

    if (name.value !== "" && comment.value != "") {
        let list = document.querySelector('.list');
        let time = new Date();
        let h = time.getHours();
        let m = time.getMinutes();
        let s = time.getSeconds();
        let now = h + ":" + m + ":" + s;
        let list_item = document.createElement("l1");

        list_item.innerHTML = `
        <span>
        <p>${name.value} ${now}</p></span>
        <p>${comment.value}</p>`;
        list.append(list_item);
    }
    if (name.value == "" || comment.value == "") {
        let list = document.querySelector('.list');
        let list_item = document.createElement("l2");
        var warn = 'Tolong masukkan nama dan komentar!';
        list_item.innerHTML = `
        <span><p>${warn}</p></span>`;
        list.append(list_item);

    }
    name.value = comment.value = "";
}