# Reunion

#Usage

1. cd into the parent directory of project, then use

npm install

This will install all the required dependencies

2. Now make a .env.development and .env.production file in the parent directory of project.

3. Now add these following lines

		PORT = Server Port

		MONGO_URL = MongoDb URI String

		CLOUDINARY_NAME = Cloudinary Service Name for Image Upload
		CLOUDINARY_KEY = Cloudinary Key
		CLOUDINARY_SECRET_KEY = Cloudinary SECRET

		JWT_SECRET_KEY = JWT Token Key

		tokenAge = Token and Cookie Expiry (preferred 259200000 , 3 Days)

in the .env.development and .env.production files.

4. Save the file

5. Now use

		npm run dev

to start the server in development mode and

    	npm run start

to start the server in production mode.
