const { Firestore } = require("@google-cloud/firestore");

const firestore = new Firestore();

// Referensi ke koleksi Firestore
const hewan_collection = firestore.collection("Animal");

/**
 * Fungsi untuk mengambil semua data dari koleksi 'Hewan'.
 * @returns {Array} - Array data dari koleksi Firestore.
 */
const getData = async () => {
  try {
    const snapshot = await hewan_collection.get();
    const results = [];

    // Iterasi setiap dokumen dalam koleksi
    snapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });

    console.log("Data retrieved successfully.");
    return results;
  } catch (error) {
    console.error("Error while retrieving data:", error);
    throw error;
  }
};

/**
 * Fungsi untuk mengambil data berdasarkan nama dokumen.
 * @param {string} docName - Nama dokumen untuk diambil.
 * @returns {Object} - Data dari dokumen yang diminta.
 */
const getDataByDocName = async (docName) => {
  try {
    const docRef = hewan_collection.doc(docName);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new Error("Document not found");
    }

    console.log(`Document retrieved: ${docName}`);
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error("Error while retrieving document:", error);
    throw error;
  }
};

/**
 * Fungsi untuk mengambil data berdasarkan classification.
 * @param {string} classification - Klasifikasi hewan (misalnya: "mamalia").
 * @returns {Array} - Array data hewan yang sesuai dengan classification.
 */
const getDataByClassification = async (classification) => {
  try {
    const snapshot = await hewan_collection
      .where("classification", "==", classification)
      .get();

    if (snapshot.empty) {
      console.log(`No data found for classification: ${classification}`);
      return [];
    }

    const results = [];
    snapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });

    console.log(`Data retrieved for classification: ${classification}`);
    return results;
  } catch (error) {
    console.error("Error while retrieving data by classification:", error);
    throw error;
  }
};

/**
 * Fungsi untuk mengambil data berdasarkan scarcityLevel.
 * @param {string} scarcityLevel - Tingkat kelangkaan hewan (misalnya: "Endangered").
 * @returns {Array} - Array data hewan yang sesuai dengan scarcityLevel.
 */
const getDataByScarcityLevel = async (scarcityLevel) => {
  try {
    const snapshot = await hewan_collection
      .where("scarcityLevel", "==", scarcityLevel)
      .get();

    if (snapshot.empty) {
      console.log(`No data found for scarcityLevel: ${scarcityLevel}`);
      return [];
    }

    const results = [];
    snapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });

    console.log(`Data retrieved for scarcityLevel: ${scarcityLevel}`);
    return results;
  } catch (error) {
    console.error("Error while retrieving data by scarcityLevel:", error);
    throw error;
  }
};

// Ekspor fungsi untuk digunakan di tempat lain
module.exports = {
  //addDataToFirestore,
  getData,
  getDataByDocName,
  getDataByScarcityLevel,
  getDataByClassification,
};
