# node_simpleprocesspool

Simple max concurrency process pool using async queue.
It is a process queue running n parallel jobs at once.
If the processpool is killed, the running processes will
keep running but the wait queue is flushed.

Use case for running running parallel legacy cron scripts
listening on message queues.

Run the test:
`npm install`'
`node test_processpool.js`

If you run these commands, it will maintain a process pool
of 10 maximum processes. Each process is a php script that
sleeps for rand(5, 60) seconds and heres a command to monitor
the test: `watch -n 1 "ps aux | grep process.php"`