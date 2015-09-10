import express from 'express';
import config from '../../.././config';

import Timesheet from '.././models/timesheet';

const router = express.Router();

router.route('/')
  .get((req, res, next) => { // get all timesheets
    Timesheet.find({}, (err, timesheets) => {
      err 
        ? res.status(500).json(err)
        : res.status(200).json({ timesheets: timesheets });
    });
  })
  .post((req, res, next) => { // create a timesheet
    let timesheet = new Timesheet(req.body.timesheet);
    timesheet.save(err => {
      err 
        ? res.status(500).json({ message: 'Unable to save' })
        : res.status(201).json({ timesheet: timesheet });
    });
  })
  .delete((req, res, next) => { // delete a timesheet
    Timesheet.remove({ _id: req.body._id }, err => {
      err
        ? res.status(500).json(err)
        : res.status(200).json({ _id: req.body._id });
    });
  });


export default router;