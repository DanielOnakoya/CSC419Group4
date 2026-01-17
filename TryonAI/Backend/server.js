import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import multer from "multer";
import FormData from "form-data";
import axios from "axios";

dotenv.config();

const app = express();
const upload = multer(); // memory storage

app.use(cors());
app.use(express.json());

const API_KEY = process.env.TRYON_API_KEY;

if (!API_KEY) {
  console.error("❌ ERROR: TRYON_API_KEY not set in .env");
  process.exit(1);
}

/**
 * START TRY-ON JOB
 */
app.post(
  "/tryon",
  upload.fields([
    { name: "person", maxCount: 1 },
    { name: "garment", maxCount: 1 },
  ]),
  async (req, res) => {
    console.log("🔥 /tryon HIT");

    try {
      // Validate uploads
      if (!req.files?.person || !req.files?.garment) {
        return res.status(400).json({
          error: "Both person and garment images are required",
        });
      }

      const person = req.files.person[0];
      const garment = req.files.garment[0];

      console.log("📦 Person:", person.mimetype, person.size);
      console.log("📦 Garment:", garment.mimetype, garment.size);

      // Build form-data EXACTLY as TryOn API expects
      const formData = new FormData();
      formData.append("person_images", person.buffer, {
        filename: "person.jpg",
        contentType: person.mimetype,
      });
      formData.append("garment_images", garment.buffer, {
        filename: "garment.jpg",
        contentType: garment.mimetype,
      });

      // Call TryOn API
      const response = await axios.post(
        "https://tryon-api.com/api/v1/tryon",
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            Authorization: `Bearer ${API_KEY}`,
          },
          maxBodyLength: Infinity,
          maxContentLength: Infinity,
        },
      );

      // 🔥 Log exact response (for visibility)
      console.log("🧠 TRYON RAW RESPONSE:", response.data);

      // ✅ SAFE jobId extraction (FINAL FIX)
      const jobId =
        response.data?.jobId || // <-- THIS WAS THE MISSING PIECE
        response.data?.job_id ||
        response.data?.id ||
        response.data?.data?.job_id ||
        response.data?.job?.id;

      if (!jobId) {
        console.error("❌ TryOn API did not return jobId");
        return res.status(500).json({
          error: "TryOn API did not return jobId",
          rawResponse: response.data,
        });
      }

      console.log("✅ Extracted jobId:", jobId);

      // Return jobId to frontend
      res.json({
        success: true,
        jobId,
      });
    } catch (err) {
      console.error("❌ TRYON API CALL FAILED");
      console.error("Status:", err.response?.status);
      console.error("Data:", err.response?.data);
      console.error("Message:", err.message);

      res.status(500).json({
        error: "Try-On API request failed",
        raw: err.response?.data || err.message,
      });
    }
  },
);

/**
 * POLL TRY-ON STATUS
 */
app.get("/tryon/status/:jobId", async (req, res) => {
  try {
    const { jobId } = req.params;

    const response = await axios.get(
      `https://tryon-api.com/api/v1/tryon/status/${jobId}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      },
    );

    console.log("📡 STATUS RESPONSE:", response.data);

    res.json({
      success: true,
      data: response.data,
    });
  } catch (err) {
    console.error("❌ STATUS CHECK FAILED");
    console.error("Status:", err.response?.status);
    console.error("Data:", err.response?.data);
    console.error("Message:", err.message);

    res.status(500).json({
      error: "Try-On status request failed",
      raw: err.response?.data || err.message,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Try-On backend running on port ${PORT}`);
});
