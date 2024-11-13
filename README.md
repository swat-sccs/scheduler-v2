# Scheduler v2

## Technologies Used

- [Next.js 14](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [Golang](https://go.dev/)

### Install dependencies

Install [Golang](https://go.dev/dl/)

Install [NodeJS](https://nodejs.org/en) v18.18 or higher

### Clone the Repo(recursivly!)
```bash
  git clone --recursive https://github.com/swat-sccs/scheduler-v2.git
  cd scheduler-v2
```

### Configure your .env file
Paste the following into a .env in the root of the project.
```env
DATABASE_URL="postgresql://postgres:example@localhost:5432/scheduler_db"

```

### Run the development server

```bash
docker compose -f docker-compose.debug.yml up -d
cd swatscraper
```

first run only:

```bash
go mod init github.com/swatscraper
go mod tidy
```

```bash
go run main.go -semester=spring -year=2025 # Change to semester of choice

```



### View the dev site

Head on over to http://localhost:3000



### (Optional) View the database visually and in the browser!

```bash
npx prisma studio
```
Head on over to http://localhost:5555. Use this to confirm your database is populated. 



## License

Licensed under the [MIT license](https://github.com/swat-sccs/scheduler-v2/blob/main/LICENSE).
