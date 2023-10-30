docker build . -t mehdib/api-arrow

docker run -d -p 3000:3000 mehdib/api-arrow
