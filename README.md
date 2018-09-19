# node_simpleprocesspool

Simple max concurrency process pool using async queue.
It is a process queue running n parallel jobs at once.
If the processpool is killed, the running processes will
keep running but the wait queue is flushed.

Use case for running running parallel legacy cron scripts
listening on message queues.

In this test the process is a php script that sleeps for 10 seconds.