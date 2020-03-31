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
