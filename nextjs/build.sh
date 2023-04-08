docker build -t tcgplayer-nextjs .
docker tag tcgplayer-nextjs:latest sonvh86/tcgplayer-nextjs:latest
docker push sonvh86/tcgplayer-nextjs:latest