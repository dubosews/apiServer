function verifyNewUser (data) {
    // console.log(data);
    // console.log(userCache[0]);
    var newUserData = data;
    var n = 0;
      userCache.forEach(user => {
        var loopUserId = user.id;
        var newUserId = newUserData.id;
        var loopUserIdStr = JSON.stringify(loopUserId);
        var newUserIdStr = JSON.stringify(newUserId);
        console.log(newUserIdStr);
        console.log(loopUserIdStr);
          if(loopUserId === newUserId){
            n++;
          }
      })
    console.log(n);
    if(n === 0) {
      addUsertoCache(newUserData);
      return 'New User Added';
    }else{
        console.log('User Already Saved');
        return 'User Already Saved';
    }
  }

  function addUsertoCache (data) {
    var newUser = data;
    console.log(newUser);
    userCache.push(newUser);
    console.log('New User Added to userCache');
    saveUserCache();
  }

  function saveUserCache () {
    var userDataStr = JSON.stringify(userCache);
    var userCacheStr = [];
      userCacheStr.push(userDataStr);
      console.log(userCacheStr);
    console.log(userDataStr);
    console.log(userCache);
      fs.writeFile('./database/userList.json', userDataStr, (err) => { 
        if (err) 
          console.log(err); 
        else { 
          console.log("File written successfully\n"); 
        } 
      });
  }