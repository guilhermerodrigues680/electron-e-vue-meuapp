# meuapp

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

# Electron

### A
```
npx electron-builder install-app-deps --platform linux
```

Mac -> zip .app do dmg
Linux -> zip linux unpacked 'dist_electron/linux-unpacked'
Win -> npx electron-builder install-app-deps --platform win32

### DEBUG
```sh
npm run electron:serve:debug
# Em seguida acesse Run e Debug Main Process
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
