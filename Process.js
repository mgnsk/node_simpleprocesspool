const spawn = require('child_process').spawn;

module.exports = class Process {
    constructor(bin, args) {
        this.bin = bin;
        this.args = args;
        this.process = null;
    }

    isRunning(pid) {
        try {
            return process.kill(pid, 0);
        } catch (e) {
            return e.code === 'EPERM';
        }
    }

    async run() {
        return new Promise((resolve, reject) => {
            this.process = spawn(this.bin, this.args, {
                detached: true,
                stdio: 'ignore'
            });

            // check the status of the process every second
            let checkInterval = setInterval(() => {
                if (!this.isRunning(this.process.pid)) {
                    // finished
                    clearInterval(checkInterval);

                    resolve();
                }
            }, 1000);

            this.process.on('error', (err) => {
                clearInterval(checkInterval);

                reject(err);
            });

            // Important to keep the process running even after nodejs dies
            this.process.unref();
        });
    }
}