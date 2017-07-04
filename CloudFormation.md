### Set Parameters
Copy the entire parameters block including the enclosing curly braces ({}) from below. Paste the block into the JSON editor, replacing everything that is currently there.
This snippet adds parameters for specifying your server's instance type and an Amazon EC2 key-pair name to associate with the server.

```
{
  "Parameters": {
    "InstanceType": {
      "Description": "Server EC2 instance type",
      "Type": "String",
      "Default": "t2.micro",
      "AllowedValues": [
        "t1.micro",
        "t2.micro",
        "t2.small",
        "t2.medium"],
      "ConstraintDescription": "must be a valid EC2 instance type."
    },
    "KeyName": {
      "Description": "Name of an EC2 KeyPair to enable SSH access to the instance.",
      "Type": "AWS::EC2::KeyPair::KeyName",
      "ConstraintDescription": "must be the name of an existing EC2 KeyPair."
    }
  }

}
```

### Add Mappings

Copy the entire parameters block including the enclosing curly braces ({}) from below. Paste the block into the JSON editor, replacing everything that is currently there.
```
{
  "Mappings": {
    "AWSInstanceType2Arch" : {
      "t1.micro"    : { "Arch" : "PV64"   },
      "t2.micro"    : { "Arch" : "HVM64"  },
      "t2.small"    : { "Arch" : "HVM64"  },
      "t2.medium"   : { "Arch" : "HVM64"  }
    },
    "AWSRegionArch2AMI" : {
      "us-east-1"        : {"PV64" : "ami-1ccae774", "HVM64" : "ami-1ecae776", "HVMG2" : "ami-8c6b40e4"},
      "us-west-2"        : {"PV64" : "ami-ff527ecf", "HVM64" : "ami-e7527ed7", "HVMG2" : "ami-abbe919b"},
      "us-west-1"        : {"PV64" : "ami-d514f291", "HVM64" : "ami-d114f295", "HVMG2" : "ami-f31ffeb7"},
      "eu-west-1"        : {"PV64" : "ami-bf0897c8", "HVM64" : "ami-a10897d6", "HVMG2" : "ami-d5bc24a2"},
      "eu-central-1"     : {"PV64" : "ami-ac221fb1", "HVM64" : "ami-a8221fb5", "HVMG2" : "ami-7cd2ef61"},
      "ap-northeast-1"   : {"PV64" : "ami-27f90e27", "HVM64" : "ami-cbf90ecb", "HVMG2" : "ami-6318e863"},
      "ap-southeast-1"   : {"PV64" : "ami-acd9e8fe", "HVM64" : "ami-68d8e93a", "HVMG2" : "ami-3807376a"},
      "ap-southeast-2"   : {"PV64" : "ami-ff9cecc5", "HVM64" : "ami-fd9cecc7", "HVMG2" : "ami-89790ab3"},
      "sa-east-1"        : {"PV64" : "ami-bb2890a6", "HVM64" : "ami-b52890a8", "HVMG2" : "NOT_SUPPORTED"},
      "cn-north-1"       : {"PV64" : "ami-fa39abc3", "HVM64" : "ami-f239abcb", "HVMG2" : "NOT_SUPPORTED"}
    }
  }
}
```
### Add output
Copy the entire parameters block including the enclosing curly braces ({}) from below. Paste the block into the JSON editor, replacing everything that is currently there.
```
{
    "Outputs": {
    "Hostname": {
      "Value": {
        "Fn::Join": [
          "",
          [
            "Hostname:",
            {
              "Fn::GetAtt": [
                "ServerInstance",
                "PublicIp"
              ]
            }
          ]
        ]
      },
      "Description": "Newly created server hostname"
    }
  }
}
```
### Specify Resource Properties
Select the Properties tab. Copy the entire parameters block including the enclosing curly braces ({}) from below. On the Properties tab, paste the block into the JSON editor, replacing everything that is currently there.
```
{
  "Resources": {
    "ServerInstance": {
      "Type": "AWS::EC2::Instance",
      "Properties": {
        "InstanceType": {
          "Ref": "InstanceType"
        },
        "ImageId": {
          "Fn::FindInMap": [
            "AWSRegionArch2AMI",
            {
              "Ref": "AWS::Region"
            },
            {
              "Fn::FindInMap": [
                "AWSInstanceType2Arch",
                {
                  "Ref": "InstanceType"
                },
                "Arch"
              ]
            }
          ]
        },
        "KeyName": {
          "Ref": "KeyName"
        }
      }
    }
  }
}
```
