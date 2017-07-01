# Exercise 1
## Login to AWS
1. Navigate to the AWS url in chrome.
1. Use one of the login id, password provided.
1. Click on Services -> EC2 link.

## Create EC2 instance
1. You should see 0 instances running. Click on instances -> launch instance.
1. Select an Amazon Linux AMI 2017.03.1 -> Choose instance type as t2-micro -> Configure instance as given defaults -> Add Storage as given defaults -> Add Tags
1. Click Add Tag -> key=name and value=webserver 
1. Click Next:Configure Security Group.
1. Click Add Rule -> Select type=http 
1. Click Review and Launch
1. Choose Create a new key pair, give a key pair name and download it to a safe location on your computer, and then choose Launch Instances. Note the name of the .pem filename. It will be used in the next step

## SSH to EC2 instance
1. Navigate to Services -> EC2 -> 1 running instances.
1. Note the public IP/public dns for the machine being initialized. We will use it to login to the EC2 instance.
1. Note the "Status Checks" column. It should show a tick.

### Windows machine
### Mac
1. Open terminal and 

ssh -i awstraining.pem ec2-user@52.26.195.25

## Download Code
wget https://github.com/nmehra/awstraining/archive/master.zip

## Install Node 

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | sudo bash

## Run Service
node index.js

## Hello World
1. Navigate to the EC2 dashboard and find the public ip of the webserver
1. Navigate to http://<public ip> to see the hello world page.
1. Show application does not work and needs a database connection

# Exercise 1a
## Create an S3 bucket
1. Upload an image to the s3 bucket.
2. Access S3 bucket using the browser.

# Exercise 2
## Create an RDS instance
## Connect to the RDS instance using mysql client.
## Create tables by running the scripts
## Connect application with rds instance

