module.exports = function (app, model) {

    app.get("/api/user/securityquestion", findSecurityQuestionByUsername);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user", createUser);
    app.get("/api/allUsers", findAllUsers);


    function findSecurityQuestionByUsername (req, res) {
        var username = req.query.username;
        model
            .userModel
            .findSecurityQuestionByUsername(username)
            .then(
                function (securityQuestion) {
                    res.send(securityQuestion);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        model
            .userModel
            .deleteUser(userId)
            .then(
                function (user) {
                    res.send(user);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findAllUsers(req, res) {
        model
            .userModel
            .finAllUsers()
            .then(
                function (user) {
                    res.send(user);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        model
            .userModel
            .updateUser(userId, newUser)
            .then(
                function (user) {
                    res.send(user);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        model
            .userModel
            .findUserById(userId)
            .then(
                function (user) {
                    res.send(user);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }


    function createUser(req, res) {
        var newUser = req.body;
        model
            .userModel
            .createUser(newUser)
            .then(
                function (newUser) {
                    res.send(newUser);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findUser(req, res) {
        console.log(req.query.username);
        console.log(req.query.password);
        console.log(req.query.passwordRecoveryAnswer);
        if(req.query.username && !typeof req.query.password==='undefined') {
            findUserByCredential(req, res);
        } else {
            if (req.query.username && req.query.passwordRecoveryAnswer){
                findUserByRecoveryCredentials(req,res);
            }
            else {
                findUserByUsername(req, res);
            }
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        model
            .userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user) {
                        res.send(user);
                    } else {
                        res.sendStatus(400);
                    }
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findUserByCredential(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    res.send(user);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findUserByRecoveryCredentials(req, res) {
        var username = req.query.username;
        var passwordRecoveryAnswer = req.query.passwordRecoveryAnswer;
        model
            .userModel
            .findUserByRecoveryCredentials(username, passwordRecoveryAnswer)
            .then(
                function (user) {
                    console.log("hello");
                    res.send(user);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }


};