const ProcessPool = require('./ProcessPool');

process.on('uncaughtException', (err) => {
    console.log(err);
});

process.on('unhandledRejection', (err) => {
    console.log(err);
});

let pool = new ProcessPool(10);

pool.on('error', (err) => {
    console.log(err);
    console.log('Shutting down pool');
});

let bin = '/usr/bin/php';

for (let i = 0; i < 30; i++) {
    let script = __dirname + '/process.php';

    let args = [
        script
    ];

    pool.enqueue(bin, args);
}