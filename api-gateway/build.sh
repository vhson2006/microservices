docker build -t tcgplayer-gateway .
docker tag tcgplayer-gateway:latest sonvh86/tcgplayer-gateway:latest
docker push sonvh86/tcgplayer-gateway:latest