
interface PredictionInput {
  pregnancies: number;
  glucose: number;
  blood_pressure: number;
  skin_thickness: number;
  insulin: number;
  bmi: number;
  dpf: number;
  age: number;
}

interface PredictionResponse {
  prediction: number;
  probability: number;
  confidence: string;
}

export const predictDiabetes = async (data: PredictionInput): Promise<PredictionResponse> => {
  try {
    const response = await fetch('http://localhost:5050/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in API call:', error);
    throw error;
  }
};
