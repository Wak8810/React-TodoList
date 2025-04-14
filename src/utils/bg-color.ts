export const getPriorityColor = (priority: number): string => {
    switch (priority) {
      case 1:
        return " bg-green-100"; // 一番低い → 薄い緑
      case 2:
        return " bg-green-200";
      case 3:
        return " bg-green-300"; // 中間
      case 4:
        return " bg-green-400";
      case 5:
        return " bg-green-500"; // 一番高い → 濃い緑
      default:
        return " bg-gray-100"; // fallback
    }
  };
  