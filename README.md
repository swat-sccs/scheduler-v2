# Scheduler v2

## Technologies Used

- [Next.js 14](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)

## Setting up development server

1. Build and Run Container
`docker compose -f docker-compose.debug.yml up --build`
    (add flag --remove-orphans to kill deserted images of cygnet) 
2. run `ssh -L localhost:3306:130.58.64.142:3306 gull` to direct traffic to server
3. Visit http://localhost:3000
As you edit project files, the page should update dynamically (no need to reload!).


### Install dependencies

```
npm install
```

### Run the development server

```
npm run dev
```


## License

Licensed under the [MIT license](https://github.com/swat-sccs/scheduler-v2/blob/main/LICENSE).
