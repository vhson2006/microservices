docker build -t tcgplayer-card .
docker tag tcgplayer-card:latest sonvh86/tcgplayer-card:latest
docker push sonvh86/tcgplayer-card:latest