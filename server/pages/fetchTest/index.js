function showUserList () {
    fetch('http://localhost:3000/users')
        .then((res) => res.json())
        .then((randomData) => {
            console.log(randomData)
            var rootDiv = document.getElementById('root');
            var userCardList = document.createElement('div');
                for(n = 0; n < randomData.length; n++){
                    var userId = randomData[n].id;
                    var userNameFirst = randomData[n].nameFirst;
                    var userNameLast = randomData[n].nameLast;
                    var userCard = document.createElement('div');
                        userCard.id = userId;
                        userCard.className = "userCard";
                        userCard.innerHTML = `
                            <input 
                                type="number" 
                                id="`+userId+`id" 
                                class="userTableInput userIdInput" 
                                value="`+userId+`"
                            >
                            <input 
                                type="text" 
                                id="`+userId+`nameFirst" 
                                class="userTableInput userNameFirstInput" 
                                value="`+userNameFirst+`"
                            >
                            <input 
                                type="text" 
                                id="`+userId+`nameLast" 
                                class="userTableInput userNameLastInput" 
                                value="`+userNameLast+`"
                            >
                            <button id="`+userId+`" name="deleteUser" onClick="updateUser('`+userId+`')">Update</button>
                            <button id="`+userId+`" name="deleteUser" onClick="deleteUser('`+userId+`')">Delete</button>
                        `;
                        userCardList.appendChild(userCard);
                }
            userCardList.className = 'userCardList';
            rootDiv.replaceChildren(userCardList);
    });
}

function addNewUser () {
    var inputId = document.getElementById('id').value;
    var inputNameFirst = document.getElementById('nameFirst').value;
    var inputNameLast = document.getElementById('nameLast').value;
    // var formTest = new FormData();
    var inputData = {id: inputId, nameFirst: inputNameFirst, nameLast: inputNameLast};
    var inputStr = JSON.stringify(inputData);
        // formTest.append(inputStr);
    console.log(inputData);
    console.log(inputStr);
    fetch("http://localhost:3000/users", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: inputStr, // body data type must match "Content-Type" header
      })
        .then((res) => res.json())
        .then((resStr) => {
            console.log(resStr.newUserRequest);
        })
}

function updateUser (params) {
    var updateId = JSON.stringify(params);
    var inputId = document.getElementById(updateId+'id');
        console.log(params);
        console.log(updateId);
        console.log(inputId);
    // var inputNameFirst = document.getElementById(userId+'nameFirst').value;
    // var inputNameLast = document.getElementById(userId+'nameLast').value;
    // // var formTest = new FormData();
    // var inputData = {id: inputId, nameFirst: inputNameFirst, nameLast: inputNameLast};
    // var inputStr = JSON.stringify(inputData);
    //     // formTest.append(inputStr);
    // console.log(inputData);
    // console.log(inputStr);
    // fetch("http://localhost:3000/users", {
    //     method: "UPDATE", // *GET, POST, PUT, DELETE, etc.
    //     headers: {
    //       "Content-Type": "application/json",
    //       // 'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     body: inputStr, // body data type must match "Content-Type" header
    //   })
    //     .then((res) => res.json())
    //     .then((resStr) => {
    //         console.log(resStr.newUserRequest);
    //     })
}

function deleteUser (data) {
    var deleteId = {deleteId: data};
    var deleteIdStr = JSON.stringify(deleteId);
    var deleteBtns = document.getElementsByName('deleteUser');
        console.log(deleteId);
        console.log(deleteIdStr);
        console.log(deleteBtns);
        fetch("http://localhost:3000/users", {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: deleteIdStr, // body data type must match "Content-Type" header
        })
        .then((res) => res.json())
        .then((resStr) => {
            console.log(resStr)
        })
        deleteBtns.forEach(btn => {
            var loopBtnId = btn.id;
                console.log(btn);
                console.log(loopBtnId);
                if(loopBtnId === deleteId){
                    console.log("idMatch")
                }
        })
}

function fetchTest3 () {
    fetch('http://localhost:3000/moduleTest')
        .then((res) => res.json())
        .then((randomData) => {
            console.log(randomData)
            var rootDiv = document.getElementById('root');
            for(n = 0; n < randomData.length; n++){
                var userId = randomData[n].id;
                var userNameFirst = randomData[n].nameFirst;
                var userNameLast = randomData[n].nameLast;
                var userCard = document.createElement('div');
                    userCard.innerHTML = `
                        <div>User ID: `+userId+`</div>
                        <div>User Firstname: `+userNameFirst+`</div>
                        <div>User Lastname: `+userNameLast+`</div>
                    `;
                rootDiv.append(userCard);
            }
            
    });
}