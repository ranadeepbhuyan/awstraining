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
1. Open puttygen to convert the .pem file to a putty supported format .ppk file.
1. Click on load, select the .pem file and click open.
1. Click on: save private key and type a suitable \<filename\>.ppk file.
1. Open putty and enter in the hostname field: ec2-user@\<public ip of the ec2 instance launched\>.
1. Choose connection -> ssh -> auth and choose the private key file generated in a previous step.
1. Click open to open the ssh connection to the ec2 instance.

### Mac
1. Open terminal and navigate to the folder where you have downloaded the key pair.
1. Change the permissions of the .pem file so only the root user can read it:
chmod 400 \<key pair file\>
for e.g. chmod 400 awstraining.pem
1. Open terminal and type the following to SSH into your EC2 instance:
ssh -i \<key pair file\> ec2-user@\<public ip of ec2 instance launched\>
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
1. Navigate to http://\<public ip\>/hello to see the hello world page.

# Exercise 1a
## Create an S3 bucket
1. Navigate to Services -> S3 -> create bucket
1. provide a bucket name for e.g. my-sample-bucket-nitin and click next. 
1. In step 3, in the section manage public permissions select read and write for Objects. Click next 
1. Click on create bucket.
1. Upload an image to the s3 bucket.
2. Access S3 bucket using the browser.
## Create and download access keys
1. Navigate to Services -> IAM -> Security Status -> Delete your root access keys section.
1. Click: manage security credentials -> continue to security credentials -> Access Keys -> Create New Access Key
1. Click: Show Access key; Download key file and keep it safe. 
1. We are going to use this key and secret to programmatically access the S3 bucket from the ec2 instance.

# Exercise 2
## Create an RDS instance
1. Navigate to Services -> RDS -> Instances -> Launch DB Instance 
1. Select MySQL -> Dev/Test -> Next Step
1. In Instance Specifications section select DB Instance Class as: db.t2.micro
1. In Multi-AZ Deployment select: No. Keep the other fields below as defaults in the Instance Specifications section
1. In Settings section provide a name for the DB Instance Identifier for e.g. my-test-db.
1. Give username as: admin and a suitable password. Please note the details provided in the settings section. We need them in connecting to the db. Click next.
1. In the next page, in Network & Security section, in VPC Security Group(s) choose: launch-wizard-1 (vpc)
1. In Database options, give a database name as: peopledb and Launch DB Instance.
1. Note the instance endpoint from the Instances page. (it may take sometime to create the instance.)
## Set security group to allow inbound connections on 3306 port.
1. Navigate to the security group of the RDS instance created and edit inbound rules.
1. Click Add Rule, choose custom tcp and enter 3306 in the port range. 
1. Select source as: my ip.
## Connect to the RDS instance using mysql client.
1. Open mysql workbench by opening finder -> applications -> mysqlworkbench.
1. Click + to create a new connection. Give a name to the connection for e.g. mysql-test.
1. Set the hostname to the endpoint created for the RDS instance.
1. Set the username and password to the one provided while creating the RDS. 
1. Click on the created connection to open it.

## Create tables by running the scripts
1. Click open sql script: createtable.sql and execute it to create the required tables.

## Connect application with rds instance
1. Stop server on the terminal if its already running.
1. Open ~/awstraining-master/backbone-app/server/upload.js and uncomment line 3.
1. restart server by typing: node index.js
1. navigate in your local browser to http://\<public ip\>/person.
1. Add a person by giving details and choosing an image path.
1. Observe the details of the person entered are shown below.
1. Open workbench and try to see if the details entered have been created.
1. Open S3 page to see if the image uploaded is there.
