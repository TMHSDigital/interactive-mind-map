# Contributing Guide

Thank you for your interest in contributing to the Interactive Mind Map Generator! This document provides guidelines and instructions for contributing to the project.

## Getting Started

1. **Fork the Repository**
   - Visit the [GitHub repository](https://github.com/TMHSDigital/interactive-mind-map)
   - Click the "Fork" button to create your copy

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/interactive-mind-map.git
   cd interactive-mind-map
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Start Development Server**
   ```bash
   npm start
   ```

## Development Guidelines

### Code Style

1. **JavaScript**
   - Use ES6+ features
   - Follow airbnb-style guidelines
   - Use meaningful variable and function names
   - Add JSDoc comments for functions
   - Keep functions small and focused

2. **CSS**
   - Use descriptive class names
   - Follow BEM naming convention
   - Keep selectors specific but not too nested
   - Use CSS variables for theming

3. **HTML**
   - Use semantic HTML elements
   - Ensure accessibility (ARIA labels, roles)
   - Keep markup clean and minimal

### Git Workflow

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-fix-name
   ```

2. **Make Changes**
   - Write clean, documented code
   - Test your changes thoroughly
   - Keep commits focused and atomic

3. **Commit Messages**
   - Use present tense ("Add feature" not "Added feature")
   - Be descriptive but concise
   - Reference issues if applicable
   ```bash
   git commit -m "feat: add keyboard shortcuts for node creation"
   git commit -m "fix: resolve node deletion bug (#123)"
   ```

4. **Push Changes**
   ```bash
   git push origin your-branch-name
   ```

5. **Create Pull Request**
   - Use the PR template
   - Describe your changes
   - Link related issues
   - Add screenshots if applicable

## Testing

1. **Manual Testing**
   - Test all affected functionality
   - Verify in multiple browsers
   - Check mobile responsiveness
   - Validate accessibility

2. **Future Automated Tests**
   - Unit tests (coming soon)
   - Integration tests (coming soon)
   - E2E tests (coming soon)

## Feature Requests

1. **Before Creating**
   - Check existing issues
   - Search closed PRs
   - Review project roadmap

2. **Creating Request**
   - Use the feature request template
   - Be specific about the need
   - Provide use cases
   - Suggest implementation if possible

## Bug Reports

1. **Before Reporting**
   - Search existing issues
   - Try latest version
   - Check browser console

2. **Report Format**
   - Describe the bug
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots
   - Environment details

## Documentation

1. **Code Documentation**
   - Add JSDoc comments
   - Update API documentation
   - Document complex algorithms

2. **User Documentation**
   - Update user guide
   - Add examples
   - Include screenshots

## Review Process

1. **Code Review**
   - All PRs need review
   - Address review comments
   - Keep discussion focused

2. **Acceptance Criteria**
   - Passes all checks
   - Well-documented
   - Properly tested
   - Follows guidelines

## Project Structure

```
interactive-mind-map/
├── docs/               # Documentation
├── js/                # JavaScript modules
│   ├── app.js         # Main application
│   ├── model.js       # Data model
│   └── visualization.js# D3.js visualization
├── styles/            # CSS styles
├── index.html         # Main HTML
└── package.json       # Dependencies
```

## Future Plans

1. **Upcoming Features**
   - Keyboard shortcuts
   - Undo/redo
   - Node search
   - Different shapes
   - Import functionality

2. **Technical Improvements**
   - TypeScript migration
   - Test coverage
   - Performance optimization
   - Mobile improvements

## Need Help?

- Check documentation
- Join discussions
- Ask in issues
- Review existing PRs

## Recognition

Contributors will be:
- Listed in README
- Mentioned in release notes
- Added to contributors list

Thank you for contributing to make this project better! 