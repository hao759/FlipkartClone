const baseUrl = process.env.API || "https://localhost:2000";
//const baseUrl = "http://localhost:2000";

export const api = `${baseUrl}`;

export const generatePublicUrl = (fileName) => {
  return `${baseUrl}/public/${fileName}`;
};
