const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = ()=>{
  // Lấy giá trị khi user nhập vào
  let userEnteredValue = inputBox.value;
  // Nếu user nhập vào giá trị ( không phải là khoảng trắng )
  if(userEnteredValue.trim() != 0){
      //  Thì nút add của ta sẽ sáng lên
      // Trường hợp mình nhập toàn khoảng trắng ( space ) thì sẽ không sáng lên nhé 
      addBtn.classList.add("active");
  } else {
      // Ngược lại thì không sáng nè
      addBtn.classList.remove("active");
  }
}


// Xử lý sự kiện khi người dùng ấn phím "Enter"
inputBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của phím "Enter"
        addTask(); // Gọi hàm thêm công việc
    }
});

// Xử lý sự kiện khi người dùng nhấn nút "Add"
addBtn.onclick = () => {
    addTask(); // Gọi hàm thêm công việc
};

function addTask() {
    let userEnteredValue = inputBox.value;
    let getLocalStorageData = localStorage.getItem("New todo");
    let listArray;
    if (getLocalStorageData == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(getLocalStorageData);
    }
    listArray.push(userEnteredValue);
    localStorage.setItem("New todo", JSON.stringify(listArray));
    showTasks();
    addBtn.classList.remove("active");
}

function showTasks() {
    let getLocalStorageData = localStorage.getItem("New todo");
    let listArray;
    if (getLocalStorageData == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(getLocalStorageData);
    }
    const pendingTasksNumb = document.querySelector(".pendingTasks");
    pendingTasksNumb.textContent = listArray.length;
    if (listArray.length > 0) {
        deleteAllBtn.classList.add("active");
    } else {
        deleteAllBtn.classList.remove("active");
    }
    let newLiTag = "";
    listArray.forEach((element, index) => {
        newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = "";
}

function deleteTask(index) {
    let getLocalStorageData = localStorage.getItem("New todo");
    let listArray = JSON.parse(getLocalStorageData);
    listArray.splice(index, 1);
    localStorage.setItem("New todo", JSON.stringify(listArray));
    showTasks();
}

deleteAllBtn.onclick = () => {
    let listArray = [];
    localStorage.setItem("New todo", JSON.stringify(listArray));
    showTasks();
};
