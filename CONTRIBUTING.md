# 🤝 Contributing to AI Blog Automation

Thank you for your interest in contributing to AI Blog Automation! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)
- [Code Style Guidelines](#code-style-guidelines)
- [Testing Guidelines](#testing-guidelines)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## 🚀 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps which reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include details about your configuration and environment**

### Suggesting Enhancements

If you have a suggestion for a new feature or enhancement, please:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and explain which behavior you expected to see instead**

### Pull Requests

- Fork the repo and create your branch from `main`
- If you've added code that should be tested, add tests
- If you've changed APIs, update the documentation
- Ensure the test suite passes
- Make sure your code lints
- Issue that pull request!

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Local Development

1. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/ai-blog-automation.git
   cd ai-blog-automation
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   # Edit .env with your test credentials
   ```

4. **Run Tests**
   ```bash
   npm run test-gemini
   npm run test-prompts
   npm run test-auto
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🔄 Pull Request Process

1. **Update the README.md** with details of changes if applicable
2. **Update the CHANGELOG.md** with a note describing your changes
3. **The PR will be merged once you have the sign-off** of at least one maintainer

### PR Guidelines

- **Title**: Use conventional commit format (e.g., `feat: add new AI model support`)
- **Description**: Clearly describe what the PR does and why
- **Tests**: Include tests for new functionality
- **Documentation**: Update relevant documentation
- **Breaking Changes**: Clearly mark any breaking changes

## 🐛 Reporting Bugs

### Before Submitting

- [ ] Check if the bug has already been reported
- [ ] Check if the bug has been fixed in the latest version
- [ ] Try to reproduce the bug with the latest code

### Bug Report Template

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g. macOS, Windows, Linux]
 - Node.js Version: [e.g. 18.0.0]
 - npm Version: [e.g. 9.0.0]

**Additional context**
Add any other context about the problem here.
```

## 💡 Suggesting Enhancements

### Enhancement Request Template

```markdown
**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is.

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
```

## 📝 Code Style Guidelines

### JavaScript/Node.js

- Use **ES6+** features where appropriate
- Follow **Airbnb JavaScript Style Guide**
- Use **async/await** instead of promises when possible
- Add **JSDoc comments** for functions and classes
- Use **meaningful variable names**

### Example

```javascript
/**
 * Generates blog content using Gemini AI
 * @param {string} topic - The topic to generate content about
 * @returns {Promise<string>} Generated blog content
 */
async function generateBlogContent(topic) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(topic);
    return result.response.text();
  } catch (error) {
    console.error('Error generating content:', error);
    throw new Error('Failed to generate blog content');
  }
}
```

### File Naming

- Use **kebab-case** for file names: `test-gemini.js`
- Use **PascalCase** for classes: `BlogGenerator`
- Use **camelCase** for functions and variables: `generateBlog`

## 🧪 Testing Guidelines

### Writing Tests

- Write tests for all new functionality
- Use descriptive test names
- Test both success and error cases
- Mock external dependencies

### Example Test

```javascript
describe('Blog Generation', () => {
  it('should generate blog content successfully', async () => {
    const content = await generateBlogContent('AI in Healthcare');
    expect(content).toBeDefined();
    expect(content.length).toBeGreaterThan(100);
  });

  it('should handle API errors gracefully', async () => {
    // Mock API error
    jest.spyOn(genAI, 'getGenerativeModel').mockImplementation(() => {
      throw new Error('API Error');
    });

    await expect(generateBlogContent('test')).rejects.toThrow('Failed to generate blog content');
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm run test-gemini

# Run tests with coverage
npm run test:coverage
```

## 📚 Documentation

### Code Documentation

- Add JSDoc comments for all public functions
- Include examples in comments
- Document complex algorithms
- Explain business logic

### README Updates

- Update README.md for new features
- Add usage examples
- Update configuration options
- Include troubleshooting steps

## 🏷️ Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools

### Examples

```
feat: add support for multiple AI models
fix: resolve WordPress authentication issue
docs: update deployment instructions
test: add unit tests for blog generation
```

## 🎯 Areas for Contribution

### High Priority

- [ ] Add support for more AI models (OpenAI, Claude, etc.)
- [ ] Implement content templates and themes
- [ ] Add social media auto-posting
- [ ] Create analytics dashboard
- [ ] Add multi-language support

### Medium Priority

- [ ] Improve error handling and logging
- [ ] Add content scheduling calendar
- [ ] Implement A/B testing for content optimization
- [ ] Add bulk content generation
- [ ] Create WordPress plugin integration

### Low Priority

- [ ] Add more content types
- [ ] Improve documentation
- [ ] Add more test coverage
- [ ] Performance optimizations
- [ ] UI/UX improvements

## 🤝 Getting Help

If you need help with contributing:

- **Issues**: Create an issue with the `help wanted` label
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check the wiki and existing documentation
- **Community**: Join our community channels

## 🙏 Recognition

Contributors will be recognized in:

- **README.md** contributors section
- **CHANGELOG.md** for significant contributions
- **GitHub contributors graph**
- **Release notes**

---

Thank you for contributing to AI Blog Automation! 🚀
