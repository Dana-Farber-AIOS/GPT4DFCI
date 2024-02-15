##
## This is alpha code, generated with GPT4DFCI (a private and secure generative AI tool based on GPT4) 
##

import pulumi
from pulumi_azure import core, appservice, containerregistry, storage
from pulumi_azure_native import resources, cosmosdb, cognitive_services

# Configuration
config = pulumi.Config()
location = config.require('location')  # e.g., "WestUS2"

# Create an Azure Resource Group
resource_group = resources.ResourceGroup('resourceGroup',
                                         resource_group_name='my-resource-group',
                                         location=location)

# Azure API Management (APIM)
apim = cognitive_services.Account('apimService',
                                  account_name='myapimaccount',
                                  kind='api',
                                  sku=cognitive_services.SkuArgs(name='Consumption'),
                                  resource_group_name=resource_group.name,
                                  location=location)

# Azure App Service
app_service_plan = appservice.Plan('appServicePlan',
                                   resource_group_name=resource_group.name,
                                   kind='App',
                                   sku={'tier': 'Basic', 'size': 'B1'})

app_service = appservice.AppService('appService',
                                    resource_group_name=resource_group.name,
                                    app_service_plan_id=app_service_plan.id)

# Azure Container Registry
acr = containerregistry.Registry('acr',
                                 resource_group_name=resource_group.name,
                                 sku='Basic',
                                 admin_enabled=True)

# Azure Cosmos DB
cosmosdb_account = cosmosdb.Account('cosmosdbAccount',
                                    resource_group_name=resource_group.name,
                                    kind='GlobalDocumentDB',
                                    database_account_offer_type='Standard',
                                    locations=[{
                                        'locationName': resource_group.location,
                                        'failoverPriority': 0,
                                        'isZoneRedundant': False,
                                    }])

# Azure Storage Account
storage_account = storage.Account('storageAccount',
                                  resource_group_name=resource_group.name,
                                  account_tier='Standard',
                                  account_replication_type='LRS')

# Create an Azure Cognitive Services Account for OpenAI
# This needs to be updated with the latest model IDs from Azure page and associated model versions (eg, 0613)
# https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/models
# Content-filter needs to be setup manually for each deployment
openai_account = cognitive_services.Account('openaiAccount',
                                            account_name='myopenaiaccount',
                                            kind='OpenAI',
                                            sku=cognitive_services.SkuArgs(name='S0'),
                                            resource_group_name=resource_group.name,
                                            location=location,
                                            properties=cognitive_services.AccountPropertiesArgs(
                                                public_network_access='Enabled',
                                            ))
# Function to deploy models
def deploy_model(model_name, deployment_name):
    return cognitive_services.Deployment(f'{deployment_name}Deployment',
                                         deployment_name=deployment_name,
                                         account_name=openai_account.name,
                                         resource_group_name=resource_group.name,
                                         properties=cognitive_services.DeploymentPropertiesArgs(
                                             model=cognitive_services.DeploymentModelArgs(
                                                 format="OpenAI",
                                                 name=model_name,
                                             ),
                                         ))
# Deploy models
models = {
    'gpt-3.5-turbo-16k': 'modelGpt35Turbo-api-16k',  #API users
    'gpt-3.5-turbo': 'modelGpt35Turbo-4k',
    'gpt-4': 'modelGpt4-8k',
    'gpt-4-32k': 'modelGpt4-api-32k', #API users
    'gpt-4-1106-preview': 'modelGpt4Turbo-128k',
    'gpt-4-1106-preview': 'modelGpt4Turbo-api-128k', #API users
}
for model_name, deployment_name in models.items():
    deployed_model = deploy_model(model_name, deployment_name)
    pulumi.export(f'deployed_{deployment_name}_name', deployed_model.name)


## !pulumi up
