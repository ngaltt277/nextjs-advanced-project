import React from "react";
import { message as messageApi } from "antd";

export function notifyProgress(message: string, icon?: React.ReactNode) {
  messageApi.success({
    content: message,
    icon,
  });
}
