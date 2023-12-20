This is a simple app to test your internet speed and built on python. In order to run this app, you need to have the following python libraries:
            - speedtest-cli
            - flask
  
This python library can be installed using the below command:
            python -m pip install speedtest-cli
            python -m pip install flask


Once the above is installed the following folder structure has to be followed:

            * main_app.py
            * templates
              * speed.html
  
Once the above is completed, you can open terminal and navigate to the project folder to run the following command:
            - python internet.py

Visit http://127.0.0.1:5000/ in your web browser, and you'll see the internet speed test results displayed on the webpage. The "Run Speed Test" button triggers the speed test, and the results include download speed, upload speed, ping, and latency. If the download speed is more than 50 Mbps, it displays a message stating that the internet is fast.

Also this needs to be hosted on a propoer WSGI server in case its being used for production purposes.
