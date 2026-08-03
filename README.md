# Nieokiełznani

A personal website sharing my journey through the frustrations and eventual breakthroughs in dog training.

## Media encode

```
  for f in media/*.mov; do
    ffmpeg -i "$f" -vf "scale=1080:-2" -c:v libx264 -b:v 5M -preset medium -movflags +faststart "${f%.mov}.mp4"
  done
```
