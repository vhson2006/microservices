docker build -t tcgplayer-product .
docker tag tcgplayer-product:latest sonvh86/tcgplayer-product:latest
docker push sonvh86/tcgplayer-product:latest