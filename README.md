# AI-Resume-Analyzer

An awesome tool for Resume Analysis and Resume Improvements. 

## 📚 Table of Contents

- [📘 Project Description](#-project-description)
- [🧰 Prerequisites](#-prerequisites)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#tech-stack)
- [📦 Installation](#-installation)
- [🧱 Directory Structure](#-directory-structure-of-ai-resume-analyzer)
- [🎥 Demo](#-demo)
- [📌 Future Work](#-future-work)

## 📘 Project Description

AI-Resume-Analyzer is a responsive web application that uses the AI-model, DeepSeek, to analyze uploaded resumes and provide feedback and suggestions for improvement. 
The project follows a modular architecture, separating frontend rendering, PDF processing, and AI integration to ensure maintainability and scalability.

## 🧰 Prerequisites

To ensure smooth experience, have the following installed: 

- Visual Studio Code (Preferred)
- Git
- Javascript
- If not already, create an account in a website called 'huggingface' and get an api key through Settings -> Access Tokens -> Create new token.
  Then in Token type, there are three categories, choose Read and give the token a name. Finally create the token.
  


## ✨ Features

* Upload Resume on webserver
* AI parses information from PDF and provides feedback and suggestions for improveent. 

## 🛠️ Tech Stack

<details open>
  <summary><strong>Frontend</strong></summary>
  
  - <a href="https://developer.mozilla.org/en-US/docs/Web/HTML">HTML</a> - Markup structure the content of webpage
  - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS">CSS</a> - Styling of webpage
  - <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">JavaScript</a> - DOM manipulation and logic. 
</details>

<details open>
  <summary><strong>Backend</strong></summary>
  - <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">JavaScript</a> - Built with Node.js, handling file uploads, PDF parsing, and AI-driven resume analysis. 
</details>

<details>
  <summary><strong>Modules</strong></summary> 
  - <a href="https://www.npmjs.com/package/dotenv">dotenv</a> 
  - <a href="https://huggingface.co/docs/huggingface.js/index">InferenceClient</a>  
  - <a href="https://www.npmjs.com/package/pdfreader">pdfreader</a>    
  - <a href="https://nodejs.org/api/http.html">http</a>
  - <a href="https://www.npmjs.com/package/formidable">formidable</a>
  - <a href="https://nodejs.org/api/fs.html">fs</a>
  - <a href="https://nodejs.org/api/path.html">path</a>

</details>


### 📦 Installation

To run the project locally, run the following steps: 

1. Clone the repository
If you haven't yet, first set up Git and authentication with GitHub.com from Git. For more information, please see <a href="https://docs.github.com/en/get-started/git-basics/set-up-git">Set up Git</a>. Click on <> Code and copy the URL of the repository that should look like the following:  

```bash
   git clone https://github.com/au706600/Resume-Analyzer.git
```

2. Open Git Bash in whatever local file location in your computer and run the following:

```bash
   git clone https://github.com/au706600/Resume-Analyzer.git
   cd Resume-Analyzer
```

3. Install Dependencies
Make sure you have Node.js and npm installed. Then install packages: 
```bash
   npm install
```

4. Start the Server
Run the following command to start the node.js server:
```bash
node Resume-Analyzer-Server.js
```

5. In your browser, open the application
Navigate to:
```bash
http://localhost:3000
```

As a result, this will launch the GUI, allowing you to upload a resume, and receive AI-based analysis based on your resume. For more information, please see <a href="https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository">Cloning a repository</a>. 

## 🧱 Directory Structure of AI-Resume-Analyzer

```
├── node_modules/  # (created by npm install, not shown)
├── public
│   ├── Resume-Analyzer.html
├── .gitignore
├── README.md
├── Resume-Analyzer-Server.js
├── Resume-Analyzer.js
├── ai-bot-analyzer.js
├── package-lock.json
└── package.json
```


## 🎥 Demo

## 📌 Future Work





