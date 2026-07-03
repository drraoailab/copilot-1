# Personal Information Form Application

A clean, secure Node.js + Express web application for collecting and validating user information with XSS protection and server-side validation.

## Features

✨ **Clean, Modern UI** - Responsive design with smooth animations
🔒 **Security-First** - Built-in XSS protection with input sanitization
✅ **Robust Validation** - Server-side validation using express-validator
📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
♿ **Semantic HTML5** - Accessible form with proper labels and ARIA support
🎨 **Modern Styling** - Minimal CSS with gradient backgrounds

## Project Structure

```
personal-form-app/
├── package.json           # Dependencies and scripts
├── app.js                 # Express server with routes and validation
├── public/
│   └── styles.css         # Clean, responsive stylesheet
├── views/
│   ├── form.ejs           # Main form template
│   ├── success.ejs        # Success page template
│   └── 404.ejs            # 404 error page
├── .gitignore
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js 14+ and npm installed on your system

### Step 1: Navigate to Project Directory
```bash
cd personal-form-app
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start the Server
```bash
npm start
```

You should see:
```
✓ Server running at http://localhost:3000
✓ Press Ctrl+C to stop the server
```

### Step 4: Open in Browser
Visit `http://localhost:3000` in your web browser

## Form Fields & Validation

| Field | Type | Required | Validation Rules |
|-------|------|----------|------------------|
| Full Name | Text | Yes | 2+ chars, letters/spaces/hyphens/apostrophes only |
| Email | Email | Yes | Valid email format, normalized |
| Age | Number | Yes | Integer between 18 and 120 |
| Phone | Tel | No | 7+ digits in common formats |
| Biography | Textarea | No | Maximum 500 characters |

## Security Features

🔐 **Input Sanitization** - All inputs are escaped to prevent XSS attacks
🧹 **Input Trimming** - Whitespace is automatically trimmed
✔️ **Type Checking** - Strict type validation for all fields
📧 **Email Normalization** - Emails are normalized to lowercase
🛡️ **Regex Validation** - Pattern matching for phone numbers and names

## API Endpoints

### GET /
Returns the blank form page

```bash
curl http://localhost:3000/
```

### POST /submit
Processes form submission

```bash
curl -X POST http://localhost:3000/submit \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "fullName=John+Doe&email=john@example.com&age=25&phone=5551234567&biography=Hello"
```

**Success Response:** Renders success page with sanitized user data

**Error Response:** Re-renders form with specific error messages for each field

## Development

### Modifying Validation Rules
Edit the `validationRules()` function in `app.js` to add or modify validation rules.

### Customizing Styles
Modify `public/styles.css` for UI changes. The stylesheet uses CSS variables for easy theming.

### Adding New Fields
1. Add field to form.ejs
2. Add validation rule in app.js
3. Update success.ejs to display the new field

## Database Integration (Future)

To persist data, add a database:

```javascript
// Example with MongoDB
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  fullName: String,
  email: String,
  age: Number,
  phone: String,
  biography: String,
  submittedAt: { type: Date, default: Date.now }
});
```

## License

MIT

## Support

For issues or questions, please refer to the code comments and validation rules in `app.js`.
