<div style="align:center; text-align:center;">

<img style="display:block; margin-left:auto; margin-right:auto;" src="./public/logo/logo.png" width="300" height="300"/>

<h1 style="text-align:center"> SCCS Course Planner</h1>

<p  style="text-align:center"> The SCCS Course Planner is an all in one solution for planning your classes at Swarthmore College!</p>

![repo_last_commit]
[![License][repo_license_img]][repo_license_url]
![repo_size]
![build_status]

<p>Looking to plan your classes? <a href="https://schedulerv2.sccs.swarthmore.edu/">Visit the live site!</a></p>
</div>

## 🏁 Getting Started

### Install

<ul>

[Golang](https://go.dev/dl/)

[NodeJS](https://nodejs.org/en) v18.18 or higher

[Docker](https://docs.docker.com/engine/install/)

</ul>

### Clone the Repo(recursivly!)

```bash
  git clone --recursive https://github.com/swat-sccs/scheduler-v2.git
  git checkout dev
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
go run main.go -semester=spring -year=2025 # Change to semester of choice
```

### View the dev site

Head on over to http://localhost:3000

### (Optional) View the database visually and in the browser!

```bash
npx prisma studio
```

Head on over to http://localhost:5555. Use this to confirm your database is populated.

### 📡 Technologies in Use

- [Next.js 14](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [Golang](https://go.dev/)

## License

Licensed under the [MIT license](https://github.com/swat-sccs/scheduler-v2/blob/main/LICENSE).

<!---vars-->

[repo_license_img]: https://img.shields.io/badge/license-Mit-red?style=for-the-badge&logo=none
[repo_license_url]: https://github.com/swat-sccs/scheduler-v2?tab=MIT-1-ov-file#readme
[repo_last_commit]: https://img.shields.io/github/last-commit/swat-sccs/scheduler-v2?style=for-the-badge&link=https%3A%2F%2Fgithub.com%2Fswat-sccs%2Fscheduler-v2&color=%2343AA8B
[build_status]: https://img.shields.io/github/check-runs/swat-sccs/scheduler-v2/main?style=for-the-badge&label=Build&color=%2343AA8B
[repo_size]: https://img.shields.io/github/repo-size/swat-sccs/scheduler-v2?style=for-the-badge
