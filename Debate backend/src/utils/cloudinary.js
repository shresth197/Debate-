import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'


cloudinary.config({
    cloud_name: String(process.env.CLOUDINARY_CLOUD_NAME),
    api_key: String(process.env.CLOUDINARY_API_KEY),
    api_secret: String(process.env.CLOUDINARY_API_SECRET)
});

export const uploadOnCloudinary = async (filePath) => {

    try {

        if (!filePath) return null;

        const response = await cloudinary.uploader.upload(filePath, { resource_type: "auto" });

        fs.unlinkSync(filePath);

        return response;

    } catch (error) {

        fs.unlinkSync(filePath);
        return null;
    }

}