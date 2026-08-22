import "./storybook.css";

import type { Decorator, Preview } from "@storybook/react";
import { ThemeProvider } from "next-themes";
import { tokenInspectorDecorator } from "./tokens/token-inspector";

const themeDecorator: Decorator = (Story, context) => {
  const theme = context.globals.theme ?? "light";
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={theme}
      forcedTheme={theme}
      enableSystem={false}
      disableTransitionOnChange
    >
      <Story />
    </ThemeProvider>
  );
};

const preview: Preview = {
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme for the preview",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
    cssVarsToolbar: {
      name: "Tokens",
      description: "Toggle the design-token inspector overlay",
      toolbar: {
        icon: "text",
        items: [
          { value: "off", title: "Tokens: off", icon: "stopalt" },
          { value: "on", title: "Tokens: on", icon: "graphline" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
    cssVarsToolbar: "on",
  },
  decorators: [themeDecorator, tokenInspectorDecorator],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;