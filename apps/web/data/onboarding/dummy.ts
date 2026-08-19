export const onboardingDummyData = {
  user: {
    name: "Sarah Putri",
    email: "sarah@acme.com",
  },
  steps: [
    { id: "account", label: "Create account", status: "success" as const },
    { id: "workspace", label: "Set up workspace", status: "info" as const },
    { id: "invite", label: "Invite teammates", status: "neutral" as const },
  ],
};
