# Resume Builder

A professional web-based resume builder application that allows users to create, preview, and download resumes as PDF files.

## Features

- **User Authentication** - Secure signup and login using Firebase Authentication
- **Professional Resume Builder** - Create detailed resumes with:
  - Personal Information (Name, Phone, Address)
  - Professional Summary
  - Skills with visual progress bars
  - Education History
  - Work Experience
  - Profile Photo Upload
- **Live Preview** - Instantly preview your resume as you build it
- **PDF Export** - Download your resume as a professional PDF document
- **Cloud Storage** - Save resumes to Firebase Firestore
- **Modern UI** - Clean, responsive design with Poppins font and gradient styling
- **Easy Deployment** - Deploy locally with ngrok for quick sharing

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **PDF Generation**: html2pdf.js
- **Deployment**: Python, pyngrok

## Project Structure

```
resume-builder/
├── index.html        # Landing page
├── login.html        # User login page
├── signup.html       # User registration page
├── dashboard.html    # Main resume builder interface
├── script.js         # Resume builder functionality
├── auth.js           # Firebase authentication logic
├── style.css         # Global styles
└── deploy.py         # Local deployment script with ngrok
```

## Getting Started

### Prerequisites

- Web browser (Chrome, Firefox, Edge, etc.)
- Python 3.x (for local deployment)
- Firebase account (for authentication and database)

### Firebase Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Email/Password authentication in Authentication > Sign-in method
3. Create a Firestore database
4. Copy your Firebase config and update it in:
   - `auth.js` (already configured)
   - `script.js` (replace placeholder values)
5. Apply Firestore rules to allow signed-in users to save their own resumes:
   - Open **Firebase Console > Firestore Database > Rules**
   - Replace existing rules with the contents of `firestore.rules`
   - Click **Publish**

#### Firestore Rules Notes

- The app saves resumes in top-level collection: `resumes`
- Each resume includes `userId`
- Rules in `firestore.rules` allow:
  - users to create/read/update/delete only their own resumes
  - optional admins (custom claim `admin: true`) to access all resumes

If you still get `permission-denied`, verify that:
- you are logged in (check user email on dashboard header)
- the document has `userId` equal to `request.auth.uid`
- rules were published in the same Firebase project used by your config

### Running Locally

**Option 1: Direct File Access**
- Simply open `index.html` in your web browser

**Option 2: Using Python HTTP Server**
```bash
cd resume-builder
python -m http.server 8080
```
Then visit `http://localhost:8080`

**Option 3: Using ngrok for Public Access**
1. Install pyngrok:
   ```bash
   pip install pyngrok
   ```
2. Run the deployment script:
   ```bash
   python deploy.py
   ```
3. Share the generated public URL

## Usage

1. **Sign Up** - Create an account on the signup page
2. **Login** - Access your account
3. **Build Resume** - Fill in your details on the dashboard:
   - Add personal information
   - Write a professional summary
   - Add skills with proficiency levels
   - Add education entries
   - Add work experience
4. **Preview** - Click "Preview Resume" to see the formatted output
5. **Download** - The PDF will automatically download after preview
6. **Save** - Save your resume to Firebase for later access

## Screenshots

The application features:
- Modern blue gradient landing page
- Clean authentication forms
- Organized resume builder with section cards
- Professional resume preview with skill bars

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [Firebase](https://firebase.google.com/) - Authentication and Database
- [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) - PDF Generation
- [Google Fonts](https://fonts.google.com/) - Poppins font family
- [pyngrok](https://pyngrok.readthedocs.io/) - ngrok Python wrapper
