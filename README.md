# IT Troubleshooting Guide

An interactive guide that walks a user through common IT problems one question at a time, then tells them either how to fix it or when to escalate. It also creates a ready-to-paste incident summary for a support ticket.

Live demo:(https://it-troubleshooter.vercel.app/)

![Screenshot of the IT Troubleshooting Guide](docs/screenshot.png)

## Features

- Decision-tree troubleshooting for 4 common problems: blank screens, no internet, computers that will not start, and slow devices
- Clear step-by-step fixes, with a separate "Escalate" outcome when it needs a technician
- Back and Start over buttons
- Progress indicator
- "Copy incident summary" button that turns the user's answers into a ticket-ready note
- Built with plain HTML, CSS and JavaScript. No frameworks or install needed.

## Tech stack

- HTML5
- CSS3
- JavaScript (ES6+, DOM manipulation)

## Run it locally

No install needed. Download or clone the project and open `index.html` in your browser.

```bash
git clone https://github.com/YOUR-USERNAME/it-troubleshooter.git
cd it-troubleshooter
```

## How it works

All the content lives in one JavaScript object (`tree` in `script.js`). Each entry is either a question with options that point to the next entry, or a result with steps. To add a new problem, add new entries and link them from `start`. No other code needs to change.

## What I practised

- Modelling data as a decision tree
- Dynamic DOM rendering with vanilla JavaScript
- Keeping data separate from display logic
- Clipboard API
- Writing clear, structured support steps

## Ideas for the future

- More categories (printers, email, passwords)
- Search box to jump straight to a problem
- Save a history of past incident summaries

## Author

**Kgothatso Kenny Manyaka**

