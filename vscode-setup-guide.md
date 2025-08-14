# VS Code Setup Guide for Machine Control Project

## Prerequisites

1. **Install Required Software:**
   - Python 3.8+ 
   - Node.js 16+
   - MySQL 8.0+
   - VS Code with extensions:
     - Python
     - ES7+ React/Redux/React-Native snippets
     - MySQL (optional)

## Project Setup Steps

### 1. Create Project Structure
```bash
mkdir machine-control
cd machine-control
mkdir backend frontend
```

### 2. Backend Setup (Django)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create Django project
django-admin startproject machine_control .
cd machine_control
python manage.py startapp api
```

### 3. Database Setup (MySQL)
```sql
CREATE DATABASE machine_control;
CREATE USER 'machine_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON machine_control.* TO 'machine_user'@'localhost';
FLUSH PRIVILEGES;
```

### 4. Configure Environment
```bash
# Copy .env.example to .env and update values
cp .env.example .env
```

### 5. Run Django Migrations
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

### 6. Frontend Setup (React)
```bash
cd ../frontend
npx create-react-app . --template typescript
npm install bootstrap axios
```

### 7. Start Development Servers

**Terminal 1 (Backend):**
```bash
cd backend
source venv/bin/activate
python manage.py runserver
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

## VS Code Configuration

### Recommended Extensions:
- Python
- Django
- ES7+ React/Redux/React-Native snippets
- Auto Rename Tag
- Bracket Pair Colorizer
- GitLens
- MySQL

### Workspace Settings (.vscode/settings.json):
```json
{
    "python.defaultInterpreterPath": "./backend/venv/bin/python",
    "python.terminal.activateEnvironment": true,
    "emmet.includeLanguages": {
        "django-html": "html"
    },
    "files.associations": {
        "*.html": "django-html"
    }
}
```

### Launch Configuration (.vscode/launch.json):
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Django",
            "type": "python",
            "request": "launch",
            "program": "${workspaceFolder}/backend/manage.py",
            "args": ["runserver"],
            "django": true,
            "cwd": "${workspaceFolder}/backend"
        }
    ]
}
```

## API Endpoints

- `GET /api/settings/1/` - Get machine settings
- `PATCH /api/settings/1/` - Update machine settings
- `POST /api/settings/update_coil_number/` - Adjust coil number
- `GET /api/product-count/1/` - Get product counts
- `PATCH /api/product-count/1/` - Update product counts
- `POST /api/product-count/reset_pieces/` - Reset pieces count
- `POST /api/product-count/reset_user_count/` - Reset user count
- `POST /api/product-count/reset_all/` - Reset all counts

## Development Workflow

1. **Backend Development:**
   - Models in `backend/api/models.py`
   - Views in `backend/api/views.py`
   - URLs in `backend/api/urls.py`
   - Admin in `backend/api/admin.py`

2. **Frontend Development:**
   - Components in `frontend/src/components/`
   - Services in `frontend/src/services/`
   - Styles in `frontend/src/styles/`

3. **Database Changes:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

4. **Testing:**
   ```bash
   # Backend
   python manage.py test
   
   # Frontend
   npm test
   ```

## Production Deployment

1. **Build Frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Configure Django for Production:**
   - Set `DEBUG = False`
   - Configure `ALLOWED_HOSTS`
   - Set up static files serving
   - Configure database for production

3. **Deploy:**
   - Use services like Heroku, DigitalOcean, or AWS
   - Set up proper environment variables
   - Configure web server (Nginx/Apache)
   - Set up SSL certificates