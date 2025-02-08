# Decentraland dApps exercise V2

[Requirements](https://decentraland.notion.site/dApps-exercise-V2-7a0f0b51ca1442fc864573fd997388ec)

## Demo
https://github.com/user-attachments/assets/6160ce22-3ce7-4850-8bff-26ca895a91f8

## Caveats

- decentraland/ui is pretty outdated, in order to use modern library versions and being able to run the dev server and tests I forked it, fixed the issues and published under my npm user
- I understand that decentraland team may use redux and redux saga in production, and that's fine, but I consider there are better and simpler alternatives nowadays, you can see it reflected in the code
- Testing could be improved in the future, adding unit and e2e tests, In this case, I did not go into more detail beacuse I ignore how to mock window.ethereum properly
- The error handling UX could be way more improved

## Steps

### Clone dummy token repository

```sh
git clone git@github.com:decentraland/dummy-token.git
```

### Setup dummy token

Follow repo readme

> https://github.com/decentraland/dummy-token/blob/master/README.md

### Clone this repo

```sh
git clone git@github.com:bertilxi/dcl-challenge.git
```

### Install dependencies

```sh
npm i
```

### Setup environment variables

```sh
cp .env.example .env
```

> Replace `VITE_TOKEN_ADDRESS` with the address of the dummy token

### Run the app

```sh
npm run dev
```

### Build the app

```sh
npm run build
```

### Run tests

```sh
npm run test
```
