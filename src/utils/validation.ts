export const validateTemperature = (temperature: number): boolean => {
    return temperature >= -50 && temperature <= 60 && Number.isFinite(temperature);
  };
  