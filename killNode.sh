PROC=`ps aux | grep web-test`
if [[ $PROC == *"node"* ]]; then
    echo "Process is running."
    kill -15 `ps -ef | grep node | grep -v grep | awk '{print $2}'`
else
    echo "Process is not running."