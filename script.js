let allMemo = JSON.parse(localStorage.getItem("allMemo"));
allMemo = allMemo ?? [];
render();

function saveNote() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const createdAt = getCurrentDateTime();

  allMemo.push({ title, content, createdAt, len: allMemo.length });

  localStorage.setItem("allMemo", JSON.stringify(allMemo));
  render();
  resetInput();
}

function resetInput() {
  document.querySelector("#title").value = "";
  document.querySelector("#content").value = "";
}

function render() {
  const display = document.getElementById("display");
  display.innerHTML = "";

  if (allMemo.length === 0) {
    document.querySelector(".memo-list").style.display = "none";
  } else {
    document.querySelector(".memo-list").style.display = "block";
  }

  for (const item of allMemo) {
    const memoListItem = document.createElement("li");
    const buttonWrap = document.createElement("div");
    const memoHeader = document.createElement("div");
    const saveDate = document.createElement("p");
    const deleteMemoBtn = document.createElement("button");
    const modifyMemoBtn = document.createElement("button");
    const memoContentWrap = document.createElement("div");
    const saveTitle = document.createElement("h3");
    const saveContent = document.createElement("div");

    memoHeader.setAttribute("class", "memo-header");
    buttonWrap.setAttribute("class", "button-wrap");
    saveDate.textContent = item.createdAt;
    saveTitle.textContent = item.title;
    saveContent.innerHTML = item.content.replaceAll("\n", "<br>");
    // saveContent.textContent = item.content;
    saveContent.setAttribute("class", "memo-content");
    memoContentWrap.setAttribute("class", "memo-wrap");
    deleteMemoBtn.textContent = "삭제";
    deleteMemoBtn.setAttribute("id", item.len);
    deleteMemoBtn.setAttribute("class", "btn-delete");
    deleteMemoBtn.setAttribute("onclick", "remove()");
    modifyMemoBtn.textContent = "수정";
    modifyMemoBtn.addEventListener("click", function () {
      editMemo(item.len);
    });
    modifyMemoBtn.setAttribute("class", "btn-delete");

    memoHeader.appendChild(saveDate);
    memoHeader.appendChild(buttonWrap);
    memoListItem.appendChild(memoHeader);
    buttonWrap.appendChild(modifyMemoBtn);
    buttonWrap.appendChild(deleteMemoBtn);
    memoContentWrap.appendChild(saveTitle);
    memoContentWrap.appendChild(saveContent);
    memoListItem.appendChild(memoContentWrap);

    display.prepend(memoListItem);
  }
}

function remove() {
  const idx = allMemo.find((item) => item.len == event.srcElement.id);
  if (idx) {
    allMemo.splice(
      allMemo.findIndex((item) => item.len == idx.len),
      1
    );
  }
  localStorage.setItem("allMemo", JSON.stringify(allMemo));
  render();
  showList();
}

const toggle = document.querySelector(".toggle");
const toggleContent = document.querySelector(".get-memo");

toggle.addEventListener("click", function () {
  if (toggleContent.style.display === "none") {
    toggleContent.style.display = "block";
  } else {
    toggleContent.style.display = "none";
  }
});

function getCurrentDateTime() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function editMemo(index) {
  const item = allMemo[index];

  const editForm = document.createElement("form");
  const editTitle = document.createElement("input");
  const editContent = document.createElement("textarea");
  const submitBtn = document.createElement("button");

  editTitle.value = item.title;
  editContent.value = item.content;

  editTitle.setAttribute("class", "modify-input");
  editContent.setAttribute("class", "modify-textarea");
  editContent.setAttribute("rows", "10");
  editForm.setAttribute("class", "modify-form");
  submitBtn.setAttribute("class", "modify-btn");

  submitBtn.textContent = "완료";
  submitBtn.addEventListener("click", function (event) {
    event.preventDefault();

    const editedTitle = editTitle.value;
    const editedContent = editContent.value;

    item.title = editedTitle;
    item.content = editedContent;
    localStorage.setItem("allMemo", JSON.stringify(allMemo));

    render();

    editForm.remove();
  });

  editForm.appendChild(editTitle);
  editForm.appendChild(editContent);
  editForm.appendChild(submitBtn);
  display.prepend(editForm);
}

function showList() {
  const memoList = document.querySelector(".memo-list");
  if (allMemo.length === 0) {
    memoList.style.display = "none";
  } else {
    memoList.style.display = "block";
  }
}

showList();
