const fs = require('fs');
// const userDB = require('../database/userList.json');
var flaggedUserDB = require('../database/flaggedUserDB.json');
const { send } = require('process');
const { response } = require('express');
var activeUserDB = [];
    let activeUserCount = 0;
var activeFlaggedUserDB = [];
var activeDeletedUserDB = [];



syncActiveUserDBFile = () => {
   activeUserDB = [];
    fs.readFile('./database/userList.json', 'utf8', function(err, data) { 
            if (err) 
                console.log(err); 
            else { 
                var parsedDBFileData = JSON.parse(data);
                
                    for(i = 0; parsedDBFileData.length > i; i++){
                        activeUserDB.push(parsedDBFileData[i]);
                    }
                console.log(activeUserDB);
                return true;
            }
    });
}

    // syncActiveUserDBFile().then(
exports.fetchUsers = () => {
    syncActiveUserDBFile();
    var dataParse = JSON.parse(activeUserDB);
    var userExportList = [];
    activeUserDB.forEach(user => {
        userExportList.push(user);
    })
    
    return JSON.stringify(userExportList);
    //     if(console.log(test) = true) {
    //         return test;
    // }  
}

exports.addUser = (newUserData) => {
    console.log('active user count: '+activeUserCount);
    var newUserId = newUserData.id;
        var verifyNewUserId = activeUserDB.find((user) => user.id === newUserId);
    var newUserNameFirst = newUserData.nameFirst;
    var newUserNameLast = newUserData.nameLast;
    var verifyNewUserData = verifyUserData(newUserData);
    console.log(verifyNewUserData);
    console.log(verifyNewUserId);
        if(verifyNewUserData === true && verifyNewUserId === undefined){
            var newUserObject = {};
                console.log('ACTIVE USER CNT :'+activeUserCount);
                newUserObject.index = activeUserCount + 1;
                newUserObject.id = newUserId;
                newUserObject.nameFirst = newUserNameFirst;
                newUserObject.nameLast = newUserNameLast;
            console.log(newUserObject);
            activeUserDB.push(newUserObject);
                console.log('|| * New User Added * || ID: '+newUserId+' First Name: '+newUserNameFirst+' Last Name: '+newUserNameLast);
            updateUserDB(activeUserDB);
            return newUserObject;
        }else if(verifyNewUserData !== true && verifyNewUserId === undefined){
            return verifyNewUserData;
        }else if(verifyNewUserData === true && verifyNewUserId !== undefined){
            return 'idUnavailable';
        }else if(verifyNewUserData === false && verifyNewUserId !== undefined){
            return 'id: "idUnavailable", userData: ' + verifyNewUserData;
        }
}

exports.deleteUser = (data) => {
    var updateActiveUserDB = [];
    var deleteUserId = data;
    console.log('delete user: '+deleteUserId);
        for(i = 0; i < activeUserDB.length; i++){
            var loopDeleteId = activeUserDB[i].id;
            if(loopDeleteId === deleteUserId){
                console.log(activeUserDB[i]);
            }else{
                updateActiveUserDB.push(activeUserDB[i]);
            }
        }
    // activeUserDB = updateActiveUserDB;
    console.log(updateActiveUserDB);
    updateUserDB(updateActiveUserDB);
}

    // addUsertoCache = (data) => {
    //     var newUser = data;
    //     console.log(newUser);
    //     activeUserDB.push(newUser);
    //     console.log('New User Added to userCache');
    //     writeUserCacheDB();
    // }

    updateUserDB = (params) => {
        var userDataStr = JSON.stringify(params);
        var userCacheStr = [];
            userCacheStr.push(userDataStr);
            fs.writeFile('./database/userList.json', userDataStr, (err) => { 
                if (err) 
                    console.log(err); 
                else { 
                    console.log("File written successfully\n");
                    syncActiveUserDBFile();
                }
            });
    }


// Verify User Database Entries Before Import

verifyUserData = (userData) => {
    console.log(userData);
    if(userData !== null){
        var userId = userData.id;
        var userNameFirst = userData.nameFirst;
        var userNameLast = userData.nameLast;
        var newUser = { id: userId, nameFirst: userNameFirst, nameLast: userNameLast };
            if(userId.length < 1){
                newUser.id = "errorID";
            }
            if( userNameFirst.length < 1){
                newUser.nameFirst = "errorNameFirst";
            }
            if(userNameLast.length < 1){
                newUser.nameLast = "errorNameLast";
            }
            if(userId > 0 && userNameFirst.length > 0 && userNameLast.length > 1){
                return true;
            }else{
                return newUser;
            }
    }else{
        return null;
    }
}



