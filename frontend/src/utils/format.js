export function formatDateTime(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function statusClass(value) {
  if (["online", "approved", "success", "resolved"].includes(value)) return "success";
  if (["open", "high", "denied", "offline", "rejected", "expired"].includes(value)) return "danger";
  if (["processing", "pending", "maintenance", "medium"].includes(value)) return "warning";
  return "neutral";
}

export const PASS_STATUS_LABELS = {
  pending: "待审批",
  approved: "已批准",
  rejected: "已拒绝",
  expired: "已过期",
};

export function resolveVisitorPassStatus(visitor) {
  if (!visitor) return visitor;
  const { pass_status, leave_time, visit_time } = visitor;
  if (pass_status === "pending" || pass_status === "approved") {
    const expireTime = new Date(leave_time || visit_time).getTime();
    const now = Date.now();
    if (!isNaN(expireTime) && now > expireTime) {
      return {
        ...visitor,
        pass_status: "expired",
        pass_status_display: PASS_STATUS_LABELS.expired,
      };
    }
  }
  return visitor;
}
