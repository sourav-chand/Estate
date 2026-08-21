# Estate Docker setup

The React frontend, Laravel API, and MariaDB database can be started together:

```bash
docker compose up --build
```

Open the frontend at http://localhost:5173. The API is available at
http://localhost:8000/api, and its health endpoint is http://localhost:8000/up.

The backend applies pending migrations and seeds a fresh database at startup.
The seeder is safe to run again: it skips seeding when the initial admin user
already exists. A named Docker volume (`mariadb-data`) preserves the database
between restarts.

For a clean database, stop the stack and remove its volume:

```bash
docker compose down -v
```

`APP_KEY` has a local-development default. Set a unique `APP_KEY` environment
variable before using this setup outside local development. You can also set
`VITE_API_BASE_URL` during the frontend image build if the API will be served at
a URL other than `http://localhost:8000/api`.
