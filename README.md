# GPT4DFCI 🤖

**Welcome to the code repository for GPT4DFCI, a private and secure generative AI tool, based on GPT-4 and deployed at Dana-Farber Cancer Institute.**

*ℹ️ Tool requirements, usage policy, and training material are overseen by the broader Dana-Farber Generative AI Governance Committee. The development of this tool is led by the Dana-Farber Informatics & Analytics Department.*

This repository is organized in the following sections:

- Manuscript & policy details accompanying this tool
- Training material for the users
- Front-end code - this is the application where the users place their queries and read the output
- Back-end code that handles all requests from the application and routes all requests to other components
- Infrastructure that was used to deploy this
- License
- Contact

# 📜 Manuscript & policy

👉 Here is linked the [Manuscript & policy details](./link) regarding this tool adoption.

# 🧑‍🎓 Training

👉 Here you will find the [training material](./GPT4DFCI%20User%20Technical%20Training/GPT4DFCI%20Training%20v204.pdf) that accompanied this tool deployment.

# 💻 GPT4DFCI Front-end Code

<img src="https://github.com/Dana-Farber-AIOS/GPT4DFCI/assets/25375373/3400b3cf-9faf-4fce-8c22-3dff0cb5313e"/>

👉 Code & instructions are in the [DFCI-GPT4DFCI](./DFCI-GPT4DFCI) folder.

# ⌨ GPT4DFCI Backend Code

<img src="https://github.com/Dana-Farber-AIOS/GPT4DFCI/assets/25375373/2fd2777c-27ba-4821-9c85-b81146da872d"/>

👉 Code & instructions are in the [DFCI-GPT4DFCI-Backend](./DFCI-GPT4DFCI-Backend) folder.

# 🏗️ GPT4DFCI Infrastructure

![image](https://github.com/Dana-Farber-AIOS/GPT4DFCI/assets/25375373/413e1af9-576f-44a8-9cc4-1fffb53d7c2c)

👉 Code & instructions are in the [DFCI-GPT4DFCI-infra](./DFCI-GPT4DFCI-infra) folder.

# 🎫 License

The GNU GPL v2 version of GPT4DFCI is made available via Open Source licensing. The user is free to use, modify, and distribute under the terms of the GNU General Public License version 2.

Commercial license options are available also, and include these additional features:
- Accurate per-user monthly billing, based on actual Azure OpenAI token consumption
- Log analytics to monitor application status and application adoption by the user base
- Log analytics to detect and monitor power users and possibly malicious behavior (e.g., jailbreaking attempts)
- Load balancing and retry logic to mitigate Azure OpenAI quota limits and ensure a smooth user experience 

# 📧 Contact

Questions? Comments? Suggestions? Get in touch!

aios@dfci.harvard.edu
