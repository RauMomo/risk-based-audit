export default defineAppConfig({
  /**
   * Icon system (Nuxt UI + Iconify)
   */
  icon: {
    provider: "iconify",
    aliases: {
      // basic UI
      close: "heroicons:x-mark",
      check: "heroicons:check",
      loading: "heroicons:arrow-path",
      charter: "heroicons:clipboard-document-list",
      // navigation
      chevronDown: "heroicons:chevron-down",
      chevronUp: "heroicons:chevron-up",

      // actions
      add: "heroicons:plus",
      edit: "heroicons:pencil",
      delete: "heroicons:trash",
    },
  },
  theme: {
    dark: false,
    primaryColor: "primary",
  },

  ui: {
    container: {
      base: "max-w-(--ui-container) w-full space-y-8 bg-neutral-400 px-8 py-4 rounded-xl z-100 block relative",
    },
    card: {
      slots: {
        root: "rounded-lg overflow-hidden",
        header: "p-4 sm:px-6 border-none",
        body: "p-4 sm:p-6 border-none",
        footer: "p-4 sm:px-6 border-none",
      },
      variants: {
        variant: {
          solid: {
            root: "bg-inverted text-inverted",
          },
          outline: {
            root: "from-secondary-50 to-secondary-100 bg-gradient-to-r ring-2 from ring ring-primary-500 divide-y divide-default",
          },
          soft: {
            root: "bg-elevated/50 divide-y divide-default",
          },
          subtle: {
            root: "bg-elevated/50 ring ring-default divide-y divide-default",
          },
        },
      },
      defaultVariants: {
        variant: "outline",
      },
    },
    colors: {
      primary: "blue",
      secondary: "secondary",
      success: "success",
      info: "info",
      warning: "warning",
      error: "error",
      neutral: "neutral",
    },

    button: {
      variants: {
        solid: {
          bg: "primary",
        },
      },
    },
  },
});
