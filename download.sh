IPS=("115.231.232.49")
for ip in "${IPS[@]}"; do
        url="http://${ip}:8000/file_100M"
        echo $url
        for i in {1..50}; do
                echo $url
                nohup bash -c "for i in {1..5}; do wget --limit-rate=10M -O - ${url} > /dev/null; done" &
        done
done
