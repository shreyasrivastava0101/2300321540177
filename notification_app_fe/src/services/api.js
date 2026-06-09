import axios from 'axios';
import { Log } from '../../../logging_middleware/logger.js';

const API_URL = 'http://4.224.186.213/evaluation-service/notifications';

export const fetchNotifications = async ({ page = 1, limit = 10, notification_type }) => {
  try {
    Log("frontend", "info", "api", "Fetching notifications started");

    const res = await axios.get(
      API_URL,
      {
        params: { page, limit, notification_type },
        timeout: 8000,
      }
    );

    const data = res?.data;

    // Check for correct API response structure
    if (!data || !data.notifications) {
      // In case the API returns the array directly, let's gracefully handle it
      if (Array.isArray(data)) {
         return { notifications: data, total: data.length, page };
      }
      throw new Error("Invalid API response structure");
    }

    Log("frontend", "info", "api", "Notifications fetched successfully");

    return data;
  } catch (err) {
    Log("frontend", "error", "api", "Failed to fetch notifications");

    console.error("API Error:", err.message);

    return {
      notifications: [],
      total: 0,
      page,
    };
  }
};
