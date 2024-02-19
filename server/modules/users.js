const fs = require('fs');
const userDB = require('../database/userList.json');
const flaggedUserDB = require('../database/flaggedUserDB.json');
var activeUserDB = [];
    let activeUserCount = 0;
var activeFlaggedUserDB = [];
var activeDeletedUserDB = [];


// var testId = userDB[6].id;
// var test = userDB.find((user) => user.id === testId);



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
        
    // var  = userDB.find((user) => user.id === testId);
    // if(n === 0) {
    //   addUsertoCache(newUserData);
    //   return 'New User Added';
    // }else{
    //     console.log('User Already Saved');
    //     return 'User Already Saved';
    // }
}

exports.deleteUser = (data) => {
    var updateActiveUserDB = [];
    var deleteUserId = data;
    // var userPosition = 0;
    for(i = 0; i < activeUserDB.length; i++){
        var loopDeleteId = activeUserDB[i].id;
        if(loopDeleteId === deleteUserId){
            // console.log(activeUserDB[i]);
            activeDeletedUserDB.push(activeUserDB[i]);
                delete activeUserDB[i];
        }
    }

    activeUserDB.map(user => {
        var userDataVerify = verifyUserData(user);
        console.log(userDataVerify);
            if(userDataVerify === true){
                
                updateActiveUserDB.push(user);
            }
    })

    updateUserDB(updateActiveUserDB);
}

    

    addUsertoCache = (data) => {
        var newUser = data;
        console.log(newUser);
        activeUserDB.push(newUser);
        console.log('New User Added to userCache');
        writeUserCacheDB();
    }

    updateUserDB = (params) => {
        var userDataStr = JSON.stringify(params);
        var userCacheStr = [];
            userCacheStr.push(userDataStr);
            fs.writeFile('./database/userList.json', userDataStr, (err) => { 
                if (err) 
                    console.log(err); 
                else { 
                    console.log("File written successfully\n");
                    fetchActiveUserDB();
                }
            });
    }

fetchActiveUserDB = () => {
    activeUserDB = [];  
    verifyUserDBFile();
    // var nullCheck = userDB.find((user) => user === null);
    // console.log(nullCheck);
    // var nullDelete = userDB.find((user) => user === null);
    // console.log(nullDelete.index);    
    // delete nullDelete;
        // userDB.forEach(user => {
        //     console.log(user);
            
        //     if(user = null){
        //         console.log("NULL ENTRY")
        //         }
        //             var verifyUserId = user.id;
        //             var verifyUserNameFirst = user.nameFirst;
        //             var verifyUserNameLast = user.nameLast;
        //             else if(verifyUserId.length > 0 && verifyUserNameFirst.length > 0 && verifyUserNameLast.length > 0){
        //             console.log("true");
                    
        //             console.log(verifyUserId);
        //             console.log(verifyUserNameFirst);
        //             console.log(verifyUserNameLast);
        //             }else{
        //                 console.log("nope");
        //             }
                
        // })
        // console.log(userDB[20].nameFirst);
        // var verifyUserId = userDB[20].id;
        // var verifyUserNameFirst = userDB[20].nameFirst;
        // var verifyUserNameLast = userDB[20].nameLast;
        // console.log(verifyUserId);
        // console.log(verifyUserNameFirst);
        // console.log(verifyUserNameLast);
        //     if(verifyUserId.length > 0 && verifyUserNameFirst.length > 0 && verifyUserId.length > 0){
        //         console.log("true");
        //     }else{
        //         console.log("nope");
        //     }
        // console.log(userDB[20].id);
        // var testId = userDB[20].id;
        // console.log(testId.length);
        //     if(testId.length < 1){
        //         console.log("true");
        //     }else{
        //         console.log("nope");
        //     }
        // console.log(userDB[20].nameFirst);
        // var testFirst = userDB[20].nameFirst;
        // console.log(testFirst.length);
        //     if(testFirst.length < 1){
        //         console.log("true");
        //     }else{
        //         console.log("nope");
        //     }
    // console.log(userDB[19].nameLast);
    // var test = userDB[19].nameLast;
    // console.log(test.length);
    //     if(test.length < 1){
    //         console.log("true");
    //     }else{
    //         console.log("nope");
    //     }
   
  
    // userDB.forEach(user => {
    //     var checkId = user.id;
    //     var checkNameFirst = user.nameFirst;
    //     var checkNameLast = user.nameLast;
    //     // if(user = null){

    //     // }
    //     activeUserDB.push(user);
    // })
    // console.log(activeUserDB);
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

verifyUserDBFile = () => {
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
            updateUserDB(activeUserDB);
        }
        
        console.log(activeUserDB);
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

    // importUserDB = () => {
    //     console.log('FILTERED UserDB Import || # of Flagged Users: '+activeFlaggedUserDB.length);
    //         const importFilterIndexArray = [];
    //             activeFlaggedUserDB.forEach(flaggedUser => {
    //                 var flaggedUserIndex = flaggedUser.index;
    //                 importFilterIndexArray.push(flaggedUserIndex);
    //             })
    //                 console.log('vvv importFilterIndexArray vvv');
    //                 console.log(importFilterIndexArray);

    //             for(i = 0; userDB.length > i; i++){
    //                 var flaggedUserFilter = importFilterIndexArray.find((flaggedIndex) => flaggedIndex === i);
    //                 // console.log(flaggedUserFilter);
    //                     if(flaggedUserFilter === undefined){
    //                         activeUserDB.push(userDB[i]);
    //                     }
    //             }

            // let arrayPostion = 0;    
                // userDB.forEach(user => {
                //     var importUserFilter = importFilterIndexArray.forEach(filterIndex => {
                //             // console.log('importPositionLoop');
                //             // console.log(position);
                //             // console.log(arrayPostion);
                //             if(filterIndex === arrayPostion){
                //                 console.log('match');
                //                 break;
                //             }else{
                //                 console.log('Ready');
                //                 return false;
                //             }
                //         });
                //         console.log(importUserFilter);
                //             // if(importUserFilter = undefined){
                //             //     console.log(user);
                //             //     activeUserDB.push(user);
                //             // }else{
                //             //     console.log('vvv Flagged User Detected, Not Added to Active DB vvv');
                //             //     console.log(user);
                //             // }
                //     arrayPostion ++;
                // })
                //     for(let i = 0; userDB.length > i; i++){
                //     var importUserFilter = importFilterIndexArray.find(i);
                //     if(importUserFilter = undefined){
                //         activeUserDB.push(userDB[i]);
                //     }else{
                //         console.log('vvv Flagged User Detected, Not Added to Active DB vvv');
                //         console.log(userDB[i]);
                //     }
                // }
    //         var activeUserDBCheck = userDB.length - importFilterIndexArray.length;
    //             if(activeUserDB.length = activeUserDBCheck){
    //                 console.log('Filtered Import User Count Match');
    //                 console.log(activeUserDB);
    //             }else{
    //                 console.log('Failed: Filter Array Length = '+importFilterIndexArray.length);
    //                 console.log('Failed: userDB Array Length = '+userDB.length);
    //                 console.log('Failed: activeUserDB Array Length = '+activeUserDB.length);
    //             }
                
    // }

        // indexSearch = (index, current) => {
        //     console.log(index);
        //     var indexStr = JSON.stringify(index);
        //     return index;
        // }



fetchActiveUserDB();

exports.userList = activeUserDB;