# 🗒️ MindScribe

[![Python](https://img.shields.io/badge/Python-3.11-blue)](https://www.python.org/)
[![Django](https://img.shields.io/badge/Django-4.1-brightgreen?style=flat&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![Django Rest Framework](https://img.shields.io/badge/Django_Rest_Framework-3.11-red)](https://www.django-rest-framework.org/)
[![Angular](https://img.shields.io/badge/Angular-10-blueviolet)](https://angular.io/)

**MindScribe** is a Google Keep-inspired note-taking application built with Django and Angular. It enables users to create, manage, and organize notes efficiently with a simple and intuitive interface.

## 🚀 Features

### 📝 Note Management
- Create, edit, and delete notes
- Add labels to categorize notes
- Pin important notes
- Archive and restore notes

### 🎨 Rich Text & Multimedia
- Support for text formatting
- Attach images and links
- Color-coded notes for better organization

### 🔄 Synchronization & Collaboration
- Real-time updates *(To-Do)*
- Multi-user note sharing *(To-Do)*
- Collaboration with team members *(To-Do)*

## 🏗 **Tech Stack**

- **Backend:** Python 3.11, Django 5.1, Django REST Framework
- **Database:** PostgreSQL/MySQL
- **API Security:** JWT Authentication
- **Frontend:** Angular 19


## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/madhvi-n/mindscribe.git
cd mindscribe
```

### 2️⃣ Set up a virtual environment
```bash
python -m venv venv
source venv/bin/activate  # On macOS/Linux
venv\Scripts\activate  # On Windows
```

### 3️⃣ Install Dependencies
```bash
pip install -r requirements.txt
```

### 4️⃣ Apply Database Migrations
```bash
python manage.py migrate
```

### 5️⃣ Create a Superuser
```bash
python manage.py createsuperuser
```

### 6️⃣ Run the Development Server
```bash
python manage.py runserver
```

Access the application at: `http://127.0.0.1:8000`


## 📜 API Endpoints

| Endpoint              | Method | Description |
|----------------------|--------|-------------|
| `/api/notes`         | GET    | Get all notes |
| `/api/notes/{id}`    | GET    | Get note by ID |
| `/api/notes/add`     | POST   | Add a new note |
| `/api/labels`        | GET    | View all labels |
| `/api/auth/signup`   | POST   | User registration |
| `/api/auth/login`    | POST   | User login |


## 🔮 Future Enhancements
- Real-time syncing
- Collaboration & note sharing
- Dark mode & UI themes
- Voice-to-text notes


### 🎉 **Happy Coding!** 🚀

