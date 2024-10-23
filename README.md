Pokedex: A Node.js Application to Build a Notion Pokedex
========================================================

Project Overview:
-----------------

This project allows you to build a **Pokédex** using **Node.js**, by fetching Pokémon data from the [PokéAPI](https://pokeapi.co/) and storing it in a **Notion** database. It provides an interactive and visually appealing way to explore Pokémon information, leveraging Notion's powerful database and organization features.

Functionality:
--------------

*   Fetches Pokémon data from the **PokéAPI**.
    
*   Creates a **Notion** database (if it doesn't exist).
    
*   Adds pages to the Notion database for each Pokémon, including details and images.
    

### Benefits:

*   Provides an interactive and visually appealing way to explore Pokémon information.
    
*   Leverages Notion's powerful database and organization features.
    

Prerequisites:
--------------

*   [Node.js](https://nodejs.org/) and npm installed.
    
*   axios library for making HTTP requests: [npm link](https://www.npmjs.com/package/axios).
    
*   dotenv library for managing environment variables: [npm link](https://www.npmjs.com/package/dotenv).
    
*   @notionhq/client for interacting with the Notion API: [npm link](https://www.npmjs.com/package/@notionhq/client).
    
*   Basic understanding of **Node.js** and **JavaScript**.
    

Installation:
-------------

### 1\. Clone the Repository:

If using Git, clone this repository or download the project files:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   bashCopy codegit clone https://github.com/your-username/pokedex-notion.git   `

### 2\. Navigate to the Project Directory:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   bashCopy codecd pokedex-notion   `

### 3\. Install Required Dependencies:

Install the necessary packages using npm:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   bashCopy codenpm install axios dotenv @notionhq/client   `

### 4\. Set Up Environment Variables:

Create a .env file in the root directory of the project and add the following lines, replacing the placeholders with your actual values:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   bashCopy codeNOTION_TOKEN=YOUR_NOTION_API_TOKEN  NOTION_DATABASE_ID=YOUR_NOTION_DATABASE_ID   `

*   Obtain your **Notion API token** from the [Notion Developers Page](https://developers.notion.com/).
    
*   Find your **Notion database ID** by sharing the database and copying the alphanumeric string after ?blockId= from the URL of your Notion page.
    

Usage:
------

Run the application:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   bashCopy codenode index.js   `

This will start fetching data from the PokéAPI and add it to your Notion database.

Data Accessed from PokéAPI:
---------------------------

The application retrieves the following attributes for each Pokémon from the [PokéAPI](https://pokeapi.co/):

*   **Name**
    
*   **ID**
    
*   **Height**
    
*   **Weight**
    
*   **Types**
    
*   **Abilities**
    
*   **Image URL** (sprites)
    

Code Structure:
---------------

The code is organized into modules and functions for better maintainability:

*   **API Interaction**: Handles requests to the PokéAPI and Notion API.
    
*   **Data Processing**: Formats and structures the retrieved Pokémon data for storage in Notion.
    

Additional Information:
-----------------------

*   You can extend this project to include additional features such as searching Pokémon by name, type, or other attributes.
    
*   Consider adding screenshots or visuals of your Notion Pokédex to make it easier for users to understand and visualize the project.
