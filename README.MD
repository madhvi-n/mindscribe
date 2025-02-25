# 🗒️ MindScribe - Capture, Organize, and Retrieve Your Thoughts Effortlessly

[![Django CI](https://github.com/madhvi-n/mindscribe/actions/workflows/django.yml/badge.svg?branch=main)](https://github.com/madhvi-n/mindscribe/actions/workflows/django.yml)
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

1. Clone the Repository

    ```bash
    git clone https://github.com/madhvi-n/mindscribe.git
    cd mindscribe
    ```

2. Set up a virtual environment

    ```bash
    python -m venv venv
    source venv/bin/activate  # On macOS/Linux
    venv\Scripts\activate  # On Windows
    ```

3. Install Dependencies

    ```bash
    pip install -r requirements.txt
    ```

4. Apply Database Migrations

    ```bash
    python manage.py migrate
    ```

5. Create a Superuser

    ```bash
    python manage.py createsuperuser
    ```

6. Run the Development Server

    ```bash
    python manage.py runserver
    ```

    Access the application at: `http://127.0.0.1:8000`

## 📝 API Documentation

The API documentation is available via **Swagger**:

- **Swagger UI:** `http://127.0.0.1:8000/api/swagger/`
- **Redoc:** `http://127.0.0.1:8000/api/redoc/`

## ⚙️ Environment Variables *(Example .env file)*

```ini
SECRET_KEY=django-secret-key
DEBUG=True
DATABASE_NAME=db-name
DATABASE_USER=db-user
DATABASE_PASSWORD=db-password
DATABASE_HOST=db-host
DATABASE_PORT=5432
EMAIL_HOST_USER=email-host-user
EMAIL_HOST_PASSWORD=email-host-password
```

## 🔮 Future Enhancements

- Real-time syncing
- Collaboration & note sharing
- Dark mode & UI themes
- Voice-to-text notes

### 🎉 **Happy Coding!** 🚀
