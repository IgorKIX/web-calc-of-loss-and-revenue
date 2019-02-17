const mongoose = require('mongoose');

const Street = require('../models/street');
const Admin = require('../models/admin');

exports.streets_get_all = (req, res, next) => {
    Street
        .find()
        .select('name _id')
        .populate('admin', 'name')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                streets: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        admin: doc.admin,
                        request: {
                            type: 'GET',
                            url: `http://localhost:3000/streets/${doc._id}`
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

exports.streets_get_street = (req, res, next) => {
    const id = req.params.streetId;
    Admin.findOne({_id: id})
    .select('name _id')
        .populate('admin', 'name')
        .exec()
        .then(doc => {
            if(doc){   
                console.log('From database', doc);
                const response = {
                    _id: doc._id,
                    name: doc.name,
                    admin: doc.admin,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_STREETS',
                        url: `http://localhost:3000/streets/`
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
};

exports.streets_create_street = (req, res, next) => {
    Admin.findOne({_id: req.body.adminId})
        .then(doc => {
            if (!doc) {
                return res.status(404).json({
                    message: 'Admin not found'
                });
            }
            const street = new Street({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                admin: req.body.adminId
            });
            return street
                .save()
        })
        .then(result =>{
            res.status(201).json({
                createdStreet: {
                    _id: result._id,
                    name: result.name,
                    request: {
                        type: 'GET',
                        url: `http://localhost:3000/streets/${result._id}`
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.streets_update_street = (req, res, next) => {
    const id = req.params.streetId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Street.update({_id: id},  {$set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Street updated',
                request: {
                    type: 'GET',
                    url: `http://localhost:3000/streets/${id}`
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
};

exports.streets_delete_street = (req, res, next) => {
    const id = req.params.streetId;
    Street.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Street deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
};