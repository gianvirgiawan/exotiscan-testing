const predictClassification = require("../services/inferenceService");
const crypto = require("crypto");
const addPredict = require("../services/addpredict");

async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  // const { confidenceScore, label, explanation, suggestion } =
  const {
    label,
    commonName,
    scientificName,
    description,
    characteristics,
    habitat,
    classification,
    family,
    scarcityLevel,
    remainingAmount,
    funFact,
    confidenceScore,
  } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id: id,
    result: label,
    commonName: commonName,
    scientificName: scientificName,
    description: description,
    characteristics: characteristics,
    habitat: habitat,
    classification: classification,
    family: family,
    scarcityLevel: scarcityLevel,
    remainingAmount: remainingAmount,
    funFact: funFact,
    confidenceScore: confidenceScore,
    createdAt: createdAt,
  };

  const response = h.response({
    status: "success",
    message:
      confidenceScore > 99
        ? "Model is predicted successfully."
        : "Model is predicted successfully but under threshold. Please use the correct picture",
    data,
  });

   await addPredict(id, data);

  response.code(201);
  return response;
}

module.exports = postPredictHandler;
