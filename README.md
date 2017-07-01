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
1. Choose Create a new key pair, give a key pair name (e.g. awstraining.pem) and download it to a safe location on your computer, and then choose Launch Instances. Note the name of the .pem filename. It will be used in the next step

## SSH to EC2 instance
1. Navigate to Services -> EC2 -> 1 running instances.
1. Note the public IP/public dns for the machine being initialized. We will use it to login to the EC2 instance.
1. Note the "Status Checks" column. It should show a tick.

### Windows machine
### Mac
1. Open terminal and navigate to the folder where you have downloaded the key pair.
1. Change the permissions of the .pem file so only the root user can read it:
chmod 400 \<key pair file\>
for e.g. chmod 400 awstraining.pem
1. Open terminal and type the following to SSH into your EC2 instance:
ssh -i <key pair file> ec2-user@<public ip of ec2 launched>
for e.g. ssh -i awstraining.pem ec2-user@52.26.195.25

## Download & unzip Code
1. Type: wget https://github.com/nmehra/awstraining/archive/master.zip
1. Type: unzip master.zip

## Install Node 

1. To download code type: curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | sudo bash
1. Exit EC2 instance and log back in. 
1. Type: sudo bash
1. Type: nvm install 6.11.0
1. To check version type: node -e "console.log('Running Node.js ' + process.version)"

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

