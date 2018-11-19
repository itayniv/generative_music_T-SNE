# 🐦 Flocking TSNE

An experiment by [Ayal Rosenberg](http://www.ayalrosenberg.com/) & [Itay Niv](http://www.itayniv.com/).


This experiment displays a set of processed audio files in two dimensional space using the t-SNE dimensionality reduction technique, placing similar-sounding audio clips near each other, and plays them back as autonomous flocking agents collide with them.

To add a bird click on the canvas, to remove press the left arrow.

TSNE processed with the help of [Gene Kogan's](https://github.com/genekogan) [ML4A guids](https://ml4a.github.io/guides/).
Boids simulation heavily inspired by [p5JS Flocking](https://p5js.org/examples/simulate-flocking.html).


# python script

python tSNE-audio.py --input_dir path/to/input/directory --output_file path/to/output/json

This will analyze all the sounds in path/to/input/directory and assign a set of t-SNE coordinates to them saved in the file path/to/output/json.

for example:

python tSNE-audio.py --input_dir ../audio/DrumSamples --output_file ../apps/AudioTSNEViewer/bin/data/points.json

To run it on a single audio file, in which case it will segment the audio by onsets, analyze each chunk and save them to a new directory, then run:

python tSNE-audio.py --input_file path/to/your/input/file --output_audio_dir path/to/output/chunks --output_file path/to/output/json

for example:

python tSNE-audio.py --input_file /Users/JaneDoe/Downloads/MyAudio.mp3 --output_audio_dir /Users/JaneDoe/Desktop/myClips --output_file ../apps/AudioTSNEViewer/bin/data/points.json