const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

const Job = require('../models/job');
const Street = require('../models/street');

exports.jobs_get_all = (req, res, next) => {
    Job
        .find({})
        .select('name street date profit loss _id')
        .populate('street', 'name')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                jobs: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        date: doc.date,
                        profit: doc.profit,
                        loss: doc.loss,
                        street: doc.street,
                        request: {
                            type: 'GET',
                            url: `http://localhost:3000/jobs/${doc._id}`
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

exports.jobs_get_jobs_by_street = (req, res, next) => {
    const id = req.params.streetId;
    Job.find({street: new ObjectId(id)})
        .select('name date profit loss street _id')
        .exec()
        .then(docs => {
            if(docs === undefined || docs.length !== 0){
                console.log('From database', docs);
                const response = {
                    count: docs.length,
                    jobs: docs.map(doc => {
                        return {
                            _id: doc._id,
                            name: doc.name,
                            date: doc.date,
                            profit: doc.profit,
                            loss: doc.loss,
                            street: doc.street,
                            request: {
                                type: 'GET',
                                url: `http://localhost:3000/jobs/${doc._id}`
                            }
                        }
                    })
                };
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

exports.jobs_create_job = (req, res, next) => {
    Street.findOne({_id: req.body.streetId})
        .then(doc => {
            if (!doc) {
                return res.status(404).json({
                    message: 'Street not found'
                });
            }
            const job = new Job({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                street: req.body.streetId,
                date: req.body.date,
                profit: req.body.profit,
                loss: req.body.loss
            });
            return job
                .save()
        })
        .then(result =>{
            res.status(201).json({
                createdJob: {
                    _id: result._id,
                    name: result.name,
                    street: result.street,
                    date: result.date,
                    profit: result.profit,
                    loss: result.loss,
                    request: {
                        type: 'GET',
                        url: `http://localhost:3000/jobs/${result._id}`
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

exports.jobs_update_job = (req, res, next) => {
    const id = req.params.jobId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Job.update({_id: id},  {$set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Job updated',
                request: {
                    type: 'GET',
                    url: `http://localhost:3000/jobs/${id}`
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
};

exports.jobs_delete_job = (req, res, next) => {
    const id = req.params.jobId;
    Job.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Job deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
};