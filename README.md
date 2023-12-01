# Panduan Penggunaan Repository nyok_lapor

## Clone Repository

```bash
git clone -b backend https://github.com/Tonnyade27/nyok_lapor.git
cd backend

## Hapus Node Modules

```bash
rm -rf node_modules

## Install Dependencies dengan NPM CI

```bash
npm ci

## Menjalankan Aplikasi
### Mode normal

```bash
npm run start

### Mode Development

```bash
npm run start:dev

### Mode Production

```bash
npm run build
