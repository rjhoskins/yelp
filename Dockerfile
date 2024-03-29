
#simple no user/pass connect via mongodb://localhost:27017/
# assumes file is in root
FROM mongo:latest

EXPOSE 27017



# Set the data directory
ENV MONGO_DATA_DIR=/data/db

# Create a volume for MongoDB data
VOLUME $MONGO_DATA_DIR


# to Build the Docker image:
# docker build -t my-mongodb .

# to Run the Docker container, specifying the volume:
# docker run -d -p 27017:27017 --name my-mongodb-instance -v mongodb_data:/data/db my-mongodb

# inspect volume
# docker volume inspect mongodb_data

