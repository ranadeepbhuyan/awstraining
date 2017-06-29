# Exercise 1

## Create EC2 instance
1. Navigate to aws console -> ec2 (link)
1. You should see 0 instances running. Click on instances -> launch instance.
1. Select an Amazon Linux AMI 2017.03.1 -> Choose instance type as t2-micro -> Configure instance as given defaults -> Add Storage as given defaults -> Add Tags
1. Click Add Tag -> key=name and value=webserver 
1. Click Next:Configure Security Group.
1. Click Add Rule -> Select type=http 
1. Click Review and Launch
1. Create a new key pair, download it to a safe location on your computer, and then choose Launch Instances. Note the name of the .pem filename. It will be used in the next step

## SSH to EC2 instance

ssh -i awstraining.pem ec2-user@52.26.195.25

## Download Code
wget https://github.com/nmehra/awstraining/archive/master.zip

## Install Node 

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | sudo bash

## Run Service
node index.js
