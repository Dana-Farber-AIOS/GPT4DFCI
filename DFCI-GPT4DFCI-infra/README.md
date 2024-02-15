# GPT4DFCI Infrastructure

This is alpha code provided as an example. What we ended up doing for v1.0 is to have 3 subscriptions; in the lowest one we would create manually Azure resources, configure them in detail, and export complete Azure ARM Template. These ARM files were then used to deploy in the other two subscriptions (one dedicated to testing and the other to production). The following code is based on the Pulumi-Azure interface and it aims at automating this process.

## Prerequisites

### Create a project folder

### Login into Azure

`az login`

### Login into pulumi

`pulumi login`

### Crete a new pulumi-azure project 

`pulumi new azure-python`

### Install required libraries

`pip install pulumi pulumi_azure pulumi_azure_native`

## Run the deployment

### Replace `__main__.py` content with [`infra-pulumi-alpha.py`](./infra-pulumi-alpha.py) content

### Bring up the infra

`pulumi up`

## Toubleshooting

### Check the infra status

`pulumi stack`

### Take down the infra

`pulumi destroy`

![image](https://github.com/Dana-Farber-AIOS/GPT4DFCI/assets/25375373/413e1af9-576f-44a8-9cc4-1fffb53d7c2c)
