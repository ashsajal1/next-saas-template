# Contributing to Next SaaS Template

First off, thank you for considering contributing to the Next SaaS Template! Your help is greatly appreciated. This document provides guidelines and best practices to help you contribute effectively.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [How Can I Contribute?](#how-can-i-contribute)
    - [Reporting Bugs](#reporting-bugs)
    - [Suggesting Features](#suggesting-features)
    - [Improving Documentation](#improving-documentation)
    - [Submitting Pull Requests](#submitting-pull-requests)
3. [Development Setup](#development-setup)
4. [Style Guides](#style-guides)
    - [Git Commit Messages](#git-commit-messages)
    - [Code Style](#code-style)
5. [Contact](#contact)

## Code of Conduct

By participating in this project, you agree to abide by the [Code of Conduct](CODE_OF_CONDUCT.md). Please read it to understand the expectations for behavior when interacting in the project.

## How Can I Contribute?

### Reporting Bugs

If you find a bug, please report it by opening an issue. Ensure you include:
- A clear and descriptive title.
- Steps to reproduce the issue.
- Expected and actual results.
- Screenshots or code snippets if applicable.
- Any relevant log output.

### Suggesting Features

We welcome suggestions for new features. If you have an idea, please open an issue and include:
- A clear and descriptive title.
- A detailed description of the feature and its benefits.
- Any potential implementation ideas.

### Improving Documentation

Good documentation is crucial. If you find areas for improvement in our documentation:
- Fork the repository and make your changes.
- Ensure your documentation is clear and concise.
- Open a pull request with a detailed description of your changes.

### Submitting Pull Requests

When you're ready to contribute your code, follow these steps:
1. **Fork the Repository**: Click the "Fork" button on the repository's GitHub page.
2. **Create a Branch**: Create a new branch for your feature or bugfix.
    ```bash
    git checkout -b feature-or-bugfix-name
    ```
3. **Commit Your Changes**: Make your changes and commit them with a clear message.
    ```bash
    git commit -m "Description of changes"
    ```
4. **Push to Your Branch**: Push your changes to your forked repository.
    ```bash
    git push origin feature-or-bugfix-name
    ```
5. **Create a Pull Request**: Open a pull request from your branch to the main repository's `main` branch. Provide a detailed description of your changes and the problem they solve or the feature they add.

## Development Setup

To set up your development environment:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/ashsajal1/next-saas-template.git
    cd next-saas-template
    ```
2. **Install Dependencies**:
    ```bash
    npm install
    # or
    pnpm install
    # or
    yarn install
    ```
3. **Start the Development Server**:
    ```bash
    npm run dev
    # or
    pnpm run dev
    # or
    yarn dev
    ```

## Style Guides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature").
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...").
- Limit the first line to 72 characters or less.
- Reference issues and pull requests liberally.
- Follow the emoji conventions for commit messages:
    - 📃 **docs**: Documentation changes.
    - 🐛 **fix**: Bug fixes.
    - ✨ **feat**: New features.
    - 🔧 **chore**: Changes to the build process or auxiliary tools.
    - 🎨 **style**: Code style changes (formatting, etc.).
    - 🚀 **perf**: Performance improvements.
    - ✅ **test**: Adding or updating tests.
    - 🔥 **remove**: Removing code or files.
    - ♻️ **refactor**: Refactoring code.
    - 📦️ **deps**: Dependency updates.
    - 🚧 **wip**: Work in progress.

### Code Style

- Follow the existing code style in the project.
- Use ESLint and Prettier to maintain code consistency.
- Write clear and concise comments where necessary.

## Contact

If you have any questions or need further assistance, feel free to reach out via email at ashsajal@yahoo.com.

Thank you for your contributions and for helping to make the Next SaaS Template better!
