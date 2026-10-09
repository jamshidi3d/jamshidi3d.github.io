#!/usr/bin/env bash
# Builds small looping GIF hover previews from the project clips.
# Usage: bash scripts/make-previews.sh   (needs ffmpeg and ffprobe on PATH)
set -euo pipefail
cd "$(dirname "$0")/.."
OUT=public/media/preview
mkdir -p "$OUT"
PAL=$(mktemp -d)

make() { # file fps colors
  local f=$1 fps=$2 colors=$3 name dur start
  name=$(basename "$f" .mp4)
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")
  # start 2 s in, but never past the end of short clips
  start=$(awk -v d="$dur" 'BEGIN{s=2; if (d < 9) s=0; print s}')
  local vf="fps=$fps,scale=320:-2:flags=lanczos"
  ffmpeg -y -v error -ss "$start" -t 6 -i "$f" -vf "$vf,palettegen=max_colors=$colors:stats_mode=diff" "$PAL/$name.png"
  ffmpeg -y -v error -ss "$start" -t 6 -i "$f" -i "$PAL/$name.png" \
    -lavfi "$vf [x]; [x][1:v] paletteuse=dither=bayer:bayer_scale=4" -loop 0 "$OUT/$name.gif"
}

for f in public/media/video/*.mp4; do
  name=$(basename "$f" .mp4)
  make "$f" 10 128
  size=$(stat -c%s "$OUT/$name.gif")
  # over budget (about 600 KB): retry with fewer frames and colours
  if [ "$size" -gt 600000 ]; then make "$f" 8 96; size=$(stat -c%s "$OUT/$name.gif"); fi
  if [ "$size" -gt 600000 ]; then make "$f" 6 64; size=$(stat -c%s "$OUT/$name.gif"); fi
  echo "$name.gif $((size / 1024)) KB"
done
rm -rf "$PAL"
