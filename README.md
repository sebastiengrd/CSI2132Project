# CSI2132 Database Project

Note: this project was not completed. However, we implemented the necessary features for the database course. There are no good use cases for now. But feel free to try it out anyway at https://project.sebgrd.dev/ .

Project components:
 - Frontend: Typescript + React
 - Backend: And API layer in javascript+node for the frontend to interract with the database
 - Database: Postgres database

## Getting Started

1. Download Docker Desktop https://www.docker.com/products/docker-desktop
2. run Docker Desktop. if it fails to run, try to switch your wsl version to wsl2 https://dev.to/adityakanekar/upgrading-from-wsl1-to-wsl2-1fl9
3. type docker-compose in WSL. make sure it's installed. if not https://docs.docker.com/engine/install/ubuntu/
4. git pull or git clone https://github.com/sebastiengrd/CSI2132Project and cd into it
4. "docker-compose up" to run the database container
5. make sure it starts correctly
6. download pgadmin 
7. connect to the database with pgadmin. host is localhost and port is 5432
