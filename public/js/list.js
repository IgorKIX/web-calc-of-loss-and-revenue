var adminsList = document.querySelector('.admin-list');
var streetsArrayOfLists = [];
var jobsArrayOfLists = [];

window.onload = () => {
    getAdmins();
}

function getAdmins(){
    var request = new XMLHttpRequest();
    request.open('GET', 'admins/');
    request.onload = () => {
        const data = JSON.parse(request.responseText);
        addItem(adminsList, data);
    }
    request.send();
}

function getStreets(adminId){
    var request = new XMLHttpRequest();
    request.open('GET', `streets/${adminId}`);
    request.onload = () => {
        const data = JSON.parse(request.responseText);
        const elementPos = streetsArrayOfLists.map((x) => {return x.id}).indexOf(adminId);
        const objectFound = streetsArrayOfLists[elementPos];
        addItem(objectFound.selector, data);
    }
    request.send();
};

function getJobs(streetId) {
    var request = new XMLHttpRequest();
    request.open('GET', `jobs/${streetId}`);
    request.onload = () => {
        const data = JSON.parse(request.responseText);
        const elementPos = jobsArrayOfLists.map((x) => {return x.id}).indexOf(streetId);
        const objectFound = jobsArrayOfLists[elementPos];
        addItem(objectFound.selector, data);
    }
    request.send();
};
//id consists of text and text2, so there won't be a  problem with a few loaded street lists
function addItem(list, data) {
    let index = 0;
    const text = Object.getOwnPropertyNames(data)[1];
    const text2 = list.className;
    const array = data[text];
    list.innerHTML = array.map((obj, i) => {
        index = i;
        return `<li id="${text2}-${text}-${i}" data-index="${obj._id}">${obj.name}</li>`;
    }).join('');
    for(i = 0; i <= index; i++){
        const item = document.getElementById(`${text2}-${text}-${i}`);
        item.addEventListener('click', addList);
    }
};

function addList(e) {
    if(this.innerHTML.indexOf('ul') === -1){
        const newClass = `${this.id}-inner-ul`
        this.innerHTML += `<ul class="${newClass}"></ul>`;
        var selector = document.querySelector(`.${newClass}`);
        if(selector.className.indexOf('streets') === -1){
            streetsArrayOfLists.push({
                ['id']: this.dataset.index,
                ['selector']: selector
            });
            getStreets(this.dataset.index);
        } else {
            jobsArrayOfLists.push({
                ['id']: this.dataset.index,
                ['selector']: selector
            });
            getJobs(this.dataset.index);
        }
        
    }
}


    // for(i = 0; i< data.count; i++) {
    //     console.log(data);
    //     htmlString += '<p>' + data.admins[i].name + '</p>';
    // };
    // console.log(htmlString);
    // adminList.insertAdjacentHTML('beforeend', htmlString);
