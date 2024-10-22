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

Install [NodeJ](https://nodejs.org/en) v18.18 or higher

### Clone the Repo(recursivly!)
```bash
  git clone --recursive https://github.com/swat-sccs/scheduler-v2.git
  cd scheduler-v2
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
go run main.go
```

### View the dev site

Head on over to http://localhost:3000

### View the db vizually

```bash
npx prisma studio
```

Head on over to http://localhost:5555

## License

Licensed under the [MIT license](https://github.com/swat-sccs/scheduler-v2/blob/main/LICENSE).
