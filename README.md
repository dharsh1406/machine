# Industrial Machine Auto Setting Control Panel

A full-stack web application for industrial machine control with Django backend, React frontend, Bootstrap styling, and MySQL database.

## Project Structure

```
machine-control/
├── backend/                 # Django backend
│   ├── machine_control/     # Django project
│   ├── api/                 # Django app for API
│   ├── requirements.txt     # Python dependencies
│   └── manage.py
├── frontend/               # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
└── README.md
```

## Setup Instructions

### Backend Setup (Django + MySQL)

1. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

3. Configure MySQL database in `settings.py`

4. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

5. Start Django server:
```bash
python manage.py runserver
```

### Frontend Setup (React + Bootstrap)

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start React development server:
```bash
npm start
```

## Features

- Auto S1 parameter controls (Speed, Acceleration, Deceleration, Step settings)
- Product counting system with pieces and user counts
- Coil number tracking with increment/decrement controls
- Reset functionality for individual counters and bulk quantities
- Professional industrial interface styling
- Real-time data synchronization with backend
- MySQL database persistence

## Technologies Used

- **Backend**: Django, Django REST Framework, MySQL
- **Frontend**: React, Bootstrap, Axios
- **Database**: MySQL
- **Development**: VS Code, Python, Node.js