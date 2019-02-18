const mongoose = require('mongoose');
const Admin = require('../models/admin');


exports.admins_get_all = (req, res, next) => {
    Admin.find({})
        .select('name _id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                admins: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        request: {
                            type: 'GET',
                            url: `http://localhost:3000/admins/${doc._id}`
                        }
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
};

exports.admins_get_admin = (req, res, next) => {
    const id = req.params.adminId;
    Admin.findOne({_id: id})
    .select('name _id')
        .exec()
        .then(doc => {
            console.log('From database', doc);
            if(doc === undefined || doc.length !== 0){
                const response = {
                    _id: doc._id,
                    name: doc.name,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_ADMINS',
                        url: `http://localhost:3000/admins/`
                    }
                }
                res.status(200).json(response);
            } else {
                res.status(404).json({message: 'No valid entry found for provided ID'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
}

exports.admins_create_admin = (req, res, next) => {
    const admin = new Admin({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name
    })
    admin
        .save()
        .then(result => {
        console.log(result);
        res.status(201).json({
            createdAdmin: {
                _id: result._id,
                name: result.name,
                request: {
                    type: 'GET',
                    url: `http://localhost:3000/admins/${result._id}`
                }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
}

exports.admins_update_admin = (req, res, next) => {
    const id = req.params.adminId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Admin.update({_id: id},  {$set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Admin updated',
                request: {
                    type: 'GET',
                    url: `http://localhost:3000/admins/${id}`
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
}

exports.admins_delete_admin = (req, res, next) => {
    const id = req.params.adminId;
    Admin.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Admin deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
}