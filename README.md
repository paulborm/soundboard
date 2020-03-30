# WIP: Soundboard

> Real-Time Soundboard.

## Image and Audio compression

Install ffmpeg on MacOS using this command:

```bash
brew install ffmpeg
```

Audio:

-ab: Bitrate (something between 32, - 64k)

```bash
ffmpeg -i input_file.mp3 -ab 48k  output_file.mp3
```


## How to set up

### Basics

Rename all files calles ``.env.dist`` to ``.env``

If you do not yet have now installed you can do so by running

```bash
npm i -g now
```

After creating a free account on https://zeit.co/ you can log in by using the command

```bash
now login
```

### Adding secret

Run this command for local development:

```bash
now secrets add api-url localhost:3001
```
