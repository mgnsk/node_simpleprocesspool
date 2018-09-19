const async = require('async');
const Process = require('./Process');
const EventEmitter = require('events').EventEmitter;

module.exports = class ProcessPool extends EventEmitter {
    constructor(max) {
        super();

        // Async queue with max concurrent jobs
        this.queue = async.queue((job, next) => {
            this.runJob(job.bin, job.args, next);
        }, max);
    }

    // Called for every "job" in the queue
    // When process finished, then done();
    // and next job is processed concurrently up to max
    async runJob(bin, args, done) {
        let process = new Process(bin, args);

        try {
            await process.run();
        } catch(err) {
            this.emit('error', err);
        }

        done();
    }

    isRunning(bin, args) {
        let running = this.queue.workersList().filter((worker) => {
            return worker.data.bin == bin && worker.data.args == args;
        });

        if (running.length) {
            return true;
        }

        return false;
    }

    enqueue(bin, args) {
        let job = {
            bin: bin,
            args: args
        };

        this.queue.push(job, err => {
            if (err) throw err;
        });
    }
}