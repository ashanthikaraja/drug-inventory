# Drug Inventory and Supply Chain Tracking System

## Overview
The **Drug Inventory and Supply Chain Tracking System** is a MedTech solution designed to efficiently manage drug inventory, monitor supply chain operations, and ensure seamless tracking of pharmaceutical products. Built using **Django Rest Framework (DRF) for the backend** and **React.js for the frontend**, this system provides real-time insights into stock levels, expiration dates, supplier details, and order tracking.

## Features
- **User Authentication & Authorization** (JWT-based authentication)
- **Inventory Management** (Track stock levels, expiry dates, and batch details)
- **Supplier & Distributor Management**
- **Real-time Order Tracking & Notifications**
- **Automated Restocking Alerts**
- **Comprehensive Reporting & Analytics**
- **Secure Role-Based Access Control (Admin, Pharmacist, Supplier)**
- **Integration with Third-Party APIs** for shipping and tracking

## Technology Stack
### Frontend:
- React.js (UI Framework)
- Redux (State Management)
- Axios (API Communication)
- Tailwind CSS (Styling)

### Backend:
- Django Rest Framework (API Development)
- PostgreSQL/MySQL (Database Management)
- JWT Authentication (User Management & Security)
- Celery & Redis (Background Task Processing)

### Deployment:
- AWS/Heroku (Cloud Hosting)
- Docker (Containerization)

## Installation & Setup
### Prerequisites:
- Python 3.x & Django Installed
- Node.js & npm/yarn Installed
- PostgreSQL/MySQL Database

### Backend Setup:
```sh
# Clone the repository
git clone https://github.com/your-username/drug-inventory-tracking.git
cd drug-inventory-tracking/backend

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup Database
python manage.py migrate

# Run Server
python manage.py runserver
```

### Frontend Setup:
```sh
cd frontend

# Install dependencies
npm install

# Start the frontend
yarn start or npm start
```

## License
This project is licensed under the **MIT License**. Feel free to contribute and improve it!

