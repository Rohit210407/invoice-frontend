import axios from "axios";

export const uploadInvoiceThumbnail = async (imageData) => {
    try {
        const formData = new FormData();
        formData.append("file", imageData);
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "invoices-thumbnail";
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dhadf5h7j";
        
        formData.append("upload_preset", uploadPreset); 
        formData.append("cloud_name", cloudName); 

        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData
        );

        return res.data.secure_url;
    } catch (error) {
        console.warn("Cloudinary upload failed (likely missing/invalid credentials). Proceeding without thumbnail.", error);
        // Return a dummy placeholder image or empty string if upload fails
        return "https://via.placeholder.com/150?text=Invoice+Thumbnail";
    }
};