fetchActiveUserDBA = () => {
    var userDB = require('../database/userList.json');
    activeUserDB = [];
    console.log('activeUserDB Length: '+activeUserDB.length)
    activeFlaggedUserDB = [];
        for(var i = 0; userDB.length > i; i++){
            // var loopUserObj = userDB[i];
            // console.log(loopUserObj);
                // Loop to Check for NULL Entries             
                if(userDB[i] !== null){
                    var verifyUserId = userDB[i].id;
                    var verifyUserNameFirst = userDB[i].nameFirst;
                    var verifyUserNameLast = userDB[i].nameLast;
                        // Verify that All User Data is Present Before Import
                        if(
                            verifyUserId.length > 0 && 
                            verifyUserNameFirst.length > 0 && 
                            verifyUserNameLast.length > 0
                        ){
                            activeUserDB.push(userDB[i]);
                                activeUserCount = i;
                                // console.log('213 || Active User Count: '+activeUserCount);
                                // console.log('214 || Active User Count.length: '+activeUserDB.length);
                        }
                        // Else Catch for User Entries Not NULL but Not Complete
                        else{
                            activeFlaggedUserDB.push({
                                index: i, 
                                rsn4Flag: "incomplete",
                                id: verifyUserId, 
                                nameFirst: verifyUserNameFirst, 
                                nameLast: verifyUserNameLast
                            });
                                console.log("FLAGGED USER: "+i)
                                console.log(activeFlaggedUserDB);    
                        }
                }else{
                // Else Catch for 'null' Array Entries
                    console.log("FLAGGED USER: "+i)
                    activeFlaggedUserDB.push({index: i, rsn4Flag: "null"});
                    console.log(activeFlaggedUserDB);
                }
        }
        // Check to See If UserDB Needs Entry Filter Before Import
        console.log('activeFlaggedUserDB Length: '+activeFlaggedUserDB.length);
        if(activeFlaggedUserDB.length > 0){
            // If Flagged Entries from UserDB Were Detected, They are added to ./db/flaggedUserDB  
            saveNewFlaggedUsers();
            console.log('Test');
            // updateUserDB(activeUserDB);
        }
        
        // console.log(activeUserDB);
        // Run UserDB Import Function
        // importUserDB();
}

verifyUserCache = () => {
    let updateUserDB = [];
        activeFlaggedUserDB = [];
            for(var i = 0; activeUserDB.length > i; i++){
                // var loopUserObj = userDB[i];
                // console.log(loopUserObj);
                    // Loop to Check for NULL Entries             
                    if(activeUserDB[i] !== null){
                        var verifyUserId = activeUserDB[i].id;
                        var verifyUserNameFirst = activeUserDB[i].nameFirst;
                        var verifyUserNameLast = activeUserDB[i].nameLast;
                            // Verify that All User Data is Present Before Import
                            if(
                                verifyUserId.length > 0 && 
                                verifyUserNameFirst.length > 0 && 
                                verifyUserNameLast.length > 0
                            ){
                                updateUserDB.push(activeUserDB[i]);
                                    activeUserCount = i;
                                    console.log('213 || Active User Count: '+activeUserCount);
                                    console.log('214 || Active User Count.length: '+activeUserDB.length);
                            }
                            // Else Catch for User Entries Not NULL but Not Complete
                            else{
                                activeFlaggedUserDB.push({
                                    index: i, 
                                    rsn4Flag: "incomplete",
                                    id: verifyUserId, 
                                    nameFirst: verifyUserNameFirst, 
                                    nameLast: verifyUserNameLast
                                });
                                    console.log("FLAGGED USER: "+i)
                                    console.log(activeFlaggedUserDB);    
                            }
                    }else{
                    // Else Catch for 'null' Array Entries
                        console.log("FLAGGED USER: "+i)
                        activeFlaggedUserDB.push({index: i, rsn4Flag: "null"});
                        console.log(activeFlaggedUserDB);
                    }
            }
            // Check to See If UserDB Needs Entry Filter Before Import
            console.log('activeFlaggedUserDB Length: '+activeFlaggedUserDB.length);
            if(activeFlaggedUserDB.length > 0){
                // If Flagged Entries from UserDB Were Detected, They are added to ./db/flaggedUserDB  
                saveNewFlaggedUsers();
            }
            saveActiveUserDB(updateUserDB);
            
            console.log(activeUserDB);
            // Run UserDB Import Function
            // importUserDB();
}

saveNewFlaggedUsers = () => {
    console.log(activeFlaggedUserDB);
    flaggedUserDB.push(activeFlaggedUserDB);
        console.log("vvv FLAGGED USER DB SAVED vvv");
        console.log(flaggedUserDB);
}

syncActiveUserDBFile();

exports.userList = activeUserDB;


