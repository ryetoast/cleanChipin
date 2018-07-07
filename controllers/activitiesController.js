var model = require('../models');
module.exports = {
    // FINDS ALL VOLUNTEER ACTIVITIES IN DATABASE
    findAll: function (req, res) {
        model.Activity.findAll()
            .then(function (data) {
                res.json(data);
            })
    },
    //CREATES NEW VOLUNTEER ACTIVITY IN DATABASE 
    postEvent: function (req, res) {
        console.log("I got to controllers section!");
        var id = req.body.UserId;
        var title = req.body.title;
        var body = req.body.body;
        var contact = req.body.contact;
        var address = req.body.address;
        var hours = req.body.hours;
        var points = req.body.points;
        model.Activity.create({
            UserId: id,
            title: title,
            body: body,
            contact: contact,
            address: address,
            hours: hours,
            points: points
        }).then(function (data) {
            console.log("I posted the activity to the Activity table!");
            res.json(data);
            model.User_Event_Bridge.create({
                ActivityId: data.id,
                UserId: id,
                creator: true,
                volunteer: false,
                hours: data.hours,
                points: data.points
            }).then(function (data) {
                console.log("I created a user_event bridge entry!");
            })
        })
    },
    // DELETES VOLUNTEER ACTIVITY FROM DATABASE - USED BY VOLUNTEER ACTIVITY CREATORS
    remove: function (req, res) {
        model.Activity.destroy({
            where: { id: req.body.id }
        }).then(function (data) {
            console.log("Item has been deleted");
            res.redirect("/dashboard")
        })
    },
    // SAVES VOLUNTEER ACTIVITY IN USER'S SAVED LIST TABLE
    saveActivity: function (req, res) {
        console.log(req.body);
        var id = req.body.id;
        var UserID = req.body.UserId
        model.Activity.findOne({
            where: {
                id: id
            }
        }).then(function (data) {
            console.log(data);
            model.User_Event_Bridge.create({
                ActivityId: data.id,
                UserId: id,
                hours: data.hours,
                points: data.points,
                volunteer: true,
                attending: false,
                saved: true

            }).then(function (data) {
                console.log("I added a user attending entry ")
            }).catch(function (err) {
                console.log(err);
            });
        });

    },

    // SAVES VOLUNTEER ACTIVITY IN THE USER'S ATTENDING LIST TABLE
    saveAttending: function (req, res) {
        // FINDS ONE ACTIVITY MATHCING THE REQ ID
        console.log(req.body);
        var id = req.body.id;
        var UserID = req.body.UserId
        model.Activity.findOne({
            where: {
                id: id
            }
        }).then(function (data) {
            console.log(data)
            model.User_Event_Bridge.create({
                ActivityId: data.id,
                UserId: id,
                hours: data.hours,
                points: data.points,
                volunteer: true,
                attending: true,
                saved: false

            }).then(function (data) {
                console.log("I added a user attending entry ")
            }).catch(function (err) {
                console.log(err);
            });
        });


    },
    hostActivities: function (req, res) {
        ;
        var id = req.params.id;
        model.Activity.findAll({
            where: {
                UserId: id,
            }
        }).then(function (data) {
            res.json(data);
        })
    },
    deleteHostActivity: function (req, res) {
        console.log("im at the controller: " + req.params);
        var id = req.params.id;
        model.Activity.destroy({
            where: {
                id: id,
            }
        }).then(function (data) {
            console.log("Item has beend deleted");
            res.json(data);
        })


    },
    updateAllHours: function (req, res) {
        console.log("I'm updating at the controllers");
        var id = req.params.id;
        model.User_Event_Bridge.upateAll(
            { validated: true },
            { where: { ActivityId: id } }
        ).then(function (data) {
            console.log("Hours have been validated");
            res.json(data);
        })
    }

}

