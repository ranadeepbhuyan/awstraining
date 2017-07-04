Copy the entire parameters block including the enclosing curly braces ({}) from below. Paste the block into the JSON editor, replacing everything that is currently there.
This snippet adds parameters for specifying your server's instance type and an Amazon EC2 key-pair name to associate with the server.

```{
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
