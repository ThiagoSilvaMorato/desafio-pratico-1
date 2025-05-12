/* eslint-disable react-refresh/only-export-components */
import { ReactNode } from "react";
import toast from "react-hot-toast";

const ToastContent = ({
  title,
  message,
  icon,
}: {
  title: string;
  message: string;
  icon?: ReactNode;
}) => (
  <div style={{ display: "flex", gap: "12px" }}>
    {icon && <div style={{ display: "flex", alignItems: "center" }}>{icon}</div>}
    <div>
      <strong style={{ display: "block", marginBottom: "4px" }}>{title}</strong>
      <span>{message}</span>
    </div>
  </div>
);

const toastMessages = {
  success(title = "Sucesso", message: string, options?: { time?: number; icon?: ReactNode }) {
    toast.success(<ToastContent title={title} message={message} icon={options?.icon} />, {
      style: {
        border: "1px solid #27928C",
        padding: "16px",
        color: "#27928C",
      },
      iconTheme: {
        primary: "#27928C",
        secondary: "#FFFAEE",
      },
      duration: options?.time ?? 2500,
    });
  },

  error(title = "Erro", message: string, options?: { time?: number; icon?: ReactNode }) {
    toast.error(<ToastContent title={title} message={message} icon={options?.icon} />, {
      style: {
        border: "1px solid #FF5050",
        padding: "16px",
        color: "#FF5050",
      },
      iconTheme: {
        primary: "#FF5050",
        secondary: "#FFFAEE",
      },
      duration: options?.time ?? 2500,
    });
  },

  info(title = "Informação", message: string, options?: { time?: number; icon?: ReactNode }) {
    toast(<ToastContent title={title} message={message} icon={options?.icon} />, {
      style: {
        border: "1px solid #2563B8",
        padding: "16px",
        color: "#2563B8",
      },
      iconTheme: {
        primary: "#2563B8",
        secondary: "#FFFAEE",
      },
      duration: options?.time ?? 2500,
    });
  },
};

export default toastMessages;
