const fs = require("fs");

module.exports = function(app){
    app.post("/api/login", function(req, res) {
        var file_data = fs.readFileSync("users_list.json", "utf8"); //reading from the users list supplied in users_list.json
        var data = JSON.parse(file_data);
        user = {};
      
        user.username = req.body.username_input;
        
        user.valid = null;
      
        //console.log(data.users[0].username);
        for (i = 0; i < data.users.length; i++) {
          console.log(data.users[i].username);
          console.log(user.username)
          if (user.username === data.users[i].username) {  // checking if the entered details are same as users files
            user.valid = true;
            user.role = data.users[i].role;
            user.groupAdminRole = data.users[i].groupAdminRole;
            break;
          } else {
            user.valid = false;
          }
        }
        res.send(user);
      });
      
      app.post("/api/adduser", function(req, res) {
        var file_data = fs.readFileSync("users_list.json", "utf8");
      
        var thisdata = JSON.parse(file_data);
        user = {};

        valid = true;
      
        user.username = req.body.username_input;
        user.role = req.body.inputRole;
        user.email = req.body.inputEmail;
        user.groups = [];
        
        //checks if the users name already exists, if exits, it prints en error
        for(i=0; i < thisdata.users.length; i++){
          console.log(thisdata.users[i].username)
          if(user.username === thisdata.users[i].username){
            console.log("User with this username already exists");
            valid = false;
            break;
          }
        }
        // if user name does not exits, it adds a new user
        if(valid === true) {
          thisdata.users.push(user);
          saveFile();
        }
        
        thisdata.users.push(user);
        function saveFile(){
        var newdata = JSON.stringify(thisdata);
        fs.writeFile("users_list.json", newdata, function(err) {
          if (err) {
            console.log(err);
          }
        });
      }
        res.send(valid);
      });

        //adding a new group
      app.post("/api/addgroup", function(req,res) {
        var file_data = fs.readFileSync("users_list.json", "utf8");
        var thisdata = JSON.parse(file_data);

        group = {}
        group.name = req.body.groupname;
        group.channels = [];
        group.group_assis = [];

        thisdata.groups.push(group);
        console.log(thisdata)
        var newdata = JSON.stringify(thisdata);
        fs.writeFile("users_list.json", newdata, function(err) {
          if (err) {
            console.log(err);
          }
        });
        res.send(newdata)
      });


      //adding a new channel
      app.post("/api/addchannel", function(req, res) {
        var file_data = fs.readFileSync("users_list.json", "utf8");
        var data = JSON.parse(file_data);

        groupname = req.body.inputGroup;
        channelname = req.body.inputChannel;     

        for(i=0; i < data.groups.length; i++){
          console.log(data.groups[i].name + " " + groupname)
          if(groupname === data.groups[i].name){
            console.log(data.groups[i].name)
            data.groups[i].channels.push(channelname)
          }
        }
        console.log(data.groups)
        var newdata = JSON.stringify(data);
        fs.writeFile("users_list.json", newdata, function(err) {
          if (err) {
            console.log(err);
          }
        })
        res.send(data)
      })

      //getting the groups info
      app.get("/api/getgroups", function(req, res) {
        var file_data = fs.readFileSync("users_list.json", "utf8");
        var thisdata = JSON.parse(file_data);

        data = thisdata.groups;
        console.log(data)
        res.send(data);
      });

      //getting the details of groups of a user
      app.post("/api/getusergroups", function(req, res){
        var file_data = fs.readFileSync("users_list.json", "utf8");
        var data = JSON.parse(file_data);

        username = req.body.username;

        for(i= 0; i < data.users.length; i++){
          if(username === data.users[i].username){
            userdata = data.users[i]
          } else {
            break;
          }
        }
        res.send(userdata.groups)
      });

      //getting all the data of users
      /*
      app.get("/api/getalluserdata", function(req, res){
        var file_data = fs.readFileSync("users_list.json", "utf8");
        var data = JSON.parse(file_data);

        res.send(data.users)
      })
      */

      //getting userlist 
      app.get("/api/getusers", function(req, res) {
        var file_data = fs.readFileSync("users_list.json", "utf8");
        var data = JSON.parse(file_data);
        userdata = data.users
        userlist = [];
        for(i = 0; i < userdata.length; i++){
          userlist.push(userdata[i])
        }
        res.send(userlist)        
      })

      //adding a group to users
      app.post("/api/addgrouptouser", function(req, res){
        var file_data = fs.readFileSync("users_list.json", "utf8");
        var data = JSON.parse(file_data);

        newgroup = {};
        newgroup.name = req.body.inviteGroupName;
        newgroup.channels = [];
        username = req.body.inviteGroupUsername;


        for(i = 0; i < data.users.length; i++){
          if(username === data.users[i].username){
            console.log("MATCHED USERNAME")
            data.users[i].groups.push(newgroup);
          }
        }
        var newdata = JSON.stringify(data);
      fs.writeFile("users_list.json", newdata, function(err) {
        if (err) {
          console.log(err);
        }
      })
      res.send(data)
      });

      // deleting a user and updaing the users_list
      app.post("/api/deleteuser", function(req, res){
        var file_data = fs.readFileSync("users_list.json", "utf8");
        var data = JSON.parse(file_data);

        user = req.body.deleteUserName;

        for(i = 0; i < data.users.length; i++){
          if(user === data.users[i].username){
            data.users.splice(i, 1);
          }
        }
        var newdata = JSON.stringify(data);
        fs.writeFile("users_list.json", newdata, function(err) {
          if (err) {
            console.log(err);
          }
        })
        res.send(true);
      });

      //removing the users from a channel and updaing the users_list
      app.post("/api/removeuserfromchannel", function(req, res){
        var file_data = fs.readFileSync("users_list.json", "utf8");
        var data = JSON.parse(file_data);

        user = req.body.removeChannelUserName;
        group = req.body.removeChannelGroupName;
        channel = req.body.removeChannelFromUser;

        for(i = 0; i < data.users.length; i++){
          if(user === data.users[i].username){
          for(x = 0; x < data.users[i].groups.length; x++){
            if(group === data.users[i].groups[x].name){
              for(y = 0; y < data.users[i].groups[x].channels.length; y++){
                if(channel === data.users[i].groups[x].channels[y]){
                  data.users[i].groups[x].channels.splice(y, 1);
                }
              }
            }
          }
          }
        }
        var newdata = JSON.stringify(data);
        fs.writeFile("users_list.json", newdata, function(err) {
          if (err) {
            console.log(err);
          }
        })
        res.send(data)
      });

      //removing the user from a group
      app.post("/api/removeuserfromgroup", function(req, res){
        var file_data = fs.readFileSync("users_list.json", "utf8");
        var data = JSON.parse(file_data);

        user = req.body.deleteGroupFromUser;
        group = req.body.deleteGroupFromUserGroup;

        for(i=0; i < data.users.length; i++){
          if(user === data.users[i].username){
            for(y = 0; y < data.users[i].groups.length; y++){
              if(group === data.users[i].groups[y].name){
                data.users[i].groups.splice(y, 1);
              }
            }
          }
        };
        var newdata = JSON.stringify(data);
        fs.writeFile("users_list.json", newdata, function(err) {
          if (err) {
            console.log(err);
          }
        });
        res.send(data);
      })


      //deleting a channel
      app.post("/api/deletechannel", function(req, res){
        var file_data = fs.readFileSync("users_list.json", "utf8");
        var data = JSON.parse(file_data);

        channel = req.body.deleteChannelName;
        group = req.body.deleteChannelGroupName;

        for(i = 0; i < data.groups.length; i++){
          if(group === data.groups[i].name){
            for(y = 0; y < data.groups[i].channels.length; y++){
              if(channel === data.groups[i].channels[y]){
                data.groups[i].channels.splice(y, 1);
                deleteChannelFromUser();
              }
            }
          }
        }

        function deleteChannelFromUser(){
          for(i = 0; i < data.users.length; i++){
            if(data.users[i].groups.length === 0){
              break;
            } else {
            for(x = 0; x < data.users[i].groups.length; x++){
              if(group === data.users[i].groups[x].name){
                for(y = 0; y < data.users[i].groups[x].channels.length; y++){
                  if(channel === data.users[i].groups[x].channels[y]){
                    data.users[i].groups[x].channels.splice(y, 1);
                  }
                }
              }
            }
          }
        }
      }
        var newdata = JSON.stringify(data);
        fs.writeFile("users_list.json", newdata, function(err) {
          if (err) {
            console.log(err);
          }
        })
        res.send(data)
      })


      //deleting a group
      app.post("/api/deletegroup", function(req, res){
        var file_data = fs.readFileSync("users_list.json", "utf8");
        var data = JSON.parse(file_data);

        group = req.body.deleteGroupName;

        for(i = 0; i < data.groups.length; i++){
          if(group === data.groups[i].name){
            data.groups.splice(i, 1)
            deleteFromUser()
          }
        }

        function deleteFromUser(){
          for(i = 0; i < data.users.length; i++){
            for(x = 0; x < data.users[i].groups.length; x++){
              if(group === data.users[i].groups[x].name){
                data.users[i].groups.splice(x, 1);
              }
            }
          }
        }
        var newdata = JSON.stringify(data);
        fs.writeFile("users_list.json", newdata, function(err) {
          if (err) {
            console.log(err);
          }
        })
        res.send(true)
      })


      //adding a user to a channel
      app.post("/api/addusertochannel", function(req, res) {
        var file_data = fs.readFileSync("users_list.json", "utf8");
        var data = JSON.parse(file_data);

        usergroups = [];

        username = req.body.inviteUsername;
        group = req.body.inviteGroup;
        channel = req.body.inviteChannel;
        valid = false;

        console.log(username)

        for(i = 0; i < data.users.length; i++){
          if(username === data.users[i].username) {
            console.log("USER")
            for(y = 0; y < data.users[i].groups.length; y++){
              if(group === data.users[i].groups[y].name){
                usergroups = data.users[i].groups[y].channels
                console.log("USER GROUPS:" + usergroups)
                addChannel();
                data.users[i].groups[y].channels = usergroups
                console.log(data.users[i].groups[0])
                saveFile();
              }
            }
          }
        }

        function addChannel(){
          console.log(usergroups)
          if(usergroups.indexOf(channel) === -1){
            console.log("Channel not found!")
            console.log(channel)
            usergroups.push(channel)
            console.log("NEW USERGROUPS:" + usergroups)
            valid = true;
          }
        }

        function saveFile(){
        var newdata = JSON.stringify(data);
        fs.writeFile("users_list.json", newdata, function(err) {
          if (err) {
            console.log(err);
          }
        })
      }
        res.send(valid)
      })

      app.get("/api/getgroupassis", function(req, res) {
        var file_data = fs.readFileSync("users_list.json", "utf8");
        var data = JSON.parse(file_data);

        groupassis = {};
        groups = [];

        for(i = 0; i < data.users.length; i++){
          for(y = 0; y < data.groups.length; y++){
            for(x = 0; x < data.groups[y].group_assis.length; x++){
              if(data.users[i].username === data.groups[y].group_assis[x]){
                group = {};
                group.name = data.groups[y].name
                group.assisuser = [];
                group.assisuser.push(data.groups[y].group_assis[x])
                groups.push(group)
              
              }
            }
          }
        }
        console.log(groups)
        groupassis['assisusers'] = groups
        res.send(groupassis)
      })
      
}