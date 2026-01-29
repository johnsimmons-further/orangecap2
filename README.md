# OrangeCap2

A static website built with Express.js and EJS templating.

## Features

- Express.js server
- EJS templating engine
- Responsive design
- Reusable partials (header/footer)
- Static file serving
- Multiple page routing
- 404 error handling

## Installation

```bash
npm install
```

## Usage

### Development mode (with auto-reload)
```bash
npm run dev
```

### Production mode
```bash
npm start
```

The server will start on `http://localhost:3000`

## Project Structure

```
orangecap2/
├── public/              # Static files
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
├── views/               # EJS templates
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── index.ejs
│   ├── about.ejs
│   ├── contact.ejs
│   └── 404.ejs
├── server.js            # Express server
└── package.json
```

## Pages

- `/` - Home page
- `/about` - About page
- `/contact` - Contact page

## Technologies

- Node.js
- Express.js
- EJS (Embedded JavaScript templating)
