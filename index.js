const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const input = $('input');
const controlBtn = $('.btn');
const contentList = $('.content-list')
const countAnnounce = $('.announce')
const clearAllBtn = $('.clear-btn')
const deleteBtns = $$('.btn-item')
// function 1: nếu ko có j thi sẽ hiện lên là nên điền thong tin vào
// function 2: khi click chuột thì phải add công việc vào 1 array, lưu array đó lên localStorage
// function 3: render
// function 4: hiện lên số công việc cần làm
// function 5 xóa tát cả

let dataArr = [];
controlBtn.addEventListener('click', handleApp)
clearAllBtn.addEventListener('click', clearAllItem)
input.onkeyup = () => {
    let inputData = input.value
    if(inputData.trim() != 0){
        controlBtn.classList.add("active")
    } else
    {
        controlBtn.classList.remove("active")
    }
}

function clearAllItem(){
    localStorage.removeItem("data")
    dataArr =[]
    contentList.innerHTML = ''
    countAnnounce.innerHTML = ''
    input.value = ''
}
function checkWorkingData(){
    let work = input.value;
    if(work == false){
        alert("hãy nhập công việc của bạn")
    };
};
function handleWork(){
    if(localStorage.getItem("data") === null){
        dataArr.push(input.value)
        localStorage.setItem("data", JSON.stringify(dataArr))
    } else {    
            dataArr = JSON.parse(localStorage.getItem("data"));
            dataArr.push(input.value)
            localStorage.setItem("data", JSON.stringify(dataArr))
    }
    input.value = ''
}
function render(){
    let newDataArr = JSON.parse(localStorage.getItem("data"))
    let renderData = newDataArr.map((item, index)=> {
        return(
            `<li class="list-item">
            <div>${item}</div>
            <button class="item-btn" onclick="deleteCurrentTask(${index})"><i class="fa-solid fa-trash-can"></i></button>
        </li>`
        );
    });
    contentList.innerHTML = renderData.join('')
}
function countWork(){
    countAnnounce.innerHTML = `Bạn có tất cả ${JSON.parse(localStorage.getItem("data")).length} công việc`
}
function deleteCurrentTask(i){
    let newDataArr = JSON.parse(localStorage.getItem("data"))
    newDataArr.splice(i, 1)
    localStorage.setItem("data", JSON.stringify(newDataArr))
    render()
    countWork()
}
function handleApp(){
    checkWorkingData();
    handleWork()
    render()
    countWork()
}
render()
countWork()