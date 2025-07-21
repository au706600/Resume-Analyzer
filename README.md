# AI-Resume-Analyzer

An awesome tool for Resume Analysis and Resume Improvements. 

## 📚 Table of Contents

- [📘 Project Description](#project-description)
- [🧰 Prerequisites](#prerequisites)
- [✨ Features](#features)
- [🛠️ Tech Stack](#tech-stack)
- [📦 Installing](#installing)
- [🎥 Demo](#demo)

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


### 📦 Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

##  Layout

Directory structure of AI-Resume-Analyzer:

├── LICENSE
├── README.md
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── index.css
    ├── index.js
    ├── reportWebVitals.js
    └── setupTests.js

## 🎥 Demo

## 📌 Future Work





