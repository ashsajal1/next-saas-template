import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "../button";
import { Plus, Trash2, Loader2 } from "lucide-react";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    asChild: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "Link Button",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small Button",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large Button",
  },
};

export const Icon: Story = {
  args: {
    size: "icon",
    children: <Plus className="h-4 w-4" />,
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Plus className="h-4 w-4" />
        Add Item
      </>
    ),
  },
};

export const Loading: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading...
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
};

export const DestructiveWithIcon: Story = {
  args: {
    variant: "destructive",
    children: (
      <>
        <Trash2 className="h-4 w-4" />
        Delete
      </>
    ),
  },
};
