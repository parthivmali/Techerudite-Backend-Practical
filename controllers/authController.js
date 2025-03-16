import authService from "../services/authService.js";

export const register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const result = await authService.verifyEmail(req.params.token);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
