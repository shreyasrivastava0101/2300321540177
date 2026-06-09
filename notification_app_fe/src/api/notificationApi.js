export const fetchNotifications = async () => {
  return [
    {
      id: 1,
      title: "Server Update",
      message: "Deployment completed successfully.",
      source: "System",
      timestamp: "2026-06-09T09:00:00Z",
    },
    {
      id: 2,
      title: "Security Alert",
      message: "Password updated successfully.",
      source: "Security",
      timestamp: "2026-06-09T08:30:00Z",
    },
    {
      id: 3,
      title: "Welcome",
      message: "Thanks for joining the platform.",
      source: "General",
      timestamp: "2026-06-08T15:00:00Z",
    },
  ];
};